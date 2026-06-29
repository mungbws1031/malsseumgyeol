import { useState } from 'react';
import { BIBLE } from '../data/bible';

interface Props {
  activeBook?: string;
  activeChapter?: number;
  onSelectChapter: (book: string, chapter: number) => void;
  onClose: () => void;
}

const OT_BOOKS = ['창세기','출애굽기','레위기','민수기','신명기','여호수아','사사기','룻기','사무엘상','사무엘하','열왕기상','열왕기하','역대상','역대하','에스라','느헤미야','에스더','욥기','시편','잠언','전도서','아가','이사야','예레미야','예레미야애가','에스겔','다니엘','호세아','요엘','아모스','오바댜','요나','미가','나훔','하박국','스바냐','학개','스가랴','말라기'];
const NT_BOOKS = ['마태복음','마가복음','누가복음','요한복음','사도행전','로마서','고린도전서','고린도후서','갈라디아서','에베소서','빌립보서','골로새서','데살로니가전서','데살로니가후서','디모데전서','디모데후서','디도서','빌레몬서','히브리서','야고보서','베드로전서','베드로후서','요한일서','요한이서','요한삼서','유다서','요한계시록'];

export default function TableOfContents({ activeBook, activeChapter, onSelectChapter, onClose }: Props) {
  const [tab, setTab] = useState<'ot' | 'nt'>(
    activeBook && NT_BOOKS.includes(activeBook) ? 'nt' : 'ot',
  );
  const [openBook, setOpenBook] = useState<string | null>(activeBook ?? null);

  const books = tab === 'ot' ? OT_BOOKS : NT_BOOKS;

  return (
    <div className="toc-backdrop" onClick={onClose} role="dialog" aria-modal aria-label="목차">
      <nav className="toc-panel" onClick={(e) => e.stopPropagation()}>
        <div className="toc-header">
          <span className="toc-title">성경 목차</span>
          <button className="toc-close" onClick={onClose} aria-label="닫기">✕</button>
        </div>

        <div className="toc-tabs">
          <button
            className={`toc-tab${tab === 'ot' ? ' active' : ''}`}
            onClick={() => setTab('ot')}
          >구약 (39권)</button>
          <button
            className={`toc-tab${tab === 'nt' ? ' active' : ''}`}
            onClick={() => setTab('nt')}
          >신약 (27권)</button>
        </div>

        <ul className="toc-list">
          {books.map((bookName) => {
            const bibleBook = BIBLE.find(b => b.book === bookName);
            if (!bibleBook) return null;
            const isOpen = openBook === bookName;
            const isActive = activeBook === bookName;

            return (
              <li key={bookName} className={`toc-passage${isActive ? ' active' : ''}`}>
                <button
                  className="toc-passage-btn"
                  onClick={() => setOpenBook(isOpen ? null : bookName)}
                >
                  <span className="toc-ref">{bookName}</span>
                  <span className="toc-count">
                    {bibleBook.chapters.length}장
                    <span className="toc-chevron">{isOpen ? ' ▲' : ' ▼'}</span>
                  </span>
                </button>

                {isOpen && (
                  <ul className="toc-verses toc-chapters">
                    {bibleBook.chapters.map((ch) => {
                      const isActiveChap = isActive && activeChapter === ch.chapter;
                      return (
                        <li key={ch.chapter}>
                          <button
                            className={`toc-verse-btn${isActiveChap ? ' active' : ''}`}
                            onClick={() => { onSelectChapter(bookName, ch.chapter); onClose(); }}
                          >
                            <span className="toc-verse-n">{ch.chapter}장</span>
                            <span className="toc-verse-preview">{ch.verses[0]?.text.slice(0, 24)}…</span>
                          </button>
                        </li>
                      );
                    })}
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
