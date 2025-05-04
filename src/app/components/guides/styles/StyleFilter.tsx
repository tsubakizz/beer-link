'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface StyleFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterParams: FilterParams;
  setFilterParams: (params: FilterParams) => void;
}

export interface FilterParams {
  bitterness: number | null;
  sweetness: number | null;
  body: number | null;
  aroma: number | null;
  sourness: number | null;
  abvMin: number | null;
  abvMax: number | null;
  origin: string | null;
}

// 味わい特性のスライダーのオプション
const flavorLevels = [
  { value: null, label: '指定なし' },
  { value: 1, label: '弱い' },
  { value: 2, label: 'やや弱い' },
  { value: 3, label: '普通' },
  { value: 4, label: 'やや強い' },
  { value: 5, label: '強い' },
];

// アルコール度数の範囲オプション
const abvRanges = [
  { min: null, max: null, label: '指定なし' },
  { min: 0, max: 4, label: '軽め (～4%)' },
  { min: 4, max: 6, label: '標準 (4～6%)' },
  { min: 6, max: 8, label: 'やや高め (6～8%)' },
  { min: 8, max: 100, label: '高め (8%～)' },
];

// 代表的な原産国/地域
const origins = [
  { value: null, label: '指定なし' },
  { value: 'ドイツ', label: 'ドイツ' },
  { value: 'ベルギー', label: 'ベルギー' },
  { value: 'イギリス', label: 'イギリス' },
  { value: 'チェコ', label: 'チェコ' },
  { value: 'アメリカ', label: 'アメリカ' },
  { value: 'その他', label: 'その他' },
];

export default function StyleFilter({
  searchQuery,
  setSearchQuery,
  filterParams,
  setFilterParams,
}: StyleFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // フィルター値変更ハンドラー
  const handleFilterChange = (param: keyof FilterParams, value: any) => {
    setFilterParams({ ...filterParams, [param]: value });
  };

  // ABV範囲の変更ハンドラー
  const handleAbvRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedIndex = parseInt(event.target.value);
    if (selectedIndex === 0) {
      // 「指定なし」の場合
      handleFilterChange('abvMin', null);
      handleFilterChange('abvMax', null);
    } else {
      const selectedRange = abvRanges[selectedIndex];
      handleFilterChange('abvMin', selectedRange.min);
      handleFilterChange('abvMax', selectedRange.max);
    }
  };

  // 現在選択中のABV範囲のインデックスを取得
  const getCurrentAbvRangeIndex = () => {
    const { abvMin, abvMax } = filterParams;
    if (abvMin === null && abvMax === null) return 0;

    return (
      abvRanges.findIndex(
        (range) => range.min === abvMin && range.max === abvMax
      ) || 0
    );
  };

  // フィルターのリセット
  const resetFilters = () => {
    setFilterParams({
      bitterness: null,
      sweetness: null,
      body: null,
      aroma: null,
      sourness: null,
      abvMin: null,
      abvMax: null,
      origin: null,
    });
  };

  // アクティブなフィルター数をカウント
  const activeFilterCount = Object.values(filterParams).filter(
    (value) => value !== null
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
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
          {activeFilterCount > 0 && (
            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-amber-600 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div
        className={`bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl shadow-sm mb-8 transition-all duration-300 ${
          isFilterOpen
            ? 'max-h-[800px] opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden p-0'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                placeholder="スタイル名や特徴で検索..."
                className="input input-bordered w-full pl-10 bg-white border-amber-200 focus:border-amber-400 text-amber-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 原産国フィルター */}
          <div>
            <label
              htmlFor="origin"
              className="block mb-2 text-sm font-medium text-amber-900"
            >
              原産国/地域
            </label>
            <select
              id="origin"
              className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-900"
              value={filterParams.origin || ''}
              onChange={(e) =>
                handleFilterChange('origin', e.target.value || null)
              }
            >
              {origins.map((origin, index) => (
                <option key={`origin-${index}`} value={origin.value || ''}>
                  {origin.label}
                </option>
              ))}
            </select>
          </div>

          {/* アルコール度数フィルター */}
          <div>
            <label
              htmlFor="abv"
              className="block mb-2 text-sm font-medium text-amber-900"
            >
              アルコール度数
            </label>
            <select
              id="abv"
              className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-900"
              value={getCurrentAbvRangeIndex()}
              onChange={handleAbvRangeChange}
            >
              {abvRanges.map((range, index) => (
                <option key={`abv-${index}`} value={index}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 味わい特性フィルター */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* 苦味 */}
          <div>
            <label
              htmlFor="bitterness"
              className="block mb-2 text-sm font-medium text-amber-900"
            >
              苦味
            </label>
            <select
              id="bitterness"
              className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-900"
              value={
                filterParams.bitterness === null ? '' : filterParams.bitterness
              }
              onChange={(e) =>
                handleFilterChange(
                  'bitterness',
                  e.target.value ? Number(e.target.value) : null
                )
              }
            >
              {flavorLevels.map((level, index) => (
                <option key={`bitter-${index}`} value={level.value || ''}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* 甘み */}
          <div>
            <label
              htmlFor="sweetness"
              className="block mb-2 text-sm font-medium text-amber-900"
            >
              甘み
            </label>
            <select
              id="sweetness"
              className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-900"
              value={
                filterParams.sweetness === null ? '' : filterParams.sweetness
              }
              onChange={(e) =>
                handleFilterChange(
                  'sweetness',
                  e.target.value ? Number(e.target.value) : null
                )
              }
            >
              {flavorLevels.map((level, index) => (
                <option key={`sweet-${index}`} value={level.value || ''}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* ボディ */}
          <div>
            <label
              htmlFor="body"
              className="block mb-2 text-sm font-medium text-amber-900"
            >
              ボディ
            </label>
            <select
              id="body"
              className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-900"
              value={filterParams.body === null ? '' : filterParams.body}
              onChange={(e) =>
                handleFilterChange(
                  'body',
                  e.target.value ? Number(e.target.value) : null
                )
              }
            >
              {flavorLevels.map((level, index) => (
                <option key={`body-${index}`} value={level.value || ''}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* 香り */}
          <div>
            <label
              htmlFor="aroma"
              className="block mb-2 text-sm font-medium text-amber-900"
            >
              香り
            </label>
            <select
              id="aroma"
              className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-900"
              value={filterParams.aroma === null ? '' : filterParams.aroma}
              onChange={(e) =>
                handleFilterChange(
                  'aroma',
                  e.target.value ? Number(e.target.value) : null
                )
              }
            >
              {flavorLevels.map((level, index) => (
                <option key={`aroma-${index}`} value={level.value || ''}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* 酸味 */}
          <div>
            <label
              htmlFor="sourness"
              className="block mb-2 text-sm font-medium text-amber-900"
            >
              酸味
            </label>
            <select
              id="sourness"
              className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-900"
              value={
                filterParams.sourness === null ? '' : filterParams.sourness
              }
              onChange={(e) =>
                handleFilterChange(
                  'sourness',
                  e.target.value ? Number(e.target.value) : null
                )
              }
            >
              {flavorLevels.map((level, index) => (
                <option key={`sour-${index}`} value={level.value || ''}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* フィルターリセットボタン */}
        <div className="mt-4 flex justify-end">
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
