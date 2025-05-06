// サーバーコンポーネント（デフォルト）、Edge Runtimeを明示的に指定
export const runtime = 'edge';

import { notFound } from 'next/navigation';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '@/src/app/lib/firebase';
import { Beer } from '@/src/app/lib/beers-data';
import { BeerStyle } from '@/src/app/types/beer-style';
import BeerDetailClient from '@/src/app/components/beers/BeerDetailClient';

interface BeerPageProps {
  params: {
    id: string;
  };
}

// FirestoreのデータをBeer型に変換する関数
const convertToFirestoreBeer = (doc: any): Beer => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    brewery: data.brewery,
    style: data.style,
    abv: data.abv,
    ibu: data.ibu,
    description: data.description,
    imageUrl: data.imageUrl || null,
    rating: data.rating || 0,
    reviewCount: data.reviewCount || 0,
    flavors: data.flavors || [],
    country: data.country || null,
  };
};

export default async function BeerDetailPage({ params }: BeerPageProps) {
  const { id } = params;

  try {
    // Firestoreから特定のビールデータを取得
    const beerRef = doc(db, 'beers', id);
    const beerSnapshot = await getDoc(beerRef);

    if (!beerSnapshot.exists()) {
      return notFound();
    }

    const beer = convertToFirestoreBeer(beerSnapshot);

    // ビールスタイル情報を取得 - APIを使用（better-sqlite3に依存しない）
    const apiUrl = `/api/beer-styles/${beer.style}`;
    let style = null;
    try {
      const styleResponse = await fetch(apiUrl);
      if (styleResponse.ok) {
        style = await styleResponse.json();
      }
    } catch (styleError) {
      console.error('Style fetch error:', styleError);
    }

    // 同じスタイルの類似ビールを取得（最大3件）
    let similarBeers: Beer[] = [];
    if (beer.style) {
      const similarBeersRef = collection(db, 'beers');
      const similarBeersQuery = query(
        similarBeersRef,
        where('style', '==', beer.style)
      );
      const similarBeersSnapshot = await getDocs(similarBeersQuery);

      if (!similarBeersSnapshot.empty) {
        const allSimilarBeers = similarBeersSnapshot.docs
          .map(convertToFirestoreBeer)
          .filter((similarBeer) => similarBeer.id !== id);

        // ランダムに最大3つ選択
        const shuffledBeers = [...allSimilarBeers].sort(
          () => 0.5 - Math.random()
        );
        similarBeers = shuffledBeers.slice(0, 3);
      }
    }

    // すべての必要なデータを取得したらクライアントコンポーネントに渡す
    return (
      <BeerDetailClient
        id={id}
        beer={beer}
        // style={style}
        similarBeers={similarBeers}
      />
    );
  } catch (error) {
    console.error('ビールデータの取得中にエラーが発生しました:', error);
    return notFound();
  }
}
