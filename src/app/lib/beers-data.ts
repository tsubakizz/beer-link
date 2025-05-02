// ビールスタイルの定義
export type BeerStyle = {
  id: string;
  name: string;
  description: string;
  characteristics: {
    bitterness: number; // 1-5のスケール
    sweetness: number; // 1-5のスケール
    body: number; // 1-5のスケール（軽い-重い）
    alcohol: number; // 一般的なABV範囲の中央値
    sourness: number; // 1-5のスケール（酸味）
  };
};

export const beerStyles: BeerStyle[] = [
  {
    id: 'ipa',
    name: 'IPA (インディア・ペール・エール)',
    description:
      'ホップの香りと苦味が特徴的で、フルーティーな香りを持つことが多いエール。様々なバリエーションがあります。',
    characteristics: {
      bitterness: 4,
      sweetness: 2,
      body: 3,
      alcohol: 6.5,
      sourness: 1,
    },
  },
  {
    id: 'stout',
    name: 'スタウト',
    description:
      '焙煎麦芽を使用した濃い色と豊かなボディのビール。チョコレートやコーヒーのような風味があります。',
    characteristics: {
      bitterness: 3,
      sweetness: 3,
      body: 4,
      alcohol: 5.0,
      sourness: 1,
    },
  },
  {
    id: 'pilsner',
    name: 'ピルスナー',
    description:
      'チェコ発祥の黄金色のラガービール。クリアでシャープな味わいとホップの香りが特徴です。',
    characteristics: {
      bitterness: 3,
      sweetness: 1,
      body: 2,
      alcohol: 4.5,
      sourness: 2,
    },
  },
  {
    id: 'wheat',
    name: 'ヴァイツェン/小麦ビール',
    description:
      '小麦を多く使用したビールで、バナナやクローブのような風味を持ち、軽く爽やかな味わいです。',
    characteristics: {
      bitterness: 1,
      sweetness: 2,
      body: 3,
      alcohol: 5.0,
      sourness: 2,
    },
  },
  {
    id: 'pale-ale',
    name: 'ペールエール',
    description:
      'IPAよりもマイルドなホップの風味を持つエール。バランスの良い味わいで親しみやすいビールです。',
    characteristics: {
      bitterness: 3,
      sweetness: 2,
      body: 3,
      alcohol: 5.5,
      sourness: 1,
    },
  },
  {
    id: 'porter',
    name: 'ポーター',
    description:
      'スタウトに近い暗色のビールで、チョコレートやカラメルの風味があり、スタウトよりも軽めの口当たりです。',
    characteristics: {
      bitterness: 2,
      sweetness: 3,
      body: 3,
      alcohol: 5.5,
      sourness: 1,
    },
  },
  {
    id: 'sour',
    name: 'サワービール',
    description:
      '酸味のあるビールで、フルーツの風味と組み合わせることが多い。独特の爽やかさがあります。',
    characteristics: {
      bitterness: 1,
      sweetness: 2,
      body: 2,
      alcohol: 4.0,
      sourness: 5,
    },
  },
  {
    id: 'belgian',
    name: 'ベルギービール',
    description:
      'フルーティーでスパイシーな風味が特徴的。修道院ビールやトラピストビールなど多様なスタイルがあります。',
    characteristics: {
      bitterness: 2,
      sweetness: 3,
      body: 3,
      alcohol: 7.0,
      sourness: 2,
    },
  },
];

// ビールの定義
export type Beer = {
  id: string;
  name: string;
  brewery: string;
  style: string;
  abv: number; // アルコール度数
  ibu?: number; // 苦味指数（オプショナル）
  description: string;
  reviewCount: number; // レビュー数
  imageUrl?: string; // 画像URL（オプショナル）
  flavors: string[]; // 風味タグ
  country?: string; // 原産国（オプショナル）
};

