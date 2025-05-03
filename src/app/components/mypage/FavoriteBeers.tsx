'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Beer, beers as allBeers } from '../../lib/beers-data';
import Image from 'next/image';

interface FavoriteBeersProps {
  favoriteBeers: string[];
}

export default function FavoriteBeers({ favoriteBeers }: FavoriteBeersProps) {
  const [userFavoriteBeers, setUserFavoriteBeers] = useState<Beer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // お気に入りのビールIDリストからビール情報を取得
    const fetchFavoriteBeers = () => {
      try {
        // favoriteBeersのIDと一致するビールをallBeersから取得
        const filteredBeers = allBeers.filter((beer) =>
          favoriteBeers.includes(beer.id)
        );

        setUserFavoriteBeers(filteredBeers);
      } catch (error) {
        console.error('お気に入りビールの取得に失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteBeers();
  }, [favoriteBeers]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-amber-900 mb-6">
          お気に入りビール
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
        お気に入りビール
      </h2>

      {userFavoriteBeers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">
            お気に入りに登録したビールはありません
          </p>
          <Link
            href="/beers"
            className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white"
          >
            ビールを探す
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userFavoriteBeers.map((beer) => (
            <Link
              key={beer.id}
              href={`/beers/${beer.id}`}
              className="block hover:bg-amber-50 transition-colors rounded-lg p-3"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg flex items-center justify-center overflow-hidden">
                  {beer.imageUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={beer.imageUrl}
                        alt={beer.name}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  ) : (
                    <div className="text-amber-800/30 text-3xl">🍺</div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{beer.name}</h3>
                  <p className="text-sm text-gray-600">{beer.brewery}</p>
                  <p className="text-xs text-gray-500">
                    スタイル: {beer.style}
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="text-xs bg-amber-100 text-amber-800 rounded px-2 py-0.5">
                      {beer.abv}%
                    </div>
                    {beer.ibu && (
                      <div className="ml-2 text-xs bg-amber-100 text-amber-800 rounded px-2 py-0.5">
                        IBU: {beer.ibu}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {userFavoriteBeers.length > 0 && (
        <div className="mt-6 text-center">
          <Link
            href="/beers"
            className="text-sm text-amber-600 hover:text-amber-800 underline"
          >
            もっとビールを探す
          </Link>
        </div>
      )}
    </div>
  );
}
