import type { Gloss, Depth } from './types';
import {
  glossCacheKey,
  loadGlossCache,
  saveGlossToCache,
  loadSettings,
} from './storage';

const sessionCache = new Map<string, Gloss>();

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

  // 2. localStorage cache (if permanentGlossCache enabled)
  const settings = loadSettings();
  if (settings.permanentGlossCache) {
    const lsCache = loadGlossCache();
    if (lsCache[key]) {
      sessionCache.set(key, lsCache[key]);
      return lsCache[key];
    }
  }

  // 3. API call
  const res = await fetch('/api/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ book, chapter, n, text, depth }),
  });

  if (!res.ok) throw new Error('api_error');

  const gloss = (await res.json()) as Gloss;

  sessionCache.set(key, gloss);
  if (settings.permanentGlossCache) {
    saveGlossToCache(key, gloss);
  }

  return gloss;
}
