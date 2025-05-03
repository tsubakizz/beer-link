'use client';

import { motion } from 'framer-motion';

interface EmptyStyleResultsProps {
  resetFilters: () => void;
}

export default function EmptyStyleResults({
  resetFilters,
}: EmptyStyleResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12 bg-amber-50 rounded-lg"
    >
      <span className="text-6xl mb-4 block">🔍</span>
      <h3 className="text-xl font-semibold mb-2 text-amber-900">
        条件に一致するビールスタイルが見つかりませんでした
      </h3>
      <p className="text-amber-700 mb-4">検索条件を変更してみてください</p>
      <button className="btn btn-beer-outline" onClick={resetFilters}>
        フィルターをリセット
      </button>
    </motion.div>
  );
}
