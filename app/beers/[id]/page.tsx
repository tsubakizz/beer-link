'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../../src/app/lib/firebase';
import { Beer, BeerStyle } from '../../../src/app/lib/beers-data';
import BeerDetailClient from '../../../src/app/components/beers/BeerDetailClient';
import LoadingSpinner from '../../../src/app/components/LoadingSpinner';

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
    ratingCount: data.ratingCount || 0,
  };
};

// FirestoreのデータをBeerStyle型に変換する関数
const convertToFirestoreBeerStyle = (doc: any): BeerStyle => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    description: data.description,
    abv: data.abv || null,
    ibu: data.ibu || null,
    srm: data.srm || null,
    other_name: data.other_name || [],
    origin: data.origin || null,
    history: data.history || null,
    servingTemperature: data.servingTemperature || null,
    characteristics: data.characteristics || {
      bitterness: 0,
      sweetness: 0,
      sourness: 0,
      hoppiness: 0,
      maltiness: 0,
      fruitiness: 0,
    },
    parents: data.parents || [],
    children: data.children || [],
    siblings: data.siblings || [],
  };
};

export default function BeerDetailPage({ params }: BeerPageProps) {
  const { id } = params;
  const [beer, setBeer] = useState<Beer | null>(null);
  const [style, setStyle] = useState<BeerStyle | null>(null);
  const [similarBeers, setSimilarBeers] = useState<Beer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBeerData = async () => {
      setIsLoading(true);

      try {
        // Firestoreから特定のビールデータを取得
        const beerRef = doc(db, 'beers', id);
        const beerSnapshot = await getDoc(beerRef);

        if (!beerSnapshot.exists()) {
          setError('ビールが見つかりませんでした');
          setIsLoading(false);
          return;
        }

        const beerData = convertToFirestoreBeer(beerSnapshot);
        setBeer(beerData);

        // ビールのスタイル情報を取得
        if (beerData.style) {
          const styleRef = collection(db, 'beerStyles');
          const styleQuery = query(styleRef, where('id', '==', beerData.style));
          const styleSnapshot = await getDocs(styleQuery);

          if (!styleSnapshot.empty) {
            setStyle(convertToFirestoreBeerStyle(styleSnapshot.docs[0]));
          }
        }

        // 同じスタイルの類似ビールを取得（最大3件）
        if (beerData.style) {
          const similarBeersRef = collection(db, 'beers');
          const similarBeersQuery = query(
            similarBeersRef,
            where('style', '==', beerData.style)
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
            setSimilarBeers(shuffledBeers.slice(0, 3));
          }
        }
      } catch (error) {
        console.error('ビールデータの取得中にエラーが発生しました:', error);
        setError('データの取得中にエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBeerData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 sm:px-6 text-center">
        <LoadingSpinner size="large" message="ビール情報を読み込み中..." />
      </div>
    );
  }

  if (error || !beer) {
    return notFound();
  }

  return (
    <BeerDetailClient beer={beer} style={style} similarBeers={similarBeers} />
  );
}
