import { useState } from 'react';
import { BOOK_INTROS } from '../data/bookIntros';

interface Props {
  book: string;
}

export default function BookIntro({ book }: Props) {
  const [open, setOpen] = useState(false);
  const intro = BOOK_INTROS[book];
  if (!intro) return null;

  return (
    <div className="book-intro">
      <button
        className="book-intro-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="book-intro-book">{book}</span>
        <span className="book-intro-caret">{open ? '▲' : '▼'}</span>
        <span className="book-intro-hint">{open ? '배경 접기' : '저작 배경'}</span>
      </button>

      {open && (
        <div className="book-intro-body">
          <div className="book-intro-meta">
            <span className="book-intro-meta-item">
              <span className="book-intro-meta-label">저자</span>
              {intro.author}
            </span>
            <span className="book-intro-meta-item">
              <span className="book-intro-meta-label">시기·장소</span>
              {intro.period}
            </span>
          </div>
          <p className="book-intro-text">{intro.background}</p>
        </div>
      )}
    </div>
  );
}
