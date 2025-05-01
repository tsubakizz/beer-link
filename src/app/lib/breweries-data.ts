// ブルワリーの種類（タイプ）
export type BreweryType =
  | 'craft'
  | 'macro'
  | 'brewpub'
  | 'contract'
  | 'proprietary';

// 地域の定義
export type Region =
  | 'hokkaido'
  | 'tohoku'
  | 'kanto'
  | 'chubu'
  | 'kansai'
  | 'chugoku'
  | 'shikoku'
  | 'kyushu'
  | 'okinawa'
  | 'overseas';

// 地域名の表示用マッピング
export const regionNames: Record<Region, string> = {
  hokkaido: '北海道',
  tohoku: '東北',
  kanto: '関東',
  chubu: '中部',
  kansai: '関西',
  chugoku: '中国',
  shikoku: '四国',
  kyushu: '九州',
  okinawa: '沖縄',
  overseas: '海外',
};

// ブルワリーのデータ型定義
export type Brewery = {
  id: string;
  name: string;
  nameEn?: string;
  type: BreweryType;
  region: Region;
  prefecture?: string;
  country: string;
  foundedYear: number;
  description: string;
  website?: string;
  taproom: boolean; // 直営タップルームの有無
  tours: boolean; // 工場見学の可否
  imageUrl?: string;
  address?: string;
  featured?: boolean; // 注目のブルワリーかどうか
  specialties?: string[]; // 得意とするビールスタイル
};

