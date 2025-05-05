import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard, { FeatureItem } from '@/src/app/components/FeatureCard';

interface GuideCategorySectionProps {
  guideItems: FeatureItem[];
}

export default function GuideCategorySection({
  guideItems,
}: GuideCategorySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold mb-6 text-amber-900 flex items-center gap-2">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        ガイドカテゴリー
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guideItems.map((item, index) => (
          <FeatureCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
