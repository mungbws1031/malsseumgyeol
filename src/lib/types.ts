export type Verse = { n: number; text: string };

export type Passage = {
  ref: string;
  book: string;
  chapter: number | string;
  verses: Verse[];
  custom?: boolean;
};

export type Gloss = {
  summary: string;
  meaning: string;
  keyword: { word: string; note: string };
  reflection: string;
  commentary: string;
};

export type Depth = '묵상' | '해설' | '주해';

export type HighlightEntry = { note?: string; ts: number };

export type Settings = {
  fontScale: 1 | 2 | 3;
  depth: Depth;
  permanentGlossCache: boolean;
  apiKey?: string;
};
