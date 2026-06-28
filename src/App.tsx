import { useState, useCallback, useEffect } from 'react';
import { loadPassages, loadHighlights, loadSettings, saveSettings, saveCustomPassage } from './lib/storage';
import { fetchGloss } from './lib/explain';
import type { Passage, Gloss, Depth, Verse } from './lib/types';
import type { HighlightMap } from './lib/storage';
import Reader from './components/Reader';
import GlossPanel from './components/GlossPanel';
import AddPassageModal from './components/AddPassageModal';

export default function App() {
  const [passages, setPassages] = useState<Passage[]>(loadPassages);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selected, setSelected] = useState<{ verse: Verse; passage: Passage } | null>(null);
  const [gloss, setGloss] = useState<Gloss | null>(null);
  const [glossLoading, setGlossLoading] = useState(false);
  const [glossError, setGlossError] = useState(false);
  const [highlights, setHighlights] = useState<HighlightMap>(loadHighlights);
  const [settings, setSettings] = useState(loadSettings);
  const [showAddModal, setShowAddModal] = useState(false);
  const [glossOpen, setGlossOpen] = useState(false);

  useEffect(() => {
    if (!selected) return;
    setGlossLoading(true);
    setGlossError(false);
    setGloss(null);
    fetchGloss(
      selected.passage.book,
      selected.passage.chapter,
      selected.verse.n,
      selected.verse.text,
      settings.depth,
    )
      .then((g) => { setGloss(g); setGlossLoading(false); })
      .catch(() => { setGlossError(true); setGlossLoading(false); });
  }, [selected, settings.depth]);

  const handleSelectVerse = useCallback((verse: Verse, passage: Passage) => {
    setSelected({ verse, passage });
    setGlossOpen(true);
  }, []);

  const handleDepthChange = useCallback((depth: Depth) => {
    const next = { ...settings, depth };
    setSettings(next);
    saveSettings(next);
  }, [settings]);

  const handleFontScale = useCallback((scale: 1 | 2 | 3) => {
    const next = { ...settings, fontScale: scale };
    setSettings(next);
    saveSettings(next);
  }, [settings]);

  const handleAddPassage = useCallback((p: Passage) => {
    saveCustomPassage(p);
    const updated = loadPassages();
    setPassages(updated);
    setActiveIdx(updated.length - 1);
    setShowAddModal(false);
  }, []);

  const handleRetry = useCallback(() => {
    if (!selected) return;
    setGlossLoading(true);
    setGlossError(false);
    setGloss(null);
    fetchGloss(
      selected.passage.book,
      selected.passage.chapter,
      selected.verse.n,
      selected.verse.text,
      settings.depth,
    )
      .then((g) => { setGloss(g); setGlossLoading(false); })
      .catch(() => { setGlossError(true); setGlossLoading(false); });
  }, [selected, settings.depth]);

  return (
    <div className="app" style={{ '--fs-base': `var(--fs-scale-${settings.fontScale})` } as React.CSSProperties}>
      <div className="reader-col">
        <Reader
          passages={passages}
          activeIdx={activeIdx}
          onSelectPassage={setActiveIdx}
          selected={selected}
          onSelectVerse={handleSelectVerse}
          highlights={highlights}
          onHighlightChange={setHighlights}
          settings={settings}
          depth={settings.depth}
          onOpenAdd={() => setShowAddModal(true)}
          onFontScaleChange={handleFontScale}
        />
      </div>

      <div className={`gloss-col${glossOpen ? ' open' : ''}`}>
        <GlossPanel
          selected={selected}
          gloss={gloss}
          loading={glossLoading}
          error={glossError}
          depth={settings.depth}
          onDepthChange={handleDepthChange}
          highlights={highlights}
          onHighlightChange={setHighlights}
          onRetry={handleRetry}
          onClose={() => setGlossOpen(false)}
        />
      </div>

      {showAddModal && (
        <AddPassageModal
          onAdd={handleAddPassage}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