// ブルワリーのデータ
export const breweries: Brewery[] = [
  {
    id: 'yoho-brewing',
    name: 'ヤッホーブルーイング',
    nameEn: 'Yo-Ho Brewing',
    type: 'craft',
    region: 'chubu',
    prefecture: '長野県',
    country: '日本',
    foundedYear: 1996,
    description:
      '「よなよなエール」で知られる日本のクラフトビールの先駆け。エールビールの魅力を日本に広めた代表的なブルワリー。アメリカンスタイルのエールを中心に幅広いラインナップを展開している。',
    website: 'https://yohobrewing.com',
    taproom: true,
    tours: true,
    featured: true,
    specialties: ['pale-ale', 'ipa', 'porter'],
  },
  {
    id: 'coedo',
    name: 'コエドブルワリー',
    nameEn: 'COEDO Brewery',
    type: 'craft',
    region: 'kanto',
    prefecture: '埼玉県',
    country: '日本',
    foundedYear: 1996,
    description:
      '埼玉県川越市を拠点とする醸造所。地元の伝統野菜「川越さつまいも」を使用した「紅赤-Beniaka-」など、日本の食文化に合うビール造りを追求している。',
    website: 'https://www.coedobrewery.com',
    taproom: true,
    tours: false,
    specialties: ['pilsner', 'wheat', 'pale-ale'],
  },
  {
    id: 'kiuchi-brewery',
    name: '木内酒造',
    nameEn: 'Kiuchi Brewery',
    type: 'craft',
    region: 'kanto',
    prefecture: '茨城県',
    country: '日本',
    foundedYear: 1823, // 酒造としての創業年
    description:
      '1823年創業の老舗の日本酒蔵元。1996年からビール事業を開始し、「常陸野ネストビール」シリーズで国内外から高い評価を得ている。日本の伝統と西洋のビール文化を融合させた独創的なビールを製造。',
    website: 'https://kodawari.cc',
    taproom: true,
    tours: true,
    specialties: ['wheat', 'belgian'],
  },
  {
    id: 'minoh-beer',
    name: '箕面ビール',
    nameEn: 'Minoh Beer',
    type: 'craft',
    region: 'kansai',
    prefecture: '大阪府',
    country: '日本',
    foundedYear: 1997,
    description:
      '大阪府箕面市の小さな町工場から始まったブルワリー。「W-IPA」をはじめとする個性的なビールで数々の賞を受賞。女性醸造家が中心となって運営されていることでも知られる。',
    website: 'https://www.minoh-beer.jp',
    taproom: true,
    tours: false,
    specialties: ['ipa', 'stout', 'pale-ale'],
  },
  {
    id: 'baird-brewing',
    name: 'ベアードブルーイング',
    nameEn: 'Baird Brewing',
    type: 'craft',
    region: 'chubu',
    prefecture: '静岡県',
    country: '日本',
    foundedYear: 2000,
    description:
      '静岡県伊豆に拠点を置くクラフトブルワリー。アメリカ人ブルワーによる日本の四季や文化を取り入れたユニークなビールづくりが特徴。各地にタップルームを展開している。',
    website: 'https://www.bairdbeer.com',
    taproom: true,
    tours: true,
    specialties: ['pale-ale', 'ipa', 'porter', 'wheat'],
  },
  {
    id: 'shiga-kogen',
    name: '志賀高原ビール',
    nameEn: 'Shiga Kogen Beer',
    type: 'craft',
    region: 'chubu',
    prefecture: '長野県',
    country: '日本',
    foundedYear: 2004,
    description:
      '長野県の自然豊かな志賀高原の麓で醸造されるビール。玉村本店という日本酒蔵元が手がける。地元の良質な水を使用し、IPAを中心に実験的なビールも多く製造している。',
    website: 'https://tamamura-honten.co.jp',
    taproom: true,
    tours: false,
    specialties: ['ipa', 'pale-ale'],
  },
  {
    id: 'brewdog',
    name: 'ブリュードッグ',
    nameEn: 'BrewDog',
    type: 'craft',
    region: 'overseas',
    country: 'イギリス',
    foundedYear: 2007,
    description:
      'スコットランド発祥の革新的なクラフトブルワリー。「パンクIPA」をはじめとする個性的なビールと挑戦的なマーケティングで世界的な成功を収めた。世界各国にバーを展開している。',
    website: 'https://www.brewdog.com',
    taproom: true,
    tours: true,
    specialties: ['ipa', 'stout', 'pale-ale'],
  },
  {
    id: 'stone-brewing',
    name: 'ストーンブルーイング',
    nameEn: 'Stone Brewing',
    type: 'craft',
    region: 'overseas',
    country: 'アメリカ',
    foundedYear: 1996,
    description:
      'カリフォルニア州サンディエゴを拠点とする米国最大級のクラフトブルワリー。強烈にホッピーなIPAで知られ、アメリカンクラフトビール革命の先駆者的存在。',
    website: 'https://www.stonebrewing.com',
    taproom: true,
    tours: true,
    specialties: ['ipa', 'pale-ale', 'stout'],
  },
  {
    id: 'suntory',
    name: 'サントリー',
    nameEn: 'Suntory',
    type: 'macro',
    region: 'kansai',
    prefecture: '大阪府',
    country: '日本',
    foundedYear: 1899,
    description:
      '日本を代表する総合酒類メーカー。「プレミアムモルツ」などの高品質なビールを製造している。ウイスキーやワインなど幅広い酒類も手がける。',
    website: 'https://www.suntory.co.jp',
    taproom: false,
    tours: true,
  },
  {
    id: 'asahi',
    name: 'アサヒビール',
    nameEn: 'Asahi Breweries',
    type: 'macro',
    region: 'kanto',
    prefecture: '東京都',
    country: '日本',
    foundedYear: 1889,
    description:
      '「アサヒスーパードライ」で知られる日本の大手ビールメーカー。辛口のクリアな味わいが特徴のラガービールを主力としている。',
    website: 'https://www.asahibeer.co.jp',
    taproom: false,
    tours: true,
  },
  {
    id: 'kirin',
    name: 'キリンビール',
    nameEn: 'Kirin Brewery Company',
    type: 'macro',
    region: 'kanto',
    prefecture: '東京都',
    country: '日本',
    foundedYear: 1885,
    description:
      '日本の大手ビールメーカー。「一番搾り」などのブランドで知られる。近年はクラフトビール市場にも参入し、「グランドキリン」シリーズなどを展開している。',
    website: 'https://www.kirin.co.jp',
    taproom: false,
    tours: true,
  },
  {
    id: 'far-yeast',
    name: 'ファーイーストブルーイング',
    nameEn: 'Far Yeast Brewing',
    type: 'craft',
    region: 'kanto',
    prefecture: '東京都',
    country: '日本',
    foundedYear: 2012,
    description:
      'アジアの食文化と融合した新しいビアスタイルの開発に取り組む東京のクラフトブルワリー。「東京ホワイト」など和のテイストを取り入れたビールも製造している。',
    website: 'https://faryeast.com',
    taproom: true,
    tours: false,
    specialties: ['wheat', 'ipa', 'sour'],
  },
  {
    id: 'belgium-abbey',
    name: 'ベルギー修道院',
    nameEn: 'Abbey of Notre-Dame de Saint-Rémy',
    type: 'proprietary',
    region: 'overseas',
    country: 'ベルギー',
    foundedYear: 1230,
    description:
      '何世紀にもわたる伝統を持つ修道院ブルワリー。トラピスト修道士たちによって厳格な基準の下で醸造される「ロシュフォール」シリーズで世界的に有名。複雑な風味と深い味わいが特徴。',
    website: 'https://www.trappistes-rochefort.com',
    taproom: false,
    tours: false,
    specialties: ['belgian'],
  },
  {
    id: 'pilsner-urquell',
    name: 'ピルスナー・ウルケル',
    nameEn: 'Plzeňský Prazdroj',
    type: 'macro',
    region: 'overseas',
    country: 'チェコ',
    foundedYear: 1842,
    description:
      '世界初のピルスナースタイルのビールを生み出した醸造所。チェコ・ピルゼン市で160年以上にわたり伝統的な製法でビールを醸造し続けている。黄金色の澄んだ色と爽やかな苦みが特徴。',
    website: 'https://www.pilsnerurquell.com',
    taproom: true,
    tours: true,
    specialties: ['pilsner'],
  },
  {
    id: 'guinness',
    name: 'ギネス',
    nameEn: 'Guinness',
    type: 'macro',
    region: 'overseas',
    country: 'アイルランド',
    foundedYear: 1759,
    description:
      '250年以上の歴史を持つアイルランドの象徴的なビールメーカー。クリーミーな泡と独特のコーヒーやチョコレートを思わせる風味のスタウトビールで世界的に有名。',
    website: 'https://www.guinness.com',
    taproom: true,
    tours: true,
    specialties: ['stout'],
  },
];

// ブルワリータイプ名の表示用マッピング
export const breweryTypeNames: Record<BreweryType, string> = {
  craft: 'クラフトブルワリー',
  macro: '大手ビールメーカー',
  brewpub: 'ブリューパブ',
  contract: '委託醸造',
  proprietary: '特殊/伝統的醸造所',
};
