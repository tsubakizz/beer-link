'use client';

import { useState, useEffect } from 'react';
import {
  Beer,
  BeerStyle,
  beers,
  beerStyles,
} from '../../src/app/lib/beers-data';
import Image from 'next/image';
import Link from 'next/link';

export default function BeersPage() {
  // State for filtering and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('rating');
  const [filteredBeers, setFilteredBeers] = useState<Beer[]>(beers);

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    let result = [...beers];

    // Apply style filter
    if (selectedStyle) {
      result = result.filter((beer) => beer.style === selectedStyle);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (beer) =>
          beer.name.toLowerCase().includes(query) ||
          beer.brewery.toLowerCase().includes(query) ||
          beer.description.toLowerCase().includes(query) ||
          beer.flavors.some((flavor) => flavor.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    switch (sortOption) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'abv':
        result.sort((a, b) => b.abv - a.abv);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    setFilteredBeers(result);
  }, [searchQuery, selectedStyle, sortOption]);

  // Get beer style name by ID
  const getBeerStyleName = (styleId: string): string => {
    const style = beerStyles.find((style) => style.id === styleId);
    return style ? style.name : styleId;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">ビール図鑑</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          様々なクラフトビールの種類と特徴を探索しましょう。お気に入りのビールを見つけるためのフィルター機能を使って、あなたの好みに合ったビールを探してみてください。
        </p>
      </div>

      {/* フィルターと検索セクション */}
      <div className="bg-amber-50 p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 検索ボックス */}
          <div>
            <label htmlFor="search" className="block mb-2 text-sm font-medium">
              検索
            </label>
            <input
              type="text"
              id="search"
              placeholder="ビール名、ブルワリー、または特徴を検索"
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* スタイルフィルター */}
          <div>
            <label htmlFor="style" className="block mb-2 text-sm font-medium">
              ビアスタイル
            </label>
            <select
              id="style"
              className="select select-bordered w-full"
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
            >
              <option value="">すべてのスタイル</option>
              {beerStyles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>

          {/* 並び替え */}
          <div>
            <label htmlFor="sort" className="block mb-2 text-sm font-medium">
              並び替え
            </label>
            <select
              id="sort"
              className="select select-bordered w-full"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="rating">評価順</option>
              <option value="name">名前順</option>
              <option value="abv">アルコール度数順</option>
              <option value="reviews">レビュー数順</option>
            </select>
          </div>
        </div>
      </div>

      {/* ビールスタイルのクイックナビゲーション */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {beerStyles.map((style) => (
          <button
            key={style.id}
            onClick={() =>
              setSelectedStyle(selectedStyle === style.id ? '' : style.id)
            }
            className={`btn btn-sm ${
              selectedStyle === style.id ? 'btn-primary' : 'btn-outline'
            }`}
          >
            {style.name}
          </button>
        ))}
      </div>

      {/* 結果の表示 */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredBeers.length} 件のビールが見つかりました
        </p>
      </div>

      {/* ビールリスト */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBeers.map((beer) => (
          <div
            key={beer.id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <figure className="relative h-48 bg-amber-100">
              {beer.imageUrl && (
                <Image
                  src={beer.imageUrl}
                  alt={beer.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              )}
              <div className="absolute top-2 right-2 bg-amber-500 text-white py-1 px-2 rounded-md text-sm font-bold">
                {beer.rating.toFixed(1)}
              </div>
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl">{beer.name}</h2>
              <p className="text-sm text-gray-600">{beer.brewery}</p>
              <div className="mb-2">
                <span className="badge badge-outline mr-2">
                  {getBeerStyleName(beer.style)}
                </span>
                <span className="text-sm">ABV {beer.abv}%</span>
                {beer.ibu && (
                  <span className="text-sm ml-2">IBU {beer.ibu}</span>
                )}
              </div>
              <p className="text-sm line-clamp-3">{beer.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {beer.flavors.map((flavor, index) => (
                  <span key={index} className="badge badge-sm">
                    {flavor}
                  </span>
                ))}
              </div>
              <div className="card-actions justify-end mt-4">
                <div className="flex items-center text-sm mr-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-amber-500 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  <span>{beer.reviewCount}件のレビュー</span>
                </div>
                <Link
                  href={`/beers/${beer.id}`}
                  className="btn btn-sm btn-primary"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 結果が0件の場合 */}
      {filteredBeers.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">
            条件に一致するビールが見つかりませんでした
          </h3>
          <p className="text-gray-600">検索条件を変更してみてください</p>
          <button
            className="btn btn-outline mt-4"
            onClick={() => {
              setSearchQuery('');
              setSelectedStyle('');
              setSortOption('rating');
            }}
          >
            フィルターをリセット
          </button>
        </div>
      )}
    </div>
  );
}
