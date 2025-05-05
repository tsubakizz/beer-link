import { useState } from 'react';
import { motion } from 'framer-motion';
import { beerStyles } from '../../../app/lib/beers-data';

// 新しい型定義
interface BeerFilterProps {
  filters: {
    beerTypes: string[];
    breweries: string[];
    abvRange: { min: number; max: number };
    ibuRange: { min: number; max: number };
    search: string;
  };
  onFilterChange: (newFilters: any) => void;
  onFilteredBeersChange: (ids: string[]) => void;
}

export default function BeerFilter({
  filters,
  onFilterChange,
  onFilteredBeersChange,
}: BeerFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const resetFilters = () => {
    onFilterChange({
      beerTypes: [],
      breweries: [],
      abvRange: { min: 0, max: 15 },
      ibuRange: { min: 0, max: 120 },
      search: '',
    });
  };

  // 検索クエリの変更ハンドラー
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: e.target.value,
    });
  };

  // ビアスタイルの選択ハンドラー
  const handleStyleChange = (style: string) => {
    // スタイルが既に選択されている場合は解除、そうでなければ追加
    const updatedTypes = filters.beerTypes.includes(style)
      ? filters.beerTypes.filter((t) => t !== style)
      : [...filters.beerTypes, style];

    onFilterChange({
      ...filters,
      beerTypes: updatedTypes,
    });
  };

  // ソートオプションの変更ハンドラー
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 新しいソートオプションをフィルターに追加
    // 注: 現在のフィルタ構造にはソートが含まれていないため、追加が必要か検討
    console.log(`ソートオプション変更: ${e.target.value}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
        <h2 className="text-2xl font-bold text-amber-900">探す</h2>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="btn btn-sm bg-amber-100 text-amber-900 border-amber-300 gap-2"
        >
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          フィルター {isFilterOpen ? '閉じる' : '開く'}
        </button>
      </div>

      <div
        className={`bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-sm mb-4 transition-all duration-300 ${
          isFilterOpen
            ? 'max-h-96 opacity-100 p-4 pointer-events-auto'
            : 'max-h-0 opacity-0 overflow-hidden p-0 invisible pointer-events-none'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* 検索ボックス */}
          <div>
            <label
              htmlFor="search"
              className="block mb-2 text-sm font-medium text-amber-900"
            >
              検索
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-amber-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                placeholder="ビール名、ブルワリー、または特徴を検索"
                className="input input-bordered w-full pl-10 bg-white border-amber-200 focus:border-amber-400 text-amber-900"
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* スタイルフィルター */}
          <div>
            <label
              htmlFor="style"
              className="block mb-2 text-sm font-medium text-amber-900"
            >
              ビアスタイル
            </label>
            <select
              id="style"
              className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-900"
              value=""
              onChange={(e) => handleStyleChange(e.target.value)}
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
            <label
              htmlFor="sort"
              className="block mb-2 text-sm font-medium text-amber-900"
            >
              並び替え
            </label>
            <select
              id="sort"
              className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-900"
              onChange={handleSortChange}
            >
              <option value="rating">評価順</option>
              <option value="name">名前順</option>
              <option value="abv">アルコール度数順</option>
              <option value="reviews">レビュー数順</option>
            </select>
          </div>
        </div>

        {/* フィルターリセットボタン */}
        <div className="mt-3 flex justify-end">
          <button
            className="btn btn-sm bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100"
            onClick={resetFilters}
          >
            フィルターをリセット
          </button>
        </div>
      </div>
    </motion.div>
  );
}
