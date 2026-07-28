import { useState, useCallback, useEffect } from 'react';
import { loadPassages, loadHighlights, loadSettings, saveSettings, saveCustomPassage } from './lib/storage';
import type { Passage, Verse } from './lib/types';
import type { HighlightMap } from './lib/storage';
import { findChapter, loadBibleData } from './data/bible';
import Reader from './components/Reader';
import GlossPanel from './components/GlossPanel';
import AddPassageModal from './components/AddPassageModal';
import SavedVerses from './components/SavedVerses';
import TableOfContents from './components/TableOfContents';
import TopicVerses from './components/TopicVerses';
import WordWiki from './components/WordWiki';
import Appendix from './components/Appendix';
import Splash from './components/Splash';

const SPLASH_VISIBLE_MS = 1600;
const SPLASH_FADE_MS = 500;

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [splashTimerDone, setSplashTimerDone] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [retryTick, setRetryTick] = useState(0);
  const [passages, setPassages] = useState<Passage[]>(loadPassages);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selected, setSelected] = useState<{ verse: Verse; passage: Passage } | null>(null);
  const [highlights, setHighlights] = useState<HighlightMap>(loadHighlights);
  const [settings, setSettings] = useState(loadSettings);
  const [showAddModal, setShowAddModal] = useState(false);
  const [glossOpen, setGlossOpen] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [showWordWiki, setShowWordWiki] = useState(false);
  const [showAppendix, setShowAppendix] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setSplashFading(true), SPLASH_VISIBLE_MS);
    const hideTimer = setTimeout(() => setSplashTimerDone(true), SPLASH_VISIBLE_MS + SPLASH_FADE_MS);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  useEffect(() => {
    setDataError(null);
    loadBibleData()
      .then(() => setDataReady(true))
      .catch((e) => setDataError(e instanceof Error ? e.message : String(e)));
  }, [retryTick]);

  // 최소 스플래시 표시 시간이 지났고, 성경 데이터 로딩도 끝났을 때만 스플래시를 숨긴다.
  // (저사양 기기에서 데이터 로딩이 느리면 스플래시가 그 시간만큼 더 유지된다.)
  useEffect(() => {
    if (splashTimerDone && (dataReady || dataError)) {
      setShowSplash(false);
    }
  }, [splashTimerDone, dataReady, dataError]);

  const handleSelectVerse = useCallback((verse: Verse, passage: Passage) => {
    setSelected({ verse, passage });
    setGlossOpen(true);
  }, []);

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
    setGlossOpen(false);
  }, []);

  const handleJumpTo = useCallback((passageIdx: number, n: number) => {
    setActiveIdx(passageIdx);
    setSelected(null);
    setGlossOpen(false);
    scrollToVerse(n);
  }, []);

  const handleJumpToVerse = useCallback((book: string, chapter: number, n: number) => {
    const idx = passages.findIndex(p => p.book === book && Number(p.chapter) === chapter);
    if (idx !== -1) { setActiveIdx(idx); scrollToVerse(n); }
    else handleSelectChapter(book, chapter);
  }, [passages, handleSelectChapter]);

  const activePassage = passages[activeIdx];

  if (dataError && !dataReady) {
    return (
      <div className="app data-error-screen" role="alert">
        {showSplash && <Splash fadingOut={splashFading} />}
        <div className="data-error-box">
          <p className="data-error-title">성경 데이터를 불러오지 못했습니다.</p>
          <p className="data-error-desc">인터넷 연결을 확인한 뒤 다시 시도해주세요.</p>
          <button
            className="data-error-retry"
            onClick={() => { setShowSplash(true); setSplashFading(false); setSplashTimerDone(true); setRetryTick((n) => n + 1); }}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app" style={{ '--fs-base': `var(--fs-scale-${settings.fontScale})` } as React.CSSProperties}>
      {showSplash && <Splash fadingOut={splashFading} />}
      <div className="reader-col">
        <Reader
          passages={passages}
          activeIdx={activeIdx}
          selected={selected}
          onSelectVerse={handleSelectVerse}
          highlights={highlights}
          onHighlightChange={setHighlights}
          settings={settings}
          onOpenAdd={() => setShowAddModal(true)}
          onOpenSaved={() => setShowSaved(true)}
          onOpenToc={() => setShowToc(true)}
          onOpenTopics={() => setShowTopics(true)}
          onOpenWordWiki={() => setShowWordWiki(true)}
          onOpenAppendix={() => setShowAppendix(true)}
          onFontScaleChange={handleFontScale}
          onJumpToVerse={handleJumpToVerse}
          onSelectChapter={handleSelectChapter}
        />
      </div>

      <div className={`gloss-col${glossOpen ? ' open' : ''}`}>
        <GlossPanel
          selected={selected}
          highlights={highlights}
          onHighlightChange={setHighlights}
          onClose={() => setGlossOpen(false)}
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
      {showTopics && (
        <TopicVerses
          onJumpTo={(book, chapter, n) => { handleJumpToVerse(book, chapter, n); }}
          onClose={() => setShowTopics(false)}
        />
      )}
      {showWordWiki && (
        <WordWiki
          onJumpTo={handleJumpToVerse}
          onClose={() => setShowWordWiki(false)}
        />
      )}
      {showAppendix && <Appendix onClose={() => setShowAppendix(false)} />}
    </div>
  );
}
