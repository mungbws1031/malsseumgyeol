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
  const [showSaved, setShowSaved] = useState(false);
  const [showToc, setShowToc] = useState(false);

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

  // 성경 목차에서 장 선택 → passages에 없으면 추가, 있으면 바로 이동
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
      const newPassage: Passage = {
        ref: `${book} ${chapter}장`,
        book,
        chapter,
        verses: ch.verses,
      };
      const next = [...prev, newPassage];
      setActiveIdx(next.length - 1);
      scrollToTop();
      // 커스텀으로 저장
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
    const idx = passages.findIndex(
      (p) => p.book === book && Number(p.chapter) === chapter,
    );
    if (idx !== -1) {
      setActiveIdx(idx);
      scrollToVerse(n);
    } else {
      // 없으면 해당 장 불러오기
      handleSelectChapter(book, chapter);
    }
  }, [passages, handleSelectChapter]);

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

      {showSaved && (
        <SavedVerses
          highlights={highlights}
          passages={passages}
          onClose={() => setShowSaved(false)}
          onJumpTo={handleJumpTo}
        />
      )}

      {showToc && (
        <TableOfContents
          activeBook={activePassage?.book}
          activeChapter={activePassage ? Number(activePassage.chapter) : undefined}
          onSelectChapter={handleSelectChapter}
          onClose={() => setShowToc(false)}
        />
      )}
    </div>
  );
}
