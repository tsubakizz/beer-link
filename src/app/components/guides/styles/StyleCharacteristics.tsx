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

  // 色のマッピング
  const colorMap: { [key: string]: string } = {
    bitterness: 'bg-amber-700',
    sweetness: 'bg-amber-400',
    body: 'bg-amber-600',
    aroma: 'bg-amber-300',
    sourness: 'bg-amber-500',
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
            <div className="h-3 bg-amber-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${
                  colorMap[item.key] || 'bg-amber-500'
                } rounded-full`}
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
