// APIから返されるビールスタイルの型
interface ApiStyle {
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

// ビールスタイルの定義
export type BeerStyle = {
  id: number; // 数値のID
  slug: string; // スラッグ（URLフレンドリーな識別子）
  name: string;
  description: string;
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
};

// カード表示用の簡易ビールスタイル定義
export type BeerStyleCard = {
  id: number;
  slug: string;
  name: string;
  shortDescription: string; // 短い説明
  characteristics: {
    bitterness: number;
    sweetness: number;
    body: number;
  };
  abv: string; // 「5.0-6.5%」のような文字列形式
  ibu: string; // 「20-40」のような文字列形式
};

// 完全なビールスタイルデータからカード表示用データに変換する関数
export function getBeerStyleCard(style: BeerStyle): BeerStyleCard {
  // 説明文を短くする（最初のピリオドまで、または最大100文字）
  const endOfFirstSentence = style.description.indexOf('。');
  const shortDescription =
    endOfFirstSentence > 0 && endOfFirstSentence < 100
      ? style.description.substring(0, endOfFirstSentence + 1)
      : style.description.substring(0, 100) + '...';

  return {
    id: style.id,
    slug: style.slug,
    name: style.name,
    shortDescription,
    characteristics: {
      bitterness: style.characteristics.bitterness,
      sweetness: style.characteristics.sweetness,
      body: style.characteristics.body,
    },
    abv: `${style.abv[0].toFixed(1)}-${style.abv[1].toFixed(1)}%`,
    ibu: `${style.ibu[0]}-${style.ibu[1]}`,
  };
}

// 自ホストのAPIのベースURL取得
function getApiBaseUrl() {
  // ブラウザ環境では相対パスを使用
  if (typeof window !== 'undefined') {
    return '';
  }

  // サーバー環境での実行時は絶対URLが必要
  // 環境変数から取得（デフォルトはlocalhost）
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
}

// ビールスタイルのデータを保持する配列（メモリキャッシュ用）
export const beerStyles: BeerStyle[] = [];

// APIからビールスタイルを取得する関数
export async function fetchBeerStyles(): Promise<BeerStyle[]> {
  try {
    // すでにメモリにデータが読み込まれている場合は再取得しない
    if (beerStyles.length > 0) {
      console.log('Using in-memory cached beer styles');
      return beerStyles;
    }

    // API経由でデータを取得（D1データベースから取得）
    const apiUrl = `${getApiBaseUrl()}/api/beer-styles`;
    console.log('Fetching beer styles from:', apiUrl);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch beer styles from D1 database');
    }

    const styles = (await response.json()) as ApiStyle[];

    // D1から取得したデータをBeerStyle形式に変換
    const formattedStyles = styles.map((style: ApiStyle) => ({
      id: style.id,
      slug: style.slug,
      name: style.name,
      description: style.description,
      otherNames: style.otherNames || [],
      characteristics: {
        bitterness: style.bitterness || 0,
        sweetness: style.sweetness || 0,
        body: style.body || 0,
        aroma: style.aroma || 0,
        sourness: style.sourness || 0,
      },
      history: style.history || '',
      origin: style.origin || '',
      abv:
        style.abvMin !== null && style.abvMax !== null
          ? [parseFloat(String(style.abvMin)), parseFloat(String(style.abvMax))]
          : [0, 0],
      ibu:
        style.ibuMin !== null && style.ibuMax !== null
          ? [parseInt(String(style.ibuMin)), parseInt(String(style.ibuMax))]
          : [0, 0],
      srm:
        style.srmMin !== null && style.srmMax !== null
          ? [parseInt(String(style.srmMin)), parseInt(String(style.srmMax))]
          : [0, 0],
      siblings: style.siblings || [],
      parents: style.parents || [],
      children: style.children || [],
      servingTemperature:
        style.servingTempMin !== null && style.servingTempMax !== null
          ? [
              parseInt(String(style.servingTempMin)),
              parseInt(String(style.servingTempMax)),
            ]
          : [4, 12], // デフォルト値
    }));

    // メモリキャッシュをクリアして新しいデータを追加
    beerStyles.length = 0;
    beerStyles.push(...formattedStyles);

    console.log(`Loaded ${beerStyles.length} beer styles from D1 database`);
    return beerStyles;
  } catch (error) {
    console.error('Error fetching beer styles:', error);
    return [];
  }
}

// 全てのビールスタイルのカード表示用データを取得する非同期関数
export async function getAllBeerStyleCards(): Promise<BeerStyleCard[]> {
  const styles = await fetchBeerStyles();
  return styles.map((style) => getBeerStyleCard(style));
}

// スラッグによってビールスタイルを取得する関数
export async function getBeerStyleBySlug(
  slug: string
): Promise<BeerStyle | null> {
  try {
    // まずメモリキャッシュから検索
    const cachedStyle = beerStyles.find((style) => style.slug === slug);
    if (cachedStyle) {
      return cachedStyle;
    }

    // スタイルリストをロードしてから再検索
    await fetchBeerStyles();
    const style = beerStyles.find((style) => style.slug === slug);
    if (style) {
      return style;
    }

    // それでも見つからない場合は個別に取得
    const apiUrl = `${getApiBaseUrl()}/api/beer-styles/${slug}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch beer style with slug ${slug}`);
    }

    const styleData = (await response.json()) as ApiStyle;

    // データ形式を変換
    const formattedStyle: BeerStyle = {
      id: styleData.id,
      slug: styleData.slug,
      name: styleData.name,
      description: styleData.description,
      otherNames: styleData.otherNames || [],
      characteristics: {
        bitterness: styleData.bitterness || 0,
        sweetness: styleData.sweetness || 0,
        body: styleData.body || 0,
        aroma: styleData.aroma || 0,
        sourness: styleData.sourness || 0,
      },
      history: styleData.history || '',
      origin: styleData.origin || '',
      abv:
        styleData.abvMin !== null && styleData.abvMax !== null
          ? [
              parseFloat(String(styleData.abvMin)),
              parseFloat(String(styleData.abvMax)),
            ]
          : [0, 0],
      ibu:
        styleData.ibuMin !== null && styleData.ibuMax !== null
          ? [
              parseInt(String(styleData.ibuMin)),
              parseInt(String(styleData.ibuMax)),
            ]
          : [0, 0],
      srm:
        styleData.srmMin !== null && styleData.srmMax !== null
          ? [
              parseInt(String(styleData.srmMin)),
              parseInt(String(styleData.srmMax)),
            ]
          : [0, 0],
      siblings: styleData.siblings || [],
      parents: styleData.parents || [],
      children: styleData.children || [],
      servingTemperature:
        styleData.servingTempMin !== null && styleData.servingTempMax !== null
          ? [
              parseInt(String(styleData.servingTempMin)),
              parseInt(String(styleData.servingTempMax)),
            ]
          : [4, 12], // デフォルト値
    };

    // キャッシュに追加
    beerStyles.push(formattedStyle);

    return formattedStyle;
  } catch (error) {
    console.error(`Error fetching beer style with slug ${slug}:`, error);
    return null;
  }
}
