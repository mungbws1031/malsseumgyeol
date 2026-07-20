// src/data/wordWiki.ts
// 성경 원어(헬라어/히브리어) 핵심 단어 위키

export interface WikiWord {
  id: string;
  term: string;              // 한글 표제어
  original: string;          // 원어 원문
  transliteration: string;   // 음역
  language: '헬라어' | '히브리어';
  meaning: string;           // 짧은 뜻
  description: string;       // 상세 설명
  verses: { book: string; chapter: number; n: number; ref: string; preview: string }[];
  related: string[];         // 관련 단어 id 배열
  denominationalViews?: { tradition: string; view: string }[];
  category: string;
}

export const WORD_CATEGORIES: string[] = [
  '하나님과 영광',
  '사랑과 은혜',
  '믿음과 구원',
  '교회와 성령',
  '죄와 회개',
  '십자가와 부활',
  '율법과 정의',
];

export const WORD_WIKI: WikiWord[] = [
  {
    id: 'agape',
    term: '아가페',
    original: 'ἀγάπη',
    transliteration: 'agape',
    language: '헬라어',
    meaning: '조건 없이 베푸는 사랑',
    description:
      '아가페는 감정적 끌림(에로스)이나 우정(필리아)과 구별되는, 상대의 가치나 반응과 무관하게 의지적으로 베푸는 사랑을 가리킵니다. 신약에서는 하나님이 인간을 향해 보이신 사랑과, 그리스도인이 서로를 향해 실천해야 할 사랑을 표현하는 핵심 단어로 쓰입니다. 고린도전서 13장은 이 사랑의 성격을 "오래 참고 온유하며"로 구체적으로 풀어냅니다.',
    verses: [
      { book: '요한복음', chapter: 13, n: 34, ref: '요 13:34', preview: '새 계명을 너희에게 주노니 서로 사랑하라' },
      { book: '요한복음', chapter: 3, n: 16, ref: '요 3:16', preview: '하나님이 세상을 이처럼 사랑하사' },
      { book: '고린도전서', chapter: 13, n: 13, ref: '고전 13:13', preview: '그 중의 제일은 사랑이라' },
      { book: '로마서', chapter: 5, n: 8, ref: '롬 5:8', preview: '우리가 아직 죄인 되었을 때에 그리스도께서 우리를 위하여 죽으심으로' },
    ],
    related: ['charis', 'koinonia'],
    denominationalViews: [
      { tradition: '가톨릭', view: '아가페를 신학적 덕(대신덕) 중 하나인 애덕(愛德)으로 체계화하여 강조하는 전통이 있다.' },
      { tradition: '웨슬리안(감리교)', view: '온전한 사랑(완전 성화)의 목표를 아가페의 실천적 완성으로 강조하는 해석이 있다.' },
    ],
    category: '사랑과 은혜',
  },
  {
    id: 'logos',
    term: '로고스',
    original: 'λόγος',
    transliteration: 'logos',
    language: '헬라어',
    meaning: '말씀, 이성, 질서의 원리',
    description:
      '로고스는 헬라 철학에서 우주를 지탱하는 이성적 원리를 가리키던 말이었으나, 요한복음은 이 단어를 가져와 태초부터 하나님과 함께 계셨고 하나님이셨던 그리스도를 가리키는 데 사용합니다. "말씀이 육신이 되어"(요 1:14)라는 구절은 초월적 로고스가 역사 속 인격으로 성육신하셨다는 기독교의 독특한 주장을 담고 있습니다.',
    verses: [
      { book: '요한복음', chapter: 1, n: 1, ref: '요 1:1', preview: '태초에 말씀이 계시니라' },
      { book: '요한복음', chapter: 1, n: 14, ref: '요 1:14', preview: '말씀이 육신이 되어 우리 가운데 거하시매' },
    ],
    related: ['doxa', 'kenosis'],
    denominationalViews: [
      { tradition: '가톨릭', view: '로고스 그리스도론을 삼위일체 교리의 성경적 근거 중 하나로 강조하는 전통이 있다.' },
      { tradition: '정교회', view: '말씀이 육신이 되신 사건을 신화(神化, theosis) 교리의 출발점으로 보는 해석이 있다.' },
    ],
    category: '하나님과 영광',
  },
  {
    id: 'charis',
    term: '카리스',
    original: 'χάρις',
    transliteration: 'charis',
    language: '헬라어',
    meaning: '은혜, 값없이 주어지는 호의',
    description:
      '카리스는 받을 자격이 없는 이에게 값없이 베풀어지는 호의를 뜻합니다. 바울 서신에서는 인간의 행위와 대비되어, 구원이 하나님의 일방적 선물임을 강조하는 신학적 핵심어로 사용됩니다. "은혜로 구원을 받았으니"(엡 2:8)라는 표현이 대표적입니다.',
    verses: [
      { book: '에베소서', chapter: 2, n: 8, ref: '엡 2:8', preview: '너희가 그 은혜로 인하여 믿음으로 말미암아 구원을 얻었나니' },
      { book: '로마서', chapter: 3, n: 24, ref: '롬 3:24', preview: '그리스도 예수 안에 있는 구속으로 말미암아 하나님의 은혜로 값없이 의롭다 하심을 얻은 자 되었느니라' },
      { book: '요한복음', chapter: 1, n: 16, ref: '요 1:16', preview: '우리가 다 그의 충만한 데서 받으니 은혜 위에 은혜러라' },
    ],
    related: ['pistis', 'soteria', 'agape'],
    denominationalViews: [
      { tradition: '루터파', view: '은혜를 인간의 어떠한 공로도 개입될 수 없는 전적으로 값없는 선물로 강조하는 전통이 있다.' },
      { tradition: '가톨릭', view: '은혜가 성례전을 통해 지속적으로 부어지며 인간의 협력(합력) 속에서 역사한다고 보는 전통이 있다.' },
    ],
    category: '사랑과 은혜',
  },
  {
    id: 'pistis',
    term: '피스티스',
    original: 'πίστις',
    transliteration: 'pistis',
    language: '헬라어',
    meaning: '믿음, 신뢰',
    description:
      '피스티스는 단순한 지적 동의를 넘어 대상에 대한 전인격적 신뢰와 의탁을 뜻합니다. 신약에서는 하나님과 그리스도를 향한 신뢰로서, 구원에 이르는 통로로 반복해서 제시됩니다. 히브리서 11장은 이 단어를 "바라는 것들의 실상"으로 정의합니다.',
    verses: [
      { book: '히브리서', chapter: 11, n: 1, ref: '히 11:1', preview: '믿음은 바라는 것들의 실상이요 보지 못하는 것들의 증거니' },
      { book: '로마서', chapter: 1, n: 17, ref: '롬 1:17', preview: '오직 의인은 믿음으로 말미암아 살리라' },
      { book: '갈라디아서', chapter: 2, n: 20, ref: '갈 2:20', preview: '이제 내가 육체 가운데 사는 것은 나를 사랑하사 나를 위하여 자기 몸을 버리신 하나님의 아들을 믿는 믿음 안에서 사는 것이라' },
    ],
    related: ['charis', 'dikaiosyne', 'soteria'],
    denominationalViews: [
      { tradition: '루터파', view: '믿음만으로(sola fide) 의롭다 하심을 얻는다는 이신칭의 교리의 핵심 근거로 강조하는 전통이 있다.' },
      { tradition: '가톨릭', view: '믿음이 사랑으로 역사할 때 온전해진다는 갈라디아서 5:6의 원리를 함께 강조하는 전통이 있다.' },
    ],
    category: '믿음과 구원',
  },
  {
    id: 'chesed',
    term: '헤세드',
    original: 'חֶסֶד',
    transliteration: 'chesed',
    language: '히브리어',
    meaning: '언약적 인자, 신실한 사랑',
    description:
      '헤세드는 단순한 감정이 아니라 언약 관계 안에서 신실하게 지속되는 사랑과 자비를 뜻하는 히브리어입니다. 개역한글 성경에서는 흔히 "인자(仁慈)"로 번역됩니다. 시편에서 하나님의 헤세드는 "영원하다"고 반복해서 찬양되며, 이스라엘을 향한 하나님의 변함없는 언약적 신실함을 표현합니다.',
    verses: [
      { book: '시편', chapter: 23, n: 6, ref: '시 23:6', preview: '내 평생에 선하심과 인자하심이 정녕 나를 따르리니' },
      { book: '시편', chapter: 136, n: 1, ref: '시 136:1', preview: '여호와께 감사하라 그는 선하시며 그 인자하심이 영원함이로다' },
      { book: '출애굽기', chapter: 34, n: 6, ref: '출 34:6', preview: '자비롭고 은혜롭고 노하기를 더디하고 인자와 진실이 많은 하나님이라' },
    ],
    related: ['tsedaqah', 'charis'],
    denominationalViews: [
      { tradition: '유대교와 공유하는 전통(참고)', view: '헤세드를 언약 공동체 안에서 실천해야 할 상호 의무이자 덕목으로 이해하는 관점이 있다.' },
    ],
    category: '사랑과 은혜',
  },
  {
    id: 'soteria',
    term: '소테리아',
    original: 'σωτηρία',
    transliteration: 'soteria',
    language: '헬라어',
    meaning: '구원, 건짐',
    description:
      '소테리아는 위험이나 죽음, 죄의 결과로부터 건짐을 받는 것을 뜻합니다. 신약에서는 죄와 사망의 권세로부터 구원받아 하나님과의 관계가 회복되는 총체적 사건을 가리키며, 과거(칭의)·현재(성화)·미래(영화)에 걸친 구원의 전 과정을 포괄하는 단어로 이해되기도 합니다.',
    verses: [
      { book: '로마서', chapter: 1, n: 16, ref: '롬 1:16', preview: '복음은 모든 믿는 자에게 구원을 주시는 하나님의 능력이 됨이라' },
      { book: '에베소서', chapter: 2, n: 8, ref: '엡 2:8', preview: '너희가 그 은혜로 인하여 믿음으로 말미암아 구원을 얻었나니' },
      { book: '빌립보서', chapter: 2, n: 12, ref: '빌 2:12', preview: '항상 복종하여 두렵고 떨림으로 너희 구원을 이루라' },
    ],
    related: ['charis', 'pistis', 'dikaiosyne'],
    denominationalViews: [
      { tradition: '개혁파(개신교)', view: '구원을 하나님의 주권적 예정에 근거한 단번의 확정된 사건으로 강조하는 전통이 있다.' },
      { tradition: '웨슬리안(감리교)', view: '빌 2:12의 "구원을 이루라"를 은혜에 협력하며 지속되는 성화의 과정으로 강조하는 해석이 있다.' },
    ],
    category: '믿음과 구원',
  },
  {
    id: 'dikaiosyne',
    term: '디카이오시네',
    original: 'δικαιοσύνη',
    transliteration: 'dikaiosyne',
    language: '헬라어',
    meaning: '의(義), 올바름',
    description:
      '디카이오시네는 법정 용어와 관계 용어의 성격을 동시에 지닙니다. 로마서에서 바울은 이 단어를 통해, 인간이 스스로 성취할 수 없는 의를 하나님이 그리스도 안에서 믿는 자에게 값없이 전가하신다는 이신칭의 교리를 전개합니다.',
    verses: [
      { book: '로마서', chapter: 1, n: 17, ref: '롬 1:17', preview: '복음에는 하나님의 의가 나타나서 믿음으로 믿음에 이르게 하나니' },
      { book: '로마서', chapter: 3, n: 22, ref: '롬 3:22', preview: '곧 예수 그리스도를 믿음으로 말미암아 모든 믿는 자에게 미치는 하나님의 의니' },
      { book: '마태복음', chapter: 5, n: 6, ref: '마 5:6', preview: '의에 주리고 목마른 자는 복이 있나니 저희가 배부를 것임이요' },
    ],
    related: ['pistis', 'charis', 'tsedaqah'],
    denominationalViews: [
      { tradition: '루터파', view: '전가된 의(imputed righteousness)를 이신칭의 교리의 핵심으로 강조하는 전통이 있다.' },
      { tradition: '가톨릭', view: '의롭다 하심을 단회적 선언에 그치지 않고 은혜로 실제 변화되는 과정(주입된 의)으로 이해하는 전통이 있다.' },
    ],
    category: '믿음과 구원',
  },
  {
    id: 'metanoia',
    term: '메타노이아',
    original: 'μετάνοια',
    transliteration: 'metanoia',
    language: '헬라어',
    meaning: '회개, 마음의 방향 전환',
    description:
      '메타노이아는 문자적으로 "마음(nous)을 넘어서(meta) 바꾼다"는 뜻으로, 단순한 후회를 넘어 삶의 방향을 근본적으로 돌이키는 것을 가리킵니다. 세례 요한과 예수님의 선포 모두 "회개하라"는 이 단어로 시작되며, 하나님 나라를 향한 응답의 첫걸음으로 제시됩니다.',
    verses: [
      { book: '마태복음', chapter: 4, n: 17, ref: '마 4:17', preview: '회개하라 천국이 가까웠느니라' },
      { book: '고린도후서', chapter: 7, n: 10, ref: '고후 7:10', preview: '하나님의 뜻대로 하는 근심은 후회할 것이 없는 구원에 이르게 하는 회개를 이루는 것이요' },
    ],
    related: ['hamartia', 'soteria'],
    category: '죄와 회개',
  },
  {
    id: 'doxa',
    term: '도크사',
    original: 'δόξα',
    transliteration: 'doxa',
    language: '헬라어',
    meaning: '영광, 광채, 본질적 위엄',
    description:
      '도크사는 본래 "의견, 평판"을 뜻했으나, 구약 히브리어 카보드(영광)를 헬라어로 번역하는 과정에서 하나님의 본질적 위엄과 광채를 가리키는 신학적 용어가 되었습니다. 신약에서는 그리스도의 신적 영광이 드러나는 사건들, 그리고 신자가 궁극적으로 참여하게 될 영광을 함께 가리킵니다.',
    verses: [
      { book: '요한복음', chapter: 1, n: 14, ref: '요 1:14', preview: '우리가 그의 영광을 보니 아버지의 독생자의 영광이요' },
      { book: '로마서', chapter: 11, n: 36, ref: '롬 11:36', preview: '이는 만물이 주에게서 나오고 주로 말미암고 주에게로 돌아감이라 그에게 영광이 세세에 있을지어다' },
      { book: '고린도전서', chapter: 10, n: 31, ref: '고전 10:31', preview: '너희가 먹든지 마시든지 무엇을 하든지 다 하나님의 영광을 위하여 하라' },
    ],
    related: ['logos', 'kavod'],
    category: '하나님과 영광',
  },
  {
    id: 'pneuma',
    term: '프뉴마',
    original: 'πνεῦμα',
    transliteration: 'pneuma',
    language: '헬라어',
    meaning: '영, 바람, 숨',
    description:
      '프뉴마는 본래 "바람" 또는 "숨"을 뜻하는 단어로, 눈에 보이지 않지만 뚜렷한 영향력을 가리키는 데 자연스럽게 확장되어 "영"을 뜻하게 되었습니다. 신약에서는 사람의 영, 악한 영, 그리고 무엇보다 하나님의 성령(하기온 프뉴마)을 가리키는 데 널리 쓰입니다.',
    verses: [
      { book: '요한복음', chapter: 4, n: 24, ref: '요 4:24', preview: '하나님은 영이시니 예배하는 자가 신령과 진정으로 예배할지니라' },
      { book: '로마서', chapter: 8, n: 16, ref: '롬 8:16', preview: '성령이 친히 우리 영으로 더불어 우리가 하나님의 자녀인 것을 증거하시나니' },
      { book: '갈라디아서', chapter: 5, n: 22, ref: '갈 5:22', preview: '오직 성령의 열매는 사랑과 희락과 화평과 오래 참음과' },
    ],
    related: ['parakletos', 'huiothesia'],
    denominationalViews: [
      { tradition: '오순절/은사주의', view: '성령의 인격적이고 능력적인 임재와 은사의 지속적 역사를 강조하는 전통이 있다.' },
      { tradition: '개혁파(개신교)', view: '성령의 사역을 말씀을 통한 조명과 성화에 초점을 두어 강조하는 전통이 있다.' },
    ],
    category: '교회와 성령',
  },
  {
    id: 'ekklesia',
    term: '에클레시아',
    original: 'ἐκκλησία',
    transliteration: 'ekklesia',
    language: '헬라어',
    meaning: '교회, 부름받아 모인 회중',
    description:
      '에클레시아는 본래 헬라 도시국가에서 시민들이 공적 사안을 결정하기 위해 소집된 "회의체"를 가리키던 세속 용어였습니다. 신약은 이 단어를 가져와, 그리스도 안에서 세상으로부터 "불러냄"을 받아 모인 신자들의 공동체를 가리키는 데 사용합니다.',
    verses: [
      { book: '마태복음', chapter: 16, n: 18, ref: '마 16:18', preview: '이 반석 위에 내 교회를 세우리니 음부의 권세가 이기지 못하리라' },
      { book: '에베소서', chapter: 1, n: 22, ref: '엡 1:22', preview: '만물을 그 발 아래 복종하게 하시고 그를 만물 위에 교회의 머리로 주셨느니라' },
    ],
    related: ['koinonia', 'pneuma'],
    denominationalViews: [
      { tradition: '가톨릭', view: '마 16:18을 베드로와 그 후계자들을 통한 교회의 가시적 권위 구조의 근거로 강조하는 전통이 있다.' },
      { tradition: '개혁파(개신교)', view: '교회의 본질을 말씀이 순수하게 선포되고 성례가 바르게 시행되는 공동체로 규정하는 전통이 있다.' },
    ],
    category: '교회와 성령',
  },
  {
    id: 'koinonia',
    term: '코이노니아',
    original: 'κοινωνία',
    transliteration: 'koinonia',
    language: '헬라어',
    meaning: '교제, 나눔, 참여',
    description:
      '코이노니아는 단순한 친목을 넘어, 공동의 삶과 소유와 목적을 함께 나누는 깊은 참여적 관계를 뜻합니다. 초대 교회는 사도의 가르침과 떡을 떼는 것과 기도에 힘쓰며 이 코이노니아를 실천했고, 신자들이 그리스도와 성령 안에서 누리는 연합도 이 단어로 표현됩니다.',
    verses: [
      { book: '빌립보서', chapter: 2, n: 1, ref: '빌 2:1', preview: '그리스도 안에 무슨 권면이나 사랑에 무슨 위로나 성령의 무슨 교제나 긍휼이나 자비가 있거든' },
      { book: '요한복음', chapter: 17, n: 21, ref: '요 17:21', preview: '아버지께서 내 안에, 내가 아버지 안에 있는 것 같이 저희도 하나가 되어' },
    ],
    related: ['agape', 'ekklesia'],
    category: '교회와 성령',
  },
  {
    id: 'kenosis',
    term: '케노시스',
    original: 'κένωσις',
    transliteration: 'kenosis',
    language: '헬라어',
    meaning: '자기 비움',
    description:
      '케노시스는 빌립보서 2장 7절의 동사 "케노오"(자기를 비우다)에서 파생된 신학 용어로, 하나님의 아들이 성육신하시면서 신적 특권을 스스로 내려놓으신 사건을 가리킵니다. "그리스도 찬가"(빌 2:6–11)로 불리는 이 본문은 겸손과 순종의 모범으로 신자들에게 제시됩니다.',
    verses: [
      { book: '빌립보서', chapter: 2, n: 7, ref: '빌 2:7', preview: '오히려 자기를 비어 종의 형체를 가져 사람들과 같이 되었고' },
      { book: '빌립보서', chapter: 2, n: 8, ref: '빌 2:8', preview: '자기를 낮추시고 죽기까지 복종하셨으니 곧 십자가에 죽으심이라' },
    ],
    related: ['logos', 'stauros'],
    denominationalViews: [
      { tradition: '가톨릭', view: '케노시스를 성육신 교리의 핵심 본문으로 삼아 그리스도의 완전한 신성과 인성의 결합을 강조하는 전통이 있다.' },
    ],
    category: '십자가와 부활',
  },
  {
    id: 'parakletos',
    term: '파라클레토스',
    original: 'παράκλητος',
    transliteration: 'parakletos',
    language: '헬라어',
    meaning: '보혜사, 곁에서 돕는 자, 변호인',
    description:
      '파라클레토스는 문자적으로 "곁으로(para) 부름받은 자(kletos)"라는 뜻으로, 법정에서 곁에 서서 변호해 주는 사람을 가리키는 데 쓰이던 단어입니다. 요한복음에서 예수님은 자신이 떠난 후 오실 성령을 이 단어로 지칭하시며, 위로자·상담자·변호자의 역할을 함께 담아냅니다.',
    verses: [
      { book: '요한복음', chapter: 14, n: 16, ref: '요 14:16', preview: '내가 아버지께 구하겠으니 그가 또 다른 보혜사를 너희에게 주사 영원토록 너희와 함께 있게 하시리니' },
      { book: '요한복음', chapter: 14, n: 26, ref: '요 14:26', preview: '보혜사 곧 아버지께서 내 이름으로 보내실 성령 그가 너희에게 모든 것을 가르치시고' },
      { book: '요한복음', chapter: 16, n: 7, ref: '요 16:7', preview: '내가 떠나가는 것이 너희에게 유익이라 내가 떠나가지 아니하면 보혜사가 너희에게로 오시지 아니할 것이요' },
    ],
    related: ['pneuma'],
    category: '교회와 성령',
  },
  {
    id: 'elohim',
    term: '엘로힘',
    original: 'אֱלֹהִים',
    transliteration: 'Elohim',
    language: '히브리어',
    meaning: '하나님, 신',
    description:
      '엘로힘은 창세기 1장을 여는 하나님의 명칭으로, 형태상 복수형이지만 이스라엘 신앙에서는 유일하신 창조주 하나님을 가리킬 때 사용됩니다. 이 복수형의 용법은 위엄의 복수(장엄 복수)로 설명되기도 하며, 후대 삼위일체 논의에서 함께 다루어지기도 합니다.',
    verses: [
      { book: '창세기', chapter: 1, n: 1, ref: '창 1:1', preview: '태초에 하나님이 천지를 창조하시니라' },
      { book: '시편', chapter: 19, n: 1, ref: '시 19:1', preview: '하늘이 하나님의 영광을 선포하고 궁창이 그 손으로 하신 일을 나타내는도다' },
    ],
    related: ['yhwh', 'kavod'],
    category: '하나님과 영광',
  },
  {
    id: 'yhwh',
    term: '여호와',
    original: 'יהוה',
    transliteration: 'YHWH',
    language: '히브리어',
    meaning: '스스로 있는 자 (언약의 이름)',
    description:
      '네 자음으로만 이루어진 이 신성한 이름(테트라그람마톤)은 하나님이 모세에게 자신을 계시하시며 밝히신 이름입니다. 유대 전통에서는 이 이름을 감히 소리 내어 읽지 않고 "아도나이"(주님)로 대신 읽어왔으며, 한글 개역 성경의 "여호와"는 이 관습이 반영된 전통적 음역입니다.',
    verses: [
      { book: '출애굽기', chapter: 3, n: 14, ref: '출 3:14', preview: '나는 스스로 있는 자니라 ... 나를 너희에게 보내셨다 하라' },
      { book: '시편', chapter: 23, n: 1, ref: '시 23:1', preview: '여호와는 나의 목자시니 내게 부족함이 없으리로다' },
    ],
    related: ['elohim', 'chesed'],
    category: '하나님과 영광',
  },
  {
    id: 'torah',
    term: '토라',
    original: 'תּוֹרָה',
    transliteration: 'torah',
    language: '히브리어',
    meaning: '율법, 가르침',
    description:
      '토라는 흔히 "율법"으로 번역되지만 본래는 "가르침" 또는 "지시"에 가까운 뜻을 지닙니다. 좁게는 모세오경을 가리키고, 넓게는 하나님이 백성을 살리기 위해 주신 삶의 전체 지침을 뜻합니다. 시편 119편은 이 토라를 향한 사랑을 176절에 걸쳐 노래합니다.',
    verses: [
      { book: '시편', chapter: 119, n: 1, ref: '시 119:1', preview: '행위 완전하여 여호와의 법에 행하는 자가 복이 있음이여' },
      { book: '로마서', chapter: 10, n: 4, ref: '롬 10:4', preview: '그리스도는 모든 믿는 자에게 의를 이루기 위하여 율법의 마침이 되시니라' },
    ],
    related: ['mishpat', 'tsedaqah'],
    denominationalViews: [
      { tradition: '루터파', view: '율법을 죄를 깨닫게 하는 거울(제1용법)로 강조하며 복음과의 대비를 부각하는 전통이 있다.' },
      { tradition: '개혁파(개신교)', view: '도덕법으로서의 율법이 신자에게도 여전히 삶의 규범적 권위를 갖는다고 강조하는 전통이 있다.' },
    ],
    category: '율법과 정의',
  },
  {
    id: 'shalom',
    term: '샬롬',
    original: 'שָׁלוֹם',
    transliteration: 'shalom',
    language: '히브리어',
    meaning: '평강, 온전함',
    description:
      '샬롬은 단순히 갈등이 없는 상태를 넘어, 관계와 삶 전체가 온전하고 풍성한 상태를 가리키는 포괄적인 단어입니다. 인사말로도 널리 쓰이며, 하나님과의 바른 관계에서 흘러나오는 총체적 안녕을 뜻합니다.',
    verses: [
      { book: '민수기', chapter: 6, n: 26, ref: '민 6:26', preview: '여호와는 그 얼굴을 네게로 향하여 드사 평강 주시기를 원하노라' },
      { book: '시편', chapter: 29, n: 11, ref: '시 29:11', preview: '여호와께서 자기 백성에게 평강의 복을 주시리로다' },
    ],
    related: ['chesed', 'yhwh'],
    category: '사랑과 은혜',
  },
  {
    id: 'kavod',
    term: '카보드',
    original: 'כָּבוֹד',
    transliteration: 'kavod',
    language: '히브리어',
    meaning: '영광, 무게, 위엄',
    description:
      '카보드는 문자적으로 "무게"를 뜻하는 단어에서 유래했으며, 히브리 사고에서 무게감 있는 것, 즉 존귀하고 위엄 있는 것을 가리키게 되었습니다. 출애굽기에서 성막을 가득 채우는 하나님의 임재는 이 카보드로 묘사되며, 헬라어 구약(70인역)에서는 도크사로 번역됩니다.',
    verses: [
      { book: '출애굽기', chapter: 40, n: 34, ref: '출 40:34', preview: '구름이 회막에 덮이고 여호와의 영광이 성막에 충만하매' },
      { book: '시편', chapter: 19, n: 1, ref: '시 19:1', preview: '하늘이 하나님의 영광을 선포하고' },
    ],
    related: ['doxa', 'elohim'],
    category: '하나님과 영광',
  },
  {
    id: 'mishpat',
    term: '미쉬파트',
    original: 'מִשְׁפָּט',
    transliteration: 'mishpat',
    language: '히브리어',
    meaning: '공의, 정의, 판결',
    description:
      '미쉬파트는 재판에서의 올바른 판결뿐 아니라, 사회 전체에서 약자를 보호하고 억울함을 바로잡는 정의로운 질서를 뜻합니다. 예언서에서는 형식적 종교 의식보다 미쉬파트를 실천하는 삶이 하나님이 참으로 원하시는 것임이 반복해서 선포됩니다.',
    verses: [
      { book: '시편', chapter: 89, n: 14, ref: '시 89:14', preview: '의와 공의가 주의 보좌의 기초라 인자함과 진실함이 주를 앞서 행하나이다' },
      { book: '창세기', chapter: 18, n: 25, ref: '창 18:25', preview: '세상을 심판하시는 이가 공의를 행하실 것이 아니니이까' },
    ],
    related: ['tsedaqah', 'torah'],
    category: '율법과 정의',
  },
  {
    id: 'tsedaqah',
    term: '체다카',
    original: 'צְדָקָה',
    transliteration: 'tsedaqah',
    language: '히브리어',
    meaning: '의(義), 올바른 관계',
    description:
      '체다카는 법적 무죄를 넘어, 언약 관계 안에서 마땅히 해야 할 바를 신실하게 행하는 것을 뜻합니다. 아브라함이 하나님을 믿었을 때 "이를 그의 의로 여기셨다"(창 15:6)는 구절은 신약의 이신칭의 논증에서 핵심 근거 본문으로 다시 인용됩니다.',
    verses: [
      { book: '창세기', chapter: 15, n: 6, ref: '창 15:6', preview: '아브람이 여호와를 믿으니 여호와께서 이를 그의 의로 여기시고' },
      { book: '시편', chapter: 119, n: 142, ref: '시 119:142', preview: '주의 의는 영원한 의요 주의 법은 진리로소이다' },
    ],
    related: ['dikaiosyne', 'mishpat', 'chesed'],
    category: '율법과 정의',
  },
  {
    id: 'huiothesia',
    term: '후이오데시아',
    original: 'υἱοθεσία',
    transliteration: 'huiothesia',
    language: '헬라어',
    meaning: '양자됨, 아들로 입양됨',
    description:
      '후이오데시아는 로마법의 입양 제도에서 가져온 단어로, 본래 자녀가 아니었던 사람이 법적으로 완전한 상속권을 지닌 아들로 받아들여지는 것을 뜻합니다. 바울은 이 단어를 통해, 신자가 성령을 통해 하나님의 자녀로 입양되어 그리스도와 함께 상속자가 되는 신분의 변화를 설명합니다.',
    verses: [
      { book: '로마서', chapter: 8, n: 15, ref: '롬 8:15', preview: '너희는 다시 무서워하는 종의 영을 받지 아니하고 양자의 영을 받았으므로 아바 아버지라 부르짖느니라' },
      { book: '갈라디아서', chapter: 4, n: 5, ref: '갈 4:5', preview: '율법 아래 있는 자들을 속량하시고 우리로 아들의 명분을 얻게 하려 하심이라' },
      { book: '에베소서', chapter: 1, n: 5, ref: '엡 1:5', preview: '그 기쁘신 뜻대로 우리를 예정하사 예수 그리스도로 말미암아 자기의 아들들이 되게 하셨으니' },
    ],
    related: ['pneuma', 'charis'],
    category: '믿음과 구원',
  },
  {
    id: 'hamartia',
    term: '하마르티아',
    original: 'ἁμαρτία',
    transliteration: 'hamartia',
    language: '헬라어',
    meaning: '죄, 과녁을 벗어남',
    description:
      '하마르티아는 본래 활을 쏘아 "과녁을 벗어나다"는 뜻의 스포츠·군사 용어에서 유래했습니다. 신약에서는 하나님의 뜻이라는 표준에서 벗어난 인간의 모든 상태와 행위를 포괄적으로 가리키며, 로마서는 이를 모든 인간이 공유하는 보편적 조건으로 논증합니다.',
    verses: [
      { book: '로마서', chapter: 3, n: 23, ref: '롬 3:23', preview: '모든 사람이 죄를 범하였으매 하나님의 영광에 이르지 못하더니' },
      { book: '로마서', chapter: 6, n: 23, ref: '롬 6:23', preview: '죄의 삯은 사망이요 하나님의 은사는 그리스도 예수 우리 주 안에 있는 영생이니라' },
    ],
    related: ['metanoia', 'soteria'],
    category: '죄와 회개',
  },
  {
    id: 'euangelion',
    term: '유앙겔리온',
    original: 'εὐαγγέλιον',
    transliteration: 'euangelion',
    language: '헬라어',
    meaning: '복음, 좋은 소식',
    description:
      '유앙겔리온은 "좋은(eu) 소식(angelion)"이라는 뜻으로, 본래 전쟁의 승전보나 황제의 즉위 소식처럼 공적으로 선포되는 기쁜 소식을 가리키던 단어였습니다. 신약은 이 단어를 가져와, 예수 그리스도를 통한 구원의 소식을 가리키는 신학적 전문 용어로 삼습니다.',
    verses: [
      { book: '로마서', chapter: 1, n: 16, ref: '롬 1:16', preview: '내가 복음을 부끄러워하지 아니하노니 이 복음은 모든 믿는 자에게 구원을 주시는 하나님의 능력이 됨이라' },
      { book: '고린도전서', chapter: 15, n: 1, ref: '고전 15:1', preview: '형제들아 내가 너희에게 전한 복음을 너희로 알게 하노니' },
    ],
    related: ['soteria', 'pistis'],
    category: '믿음과 구원',
  },
  {
    id: 'stauros',
    term: '스타우로스',
    original: 'σταυρός',
    transliteration: 'stauros',
    language: '헬라어',
    meaning: '십자가, 형틀',
    description:
      '스타우로스는 로마 제국이 극악한 죄인을 처형할 때 쓰던 나무 형틀을 가리키는 단어로, 당대에는 수치와 저주의 상징이었습니다. 바울은 이 수치스러운 형틀을 "하나님의 능력"(고전 1:18)이라 부르며, 십자가가 세상의 지혜를 뒤엎는 구원의 중심 사건임을 역설적으로 선포합니다.',
    verses: [
      { book: '고린도전서', chapter: 1, n: 18, ref: '고전 1:18', preview: '십자가의 도가 멸망하는 자들에게는 미련한 것이나 우리 구원 얻는 자들에게는 하나님의 능력이라' },
      { book: '갈라디아서', chapter: 6, n: 14, ref: '갈 6:14', preview: '내게는 우리 주 예수 그리스도의 십자가 외에 결코 자랑할 것이 없으니' },
      { book: '빌립보서', chapter: 2, n: 8, ref: '빌 2:8', preview: '자기를 낮추시고 죽기까지 복종하셨으니 곧 십자가에 죽으심이라' },
    ],
    related: ['kenosis', 'anastasis'],
    denominationalViews: [
      { tradition: '가톨릭·정교회', view: '십자가를 성찬(미사·성체성사)에서 현재화되는 희생 제사와 연결해 강조하는 전통이 있다.' },
      { tradition: '개혁파(개신교)', view: '그리스도의 단번의 십자가 희생을 반복되지 않는 완결된 속죄로 강조하는 전통이 있다.' },
    ],
    category: '십자가와 부활',
  },
  {
    id: 'anastasis',
    term: '아나스타시스',
    original: 'ἀνάστασις',
    transliteration: 'anastasis',
    language: '헬라어',
    meaning: '부활, 다시 일어섬',
    description:
      '아나스타시스는 "다시(ana) 일어섬(stasis)"이라는 뜻으로, 죽은 자가 몸을 입고 다시 살아나는 사건을 가리킵니다. 고린도전서 15장은 그리스도의 부활이 기독교 신앙 전체의 근거임을 논증하며, 신자들의 미래 부활 역시 이 사건에 근거한다고 선포합니다.',
    verses: [
      { book: '고린도전서', chapter: 15, n: 21, ref: '고전 15:21', preview: '사망이 사람으로 말미암았으니 죽은 자의 부활도 사람으로 말미암는도다' },
      { book: '요한복음', chapter: 11, n: 25, ref: '요 11:25', preview: '나는 부활이요 생명이니 나를 믿는 자는 죽어도 살겠고' },
    ],
    related: ['stauros', 'soteria'],
    category: '십자가와 부활',
  },
];
