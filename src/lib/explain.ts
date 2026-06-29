import Anthropic from '@anthropic-ai/sdk';
import type { Gloss, Depth } from './types';
import { glossCacheKey, loadGlossCache, saveGlossToCache, loadSettings } from './storage';

const sessionCache = new Map<string, Gloss>();

const SYSTEM_PROMPT = `너는 개역개정 성경을 풀이하는 신실하고 학식 있는 안내자다.
특정 교단에 치우치지 않고, 따뜻하고 명료한 한국어로 설명한다.
반드시 아래 JSON 객체 하나만 출력한다. 마크다운, 코드펜스, 다른 말 금지.
{"summary":"한 줄 핵심(20자 내외)","meaning":"뜻 풀이 2~3문장","keyword":{"word":"핵심 단어나 구","note":"그 단어의 의미·배경 한 줄"},"reflection":"마음에 던지는 묵상 질문 1개","commentary":"주석 관점 2~3문장(문맥/배경)"}`;

const DEPTH_LINE: Record<string, string> = {
  묵상: '오늘 하루 마음에 새길 수 있게, 따뜻하고 적용 중심으로.',
  해설: '구절의 문맥과 핵심 단어의 의미를 명료하게.',
  주해: '역사적·신학적 배경까지 깊이 있게, 그러나 교단 중립적으로.',
};

export async function fetchGloss(
  book: string,
  chapter: number | string,
  n: number,
  text: string,
  depth: Depth,
): Promise<Gloss> {
  const key = glossCacheKey(book, chapter, n, depth);

  // 1. session cache
  const fromSession = sessionCache.get(key);
  if (fromSession) return fromSession;

  // 2. localStorage cache
  const settings = loadSettings();
  if (settings.permanentGlossCache) {
    const lsCache = loadGlossCache();
    if (lsCache[key]) {
      sessionCache.set(key, lsCache[key]);
      return lsCache[key];
    }
  }

  const apiKey = settings.apiKey?.trim();
  if (!apiKey) throw new Error('no_api_key');

  // 3. 브라우저에서 Anthropic API 직접 호출
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

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
  const gloss = JSON.parse(cleaned) as Gloss;

  sessionCache.set(key, gloss);
  if (settings.permanentGlossCache) saveGlossToCache(key, gloss);

  return gloss;
}
