// Firestoreからデータを取得するために必要なインポート
import { db } from './firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

// ビールの定義
export type Beer = {
  id: string;
  name: string;
  brewery: string;
  style: string;
  abv: number; // アルコール度数
  ibu?: number; // 苦味指数（オプショナル）
  description: string;
  imageUrl?: string; // 画像URL（オプショナル）
  rating: number | null; // 平均評価（レビューがない場合はnull）
  ratingCount: number; // レビュー数
  flavors: string[]; // フレーバーのリスト
  country: string; // 原産国
};

// ビールデータを保持する配列
export const beers: Beer[] = [];

// Firestoreからビールデータを取得する関数
export async function fetchBeers(): Promise<Beer[]> {
  try {
    // すでにデータが読み込まれている場合は再取得しない
    if (beers.length > 0) {
      return beers;
    }

    const beersCollection = collection(db, 'beers');
    const beersSnapshot = await getDocs(beersCollection);

    // スナップショットからドキュメントを配列に変換
    beersSnapshot.forEach((doc) => {
      const beerData = doc.data() as Beer;
      beerData.id = doc.id; // ドキュメントIDをビールIDとして設定
      beers.push(beerData);
    });

    console.log(`Loaded ${beers.length} beers from Firestore`);
    return beers;
  } catch (error) {
    console.error('Error fetching beers from Firestore:', error);
    return [];
  }
}

// IDによってビールを取得する関数
export async function getBeerById(id: string): Promise<Beer | null> {
  try {
    // まずメモリキャッシュから検索
    const cachedBeer = beers.find((beer) => beer.id === id);
    if (cachedBeer) {
      return cachedBeer;
    }

    // キャッシュにない場合は直接Firestoreから取得
    const beerDoc = await getDoc(doc(db, 'beers', id));
    if (beerDoc.exists()) {
      const beerData = beerDoc.data() as Beer;
      beerData.id = beerDoc.id;

      // キャッシュに追加
      beers.push(beerData);

      return beerData;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching beer with ID ${id}:`, error);
    return null;
  }
}
