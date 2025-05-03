'use client';

import { motion } from 'framer-motion';

interface StyleFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  styleGroups: { id: string; name: string; description: string }[];
}

export default function StyleFilter({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  styleGroups,
}: StyleFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-xl shadow-sm mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 検索ボックス */}
        <div className="md:col-span-2">
          <label
            htmlFor="search"
            className="block mb-2 text-sm font-medium text-amber-900"
          >
            ビールスタイルを検索
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="スタイル名や特徴で検索..."
              className="input input-bordered w-full bg-white border-amber-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute right-2 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600 ${
                !searchQuery ? 'hidden' : ''
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* グループフィルター */}
        <div>
          <label
            htmlFor="filter"
            className="block mb-2 text-sm font-medium text-amber-900"
          >
            タイプで絞り込む
          </label>
          <select
            id="filter"
            className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-800"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">すべてのスタイル</option>
            {styleGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}系スタイル
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
}
