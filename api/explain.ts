import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `너는 개역개정 성경을 풀이하는 신실하고 학식 있는 안내자다.
특정 교단에 치우치지 않고, 따뜻하고 명료한 한국어로 설명한다.
반드시 아래 JSON 객체 하나만 출력한다. 마크다운, 코드펜스, 다른 말 금지.
{"summary":"한 줄 핵심(20자 내외)","meaning":"뜻 풀이 2~3문장","keyword":{"word":"핵심 단어나 구","note":"그 단어의 의미·배경 한 줄"},"reflection":"마음에 던지는 묵상 질문 1개","commentary":"주석 관점 2~3문장(문맥/배경)"}`;

const DEPTH_LINE: Record<string, string> = {
  묵상: '오늘 하루 마음에 새길 수 있게, 따뜻하고 적용 중심으로.',
  해설: '구절의 문맥과 핵심 단어의 의미를 명료하게.',
  주해: '역사적·신학적 배경까지 깊이 있게, 그러나 교단 중립적으로.',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const { book, chapter, n, text, depth } = req.body as {
    book: string; chapter: number | string; n: number; text: string; depth: string;
  };

  if (!book || !chapter || !n || !text || !depth) {
    res.status(400).json({ error: 'missing fields' });
    return;
  }

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `구절: ${book} ${chapter}:${n}\n본문(개역개정): ${text}\n깊이: ${depth} — ${DEPTH_LINE[depth] ?? ''}`,
        },
      ],
    });

    const raw = message.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { type: 'text'; text: string }).text)
      .join('');

    const cleaned = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const gloss = JSON.parse(cleaned);
    res.json(gloss);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'api_error' });
  }
}
