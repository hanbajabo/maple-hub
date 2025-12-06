import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';

// [캐시 저장소]
// 서버 메모리에 요약본을 저장합니다. (서버 재시작 시 초기화됨)
// 구조: { 'type': { url: '...', summary: '...' } }
const SUMMARY_CACHE: Record<string, { url: string; summary: string }> = {};

export async function GET(request: Request) {
    console.log('[API] /api/news-summary called');
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type') || 'notice'; // notice, update, event
        console.log(`[API] Processing type: ${type}`);

        const nexonApiKey = process.env.NEXON_API_KEY;
        const geminiApiKey = process.env.GEMINI_API_KEY;

        if (!nexonApiKey || !geminiApiKey) {
            throw new Error('API keys are missing');
        }

        // [New] 특정 URL 요약 요청 처리 (리스트 클릭 시)
        const targetUrl = searchParams.get('url');
        if (targetUrl) {
            console.log(`[API] Processing specific URL: ${targetUrl}`);

            // 1. 캐시 확인
            if (SUMMARY_CACHE[targetUrl]) {
                console.log('[Cache] Hit for specific URL');
                return NextResponse.json({ success: true, data: { summary: SUMMARY_CACHE[targetUrl].summary } });
            }

            // 2. 스크래핑
            console.log(`[API] Scraping content from: ${targetUrl}`);
            const detailResponse = await axios.get(targetUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                },
                timeout: 5000
            });
            const $ = cheerio.load(detailResponse.data);

            let content = $('div.contents_wrap').text().trim();
            if (!content) content = $('div.qs_text').text().trim();
            content = content.replace(/\s+/g, ' ').trim();

            if (content.length > 50000) content = content.substring(0, 50000) + '...';

            // 3. AI 요약 생성
            const genAI = new GoogleGenerativeAI(geminiApiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

            let prompt = '';
            // 타입에 따른 프롬프트 선택
            if (type === 'update' || type === 'test') {
                const promptType = type === 'test' ? '테스트월드' : '업데이트';
                prompt = `
                너는 메이플스토리 전문 AI '단풍이'야.
                제공된 ${promptType} 뉴스 내용을 바탕으로 유저들을 위한 **상세 분석 리포트**를 작성해줘.
                
                [UI 렌더링을 위한 마크다운 규칙]
                1. **대주제**: "### " + 이모지 + 제목
                2. **소주제**: "#### " + 제목
                3. **내용**: 불렛 포인트(-) 사용, 중요 내용 **굵게**.
                
                [주의사항]
                - 날짜/수치 정확히. 마크다운 문법 엄수.
                - 마지막 문구: "자세한 내용은 원문을 참고하세요."

                [뉴스 내용]
                ${content}
                `;
            } else {
                prompt = `
                너는 메이플스토리 전문 AI '단풍이'야.
                아래 내용을 핵심만 3~5줄로 요약해줘.
                형식: 표준 마크다운, 불렛 포인트 사용.

                [내용]
                ${content}
                `;
            }

            const result = await model.generateContent(prompt);
            const summary = result.response.text();

            // 4. 캐시 저장 및 반환
            SUMMARY_CACHE[targetUrl] = { url: targetUrl, summary };
            console.log(`[Cache] Saved summary for specific URL`);

            return NextResponse.json({ success: true, data: { summary } });
        }

        let noticeList: any[] = [];

        // 1. 목록 조회 (API 또는 크롤링)
        if (type === 'test') {
            console.log(`[API] Scraping Test World notices (Pages 1-2)`);
            const baseUrl = 'https://maplestory.nexon.com';
            const targetUrls = [
                `${baseUrl}/News/Notice/TestWorld?page=1`,
                `${baseUrl}/News/Notice/TestWorld?page=2`
            ];

            try {
                const responses = await Promise.all(
                    targetUrls.map(url =>
                        axios.get(url, {
                            headers: {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                            },
                            timeout: 5000
                        })
                    )
                );

                for (const response of responses) {
                    const $ = cheerio.load(response.data);
                    $('.news_board ul li').each((i, el) => {
                        const title = $(el).find('p a span').text().trim();
                        const link = $(el).find('p a').attr('href');
                        const dateRaw = $(el).find('div.heart_date dd').text().trim(); // 2025.12.05

                        // 필터링: 제목에 '테스트', 'Test', 'Tver', 'KMST'가 포함된 경우만
                        if (title && link && /테스트|Test|Tver|KMST/i.test(title)) {
                            // 중복 체크
                            if (!noticeList.some(item => item.title === title)) {
                                noticeList.push({
                                    title,
                                    url: baseUrl + link,
                                    date: dateRaw.replace(/\./g, '-'), // YYYY-MM-DD
                                });
                            }
                        }
                    });
                }
            } catch (err) {
                console.error('[API] Failed to scrape Test World:', err);
            }
        } else {
            // 넥슨 API로 목록 조회
            let apiUrl = 'https://open.api.nexon.com/maplestory/v1/notice';
            if (type === 'update') apiUrl = 'https://open.api.nexon.com/maplestory/v1/notice-update';
            if (type === 'event') apiUrl = 'https://open.api.nexon.com/maplestory/v1/notice-event';

            console.log(`[API] Fetching from Nexon API: ${apiUrl}`);
            const listResponse = await axios.get(apiUrl, {
                headers: {
                    'x-nxopen-api-key': nexonApiKey,
                    'accept': 'application/json'
                },
                timeout: 10000 // 5초 -> 10초로 증액
            });

            // 타입에 맞는 필드를 명시적으로 선택
            if (type === 'event') {
                noticeList = listResponse.data.event_notice;
            } else if (type === 'update') {
                noticeList = listResponse.data.update_notice;
            } else {
                noticeList = listResponse.data.notice;
            }
        }

        if (!noticeList || noticeList.length === 0) {
            // 테스트월드 뉴스 없는 경우 조용히 빈 배열 반환하지 않고 에러 처리 (상위에서 처리됨)
            // 만약 API 요청이 아니고 test인 경우 null 리턴해서 프론트가 안보이게 처리하는게 나을수도 있음.
            if (type === 'test') {
                console.log('[API] No Test World notices found after filtering.');
                return NextResponse.json({ success: true, data: null });
            }
            throw new Error('No notices found');
        }

        // [수정] 이벤트 타입이면 요약 없이 목록만 반환
        if (type === 'event') {
            return NextResponse.json({
                success: true,
                data: noticeList.slice(0, 10)
            });
        }

        // 공지사항, 업데이트, 테스트월드 처리
        const mainNotice = noticeList[0];
        const otherNotices = noticeList.slice(1, 5); // 2~5번째 글

        // [캐시 확인]
        const cachedItem = SUMMARY_CACHE[type];
        if (cachedItem && cachedItem.url === mainNotice.url) {
            console.log(`[Cache] Hit! Returning cached summary for ${type}`);
            return NextResponse.json({
                success: true,
                data: {
                    main: {
                        title: mainNotice.title,
                        url: mainNotice.url,
                        date: mainNotice.date,
                        summary: cachedItem.summary
                    },
                    list: otherNotices
                }
            });
        }

        console.log('[Cache] Miss. Generating new summary...');

        // 1. 최신 글 크롤링 및 요약
        const { title, url } = mainNotice;
        console.log(`[API] Scraping content from: ${url}`);

        const detailResponse = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 5000
        });
        const $ = cheerio.load(detailResponse.data);

        // 본문 추출
        let content = $('div.contents_wrap').text().trim();
        if (!content) {
            content = $('div.qs_text').text().trim();
        }

        content = content.replace(/\s+/g, ' ').trim();
        console.log(`[API] Content length: ${content.length}`);

        if (content.length > 50000) {
            content = content.substring(0, 50000) + '...';
        }

        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        let prompt = '';

        if (type === 'update' || type === 'test') { // 테스트월드도 업데이트와 동일한 포맷 사용
            const promptType = type === 'test' ? '테스트월드' : '업데이트';
            prompt = `
            너는 메이플스토리 전문 AI '단풍이'야.
            제공된 ${promptType} 뉴스 내용을 바탕으로 유저들을 위한 **상세 분석 리포트**를 작성해줘.
            
            [UI 렌더링을 위한 마크다운 규칙]
            아래 구조를 **반드시** 지켜서 표준 Markdown 형식을 사용해.

            1. **대주제 (Category)**: "### " + 이모지 + 제목 (예: ### 🧪 테스트월드 변경점)
            2. **소주제 (Item)**: "#### " + 제목
            3. **내용**: 불렛 포인트(-) 사용. **굵게** 강조.

            [작성 예시]
            ### 🧪 주요 변경 사항
            #### 직업 밸런스 패치
            - **히어로**: 레이징 블로우 데미지 **10% 증가**

            [주의사항]
            - 날짜, 수치 정확하게.
            - "###", "####", "-" 문법 엄수.
            - 마지막 문구: "더 자세한 내용은 공식 홈페이지 공지사항을 확인해보세요."

            [뉴스 내용]
            ${content}
            `;
        } else {
            // 일반 공지사항용 요약 프롬프트
            prompt = `
            너는 메이플스토리 전문 AI '단풍이'야.
            아래 공지사항 내용을 유저들이 읽기 쉽게 핵심만 요약해줘.
            
            [필수 조건]
            1. **시작 문구**: "안녕하세요, 메이플 용사님! 메이플 AI '단풍이'입니다. 🍁"
            2. **구조**:
               - **핵심 요약**: 3줄 요약.
               - **상세 정보**: 불렛 포인트로 정리.
            3. **주의사항**: 표준 마크다운 사용.

            [공지사항 내용]
            ${content}
            `;
        }

        console.log('[API] Generating content with Gemini...');
        const result = await model.generateContent(prompt);
        const summary = result.response.text();

        // [캐시 저장]
        SUMMARY_CACHE[type] = {
            url: mainNotice.url,
            summary: summary
        };

        return NextResponse.json({
            success: true,
            data: {
                main: {
                    title,
                    url,
                    date: mainNotice.date,
                    summary
                },
                list: otherNotices
            }
        });

    } catch (error: any) {
        console.error('[API] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
