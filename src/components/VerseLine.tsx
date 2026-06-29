import { useCallback, useRef } from 'react';
import type { Verse, Passage, Depth, Settings } from '../lib/types';
import type { HighlightMap } from '../lib/storage';
import { verseKey, toggleHighlight } from '../lib/storage';
import type { RelatedVerse } from '../data/relatedVerses';

interface Props {
  verse: Verse;
  passage: Passage;
  isSelected: boolean;
  highlights: HighlightMap;
  onHighlightChange: (m: HighlightMap) => void;
  depth: Depth;
  settings: Settings;
  onSelectVerse: (verse: Verse, passage: Passage) => void;
  related?: RelatedVerse[];
  onJumpTo?: (book: string, chapter: number, n: number) => void;
}

export default function VerseLine({
  verse, passage, isSelected, highlights, onHighlightChange,
  onSelectVerse, related, onJumpTo,
}: Props) {
  const key = verseKey(passage.book, passage.chapter, verse.n);
  const isHighlighted = Boolean(highlights[key]);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);

  const handleClick = useCallback(() => {
    if (didLongPress.current) {
      didLongPress.current = false;
      return;
    }
    onSelectVerse(verse, passage);
  }, [verse, passage, onSelectVerse]);

  const handleLongPress = useCallback(() => {
    didLongPress.current = true;
    const next = toggleHighlight(key);
    onHighlightChange(next);
  }, [key, onHighlightChange]);

  const onPointerDown = () => {
    pressTimer.current = setTimeout(handleLongPress, 600);
  };
  const onPointerUp = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  };

  return (
    <div className="verse-block">
      {related && related.length > 0 && (
        <div className="related-tags" aria-label="연관 구절">
          {related.map((r) => (
            <button
              key={r.ref}
              className={`related-tag${r.book ? ' jumpable' : ''}`}
              title={r.text}
              onClick={(e) => {
                e.stopPropagation();
                if (r.book && r.chapter && r.n && onJumpTo) {
                  onJumpTo(r.book, r.chapter, r.n);
                }
              }}
            >
              {r.ref}
            </button>
          ))}
        </div>
      )}
      <p
        className={`verse-line${isSelected ? ' selected' : ''}${isHighlighted ? ' highlighted' : ''}`}
        data-n={verse.n}
        onClick={handleClick}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        tabIndex={0}
        role="button"
        aria-pressed={isSelected}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      >
        <sup className="verse-num">{verse.n}</sup>
        {verse.text}
      </p>
    </div>
  );
}
