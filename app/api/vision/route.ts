import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: 'Gemini API key is not configured in .env.local' }, { status: 500 });
  }

  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) return NextResponse.json({ error: 'No image provided' }, { status: 400 });

    const base64Data = imageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Fast and cheap vision model
    
    const prompt = `
당신은 메이플스토리 '진의 신비한 정원' 스크린샷 판독 AI입니다.
이미지를 분석해서 다음 정보를 정확하게 추출해 주세요. 매우 엄격하게 JSON 포맷으로만 응답해야 합니다. 기호(\`\`\`) 등은 쓰지 말고 순수 JSON 문자열만 반환하세요.

추출해야 할 정보:
1. dice (유저가 현재 굴려놓고 아직 사용하지 않은 주사위 눈금 3개. 이미지에서 보통 하단이나 중앙에 나란히 있음. 못 찾으면 [])
2. current_position (유저 플레이어가 있는 발판 위치. 0부터 39까지의 인덱스. 우하단 모서리가 0(START), 좌하단 10, 좌상단 20, 우상단 30임. 정확히 모르면 null)
3. fertilizer (화면 하단 UI에 적혀있는 현재 보유 중인 성장 비료 개수. 예: 15300. 못 찾으면 0)

JSON 출력 형식:
{
  "dice": [2, 5, 1],
  "current_position": 12,
  "fertilizer": 40200
}
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/png"
        }
      }
    ]);
    
    let text = result.response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return NextResponse.json(JSON.parse(text));
  } catch (error: any) {
    console.error('Vision API Error:', error);
    return NextResponse.json({ error: error.message || 'Vision API failed' }, { status: 500 });
  }
}
