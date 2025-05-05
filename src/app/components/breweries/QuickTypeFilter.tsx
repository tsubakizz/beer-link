import React from 'react';
import { motion } from 'framer-motion';
import { BreweryType } from '@/src/app/lib/breweries-data';

interface QuickTypeFilterProps {
  selectedType: BreweryType | null;
  setSelectedType: (type: BreweryType | null) => void;
}

// ブルワリータイプごとの設定
const typeConfig: Record<
  BreweryType,
  { label: string; icon: string; bgColor: string }
> = {
  craft: {
    label: 'クラフト',
    icon: '🍺',
    bgColor: 'bg-amber-100 hover:bg-amber-200',
  },
  macro: {
    label: '大手',
    icon: '🏭',
    bgColor: 'bg-blue-100 hover:bg-blue-200',
  },
  brewpub: {
    label: 'ブルーパブ',
    icon: '🍻',
    bgColor: 'bg-green-100 hover:bg-green-200',
  },
  contract: {
    label: '委託醸造',
    icon: '🤝',
    bgColor: 'bg-purple-100 hover:bg-purple-200',
  },
  proprietary: {
    label: '特殊醸造',
    icon: '✨',
    bgColor: 'bg-red-100 hover:bg-red-200',
  },
};

export default function QuickTypeFilter({
  selectedType,
  setSelectedType,
}: QuickTypeFilterProps) {
  // タイプボタンをクリックしたときの処理
  const handleTypeClick = (type: BreweryType) => {
    if (selectedType === type) {
      // 同じタイプがすでに選択されている場合は選択解除
      setSelectedType(null);
    } else {
      // 新しいタイプを選択
      setSelectedType(type);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <h3 className="text-lg font-medium mb-3 text-gray-700">
        タイプで絞り込む
      </h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(typeConfig).map(([type, config]) => (
          <button
            key={type}
            onClick={() => handleTypeClick(type as BreweryType)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
              config.bgColor
            } ${
              selectedType === type
                ? 'ring-2 ring-amber-500 font-semibold'
                : 'ring-0'
            }`}
          >
            <span>{config.icon}</span>
            <span>{config.label}</span>
          </button>
        ))}
        {selectedType && (
          <button
            onClick={() => setSelectedType(null)}
            className="px-4 py-2 rounded-full flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            <span>❌</span>
            <span>クリア</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
