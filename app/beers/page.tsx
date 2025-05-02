'use client';

import { useState, useEffect } from 'react';
import { Beer, beers } from '../../src/app/lib/beers-data';
import { motion } from 'framer-motion';

// インポートするコンポーネント
import HeroSection from '../../src/app/components/HeroSection';
import BeerFilter from '../../src/app/components/beers/BeerFilter';
import StyleNavigation from '../../src/app/components/beers/StyleNavigation';
import BeerCard from '../../src/app/components/beers/BeerCard';
import EmptyResults from '../../src/app/components/beers/EmptyResults';
import Pagination from '../../src/app/components/beers/Pagination';

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

  // フィルターをリセットする関数
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStyle('');
    setSortOption('rating');
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      {/* ヒーローセクション */}
      <HeroSection
        title="ビール図鑑"
        description="様々なクラフトビールの世界を探索しましょう。あなたの好みに合った一杯を見つけるための旅が、ここから始まります。"
      />

      {/* フィルターと検索セクション */}
      <BeerFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {/* ビールスタイルのクイックナビゲーション */}
      <StyleNavigation
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
      />

      {/* 結果の表示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6 flex items-center justify-between"
      >
        <p className="text-amber-800 font-medium">
          {filteredBeers.length} 件のビールが見つかりました
        </p>

        {/* 表示切り替え（将来的な拡張用） */}
        <div className="flex gap-2">
          <button className="btn btn-sm btn-square bg-amber-100 border-amber-200 text-amber-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <button className="btn btn-sm btn-square bg-white border-amber-200 text-amber-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* ビールリスト */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBeers.map((beer, index) => (
          <BeerCard key={beer.id} beer={beer} index={index} />
        ))}
      </div>

      {/* 結果が0件の場合 */}
      {filteredBeers.length === 0 && (
        <EmptyResults resetFilters={resetFilters} />
      )}

      {/* ページネーション */}
      <Pagination hasResults={filteredBeers.length > 0} />
    </div>
  );
}
