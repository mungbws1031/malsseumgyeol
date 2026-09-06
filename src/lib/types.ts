// end: 개역개정이 여러 절을 하나로 묶어 번역한 경우 마지막 절 번호 (예: 신 6:18-19)
export type Verse = { n: number; text: string; end?: number };

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
