import { useState } from 'react';

interface Props {
  current?: string;
  onSave: (key: string) => void;
  onClose: () => void;
}

export default function ApiKeyModal({ current, onSave, onClose }: Props) {
  const [value, setValue] = useState(current ?? '');

  const handleSave = () => {
    const trimmed = value.trim();
    if (!trimmed.startsWith('sk-ant-')) {
      alert('Anthropic API 키는 sk-ant- 로 시작해야 합니다.');
      return;
    }
    onSave(trimmed);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">API 키 설정</h2>
        <p className="modal-desc">
          AI 풀이 기능을 사용하려면 Anthropic API 키가 필요합니다.<br />
          키는 이 기기의 localStorage에만 저장되며 외부로 전송되지 않습니다.
        </p>
        <a
          className="modal-link"
          href="https://console.anthropic.com/settings/keys"
          target="_blank"
          rel="noreferrer"
        >
          → console.anthropic.com 에서 키 발급
        </a>
        <div className="modal-field">
          <label className="modal-label" htmlFor="api-key-input">API 키</label>
          <input
            id="api-key-input"
            className="modal-input"
            type="password"
            placeholder="sk-ant-api03-..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
            autoFocus
          />
        </div>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>취소</button>
          <button className="modal-submit" onClick={handleSave} disabled={!value.trim()}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
