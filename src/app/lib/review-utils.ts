import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * 特定のビールのレビュー統計（評価の平均と数）を計算して更新する関数
 * @param beerId - ビールのID
 * @param preCalculatedCount - 事前計算済みのレビュー数（オプション）
 * @param preCalculatedAverage - 事前計算済みの平均評価（オプション）
 */
export async function updateBeerRatingStatistics(
  beerId: string,
  preCalculatedCount?: number,
  preCalculatedAverage?: number
): Promise<void> {
  try {
    let averageRating: number | null;
    let reviewCount: number;

    // 事前計算された値がある場合はそれを使用
    if (
      typeof preCalculatedCount === 'number' &&
      typeof preCalculatedAverage === 'number'
    ) {
      reviewCount = preCalculatedCount;
      averageRating = preCalculatedCount > 0 ? preCalculatedAverage : null;
    } else {
      // そのビールに関連する全レビューを取得して計算
      const reviewsRef = collection(db, 'reviews');
      const reviewQuery = query(reviewsRef, where('beerId', '==', beerId));
      const reviewSnapshot = await getDocs(reviewQuery);

      // レビュー統計の計算
      let totalRating = 0;
      reviewCount = 0;

      // レビューがある場合は平均評価を計算
      if (!reviewSnapshot.empty) {
        reviewSnapshot.docs.forEach((doc: DocumentData) => {
          const data = doc.data();
          totalRating += data.rating || 0;
          reviewCount++;
        });
      }

      // 平均評価の計算（レビューがなければnull）
      averageRating = reviewCount > 0 ? totalRating / reviewCount : null;
    }

    // ビールドキュメントを更新
    const beerRef = doc(db, 'beers', beerId);
    await updateDoc(beerRef, {
      rating:
        averageRating !== null ? parseFloat(averageRating.toFixed(1)) : null, // レビューがある場合のみ小数点第1位で丸める
      ratingCount: reviewCount,
    });

    console.log(
      `ビールID ${beerId} の評価統計を更新しました。評価: ${
        averageRating !== null ? averageRating.toFixed(1) : 'null'
      }, レビュー数: ${reviewCount}`
    );
  } catch (error) {
    console.error('ビール評価統計の更新中にエラーが発生しました:', error);
    throw error;
  }
}
