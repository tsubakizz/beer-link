'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../src/app/lib/firebase';
import { Beer } from '../../src/app/lib/beers-data';
import BeerList from '../../src/app/components/beers/BeerList';
import BeerFilter from '../../src/app/components/beers/BeerFilter';
import LoadingSpinner from '../../src/app/components/LoadingSpinner';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
    flavors: data.flavors || [],
  };
};

export default function BeersPage() {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [filteredBeers, setFilteredBeers] = useState<Beer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        // Firestoreからビールデータを取得
        const beersCollection = collection(db, 'beers');
        const beersSnapshot = await getDocs(beersCollection);

        if (beersSnapshot.empty) {
          // 空の配列を設定してエラーメッセージは表示しない
          setBeers([]);
          setFilteredBeers([]);
        } else {
          // FirestoreデータをBeer型に変換
          const beerList = beersSnapshot.docs.map(convertToFirestoreBeer);
          setBeers(beerList);
          setFilteredBeers(beerList);
        }
      } catch (error) {
        console.error('ビールデータの取得中にエラーが発生しました:', error);
        // エラーが発生しても空配列を設定
        setBeers([]);
        setFilteredBeers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBeers();
  }, []);

  // フィルタリング関数
  const handleFilterChange = (filteredBeers: Beer[]) => {
    setFilteredBeers(filteredBeers);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 sm:px-6 text-center">
        <LoadingSpinner size="large" message="ビールデータを読み込み中..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      {/* ヒーローセクション - データがあってもなくても常に表示 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 shadow-md"
      >
        <div className="relative z-10 px-5 py-8 md:py-10 flex flex-col md:flex-row items-center md:px-8">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-amber-900 drop-shadow-sm">
              ビール図鑑
            </h1>
            <p className="text-amber-900 max-w-xl text-base mb-6">
              世界中のビールを探索し、新しい味わいとの出会いを楽しみましょう。
              あなたの好みに合ったビールがきっと見つかります。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/styles"
                className="btn bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
              >
                スタイルから探す
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                href="/breweries"
                className="btn btn-outline border-amber-300 text-amber-900 hover:bg-amber-100"
              >
                ブルワリーから探す
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <div className="absolute inset-0 rounded-full bg-amber-200 opacity-50 blur-lg"></div>
              <div className="relative flex items-center justify-center h-full text-5xl md:text-6xl">
                🍺
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 検索フィルター - データがあってもなくても常に表示 */}
      <BeerFilter beers={beers} onFilterChange={handleFilterChange} />

      {/* ビール一覧 - BeerListコンポーネントがデータなしの表示を内部で処理 */}
      <BeerList beers={filteredBeers} />
    </div>
  );
}
