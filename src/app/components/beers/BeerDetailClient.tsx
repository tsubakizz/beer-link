'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { beers, beerStyles } from '../../lib/beers-data';
import { breweries } from '../../lib/breweries-data';
import BeerDetailCard from './BeerDetailCard';
import FlavorProfileCard from './FlavorProfileCard';
import ReviewsSection from './ReviewsSection';
import SimilarBeersCard from './SimilarBeersCard';

interface BeerDetailClientProps {
  id: string;
}

export default function BeerDetailClient({ id }: BeerDetailClientProps) {
  const beer = beers.find((b) => b.id === id);

  // ビールが見つからない場合は404ページを表示
  if (!beer) {
    notFound();
  }

  // ビールのスタイル情報を取得
  const style = beerStyles.find((s) => s.id === beer.style);

  // ブルワリー情報を取得
  const brewery = breweries.find((b) => b.name === beer.brewery);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href="/beers"
          className="text-amber-700 hover:text-amber-500 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          ビール一覧に戻る
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* メイン情報 */}
        <div className="lg:col-span-2 space-y-8">
          <BeerDetailCard beer={beer} style={style} brewery={brewery} />

          {/* フレーバープロファイル */}
          {beer.flavor && Object.keys(beer.flavor).length > 0 && (
            <FlavorProfileCard flavor={beer.flavor} />
          )}

          {/* レビューセクション */}
          <ReviewsSection beerId={beer.id} />
        </div>

        {/* サイドバー */}
        <div className="space-y-8">
          {/* 似たビール */}
          <SimilarBeersCard currentBeer={beer} />
        </div>
      </div>
    </div>
  );
}
