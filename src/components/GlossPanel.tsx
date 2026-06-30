import type { Gloss, Depth, Verse, Passage } from '../lib/types';
import type { HighlightMap } from '../lib/storage';
import { verseKey, toggleHighlight, updateNote } from '../lib/storage';
import { useState } from 'react';
import { COMMENTARY_MAP } from '../data/commentary';

const DEPTHS: Depth[] = ['묵상', '해설', '주해'];

interface Props {
  selected: { verse: Verse; passage: Passage } | null;
  gloss: Gloss | null;
  loading: boolean;
  error: boolean;
  depth: Depth;
  onDepthChange: (d: Depth) => void;
  highlights: HighlightMap;
  onHighlightChange: (m: HighlightMap) => void;
  onRetry: () => void;
  onClose: () => void;
  onOpenApiKey: () => void;
  noApiKey: boolean;
}

export default function GlossPanel({
  selected, gloss, loading, error,
  depth, onDepthChange,
  highlights, onHighlightChange,
  onRetry, onClose, onOpenApiKey, noApiKey,
}: Props) {
  const [noteInput, setNoteInput] = useState('');
  const [editingNote, setEditingNote] = useState(false);

  const key = selected
    ? verseKey(selected.passage.book, selected.passage.chapter, selected.verse.n)
    : '';
  const isHighlighted = key ? Boolean(highlights[key]) : false;
  const existingNote = key ? highlights[key]?.note ?? '' : '';
  const commentary = key ? COMMENTARY_MAP[key] ?? null : null;

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

      <div className="depth-toggle" role="group" aria-label="풀이 깊이">
        {DEPTHS.map((d) => (
          <button
            key={d}
            className={`depth-btn${depth === d ? ' active' : ''}`}
            onClick={() => onDepthChange(d)}
            aria-pressed={depth === d}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="gloss-body">
        {loading && (
          <p className="gloss-loading">말씀을 헤아리는 중…</p>
        )}
        {error && !loading && (
          <div className="gloss-error">
            {noApiKey ? (
              <>
                <p>AI 풀이를 사용하려면 Anthropic API 키가 필요합니다.</p>
                <button className="retry-btn" onClick={onOpenApiKey}>🔑 API 키 입력</button>
              </>
            ) : (
              <>
                <p>풀이를 불러오지 못했어요. 다시 탭해 주세요.</p>
                <button className="retry-btn" onClick={onRetry}>다시 시도</button>
              </>
            )}
          </div>
        )}
        {gloss && !loading && !error && (
          <>
            <div className="gloss-block summary">
              <span className="gloss-label">핵심</span>
              <p>{gloss.summary}</p>
            </div>
            <div className="gloss-block meaning">
              <span className="gloss-label">뜻 풀이</span>
              <p>{gloss.meaning}</p>
            </div>
            <div className="gloss-block keyword">
              <span className="gloss-label">핵심 단어</span>
              <strong className="kw-word">「{gloss.keyword.word}」</strong>
              <p className="kw-note">{gloss.keyword.note}</p>
            </div>
            <div className="gloss-block reflection">
              <span className="gloss-label">묵상 질문</span>
              <p className="reflection-q">{gloss.reflection}</p>
            </div>
            <div className="gloss-block commentary">
              <span className="gloss-label">주석</span>
              <p>{gloss.commentary}</p>
            </div>
          </>
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

      {commentary && (
        <div className="mh-commentary">
          <span className="gloss-label">성경 구절 해설</span>
          <p>{commentary}</p>
        </div>
      )}
    </div>
  );
}
