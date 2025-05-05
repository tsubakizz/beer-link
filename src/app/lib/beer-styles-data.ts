import { db } from './firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

// ビールスタイルの定義
export type BeerStyle = {
  id: string;
  name: string;
  description: string;
  other_name?: string[]; // 検索性向上のための別名（任意）
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
  id: string;
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

// ビールスタイルのデータを保持する配列
export const beerStyles: BeerStyle[] = [];

// Firestoreからビールスタイルを取得する関数
export async function fetchBeerStyles(): Promise<BeerStyle[]> {
  try {
    // すでにデータが読み込まれている場合は再取得しない
    if (beerStyles.length > 0) {
      return beerStyles;
    }

    const stylesCollection = collection(db, 'beerStyles');
    const stylesSnapshot = await getDocs(stylesCollection);

    // スナップショットからドキュメントを配列に変換
    stylesSnapshot.forEach((doc) => {
      const styleData = doc.data() as BeerStyle;
      styleData.id = doc.id; // ドキュメントIDをスタイルIDとして設定
      beerStyles.push(styleData);
    });

    console.log(`Loaded ${beerStyles.length} beer styles from Firestore`);
    return beerStyles;
  } catch (error) {
    console.error('Error fetching beer styles from Firestore:', error);
    return [];
  }
}

// 全てのビールスタイルのカード表示用データを取得する非同期関数
export async function getAllBeerStyleCards(): Promise<BeerStyleCard[]> {
  const styles = await fetchBeerStyles();
  return styles.map((style) => getBeerStyleCard(style));
}

// IDによってビールスタイルを取得する関数
export async function getBeerStyleById(id: string): Promise<BeerStyle | null> {
  try {
    // まずメモリキャッシュから検索
    const cachedStyle = beerStyles.find((style) => style.id === id);
    if (cachedStyle) {
      return cachedStyle;
    }

    // キャッシュにない場合は直接Firestoreから取得
    const styleDoc = await getDoc(doc(db, 'beerStyles', id));
    if (styleDoc.exists()) {
      const styleData = styleDoc.data() as BeerStyle;
      styleData.id = styleDoc.id;

      // キャッシュに追加
      beerStyles.push(styleData);

      return styleData;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching beer style with ID ${id}:`, error);
    return null;
  }
}
