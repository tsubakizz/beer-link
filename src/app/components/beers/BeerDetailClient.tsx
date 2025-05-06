'use client';

import Link from 'next/link';
import { Beer } from '@/src/app/lib/beers-data';
import { BeerStyle } from '@/src/app/types/beer-style';
import BeerDetailCard from '@/src/app/components/beers/BeerDetailCard';
import FlavorProfileCard from '@/src/app/components/beers/FlavorProfileCard';
import ReviewsSection from '@/src/app/components/beers/ReviewsSection';
import SimilarBeersCard from '@/src/app/components/beers/SimilarBeersCard';

interface BeerDetailClientProps {
  id: string;
  beer: Beer;
  style?: BeerStyle | null;
  similarBeers: Beer[];
}

export default function BeerDetailClient({
  id,
  beer,
  style,
  similarBeers,
}: BeerDetailClientProps) {
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
          <BeerDetailCard beer={beer} styleName={style?.name || beer.style} />

          {/* フレーバープロファイル */}
          {style && <FlavorProfileCard beerStyle={style} />}

          {/* レビューセクション */}
          <ReviewsSection beerId={beer.id} beerName={beer.name} />
        </div>

        {/* サイドバー */}
        <div className="space-y-8">
          {/* 似たビール */}
          <SimilarBeersCard beers={similarBeers} />
        </div>
      </div>
    </div>
  );
}
