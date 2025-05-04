'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StyleCharacteristicsProps {
  characteristics: {
    bitterness: number;
    sweetness: number;
    body: number;
    aroma: number;
    sourness: number;
  };
}

export default function StyleCharacteristics({
  characteristics,
}: StyleCharacteristicsProps) {
  // 特性の表示名と対応するプロパティ名のマッピング
  const characteristicLabels = [
    { key: 'bitterness', label: '苦味' },
    { key: 'sweetness', label: '甘み' },
    { key: 'body', label: 'ボディ感' },
    { key: 'aroma', label: '香り' },
    { key: 'sourness', label: '酸味' },
  ];

  // レベルに基づく色のマッピング（1が最も薄く、5が最も濃い）
  const getLevelColor = (level: number): string => {
    switch (level) {
      case 1:
        return 'bg-amber-100';
      case 2:
        return 'bg-amber-300';
      case 3:
        return 'bg-amber-500';
      case 4:
        return 'bg-amber-700';
      case 5:
        return 'bg-amber-900';
      default:
        return 'bg-amber-300';
    }
  };

  return (
    <div className="space-y-5">
      {characteristicLabels.map((item, index) => {
        const value = characteristics[item.key as keyof typeof characteristics];
        const percentage = (value / 5) * 100;

        return (
          <div key={item.key} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-amber-900">
                {item.label}
              </span>
              <span className="text-sm font-medium text-amber-800">
                {value}/5
              </span>
            </div>
            <div className="h-3 bg-amber-50 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${getLevelColor(value)} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
            <div className="flex justify-between text-xs text-amber-700">
              <span>弱</span>
              <span>強</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
