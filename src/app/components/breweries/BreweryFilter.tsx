import React from 'react';
import {
  BreweryType,
  Region,
  regionNames,
  breweryTypeNames,
} from '../../../app/lib/breweries-data';

interface BreweryFilterProps {
  isOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedFeatures: string[];
  setSelectedFeatures: (features: string[]) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  regions: ('all' | Region)[];
  types: ('all' | BreweryType)[];
  resetFilters: () => void;
}

export default function BreweryFilter({
  isOpen,
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedType,
  setSelectedType,
  selectedFeatures,
  setSelectedFeatures,
  sortBy,
  setSortBy,
  regions,
  types,
  resetFilters,
}: BreweryFilterProps) {
  return (
    <div
      className={`bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl shadow-sm mb-8 transition-all duration-300 ${
        isOpen
          ? 'max-h-[700px] opacity-100'
          : 'max-h-0 opacity-0 overflow-hidden p-0'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
              placeholder="ブルワリー名、地域、特徴など"
              className="input input-bordered w-full pl-10 bg-white border-amber-200 focus:border-amber-400 text-amber-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* 地域フィルター */}
        <div>
          <label
            htmlFor="region"
            className="block mb-2 text-sm font-medium text-amber-900"
          >
            地域
          </label>
          <select
            id="region"
            className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-900"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="all">すべての地域</option>
            {regions
              .filter((r) => r !== 'all')
              .map((region) => (
                <option key={region} value={region}>
                  {regionNames[region as Region]}
                </option>
              ))}
          </select>
        </div>

        {/* タイプフィルター */}
        <div>
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-amber-900"
          >
            タイプ
          </label>
          <select
            id="type"
            className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-900"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">すべてのタイプ</option>
            {types
              .filter((t) => t !== 'all')
              .map((type) => (
                <option key={type} value={type}>
                  {breweryTypeNames[type as BreweryType]}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* 特徴フィルターとソート */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-4">
        <div>
          <span className="block mb-2 text-sm font-medium text-amber-900">
            特徴
          </span>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2 py-2 px-3 rounded-full bg-white border border-amber-200 cursor-pointer hover:bg-amber-50 transition-colors">
              <input
                type="checkbox"
                className="checkbox checkbox-xs checkbox-warning"
                checked={selectedFeatures.includes('taproom')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFeatures([...selectedFeatures, 'taproom']);
                  } else {
                    setSelectedFeatures(
                      selectedFeatures.filter((f) => f !== 'taproom')
                    );
                  }
                }}
              />
              <span className="text-sm">直営タップルームあり</span>
            </label>
            <label className="flex items-center gap-2 py-2 px-3 rounded-full bg-white border border-amber-200 cursor-pointer hover:bg-amber-50 transition-colors">
              <input
                type="checkbox"
                className="checkbox checkbox-xs checkbox-warning"
                checked={selectedFeatures.includes('tours')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFeatures([...selectedFeatures, 'tours']);
                  } else {
                    setSelectedFeatures(
                      selectedFeatures.filter((f) => f !== 'tours')
                    );
                  }
                }}
              />
              <span className="text-sm">工場見学可能</span>
            </label>
            <label className="flex items-center gap-2 py-2 px-3 rounded-full bg-white border border-amber-200 cursor-pointer hover:bg-amber-50 transition-colors">
              <input
                type="checkbox"
                className="checkbox checkbox-xs checkbox-warning"
                checked={selectedFeatures.includes('domestic')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFeatures([
                      ...selectedFeatures.filter((f) => f !== 'overseas'),
                      'domestic',
                    ]);
                  } else {
                    setSelectedFeatures(
                      selectedFeatures.filter((f) => f !== 'domestic')
                    );
                  }
                }}
              />
              <span className="text-sm">国内</span>
            </label>
            <label className="flex items-center gap-2 py-2 px-3 rounded-full bg-white border border-amber-200 cursor-pointer hover:bg-amber-50 transition-colors">
              <input
                type="checkbox"
                className="checkbox checkbox-xs checkbox-warning"
                checked={selectedFeatures.includes('overseas')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFeatures([
                      ...selectedFeatures.filter((f) => f !== 'domestic'),
                      'overseas',
                    ]);
                  } else {
                    setSelectedFeatures(
                      selectedFeatures.filter((f) => f !== 'overseas')
                    );
                  }
                }}
              />
              <span className="text-sm">海外</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 items-end">
          <div>
            <label
              htmlFor="sort"
              className="block mb-2 text-sm font-medium text-amber-900"
            >
              並び替え
            </label>
            <select
              id="sort"
              className="select select-bordered bg-white border-amber-200 focus:border-amber-400 text-amber-900"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">名前順</option>
              <option value="year-old">創業年（古い順）</option>
              <option value="year-new">創業年（新しい順）</option>
              <option value="country">国・地域順</option>
            </select>
          </div>

          {/* フィルターリセットボタン */}
          <button
            className="btn btn-sm bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100"
            onClick={resetFilters}
          >
            フィルターをリセット
          </button>
        </div>
      </div>
    </div>
  );
}
