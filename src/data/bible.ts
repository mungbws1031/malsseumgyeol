// 개역개정 성경 전체 (© 대한성서공회)
// 출처: github.com/boring-km/nkrv_bible_server (nkrv_bible.txt)
//   - 단락 소제목(<...>)은 제거하고, 시편 표제는 "(다윗의 시)" 형태로 1절 앞에 보존
//   - 개역개정이 두 절 이상을 하나로 묶어 번역한 곳(신 6:18-19, 시 92:1-3 등 11곳)은
//     첫 절 번호(n)에 본문을 두고 end에 마지막 절 번호를 기록
//   - 개역개정에서 "(없음)"으로 표기된 절(마 17:21 등)은 그대로 유지
//
// 성경 원문 데이터는 용량이 커서(~5MB) JS 번들에 리터럴로 포함하지 않고
// public/bible-data.json으로 분리해 런타임에 비동기 fetch한다.
// 이유: 저사양/메모리 부족 모바일 기기에서 거대한 JS 배열 리터럴을
// 첫 렌더링 전에 동기적으로 파싱·컴파일하면 흰 화면으로 멈추는 문제가 있었음.
// JSON.parse가 JS 리터럴 파싱보다 훨씬 빠르고 가볍다.

export interface BibleVerse { n: number; text: string; end?: number; }
export interface BibleChapter { chapter: number; verses: BibleVerse[]; }
export interface BibleBook { book: string; abbrev: string; chapters: BibleChapter[]; }

let BIBLE: BibleBook[] = [];
let loadPromise: Promise<void> | null = null;

export function loadBibleData(): Promise<void> {
  if (loadPromise) return loadPromise;

  loadPromise = fetch(`${import.meta.env.BASE_URL}bible-data.json`)
    .then((res) => {
      if (!res.ok) throw new Error(`성경 데이터 로드 실패: ${res.status}`);
      return res.json();
    })
    .then((data: BibleBook[]) => {
      BIBLE = data;
    })
    .catch((err) => {
      // 실패 시 다음 시도에서 재시도할 수 있도록 캐시된 promise를 초기화
      loadPromise = null;
      throw err;
    });

  return loadPromise;
}

export function findBook(book: string): BibleBook | undefined {
  return BIBLE.find(b => b.book === book);
}

export function findChapter(book: string, chapter: number): BibleChapter | undefined {
  return findBook(book)?.chapters.find(c => c.chapter === chapter);
}

export { BIBLE };
