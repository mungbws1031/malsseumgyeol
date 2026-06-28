import { useCallback, useRef } from 'react';
import type { Verse, Passage, Depth, Settings } from '../lib/types';
import type { HighlightMap } from '../lib/storage';
import { verseKey, toggleHighlight } from '../lib/storage';

interface Props {
  verse: Verse;
  passage: Passage;
  isSelected: boolean;
  highlights: HighlightMap;
  onHighlightChange: (m: HighlightMap) => void;
  depth: Depth;
  settings: Settings;
  onSelectVerse: (verse: Verse, passage: Passage) => void;
}

export default function VerseLine({
  verse, passage, isSelected, highlights, onHighlightChange,
  onSelectVerse,
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
    <p
      className={`verse-line${isSelected ? ' selected' : ''}${isHighlighted ? ' highlighted' : ''}`}
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
  );
}
