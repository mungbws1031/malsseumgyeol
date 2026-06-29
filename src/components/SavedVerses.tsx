import type { HighlightMap } from '../lib/storage';
import type { Passage } from '../lib/types';

interface SavedVerse {
  key: string;
  book: string;
  chapter: string | number;
  n: number;
  text: string;
  note?: string;
  ts: number;
}

interface Props {
  highlights: HighlightMap;
  passages: Passage[];
  onClose: () => void;
  onJumpTo: (passageIdx: number, n: number) => void;
}

function buildSavedVerses(highlights: HighlightMap, passages: Passage[]): SavedVerse[] {
  const results: SavedVerse[] = [];
  for (const [key, entry] of Object.entries(highlights)) {
    // key format: "{book} {chapter}:{n}"
    const match = key.match(/^(.+) (.+):(\d+)$/);
    if (!match) continue;
    const [, book, chapter, nStr] = match;
    const n = parseInt(nStr, 10);
    const passage = passages.find(
      (p) => p.book === book && String(p.chapter) === String(chapter),
    );
    const verse = passage?.verses.find((v) => v.n === n);
    if (!verse) continue;
    results.push({ key, book, chapter, n, text: verse.text, note: entry.note, ts: entry.ts });
  }
  return results.sort((a, b) => b.ts - a.ts);
}

export default function SavedVerses({ highlights, passages, onClose, onJumpTo }: Props) {
  const saved = buildSavedVerses(highlights, passages);

  return (
    <div className="saved-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="saved-panel" role="dialog" aria-modal="true" aria-label="저장한 구절">
        <div className="saved-header">
          <h2 className="saved-title">저장한 구절</h2>
          <button className="saved-close" onClick={onClose} aria-label="닫기">✕</button>
        </div>

        {saved.length === 0 ? (
          <p className="saved-empty">구절을 길게 눌러 하이라이트하면 여기 모입니다.</p>
        ) : (
          <ul className="saved-list">
            {saved.map((sv) => {
              const passageIdx = passages.findIndex(
                (p) => p.book === sv.book && String(p.chapter) === String(sv.chapter),
              );
              return (
                <li key={sv.key} className="saved-item">
                  <button
                    className="saved-jump"
                    onClick={() => { onJumpTo(passageIdx, sv.n); onClose(); }}
                    aria-label={`${sv.book} ${sv.chapter}:${sv.n}으로 이동`}
                  >
                    <span className="saved-ref">{sv.book} {sv.chapter}:{sv.n}</span>
                    <p className="saved-text">{sv.text}</p>
                    {sv.note && <p className="saved-note">✏️ {sv.note}</p>}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