// モックビールデータ
export const beers: Beer[] = [
  {
    id: 'yona-yona',
    name: 'よなよなエール',
    brewery: 'ヤッホーブルーイング',
    style: 'pale-ale',
    abv: 5.5,
    ibu: 40,
    description:
      'アメリカンペールエールスタイルのビール。柑橘系のさわやかな香りと、やさしい味わいが特徴です。',
    reviewCount: 124,
    flavors: ['柑橘', 'フローラル', 'バランス良い'],
  },
  {
    id: 'tokyo-black',
    name: '東京ブラック',
    brewery: 'ヤッホーブルーイング',
    style: 'porter',
    abv: 5.0,
    ibu: 30,
    description:
      'ポーター・スタイルのビール。チョコレートやコーヒーを思わせる風味があり、飲みやすい黒ビールです。',
    reviewCount: 78,
    flavors: ['チョコレート', 'コーヒー', 'カラメル'],
  },
  {
    id: 'aooni',
    name: 'インドの青鬼',
    brewery: 'ヤッホーブルーイング',
    style: 'ipa',
    abv: 7.0,
    ibu: 65,
    description:
      '強めのホップの香りと苦味、そして柑橘系の風味が特徴のIPA。名前の通り、刺激的な味わいです。',
    reviewCount: 112,
    flavors: ['ホップ', '柑橘', 'パイン'],
  },
  {
    id: 'suiyoubi-cat',
    name: '水曜日のネコ',
    brewery: 'ヤッホーブルーイング',
    style: 'belgian',
    abv: 4.5,
    ibu: 20,
    description:
      'ベルジャンホワイトスタイルのビール。オレンジピールやコリアンダーのスパイシーさが特徴的です。',
    reviewCount: 95,
    flavors: ['オレンジ', 'スパイス', 'フルーティー'],
  },
  {
    id: 'surprise-cat',
    name: '揚げパンのねこ',
    brewery: 'ヤッホーブルーイング',
    style: 'porter',
    abv: 5.5,
    ibu: 25,
    description:
      'キャラメル、モルトの甘みと、シナモン、ナツメグのスパイスが効いたユニークなポーター。',
    reviewCount: 67,
    flavors: ['キャラメル', 'シナモン', 'スパイス'],
  },
  {
    id: 'coedo-shiro',
    name: 'COEDO 白',
    brewery: 'コエドブルワリー',
    style: 'wheat',
    abv: 5.0,
    description:
      '小麦麦芽を使用したヴァイツェンタイプのビール。バナナのようなフルーティな香りとすっきりとした飲み口が特徴です。',
    reviewCount: 82,
    flavors: ['バナナ', 'クローブ', '小麦'],
  },
  {
    id: 'coedo-beniaka',
    name: 'COEDO 紅赤',
    brewery: 'コエドブルワリー',
    style: 'pale-ale',
    abv: 5.5,
    description:
      'さつまいもを原料の一部に使用した、琥珀色のビール。香ばしさとほのかな甘みが特徴です。',
    reviewCount: 76,
    flavors: ['キャラメル', 'さつまいも', 'トースト'],
  },
  {
    id: 'hitachino-nest',
    name: '常陸野ネストホワイトエール',
    brewery: '木内酒造',
    style: 'wheat',
    abv: 5.5,
    description:
      'コリアンダーシードとオレンジピールを使用したベルジャンスタイルのホワイトエール。爽やかな香りが特徴です。',
    reviewCount: 103,
    flavors: ['オレンジ', 'スパイス', 'ハーブ'],
  },
  {
    id: 'rochefort-10',
    name: 'ロシュフォール10',
    brewery: 'Abbey of Notre-Dame de Saint-Rémy',
    style: 'belgian',
    abv: 11.3,
    description:
      'ベルギーのトラピスト修道院で作られる濃厚なエール。複雑なフルーティさとスパイシーさが特徴的です。',
    reviewCount: 138,
    flavors: ['プラム', 'イースト', 'キャラメル', 'スパイス'],
  },
  {
    id: 'punk-ipa',
    name: 'パンクIPA',
    brewery: 'BrewDog',
    style: 'ipa',
    abv: 5.6,
    ibu: 45,
    description:
      'トロピカルフルーツの香りと心地よい苦味が特徴のIPA。現代のクラフトビールムーブメントを象徴するビールの一つです。',
    reviewCount: 115,
    flavors: ['グレープフルーツ', 'パイナップル', 'ホップ'],
  },
  {
    id: 'guinness',
    name: 'ギネス ドラフト',
    brewery: 'Guinness',
    style: 'stout',
    abv: 4.2,
    ibu: 45,
    description:
      'アイルランドを代表する黒ビール。クリーミーな泡と共に楽しむ、コーヒーやチョコレートの風味が特徴です。',
    reviewCount: 210,
    flavors: ['コーヒー', 'チョコレート', 'ロースト'],
  },
  {
    id: 'pilsner-urquell',
    name: 'ピルスナー・ウルケル',
    brewery: 'Plzeňský Prazdroj',
    style: 'pilsner',
    abv: 4.4,
    ibu: 40,
    description:
      'チェコ発祥の元祖ピルスナー。爽やかな苦みと麦の風味が絶妙なバランスで調和しています。',
    reviewCount: 95,
    flavors: ['穀物', 'ハーブ', 'クリーン'],
  },
];
