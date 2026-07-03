// 상황별 말씀 — 삶의 상황·고민에 맞는 구절 모음
// 설교에 자주 인용되는 구절은 FAMOUS_VERSES에 별도 표시

export interface TopicVerse {
  book: string;
  chapter: number;
  n: number;
  ref: string;      // 표시용 참조 (예: '빌립보서 4:6')
  preview: string;  // 구절 요약 미리보기
}

export interface Topic {
  id: string;
  emoji: string;
  title: string;
  verses: TopicVerse[];
}

export const TOPICS: Topic[] = [
  {
    id: 'anxiety',
    emoji: '😟',
    title: '불안하고 염려될 때',
    verses: [
      { book: '빌립보서', chapter: 4, n: 6, ref: '빌립보서 4:6', preview: '아무 것도 염려하지 말고 기도와 간구로' },
      { book: '마태복음', chapter: 6, n: 34, ref: '마태복음 6:34', preview: '내일 일을 위하여 염려하지 말라' },
      { book: '베드로전서', chapter: 5, n: 7, ref: '베드로전서 5:7', preview: '너희 염려를 다 주께 맡기라' },
      { book: '시편', chapter: 46, n: 1, ref: '시편 46:1', preview: '하나님은 우리의 피난처시요 힘이시니' },
    ],
  },
  {
    id: 'fear',
    emoji: '😨',
    title: '두려울 때',
    verses: [
      { book: '이사야', chapter: 41, n: 10, ref: '이사야 41:10', preview: '두려워하지 말라 내가 너와 함께 함이라' },
      { book: '시편', chapter: 23, n: 4, ref: '시편 23:4', preview: '사망의 음침한 골짜기로 다닐지라도' },
      { book: '여호수아', chapter: 1, n: 9, ref: '여호수아 1:9', preview: '강하고 담대하라 놀라지 말며 두려워하지 말라' },
      { book: '디모데후서', chapter: 1, n: 7, ref: '디모데후서 1:7', preview: '하나님이 우리에게 주신 것은 두려워하는 마음이 아니요' },
    ],
  },
  {
    id: 'grief',
    emoji: '😢',
    title: '슬프고 상실을 겪을 때',
    verses: [
      { book: '시편', chapter: 34, n: 18, ref: '시편 34:18', preview: '여호와는 마음이 상한 자를 가까이 하시고' },
      { book: '마태복음', chapter: 5, n: 4, ref: '마태복음 5:4', preview: '애통하는 자는 복이 있나니' },
      { book: '요한계시록', chapter: 21, n: 4, ref: '요한계시록 21:4', preview: '모든 눈물을 그 눈에서 닦아 주시니' },
      { book: '시편', chapter: 30, n: 5, ref: '시편 30:5', preview: '저녁에는 울음이 깃들일지라도 아침에는 기쁨이' },
    ],
  },
  {
    id: 'weary',
    emoji: '😮‍💨',
    title: '지치고 낙심될 때',
    verses: [
      { book: '이사야', chapter: 40, n: 31, ref: '이사야 40:31', preview: '여호와를 앙망하는 자는 새 힘을 얻으리니' },
      { book: '마태복음', chapter: 11, n: 28, ref: '마태복음 11:28', preview: '수고하고 무거운 짐 진 자들아 다 내게로 오라' },
      { book: '갈라디아서', chapter: 6, n: 9, ref: '갈라디아서 6:9', preview: '선을 행하되 낙심하지 말지니' },
      { book: '시편', chapter: 42, n: 5, ref: '시편 42:5', preview: '내 영혼아 네가 어찌하여 낙심하며' },
    ],
  },
  {
    id: 'lonely',
    emoji: '🌙',
    title: '외로울 때',
    verses: [
      { book: '신명기', chapter: 31, n: 6, ref: '신명기 31:6', preview: '너와 함께 가시며 결코 너를 떠나지 아니하시며' },
      { book: '마태복음', chapter: 28, n: 20, ref: '마태복음 28:20', preview: '세상 끝날까지 너희와 항상 함께 있으리라' },
      { book: '시편', chapter: 27, n: 10, ref: '시편 27:10', preview: '내 부모는 나를 버렸으나 여호와는 나를 영접하시리이다' },
      { book: '시편', chapter: 139, n: 7, ref: '시편 139:7', preview: '내가 주의 영을 떠나 어디로 가며' },
    ],
  },
  {
    id: 'anger',
    emoji: '😤',
    title: '화가 나고 용서가 어려울 때',
    verses: [
      { book: '에베소서', chapter: 4, n: 26, ref: '에베소서 4:26', preview: '분을 내어도 죄를 짓지 말며 해가 지도록 분을 품지 말고' },
      { book: '에베소서', chapter: 4, n: 32, ref: '에베소서 4:32', preview: '서로 친절하게 하며 불쌍히 여기며 서로 용서하기를' },
      { book: '마태복음', chapter: 6, n: 14, ref: '마태복음 6:14', preview: '너희가 사람의 잘못을 용서하면' },
      { book: '잠언', chapter: 15, n: 1, ref: '잠언 15:1', preview: '유순한 대답은 분노를 쉬게 하여도' },
    ],
  },
  {
    id: 'temptation',
    emoji: '⚔️',
    title: '시험과 유혹 앞에서',
    verses: [
      { book: '고린도전서', chapter: 10, n: 13, ref: '고린도전서 10:13', preview: '감당하지 못할 시험 당함을 허락하지 아니하시고' },
      { book: '야고보서', chapter: 1, n: 12, ref: '야고보서 1:12', preview: '시험을 참는 자는 복이 있나니' },
      { book: '야고보서', chapter: 4, n: 7, ref: '야고보서 4:7', preview: '마귀를 대적하라 그리하면 너희를 피하리라' },
      { book: '히브리서', chapter: 4, n: 15, ref: '히브리서 4:15', preview: '모든 일에 우리와 똑같이 시험을 받으신 이로되' },
    ],
  },
  {
    id: 'decision',
    emoji: '🧭',
    title: '중요한 결정을 앞두고',
    verses: [
      { book: '잠언', chapter: 3, n: 5, ref: '잠언 3:5', preview: '너는 마음을 다하여 여호와를 신뢰하고' },
      { book: '잠언', chapter: 3, n: 6, ref: '잠언 3:6', preview: '네 길을 지도하시리라' },
      { book: '시편', chapter: 32, n: 8, ref: '시편 32:8', preview: '내가 네 갈 길을 가르쳐 보이고' },
      { book: '야고보서', chapter: 1, n: 5, ref: '야고보서 1:5', preview: '지혜가 부족하거든 하나님께 구하라' },
    ],
  },
  {
    id: 'gratitude',
    emoji: '🙏',
    title: '감사와 기쁨을 표현하고 싶을 때',
    verses: [
      { book: '데살로니가전서', chapter: 5, n: 16, ref: '데살로니가전서 5:16', preview: '항상 기뻐하라' },
      { book: '데살로니가전서', chapter: 5, n: 18, ref: '데살로니가전서 5:18', preview: '범사에 감사하라' },
      { book: '시편', chapter: 100, n: 4, ref: '시편 100:4', preview: '감사함으로 그의 문에 들어가며' },
      { book: '빌립보서', chapter: 4, n: 4, ref: '빌립보서 4:4', preview: '주 안에서 항상 기뻐하라' },
    ],
  },
  {
    id: 'guilt',
    emoji: '💧',
    title: '죄책감이 들 때',
    verses: [
      { book: '요한일서', chapter: 1, n: 9, ref: '요한일서 1:9', preview: '우리 죄를 자백하면 미쁘시고 의로우사' },
      { book: '시편', chapter: 103, n: 12, ref: '시편 103:12', preview: '동이 서에서 먼 것 같이 우리의 죄과를 멀리 옮기셨으며' },
      { book: '로마서', chapter: 8, n: 1, ref: '로마서 8:1', preview: '그리스도 예수 안에 있는 자에게는 결코 정죄함이 없나니' },
      { book: '이사야', chapter: 1, n: 18, ref: '이사야 1:18', preview: '너희의 죄가 주홍 같을지라도 눈과 같이 희어질 것이요' },
    ],
  },
  {
    id: 'provision',
    emoji: '🍞',
    title: '생계와 앞날이 걱정될 때',
    verses: [
      { book: '마태복음', chapter: 6, n: 33, ref: '마태복음 6:33', preview: '먼저 그의 나라와 그의 의를 구하라' },
      { book: '빌립보서', chapter: 4, n: 19, ref: '빌립보서 4:19', preview: '나의 하나님이 너희 모든 쓸 것을 채우시리라' },
      { book: '시편', chapter: 23, n: 1, ref: '시편 23:1', preview: '여호와는 나의 목자시니 내게 부족함이 없으리로다' },
      { book: '예레미야', chapter: 29, n: 11, ref: '예레미야 29:11', preview: '너희를 향한 나의 생각은 평안이요 재앙이 아니니라' },
    ],
  },
  {
    id: 'healing',
    emoji: '🌿',
    title: '아프고 건강이 염려될 때',
    verses: [
      { book: '시편', chapter: 103, n: 3, ref: '시편 103:3', preview: '네 모든 죄악을 사하시며 네 모든 병을 고치시며' },
      { book: '이사야', chapter: 53, n: 5, ref: '이사야 53:5', preview: '그가 채찍에 맞으므로 우리는 나음을 받았도다' },
      { book: '야고보서', chapter: 5, n: 15, ref: '야고보서 5:15', preview: '믿음의 기도는 병든 자를 구원하리니' },
      { book: '시편', chapter: 121, n: 2, ref: '시편 121:2', preview: '나의 도움은 천지를 지으신 여호와에게서로다' },
    ],
  },
];

