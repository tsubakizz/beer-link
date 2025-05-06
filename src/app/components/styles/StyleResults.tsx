'use client';

import { motion } from 'framer-motion';
import { BeerStyle } from '@/src/app/types/beer-style';
import StyleCard from './StyleCard';
import Pagination from '@/src/app/components/beers/Pagination';

interface StyleResultsProps {
  filteredStyles: BeerStyle[];
  currentItems: BeerStyle[];
  getStyleColor: (style: BeerStyle) => string;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  resetFilters: () => void;
}

export default function StyleResults({
  filteredStyles,
  currentItems,
  getStyleColor,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  resetFilters,
}: StyleResultsProps) {
  return (
    <>
      {/* 結果の表示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-2 flex items-center justify-center"
      >
        <p className="text-amber-800 font-medium">
          全{filteredStyles.length} 件
          {filteredStyles.length > itemsPerPage &&
            ` (${(currentPage - 1) * itemsPerPage + 1}〜${Math.min(
              currentPage * itemsPerPage,
              filteredStyles.length
            )}件表示中)`}
        </p>
      </motion.div>

      {/* 上部ページネーション - 結果が表示件数以上ある場合に表示 */}
      {filteredStyles.length > itemsPerPage && (
        <div className="mb-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}

      {/* スタイル一覧 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {currentItems.map((style, index) => (
          <StyleCard
            key={style.slug}
            style={style}
            index={index}
            styleImagePlaceholders={getStyleColor(style)}
          />
        ))}
      </motion.div>

      {/* 結果が0件の場合 */}
      {filteredStyles.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-lg text-amber-800 mb-4">
            条件に一致するビールスタイルがありません
          </p>
          <button
            onClick={resetFilters}
            className="btn bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200"
          >
            フィルターをリセット
          </button>
        </div>
      )}

      {/* 下部ページネーション */}
      {filteredStyles.length > itemsPerPage && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}
