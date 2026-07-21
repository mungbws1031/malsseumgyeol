import { useState } from 'react';
import { GENEALOGY_ROOT, GENEALOGY_NOTICE } from '../data/genealogy';
import GenealogyChart from './GenealogyChart';

interface Props {
  onClose: () => void;
}

const APPENDIX_ITEMS: { id: string; title: string; description: string }[] = [
  {
    id: 'genealogy',
    title: '아담부터 이슬람 분열까지 — 혈통 도표',
    description: '아담과 노아를 거쳐 아브라함, 이삭/이스마엘로 이어지는 계보와 유대교·기독교·이슬람 수니/시아 분열까지의 흐름',
  },
];

export default function Appendix({ onClose }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="toc-backdrop" onClick={onClose} role="dialog" aria-modal aria-label="부록">
      <nav className="toc-panel" onClick={(e) => e.stopPropagation()}>
        <div className="toc-header">
          <span className="toc-title">{selectedId ? APPENDIX_ITEMS.find((i) => i.id === selectedId)?.title : '부록'}</span>
          <button className="toc-close" onClick={onClose} aria-label="닫기">✕</button>
        </div>

        {selectedId === 'genealogy' ? (
          <div className="word-detail">
            <button
              className="word-back-btn"
              onClick={() => setSelectedId(null)}
              aria-label="목록으로 돌아가기"
            >
              ← 목록으로
            </button>
            <p className="gen-notice">{GENEALOGY_NOTICE}</p>
            <GenealogyChart data={GENEALOGY_ROOT} />
          </div>
        ) : (
          <ul className="appendix-list">
            {APPENDIX_ITEMS.map((item) => (
              <li key={item.id}>
                <button className="appendix-card" onClick={() => setSelectedId(item.id)}>
                  <span className="word-card-term">{item.title}</span>
                  <span className="word-card-meaning">{item.description}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
}
