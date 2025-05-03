'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface Review {
  beerId: string;
  content: string;
  date: string;
}

interface Beer {
  id: string;
  name: string;
  brewery: string;
  imageUrl?: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  const [reviewsWithBeerInfo, setReviewsWithBeerInfo] = useState<
    (Review & { beer: Beer })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBeersForReviews = async () => {
      if (reviews.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const beerIds = [...new Set(reviews.map((review) => review.beerId))];
        const beersRef = collection(db, 'beers');
        const q = query(beersRef, where('id', 'in', beerIds));
        const querySnapshot = await getDocs(q);

        const beersMap = new Map<string, Beer>();
        querySnapshot.forEach((doc) => {
          beersMap.set(doc.id, { id: doc.id, ...doc.data() } as Beer);
        });

        const reviewsWithBeers = reviews.map((review) => ({
          ...review,
          beer: beersMap.get(review.beerId)!,
        }));

        setReviewsWithBeerInfo(reviewsWithBeers);
      } catch (error) {
        console.error('レビュー情報の取得に失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBeersForReviews();
  }, [reviews]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-amber-900 mb-6">
          レビュー履歴
        </h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-amber-900 mb-6">
        レビュー履歴
      </h2>

      {reviewsWithBeerInfo.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          まだレビューを投稿していません
        </p>
      ) : (
        <div className="space-y-6">
          {reviewsWithBeerInfo.map((review, index) => (
            <div
              key={`${review.beerId}-${index}`}
              className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0"
            >
              <Link
                href={`/beers/${review.beerId}`}
                className="flex items-start space-x-4 mb-3 hover:bg-amber-50 rounded-lg p-2 transition-colors"
              >
                {review.beer.imageUrl && (
                  <img
                    src={review.beer.imageUrl}
                    alt={review.beer.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {review.beer.name}
                  </h3>
                  <p className="text-sm text-gray-600">{review.beer.brewery}</p>
                </div>
              </Link>

              <div className="ml-2">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {review.content}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(review.date).toLocaleDateString('ja-JP')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
