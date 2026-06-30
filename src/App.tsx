import { useState, useCallback, useEffect } from 'react';
import { loadPassages, loadHighlights, loadSettings, saveSettings, saveCustomPassage } from './lib/storage';
import { fetchGloss } from './lib/explain';
import type { Passage, Gloss, Depth, Verse } from './lib/types';
import type { HighlightMap } from './lib/storage';
import { findChapter } from './data/bible';
import Reader from './components/Reader';
import GlossPanel from './components/GlossPanel';
import AddPassageModal from './components/AddPassageModal';
import SavedVerses from './components/SavedVerses';
import TableOfContents from './components/TableOfContents';
import ApiKeyModal from './components/ApiKeyModal';

export default function App() {
  const [passages, setPassages] = useState<Passage[]>(loadPassages);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selected, setSelected] = useState<{ verse: Verse; passage: Passage } | null>(null);
  const [gloss, setGloss] = useState<Gloss | null>(null);
  const [glossLoading, setGlossLoading] = useState(false);
  const [glossError, setGlossError] = useState(false);
  const [noApiKey, setNoApiKey] = useState(false);
  const [highlights, setHighlights] = useState<HighlightMap>(loadHighlights);
  const [settings, setSettings] = useState(loadSettings);
  const [showAddModal, setShowAddModal] = useState(false);
  const [glossOpen, setGlossOpen] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const doFetchGloss = useCallback((
    verse: Verse, passage: Passage, depth: Depth,
  ) => {
    setGlossLoading(true);
    setGlossError(false);
    setNoApiKey(false);
    setGloss(null);
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 20000)
    );
    Promise.race([
      fetchGloss(passage.book, passage.chapter, verse.n, verse.text, depth),
      timeout,
    ])
      .then((g) => { setGloss(g); setGlossLoading(false); })
      .catch((err) => {
        setGlossLoading(false);
        setGlossError(true);
        if (err instanceof Error && err.message === 'no_api_key') {
          setNoApiKey(true);
        }
      });
  }, []);

  useEffect(() => {
    if (!selected) return;
    doFetchGloss(selected.verse, selected.passage, settings.depth);
  }, [selected, settings.depth, doFetchGloss]);

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

  const handleSaveApiKey = useCallback((apiKey: string) => {
    const next = { ...settings, apiKey };
    setSettings(next);
    saveSettings(next);
    // 키 저장 후 현재 선택 구절 자동 재시도
    if (selected) doFetchGloss(selected.verse, selected.passage, next.depth);
  }, [settings, selected, doFetchGloss]);

  const handleAddPassage = useCallback((p: Passage) => {
    saveCustomPassage(p);
    const updated = loadPassages();
    setPassages(updated);
    setActiveIdx(updated.length - 1);
    setShowAddModal(false);
  }, []);

  const scrollToTop = () => {
    setTimeout(() => {
      document.querySelector('.passage-body')?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 80);
  };

  const scrollToVerse = (n: number) => {
    setTimeout(() => {
      const el = document.querySelector(`.verse-line[data-n="${n}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleSelectChapter = useCallback((book: string, chapter: number) => {
    const ch = findChapter(book, chapter);
    if (!ch) return;
    setPassages(prev => {
      const existing = prev.findIndex(p => p.book === book && Number(p.chapter) === chapter);
      if (existing !== -1) {
        setActiveIdx(existing);
        scrollToTop();
        return prev;
      }
      const newPassage: Passage = { ref: `${book} ${chapter}장`, book, chapter, verses: ch.verses };
      const next = [...prev, newPassage];
      setActiveIdx(next.length - 1);
      scrollToTop();
      saveCustomPassage(newPassage);
      return next;
    });
    setSelected(null);
    setGloss(null);
    setGlossOpen(false);
  }, []);

  const handleJumpTo = useCallback((passageIdx: number, n: number) => {
    setActiveIdx(passageIdx);
    setSelected(null);
    setGloss(null);
    setGlossOpen(false);
    scrollToVerse(n);
  }, []);

  const handleJumpToVerse = useCallback((book: string, chapter: number, n: number) => {
    const idx = passages.findIndex(p => p.book === book && Number(p.chapter) === chapter);
    if (idx !== -1) { setActiveIdx(idx); scrollToVerse(n); }
    else handleSelectChapter(book, chapter);
  }, [passages, handleSelectChapter]);

  const handleRetry = useCallback(() => {
    if (selected) doFetchGloss(selected.verse, selected.passage, settings.depth);
  }, [selected, settings.depth, doFetchGloss]);

  const activePassage = passages[activeIdx];

  return (
    <div className="app" style={{ '--fs-base': `var(--fs-scale-${settings.fontScale})` } as React.CSSProperties}>
      <div className="reader-col">
        <Reader
          passages={passages}
          activeIdx={activeIdx}
          selected={selected}
          onSelectVerse={handleSelectVerse}
          highlights={highlights}
          onHighlightChange={setHighlights}
          settings={settings}
          depth={settings.depth}
          onOpenAdd={() => setShowAddModal(true)}
          onOpenSaved={() => setShowSaved(true)}
          onOpenToc={() => setShowToc(true)}
          onOpenApiKey={() => setShowApiKey(true)}
          hasApiKey={Boolean(settings.apiKey)}
          onFontScaleChange={handleFontScale}
          onJumpToVerse={handleJumpToVerse}
        />
      </div>

      <div className={`gloss-col${glossOpen ? ' open' : ''}`}>
        <GlossPanel
          selected={selected}
          gloss={gloss}
          loading={glossLoading}
          error={glossError}
          noApiKey={noApiKey}
          depth={settings.depth}
          onDepthChange={handleDepthChange}
          highlights={highlights}
          onHighlightChange={setHighlights}
          onRetry={handleRetry}
          onClose={() => setGlossOpen(false)}
          onOpenApiKey={() => setShowApiKey(true)}
        />
      </div>

      {showAddModal && <AddPassageModal onAdd={handleAddPassage} onClose={() => setShowAddModal(false)} />}
      {showSaved && <SavedVerses highlights={highlights} passages={passages} onClose={() => setShowSaved(false)} onJumpTo={handleJumpTo} />}
      {showToc && (
        <TableOfContents
          activeBook={activePassage?.book}
          activeChapter={activePassage ? Number(activePassage.chapter) : undefined}
          onSelectChapter={handleSelectChapter}
          onClose={() => setShowToc(false)}
        />
      )}
      {showApiKey && (
        <ApiKeyModal
          current={settings.apiKey}
          onSave={handleSaveApiKey}
          onClose={() => setShowApiKey(false)}
        />
      )}
    </div>
  );
}
