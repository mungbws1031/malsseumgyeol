export type Verse = { n: number; text: string };

export type Passage = {
  ref: string;
  book: string;
  chapter: number | string;
  verses: Verse[];
  custom?: boolean;
};

export type HighlightEntry = { note?: string; ts: number };

export type Settings = {
  fontScale: 1 | 2 | 3;
};
