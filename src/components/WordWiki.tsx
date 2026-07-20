import { useMemo, useState } from 'react';
import { WORD_WIKI, WORD_CATEGORIES } from '../data/wordWiki';

interface Props {
  onJumpTo: (book: string, chapter: number, n: number) => void;
  onClose: () => void;
}

export default function WordWiki({ onJumpTo, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WORD_WIKI.filter((w) => {
      if (category && w.category !== category) return false;
      if (!q) return true;
      return (
        w.term.toLowerCase().includes(q) ||
        w.original.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const selectedWord = selectedWordId ? WORD_WIKI.find((w) => w.id === selectedWordId) : null;

  return (
    <div className="toc-backdrop" onClick={onClose} role="dialog" aria-modal aria-label="단어 위키">
      <nav className="toc-panel" onClick={(e) => e.stopPropagation()}>
        <div className="toc-header">
          <span className="toc-title">{selectedWord ? selectedWord.term : '단어 위키'}</span>
          <button className="toc-close" onClick={onClose} aria-label="닫기">✕</button>
        </div>

        {selectedWord ? (
          <div className="word-detail">
            <button
              className="word-back-btn"
              onClick={() => setSelectedWordId(null)}
              aria-label="목록으로 돌아가기"
            >
              ← 목록으로
            </button>

            <div className="word-original">
              <span className="word-original-text">{selectedWord.original}</span>
              <span className="word-transliteration">{selectedWord.transliteration}</span>
              <span className="word-language">{selectedWord.language}</span>
            </div>

            <p className="word-meaning">{selectedWord.meaning}</p>
            <p className="word-description">{selectedWord.description}</p>

            {selectedWord.historicalContext && (
              <div className="word-section">
                <span className="book-intro-section-title">시대적 배경</span>
                <div className="book-intro-context">
                  <div className="book-intro-context-item">
                    <span className="book-intro-context-label">동양</span>
                    <p className="book-intro-text">{selectedWord.historicalContext.east}</p>
                  </div>
                  <div className="book-intro-context-item">
                    <span className="book-intro-context-label">서양</span>
                    <p className="book-intro-text">{selectedWord.historicalContext.west}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="word-section">
              <h3 className="word-section-title">등장 구절</h3>
              <ul className="word-verse-list">
                {selectedWord.verses.map((v) => (
                  <li key={v.ref}>
                    <button
                      className="toc-verse-btn"
                      onClick={() => { onJumpTo(v.book, v.chapter, v.n); onClose(); }}
                    >
                      <span className="toc-verse-n">{v.ref}</span>
                      <span className="toc-verse-preview">{v.preview}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {selectedWord.related.length > 0 && (
              <div className="word-section">
                <h3 className="word-section-title">관련 단어</h3>
                <div className="word-related-list">
                  {selectedWord.related.map((rid) => {
                    const rw = WORD_WIKI.find((w) => w.id === rid);
                    if (!rw) return null;
                    return (
                      <button
                        key={rid}
                        className="word-related-chip"
                        onClick={() => setSelectedWordId(rid)}
                        aria-label={`${rw.term} 보기`}
                      >
                        {rw.term}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedWord.denominationalViews && selectedWord.denominationalViews.length > 0 && (
              <div className="word-section">
                <h3 className="word-section-title">전통별 이해</h3>
                <ul className="book-intro-views">
                  {selectedWord.denominationalViews.map((dv) => (
                    <li key={dv.tradition} className="book-intro-views-item">
                      <span className="book-intro-views-tradition">{dv.tradition}</span>
                      <span className="book-intro-views-text">{dv.view}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="word-search">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="단어, 원어, 뜻으로 검색"
                aria-label="단어 검색"
              />
            </div>

            <div className="word-category-tabs">
              <button
                className={`word-category-tab${category === null ? ' active' : ''}`}
                onClick={() => setCategory(null)}
              >
                전체
              </button>
              {WORD_CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={`word-category-tab${category === c ? ' active' : ''}`}
                  onClick={() => setCategory(category === c ? null : c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <ul className="word-card-list">
              {filtered.map((w) => (
                <li key={w.id}>
                  <button className="word-card" onClick={() => setSelectedWordId(w.id)}>
                    <span className="word-card-term">{w.term}</span>
                    <span className="word-card-original">{w.original} · {w.transliteration}</span>
                    <span className="word-card-meaning">{w.meaning}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="word-empty">검색 결과가 없습니다.</li>
              )}
            </ul>
          </>
        )}
      </nav>
    </div>
  );
}
