import type { Passage } from '../lib/types';

interface Props {
  passages: Passage[];
  activeIdx: number;
  onSelect: (passageIdx: number, n?: number) => void;
  onClose: () => void;
}

export default function TableOfContents({ passages, activeIdx, onSelect, onClose }: Props) {
  return (
    <div className="toc-backdrop" onClick={onClose} role="dialog" aria-modal aria-label="목차">
      <nav className="toc-panel" onClick={(e) => e.stopPropagation()}>
        <div className="toc-header">
          <span className="toc-title">목차</span>
          <button className="toc-close" onClick={onClose} aria-label="닫기">✕</button>
        </div>
        <ul className="toc-list">
          {passages.map((p, pi) => (
            <li key={p.ref} className={`toc-passage${pi === activeIdx ? ' active' : ''}`}>
              <button
                className="toc-passage-btn"
                onClick={() => { onSelect(pi); onClose(); }}
              >
                <span className="toc-ref">{p.ref}</span>
                <span className="toc-count">{p.verses.length}절</span>
              </button>
              <ul className="toc-verses">
                {p.verses.map((v) => (
                  <li key={v.n}>
                    <button
                      className="toc-verse-btn"
                      onClick={() => { onSelect(pi, v.n); onClose(); }}
                      title={v.text}
                    >
                      <span className="toc-verse-n">{v.n}절</span>
                      <span className="toc-verse-preview">{v.text.slice(0, 28)}…</span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