// 설교에 자주 인용되는 대표 구절 — 본문에 배지로 표시
export const FAMOUS_VERSES = new Set<string>([
  '요한복음 3:16',
  '요한복음 14:6',
  '요한복음 1:1',
  '로마서 8:28',
  '로마서 8:1',
  '로마서 12:2',
  '로마서 3:23',
  '빌립보서 4:13',
  '빌립보서 4:6',
  '빌립보서 4:7',
  '시편 23:1',
  '시편 23:4',
  '시편 1:1',
  '시편 119:105',
  '시편 46:1',
  '잠언 3:5',
  '잠언 3:6',
  '이사야 40:31',
  '이사야 41:10',
  '이사야 53:5',
  '예레미야 29:11',
  '마태복음 6:33',
  '마태복음 11:28',
  '마태복음 28:19',
  '마태복음 28:20',
  '여호수아 1:9',
  '갈라디아서 2:20',
  '고린도전서 13:4',
  '고린도전서 13:13',
  '고린도전서 10:13',
  '고린도후서 5:17',
  '에베소서 2:8',
  '히브리서 11:1',
  '데살로니가전서 5:16',
  '데살로니가전서 5:17',
  '데살로니가전서 5:18',
  '요한일서 1:9',
  '창세기 1:1',
]);
