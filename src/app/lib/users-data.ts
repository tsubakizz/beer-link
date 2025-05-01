// ユーザー型定義
export type User = {
  id: string;
  username: string;
  email: string;
  password: string; // 実際のアプリでは平文ではなくハッシュ化して保存すべきです
  displayName: string;
  avatarUrl?: string;
  favoriteBeers: string[]; // ビールIDのリスト
  favoriteBreweries: string[]; // ブルワリーIDのリスト
  ratings: { beerId: string; rating: number }[];
  reviews: { beerId: string; content: string; date: string }[];
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin?: string;
};

// サンプルユーザーデータ
export const users: User[] = [
  {
    id: '1',
    username: 'beer_lover',
    email: 'beer_lover@example.com',
    password: 'password123', // 実際のアプリではハッシュ化して保存
    displayName: 'ビール愛好家',
    avatarUrl: '/images/avatars/user1.jpg',
    favoriteBeers: ['yona-yona-ale', 'tokyo-white'],
    favoriteBreweries: ['yoho-brewing', 'far-yeast'],
    ratings: [
      { beerId: 'yona-yona-ale', rating: 4.5 },
      { beerId: 'tokyo-white', rating: 4.2 },
      { beerId: 'suiyoubi-cat', rating: 3.8 },
    ],
    reviews: [
      {
        beerId: 'yona-yona-ale',
        content:
          '日本のクラフトビールの入門に最適な一本。フルーティな香りとすっきりとした後味が特徴です。',
        date: '2025-04-10T12:00:00Z',
      },
    ],
    role: 'user',
    createdAt: '2025-01-15T09:30:00Z',
    lastLogin: '2025-05-01T18:45:00Z',
  },
  {
    id: '2',
    username: 'craft_master',
    email: 'craft_master@example.com',
    password: 'secret456', // 実際のアプリではハッシュ化して保存
    displayName: 'クラフトマスター',
    avatarUrl: '/images/avatars/user2.jpg',
    favoriteBeers: ['punk-ipa', 'imperial-stout', 'indigo-pale-ale'],
    favoriteBreweries: ['brewdog', 'stone-brewing'],
    ratings: [
      { beerId: 'punk-ipa', rating: 4.8 },
      { beerId: 'imperial-stout', rating: 5.0 },
      { beerId: 'indigo-pale-ale', rating: 4.3 },
    ],
    reviews: [
      {
        beerId: 'punk-ipa',
        content:
          'ホップの香りが強烈でありながらもバランスが取れている。IPAの王道として常に手元に置いておきたい一本。',
        date: '2025-03-22T14:20:00Z',
      },
      {
        beerId: 'imperial-stout',
        content:
          '深い黒色とコクのある味わい。チョコレートやコーヒーの香りが豊かで、寒い季節に特におすすめ。',
        date: '2025-02-05T19:30:00Z',
      },
    ],
    role: 'admin',
    createdAt: '2024-11-08T14:20:00Z',
    lastLogin: '2025-05-02T10:15:00Z',
  },
  {
    id: '3',
    username: 'hoppy_girl',
    email: 'hoppy_girl@example.com',
    password: 'hoppy789', // 実際のアプリではハッシュ化して保存
    displayName: 'ホッピーガール',
    favoriteBeers: ['aooni-ipa', 'mikkeller-ipa'],
    favoriteBreweries: ['shiga-kogen', 'minoh-beer'],
    ratings: [
      { beerId: 'aooni-ipa', rating: 4.6 },
      { beerId: 'mikkeller-ipa', rating: 4.7 },
    ],
    reviews: [],
    role: 'user',
    createdAt: '2025-02-20T11:10:00Z',
    lastLogin: '2025-04-29T20:45:00Z',
  },
  {
    id: '4',
    username: 'stout_fan',
    email: 'stout_fan@example.com',
    password: 'dark456', // 実際のアプリではハッシュ化して保存
    displayName: 'スタウト大好き',
    favoriteBeers: ['guinness-draught', 'imperial-stout'],
    favoriteBreweries: ['guinness', 'brewdog'],
    ratings: [
      { beerId: 'guinness-draught', rating: 4.9 },
      { beerId: 'imperial-stout', rating: 4.8 },
    ],
    reviews: [
      {
        beerId: 'guinness-draught',
        content:
          '世界で最も有名なスタウトの一つ。クリーミーな泡と滑らかな口当たりが特徴。アイリッシュパブの雰囲気を思い出させる。',
        date: '2025-03-17T16:40:00Z',
      },
    ],
    role: 'user',
    createdAt: '2025-01-05T08:50:00Z',
  },
];
