// BeerStyle型定義（クライアントコンポーネントからも安全に参照できます）

export interface BeerStyle {
  id: number; // 数値のID
  slug: string; // スラッグ（URLフレンドリーな識別子）
  name: string;
  description: string;
  shortDescription: string; // 短い説明（1文または最大100文字）
  otherNames: string[]; // 検索性向上のための別名
  characteristics: {
    bitterness: number; // 1-5のスケール
    sweetness: number; // 1-5のスケール
    body: number; // 1-5のスケール（軽い-重い）
    aroma: number; // 1-5のスケール（香りの強さ）
    sourness: number; // 1-5のスケール（酸味）
  };
  history: string; // スタイルの歴史
  origin: string; // スタイルの発祥地と時代
  abv: number[]; // アルコール度数の範囲 [最小値, 最大値]
  ibu: number[]; // 国際苦味単位の範囲 [最小値, 最大値]
  srm: number[]; // 色度の範囲 [最小値, 最大値]
  siblings: string[]; // 同系統のスタイル（兄弟スタイル）
  parents: string[]; // 親スタイル（系統的に上位のスタイル）
  children: string[]; // 子スタイル（系統的に下位のスタイル）
  servingTemperature: number[]; // 推奨飲用温度 [最小値, 最大値]（摂氏）
}

// APIから返されるビールスタイルの型
export interface ApiStyle {
  id: number;
  slug: string;
  name: string;
  description: string;
  bitterness: number;
  sweetness: number;
  body: number;
  aroma: number;
  sourness: number;
  history: string;
  origin: string;
  abvMin: number;
  abvMax: number;
  ibuMin: number;
  ibuMax: number;
  srmMin: number;
  srmMax: number;
  servingTempMin: number;
  servingTempMax: number;
  otherNames: string[];
  siblings: string[];
  parents: string[];
  children: string[];
}
