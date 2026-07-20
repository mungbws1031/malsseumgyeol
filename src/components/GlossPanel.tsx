import type { Verse, Passage } from '../lib/types';
import type { HighlightMap } from '../lib/storage';
import { verseKey, toggleHighlight, updateNote } from '../lib/storage';
import { useEffect, useMemo, useState } from 'react';
import { COMMENTARY_MAP } from '../data/commentary';
import { BOOK_INTROS } from '../data/bookIntros';
import { WORD_WIKI } from '../data/wordWiki';

type Tab = '해설' | '역사적 배경' | '단어 뜻';
const TABS: Tab[] = ['해설', '역사적 배경', '단어 뜻'];

interface Props {
  selected: { verse: Verse; passage: Passage } | null;
  highlights: HighlightMap;
  onHighlightChange: (m: HighlightMap) => void;
  onClose: () => void;
}

export default function GlossPanel({
  selected, highlights, onHighlightChange, onClose,
}: Props) {
  const [noteInput, setNoteInput] = useState('');
  const [editingNote, setEditingNote] = useState(false);
  const [tab, setTab] = useState<Tab>('해설');
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);

  const key = selected
    ? verseKey(selected.passage.book, selected.passage.chapter, selected.verse.n)
    : '';
  const isHighlighted = key ? Boolean(highlights[key]) : false;
  const existingNote = key ? highlights[key]?.note ?? '' : '';
  const commentary = key ? COMMENTARY_MAP[key] ?? null : null;
  const bookIntro = selected ? BOOK_INTROS[selected.passage.book] : undefined;

  const matchedWords = useMemo(() => {
    if (!selected) return [];
    return WORD_WIKI.filter((w) =>
      w.verses.some(
        (v) =>
          v.book === selected.passage.book &&
          v.chapter === selected.passage.chapter &&
          v.n === selected.verse.n
      )
    );
  }, [selected]);

  const selectedWord = selectedWordId ? WORD_WIKI.find((w) => w.id === selectedWordId) : null;

  useEffect(() => {
    setSelectedWordId(null);
  }, [key]);

  const handleToggleHighlight = () => {
    if (!key) return;
    const next = toggleHighlight(key, existingNote || undefined);
    onHighlightChange(next);
  };

  const handleSaveNote = () => {
    if (!key) return;
    const next = updateNote(key, noteInput);
    onHighlightChange(next);
    setEditingNote(false);
  };

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setSelectedWordId(null);
  };

  if (!selected) {
    return (
      <div className="gloss-panel empty">
        <p className="gloss-empty-hint">구절을 탭하면 이 자리에 말씀의 결이 펼쳐져요</p>
      </div>
    );
  }

  return (
    <div className="gloss-panel">
      <div
        className="gloss-drag-handle"
        onClick={onClose}
        aria-label="닫기"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClose(); }}
      />

      <div className="gloss-ref">
        <span className="gloss-ref-text">
          {selected.passage.book} {selected.passage.chapter}:{selected.verse.n}
        </span>
        <button
          className={`highlight-btn${isHighlighted ? ' active' : ''}`}
          onClick={handleToggleHighlight}
          aria-label={isHighlighted ? '하이라이트 해제' : '하이라이트'}
        >
          {isHighlighted ? '★' : '☆'}
        </button>
      </div>

      <div className="gloss-tabs" role="group" aria-label="풀이 탭">
        {TABS.map((t) => (
          <button
            key={t}
            className={`gloss-tab${tab === t ? ' active' : ''}`}
            onClick={() => handleTabChange(t)}
            aria-pressed={tab === t}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="gloss-body">
        {tab === '해설' && (
          commentary ? (
            <div className="gloss-block mh-commentary">
              <span className="gloss-label">성경 구절 해설</span>
              <p>{commentary}</p>
            </div>
          ) : (
            <p className="gloss-empty-hint">아직 해설이 없습니다.</p>
          )
        )}

        {tab === '역사적 배경' && (
          bookIntro?.historicalContext ? (
            <div className="book-intro-context">
              <div className="book-intro-context-item">
                <span className="book-intro-context-label">동양</span>
                <p className="book-intro-text">{bookIntro.historicalContext.east}</p>
              </div>
              <div className="book-intro-context-item">
                <span className="book-intro-context-label">서양</span>
                <p className="book-intro-text">{bookIntro.historicalContext.west}</p>
              </div>
            </div>
          ) : (
            <p className="gloss-empty-hint">아직 역사적 배경 정보가 없습니다.</p>
          )
        )}

        {tab === '단어 뜻' && (
          selectedWord ? (
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
                {/* 필요시 onJumpToVerse prop 추가해서 이동 기능 넣을 수 있음 */}
                <ul className="word-verse-list">
                  {selectedWord.verses.map((v) => (
                    <li key={v.ref}>
                      <span className="toc-verse-n">{v.ref}</span>
                      <span className="toc-verse-preview">{v.preview}</span>
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
          ) : matchedWords.length > 0 ? (
            <ul className="word-card-list">
              {matchedWords.map((w) => (
                <li key={w.id}>
                  <button className="word-card" onClick={() => setSelectedWordId(w.id)}>
                    <span className="word-card-term">{w.term}</span>
                    <span className="word-card-original">{w.original} · {w.transliteration}</span>
                    <span className="word-card-meaning">{w.meaning}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="gloss-empty-hint">이 구절에 연결된 단어 풀이가 없습니다.</p>
          )
        )}
      </div>

      <div className="note-area">
        {editingNote ? (
          <>
            <textarea
              className="note-input"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="이 구절에 대한 메모를 남겨요…"
              rows={3}
              autoFocus
              aria-label="메모"
            />
            <div className="note-actions">
              <button className="note-save" onClick={handleSaveNote}>저장</button>
              <button className="note-cancel" onClick={() => setEditingNote(false)}>취소</button>
            </div>
          </>
        ) : (
          <button
            className="note-toggle"
            onClick={() => { setNoteInput(existingNote); setEditingNote(true); }}
          >
            {existingNote ? `✏️ ${existingNote}` : '+ 메모 추가'}
          </button>
        )}
      </div>
    </div>
  );
}
