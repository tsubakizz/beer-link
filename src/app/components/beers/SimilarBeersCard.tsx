import React from 'react';
import Link from 'next/link';
import { Beer } from '@/src/app/lib/beers-data';
import { motion } from 'framer-motion';
import Image from 'next/image';

// レビューデータの型定義
interface ReviewData {
  count: number;
  averageRating: number | null; // nullの場合はレビューがない
}

interface SimilarBeersCardProps {
  beers: Beer[];
  reviewData?: {
    [beerId: string]: ReviewData;
  };
}

export default function SimilarBeersCard({
  beers,
  reviewData = {},
}: SimilarBeersCardProps) {
  if (beers.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-amber-900 flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
        類似のビール
      </h2>
      <div className="space-y-4">
        {beers.map((beer) => {
          // レビューデータがあれば使用、なければハイフン表示
          const beerReviewData = reviewData[beer.id];
          const hasRating =
            beerReviewData?.averageRating != null &&
            beerReviewData.count &&
            beerReviewData.count > 0;

          return (
            <Link
              href={`/beers/${beer.id}`}
              key={beer.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition-colors group"
            >
              <div className="bg-gradient-to-br from-amber-100 to-amber-50 w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden">
                {beer.imageUrl ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={beer.imageUrl}
                      alt={beer.name}
                      layout="fill"
                      objectFit="contain"
                      className="p-1"
                    />
                  </div>
                ) : (
                  <span className="text-amber-800/30 text-2xl">🍺</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-amber-900 truncate group-hover:text-amber-700 transition-colors">
                  {beer.name}
                </h4>
                <p className="text-sm text-amber-700 truncate">
                  {beer.brewery}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="badge badge-sm bg-amber-100 border-amber-200 text-amber-800">
                    {hasRating ? beerReviewData.averageRating!.toFixed(1) : '-'}
                  </div>
                  <span className="text-xs text-amber-600">
                    ABV {beer.abv}%
                  </span>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
