'use client';

import React, { useState, Suspense } from 'react';
import BeerList from '@/src/app/components/beers/BeerList';
import BeerFilter from '@/src/app/components/beers/BeerFilter';
import LoadingSpinner from '@/src/app/components/LoadingSpinner';

// クライアントコンポーネントの内容
function BeerPageContent() {
  // フィルター状態の初期値
  const [filters, setFilters] = useState({
    beerTypes: [],
    breweries: [],
    abvRange: { min: 0, max: 15 },
    ibuRange: { min: 0, max: 120 },
    search: '',
  });

  // フィルタリングされたビールのIDを保持
  const [filteredBeerIds, setFilteredBeerIds] = useState<string[]>([]);

  // フィルター変更ハンドラー
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  // フィルタリング結果の更新ハンドラー
  const handleFilteredBeersChange = (ids: string[]) => {
    setFilteredBeerIds(ids);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-amber-900 mb-6">ビール一覧</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4 order-2 lg:order-1">
          <BeerFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onFilteredBeersChange={handleFilteredBeersChange}
          />
        </div>
        <div className="w-full lg:w-3/4 order-1 lg:order-2">
          <BeerList filteredBeerIds={filteredBeerIds} filters={filters} />
        </div>
      </div>
    </div>
  );
}

// ページコンポーネント
export default function BeersPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-16 px-4 sm:px-6 text-center">
          <LoadingSpinner size="large" message="ビール一覧を読み込み中..." />
        </div>
      }
    >
      <BeerPageContent />
    </Suspense>
  );
}
