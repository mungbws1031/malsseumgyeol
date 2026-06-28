import { SEED_PASSAGES } from '../data/seed';
import type { Passage, Gloss, HighlightEntry, Settings, Depth } from './types';

const KEY = {
  passages: 'malsseumgyeol:passages',
  highlights: 'malsseumgyeol:highlights',
  settings: 'malsseumgyeol:settings',
  glossCache: 'malsseumgyeol:glossCache',
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// --- Passages ---
export function loadPassages(): Passage[] {
  const stored = load<Passage[]>(KEY.passages, []);
  if (stored.length === 0) return SEED_PASSAGES;
  const customOnly = stored.filter((p) => p.custom);
  return [...SEED_PASSAGES, ...customOnly];
}

export function saveCustomPassage(p: Passage): void {
  const stored = load<Passage[]>(KEY.passages, []);
  save(KEY.passages, [...stored, { ...p, custom: true }]);
}

// --- Highlights ---
export type HighlightMap = Record<string, HighlightEntry>;

export function loadHighlights(): HighlightMap {
  return load<HighlightMap>(KEY.highlights, {});
}

export function verseKey(book: string, chapter: number | string, n: number): string {
  return `${book} ${chapter}:${n}`;
}

export function toggleHighlight(key: string, note?: string): HighlightMap {
  const map = loadHighlights();
  if (map[key]) {
    const { [key]: _removed, ...rest } = map;
    save(KEY.highlights, rest);
    return rest;
  }
  const updated = { ...map, [key]: { note, ts: Date.now() } };
  save(KEY.highlights, updated);
  return updated;
}

export function updateNote(key: string, note: string): HighlightMap {
  const map = loadHighlights();
  const updated = { ...map, [key]: { ...map[key], note, ts: Date.now() } };
  save(KEY.highlights, updated);
  return updated;
}

// --- Settings ---
const DEFAULT_SETTINGS: Settings = {
  fontScale: 1,
  depth: '묵상',
  permanentGlossCache: false,
};

export function loadSettings(): Settings {
  return { ...DEFAULT_SETTINGS, ...load<Partial<Settings>>(KEY.settings, {}) };
}

export function saveSettings(s: Settings): void {
  save(KEY.settings, s);
}

// --- Gloss Cache ---
type GlossCache = Record<string, Gloss>;

export function loadGlossCache(): GlossCache {
  return load<GlossCache>(KEY.glossCache, {});
}

export function saveGlossToCache(cacheKey: string, gloss: Gloss): void {
  const cache = loadGlossCache();
  save(KEY.glossCache, { ...cache, [cacheKey]: gloss });
}

export function glossCacheKey(book: string, chapter: number | string, n: number, depth: Depth): string {
  return `${book} ${chapter}:${n}|${depth}`;
}
