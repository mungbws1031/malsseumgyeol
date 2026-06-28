import { useState } from 'react';
import type { Passage, Verse } from '../lib/types';

interface Props {
  onAdd: (p: Passage) => void;
  onClose: () => void;
}

function parseVerses(raw: string): Verse[] {
  const lines = raw.split('\n').filter((l) => l.trim());
  let autoN = 1;
  return lines.map((line) => {
    const match = line.match(/^(\d+)\s+(.*)/);
    if (match) {
      autoN = parseInt(match[1], 10) + 1;
      return { n: parseInt(match[1], 10), text: match[2].trim() };
    }
    return { n: autoN++, text: line.trim() };
  });
}

export default function AddPassageModal({ onAdd, onClose }: Props) {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!book.trim() || !chapter.trim() || !body.trim()) {
      setError('책 이름, 장, 본문은 필수입니다.');
      return;
    }
    const verses = parseVerses(body);
    if (verses.length === 0) {
      setError('본문을 입력해 주세요.');
      return;
    }
    const ref = displayName.trim() || `${book.trim()} ${chapter.trim()}장`;
    onAdd({ ref, book: book.trim(), chapter: chapter.trim(), verses, custom: true });
  };

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="본문 추가">
        <h2 className="modal-title">본문 추가</h2>

        <div className="modal-field">
          <label htmlFor="book-input">책 이름</label>
          <input id="book-input" value={book} onChange={(e) => setBook(e.target.value)} placeholder="예: 마태복음" />
        </div>

        <div className="modal-field">
          <label htmlFor="chapter-input">장</label>
          <input id="chapter-input" value={chapter} onChange={(e) => setChapter(e.target.value)} placeholder="예: 5" />
        </div>

        <div className="modal-field">
          <label htmlFor="name-input">표시 이름 (선택)</label>
          <input id="name-input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="예: 마태복음 5장 산상수훈" />
        </div>

        <div className="modal-field">
          <label htmlFor="body-input">본문 (한 줄 = 한 절, 앞 숫자가 절 번호)</label>
          <textarea
            id="body-input"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={"3 마음이 가난한 자는 복이 있나니…\n4 애통하는 자는 복이 있나니…"}
            rows={8}
          />
        </div>

        {error && <p className="modal-error">{error}</p>}

        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>취소</button>
          <button className="modal-submit" onClick={handleSubmit}>추가</button>
        </div>
      </div>
    </div>
  );
}
