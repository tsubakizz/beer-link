'use client';

import { motion } from 'framer-motion';
import { BeerStyle } from '@/src/app/lib/beers-data';
import StyleCard from './StyleCard';
import EmptyStyleResults from './EmptyStyleResults';
import Pagination from '@/beers/Pagination';

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
            key={style.id}
            style={style}
            index={index}
            styleImagePlaceholders={getStyleColor(style)}
          />
        ))}
      </motion.div>

      {/* 結果が0件の場合 */}
      {filteredStyles.length === 0 && (
        <EmptyStyleResults resetFilters={resetFilters} />
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
