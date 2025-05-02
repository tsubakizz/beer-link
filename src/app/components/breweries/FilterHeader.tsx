import React from 'react';
import { motion } from 'framer-motion';

interface FilterHeaderProps {
  isFilterOpen: boolean;
  toggleFilter: () => void;
  resultCount: number;
}

export default function FilterHeader({
  isFilterOpen,
  toggleFilter,
  resultCount,
}: FilterHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-amber-800">
        ブルワリーを探す{' '}
        <span className="text-base font-normal">
          （{resultCount}件が見つかりました）
        </span>
      </h2>
      <button
        onClick={toggleFilter}
        className="flex items-center gap-2 text-amber-700 hover:text-amber-900"
      >
        <span>{isFilterOpen ? 'フィルターを閉じる' : 'フィルターを開く'}</span>
        <motion.span
          animate={{ rotate: isFilterOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl"
        >
          {isFilterOpen ? '▲' : '▼'}
        </motion.span>
      </button>
    </div>
  );
}
