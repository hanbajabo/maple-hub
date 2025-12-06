import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
    try {
        const apiKey = process.env.NEXON_API_KEY;

        // 1. 업데이트 목록 가져오기
        const listUrl = 'https://open.api.nexon.com/maplestory/v1/notice-update';
        const listResponse = await axios.get(listUrl, {
            headers: {
                'x-nxopen-api-key': apiKey,
                'accept': 'application/json'
            }
        });

        const latestUpdate = listResponse.data.update_notice?.[0];

        if (!latestUpdate) {
            return NextResponse.json({ error: 'No update found' });
        }

        console.log('Target URL:', latestUpdate.url);

        // 2. 크롤링 테스트 (User-Agent 추가)
        const detailResponse = await axios.get(latestUpdate.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(detailResponse.data);

        // 3. 다양한 셀렉터로 본문 추출 시도
        const content1 = $('div.contents_wrap').text().trim();
        const content2 = $('div.qs_text').text().trim(); // 다른 가능성
        const content3 = $('div.article_contents').text().trim(); // 또 다른 가능성

        // HTML 구조 확인을 위해 body 태그 내부 일부 반환
        const bodyPreview = $('body').html()?.substring(0, 500);

        return NextResponse.json({
            success: true,
            url: latestUpdate.url,
            contentLength: {
                'div.contents_wrap': content1.length,
                'div.qs_text': content2.length,
                'div.article_contents': content3.length
            },
            preview: content1.substring(0, 200), // 앞부분 200자 미리보기
            bodyStart: bodyPreview
        });

    } catch (error: any) {
        console.error('Error:', error.message);
        return NextResponse.json({
            error: error.message,
            details: error.response?.data
        }, { status: 500 });
    }
}
