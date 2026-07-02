import type { Passage, Verse, Depth, Settings } from '../lib/types';
import type { HighlightMap } from '../lib/storage';
import { verseKey } from '../lib/storage';
import { RELATED_VERSES } from '../data/relatedVerses';
import { findBook } from '../data/bible';
import VerseLine from './VerseLine';
import BookIntro from './BookIntro';

interface Props {
  passages: Passage[];
  activeIdx: number;
  selected: { verse: Verse; passage: Passage } | null;
  onSelectVerse: (verse: Verse, passage: Passage) => void;
  highlights: HighlightMap;
  onHighlightChange: (m: HighlightMap) => void;
  settings: Settings;
  depth: Depth;
  onOpenAdd: () => void;
  onOpenSaved: () => void;
  onOpenToc: () => void;
  onOpenApiKey: () => void;
  hasApiKey: boolean;
  onFontScaleChange: (s: 1 | 2 | 3) => void;
  onJumpToVerse: (book: string, chapter: number, n: number) => void;
  onSelectChapter: (book: string, chapter: number) => void;
}

export default function Reader({
  passages, activeIdx, selected,
  onSelectVerse, highlights, onHighlightChange,
  settings, depth, onOpenAdd, onOpenSaved, onOpenToc, onOpenApiKey, hasApiKey,
  onFontScaleChange, onJumpToVerse, onSelectChapter,
}: Props) {
  const active = passages[activeIdx];
  const bookData = active ? findBook(active.book) : undefined;
  const currentChapter = active ? Number(active.chapter) : 0;
  const totalChapters = bookData ? bookData.chapters.length : 0;
  const hasPrev = currentChapter > 1;
  const hasNext = currentChapter < totalChapters;

  return (
    <div className="reader">
      <header className="reader-header">
        <button className="toc-trigger" onClick={onOpenToc} aria-label="목차 열기">
          <span className="toc-trigger-icon">☰</span>
          <span className="toc-trigger-label">목차</span>
        </button>
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
          <button
            className={`apikey-btn${hasApiKey ? ' set' : ''}`}
            onClick={onOpenApiKey}
            aria-label="API 키 설정"
            title={hasApiKey ? 'API 키 설정됨' : 'API 키 필요'}
          >{hasApiKey ? '🔑' : '🔑 키 설정'}</button>
        </div>
      </header>

      <article className="passage-body" aria-label={active?.ref}>
        {active ? (
          <>
            <BookIntro book={active.book} />
            {active.verses.map((v) => {
              const key = verseKey(active.book, active.chapter, v.n);
              return (
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
                  related={RELATED_VERSES[key]}
                  onJumpTo={onJumpToVerse}
                />
              );
            })}
          </>
        ) : (
          <p className="empty-msg">본문을 선택하거나 추가해 주세요.</p>
        )}
      </article>

      {active && (
        <nav className="chapter-nav" aria-label="장 이동">
          <button
            className="chapter-nav-btn"
            onClick={() => onSelectChapter(active.book, currentChapter - 1)}
            disabled={!hasPrev}
            aria-label="이전 장"
          >
            ← {hasPrev ? `${currentChapter - 1}장` : ''}
          </button>
          <span className="chapter-nav-label">{active.book} {currentChapter}장 / {totalChapters}장</span>
          <button
            className="chapter-nav-btn"
            onClick={() => onSelectChapter(active.book, currentChapter + 1)}
            disabled={!hasNext}
            aria-label="다음 장"
          >
            {hasNext ? `${currentChapter + 1}장` : ''} →
          </button>
        </nav>
      )}

      <footer className="reader-footer">
        <small>AI 생성 풀이 — 신뢰할 주석서와 병행하세요</small>
      </footer>
    </div>
  );
}
