import type { Passage, Verse, Depth, Settings } from '../lib/types';
import type { HighlightMap } from '../lib/storage';
import VerseLine from './VerseLine';

interface Props {
  passages: Passage[];
  activeIdx: number;
  onSelectPassage: (i: number) => void;
  selected: { verse: Verse; passage: Passage } | null;
  onSelectVerse: (verse: Verse, passage: Passage) => void;
  highlights: HighlightMap;
  onHighlightChange: (m: HighlightMap) => void;
  settings: Settings;
  depth: Depth;
  onOpenAdd: () => void;
  onOpenSaved: () => void;
  onFontScaleChange: (s: 1 | 2 | 3) => void;
}

export default function Reader({
  passages, activeIdx, onSelectPassage, selected,
  onSelectVerse, highlights, onHighlightChange,
  settings, depth, onOpenAdd, onOpenSaved, onFontScaleChange,
}: Props) {
  const active = passages[activeIdx];

  return (
    <div className="reader">
      <header className="reader-header">
        <span className="app-title">말씀결</span>
        <div className="reader-header-right">
          <div className="font-scale-btns" aria-label="글씨 크기">
            {([1, 2, 3] as const).map((s) => (
              <button
                key={s}
                className={`fs-btn${settings.fontScale === s ? ' active' : ''}`}
                onClick={() => onFontScaleChange(s)}
                aria-pressed={settings.fontScale === s}
                style={{ fontSize: `${0.75 + s * 0.1}rem` }}
              >
                가
              </button>
            ))}
          </div>
          <button className="saved-btn" onClick={onOpenSaved} aria-label="저장한 구절 보기">★ 저장 구절</button>
          <button className="add-btn" onClick={onOpenAdd} aria-label="본문 추가">＋ 본문 추가</button>
        </div>
      </header>

      <nav className="passage-chips" aria-label="본문 목록">
        {passages.map((p, i) => (
          <button
            key={p.ref}
            className={`chip${i === activeIdx ? ' active' : ''}`}
            onClick={() => onSelectPassage(i)}
          >
            {p.ref}
          </button>
        ))}
      </nav>

      <article className="passage-body" aria-label={active?.ref}>
        {active ? (
          active.verses.map((v) => (
            <VerseLine
              key={v.n}
              verse={v}
              passage={active}
              isSelected={
                selected?.verse.n === v.n &&
                selected?.passage.book === active.book &&
                selected?.passage.chapter === active.chapter
              }
              highlights={highlights}
              onHighlightChange={onHighlightChange}
              depth={depth}
              settings={settings}
              onSelectVerse={onSelectVerse}
            />
          ))
        ) : (
          <p className="empty-msg">본문을 선택하거나 추가해 주세요.</p>
        )}
      </article>

      <footer className="reader-footer">
        <small>AI 생성 풀이 — 신뢰할 주석서와 병행하세요</small>
      </footer>
    </div>
  );
}
