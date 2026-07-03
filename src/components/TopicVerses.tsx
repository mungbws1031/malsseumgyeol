import { useState } from 'react';
import { TOPICS } from '../data/topicVerses';

interface Props {
  onJumpTo: (book: string, chapter: number, n: number) => void;
  onClose: () => void;
}

export default function TopicVerses({ onJumpTo, onClose }: Props) {
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  return (
    <div className="toc-backdrop" onClick={onClose} role="dialog" aria-modal aria-label="상황별 말씀">
      <nav className="toc-panel" onClick={(e) => e.stopPropagation()}>
        <div className="toc-header">
          <span className="toc-title">상황별 말씀</span>
          <button className="toc-close" onClick={onClose} aria-label="닫기">✕</button>
        </div>

        <p className="topic-hint">지금 마음에 맞는 상황을 골라 보세요</p>

        <ul className="toc-list">
          {TOPICS.map((topic) => {
            const isOpen = openTopic === topic.id;
            return (
              <li key={topic.id} className="toc-passage">
                <button
                  className="toc-passage-btn"
                  onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                >
                  <span className="toc-ref">{topic.emoji} {topic.title}</span>
                  <span className="toc-count">
                    {topic.verses.length}구절
                    <span className="toc-chevron">{isOpen ? ' ▲' : ' ▼'}</span>
                  </span>
                </button>

                {isOpen && (
                  <ul className="toc-verses">
                    {topic.verses.map((v) => (
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
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
