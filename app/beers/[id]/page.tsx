'use client';

import { useParams } from 'next/navigation';
import {
  Beer,
  BeerStyle,
  beers,
  beerStyles,
} from '../../../src/app/lib/beers-data';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// インポートするコンポーネント
import BeerDetailCard from '../../../src/app/components/beers/BeerDetailCard';
import FlavorProfileCard from '../../../src/app/components/beers/FlavorProfileCard';
import BreweryCard from '../../../src/app/components/beers/BreweryCard';
import SimilarBeersCard from '../../../src/app/components/beers/SimilarBeersCard';
import ReviewsSection from '../../../src/app/components/beers/ReviewsSection';
import LoadingSpinner from '../../../src/app/components/LoadingSpinner';

export default function BeerDetailPage() {
  const params = useParams();
  const beerId = params.id as string;
  const [beer, setBeer] = useState<Beer | null>(null);
  const [beerStyle, setBeerStyle] = useState<BeerStyle | null>(null);
  const [similarBeers, setSimilarBeers] = useState<Beer[]>([]);
  const [styleName, setStyleName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialDataLoaded, setInitialDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    // 初期データ取得処理を即時実行
    const foundBeer = beers.find((b) => b.id === beerId) || null;
    setBeer(foundBeer);

    if (foundBeer) {
      // ビールスタイルを検索
      const style = beerStyles.find((s) => s.id === foundBeer.style) || null;
      setBeerStyle(style);
      setStyleName(style ? style.name : foundBeer.style);

      // 同じスタイルの類似ビールを検索 (同じビールを除く、最大4つ)
      const similar = beers
        .filter((b) => b.style === foundBeer.style && b.id !== foundBeer.id)
        .slice(0, 4);
      setSimilarBeers(similar);
    }

    // データ取得完了を通知
    setInitialDataLoaded(true);
  }, [beerId]);

  // LoadingSpinnerが非表示になったときに呼ばれるコールバック
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // ローディング表示
  if (isLoading) {
    return (
      <div className="container mx-auto">
        <LoadingSpinner
          size="large"
          message="ビール情報を読み込み中..."
          minDisplayTime={700}
          initialLoading={!initialDataLoaded}
          onLoadingComplete={handleLoadingComplete}
        />
      </div>
    );
  }

  // ビールが見つからない場合
  if (!beer) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-amber-900">
          ビールが見つかりません
        </h1>
        <p className="text-amber-800">
          指定されたIDのビールは存在しないか、削除された可能性があります。
        </p>
        <Link
          href="/beers"
          className="btn bg-amber-500 hover:bg-amber-600 text-white mt-6"
        >
          ビール図鑑に戻る
        </Link>
      </div>
    );
  }

  // ビールの詳細表示
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto py-8 px-4 sm:px-6"
    >
      {/* パンくずリスト */}
      <nav className="breadcrumbs mb-6 text-sm">
        <ul className="flex items-center text-amber-600">
          <li className="flex items-center">
            <Link href="/" className="hover:text-amber-800">
              ホーム
            </Link>
            <svg
              className="mx-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li className="flex items-center">
            <Link href="/beers" className="hover:text-amber-800">
              ビール図鑑
            </Link>
            <svg
              className="mx-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li className="text-amber-800 font-medium truncate max-w-[200px]">
            {beer.name}
          </li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* メイン情報エリア */}
        <div className="lg:col-span-2">
          {/* ビール詳細カード */}
          <BeerDetailCard beer={beer} styleName={styleName} />

          {/* 味わいプロファイル */}
          {beerStyle && <FlavorProfileCard beerStyle={beerStyle} />}

          {/* レビューセクション */}
          <ReviewsSection beerId={beer.id} beerName={beer.name} />
        </div>

        {/* サイドバー */}
        <div className="lg:col-span-1">
          {/* ブルワリー情報 */}
          <BreweryCard breweryName={beer.brewery} />

          {/* 類似ビール */}
          <SimilarBeersCard beers={similarBeers} />
        </div>
      </div>
    </motion.div>
  );
}
