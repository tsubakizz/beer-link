import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BreweryCard from './BreweryCard';
import { Brewery, BreweryType } from '../../../app/lib/breweries-data';
import EmptyResults from '../beers/EmptyResults';

interface BreweryListProps {
  breweries: Brewery[];
  isLoading?: boolean;
  resetFilters: () => void;
  getBeerCount?: (breweryId: string) => number;
}

// ブルワリータイプの日本語名マッピング
const breweryTypeNames: Record<BreweryType, string> = {
  craft: 'クラフト',
  major: '大手',
  brewpub: 'ブルーパブ',
  contract: '委託醸造',
  special: '特殊醸造',
};

export default function BreweryList({
  breweries,
  isLoading = false,
  resetFilters,
  getBeerCount,
}: BreweryListProps) {
  // アニメーション用のバリアント
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-12">
        <div className="flex flex-col items-center gap-2">
          <div className="loading loading-spinner text-amber-600"></div>
          <p className="text-amber-800">ブルワリーを検索中...</p>
        </div>
      </div>
    );
  }

  if (!breweries || breweries.length === 0) {
    return <EmptyResults resetFilters={resetFilters} />;
  }

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {breweries.map((brewery, index) => (
          <motion.div key={brewery.id} variants={itemVariants}>
            <BreweryCard
              brewery={brewery}
              typeNames={breweryTypeNames}
              beerCount={
                getBeerCount
                  ? getBeerCount(brewery.id)
                  : brewery.beers?.length || 0
              }
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
