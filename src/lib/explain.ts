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

async function callViaServer(
  book: string, chapter: number | string, n: number, text: string, depth: Depth,
): Promise<Gloss> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch('/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ book, chapter, n, text, depth }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error('server_error');
    return res.json() as Promise<Gloss>;
  } finally {
    clearTimeout(timer);
  }
}

async function callDirect(
  apiKey: string, book: string, chapter: number | string, n: number, text: string, depth: Depth,
): Promise<Gloss> {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    system: SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: `구절: ${book} ${chapter}:${n}\n본문(개역개정): ${text}\n깊이: ${depth} — ${DEPTH_LINE[depth] ?? ''}`,
    }],
  });
  const raw = message.content
    .filter((b) => b.type === 'text')
    .map((b) => (b as { type: 'text'; text: string }).text)
    .join('');
  return JSON.parse(raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()) as Gloss;
}

export async function fetchGloss(
  book: string, chapter: number | string, n: number, text: string, depth: Depth,
): Promise<Gloss> {
  const key = glossCacheKey(book, chapter, n, depth);

  const fromSession = sessionCache.get(key);
  if (fromSession) return fromSession;

  const settings = loadSettings();
  if (settings.permanentGlossCache) {
    const lsCache = loadGlossCache();
    if (lsCache[key]) { sessionCache.set(key, lsCache[key]); return lsCache[key]; }
  }

  let gloss: Gloss;

  // 서버 API 시도 (Vercel 배포 환경)
  try {
    gloss = await callViaServer(book, chapter, n, text, depth);
  } catch {
    // 서버 없으면 브라우저 직접 호출 (GitHub Pages 환경)
    const apiKey = settings.apiKey?.trim();
    if (!apiKey) throw new Error('no_api_key');
    gloss = await callDirect(apiKey, book, chapter, n, text, depth);
  }

  sessionCache.set(key, gloss);
  if (settings.permanentGlossCache) saveGlossToCache(key, gloss);
  return gloss;
}
