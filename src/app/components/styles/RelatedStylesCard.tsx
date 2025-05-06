'use client';

import React from 'react';
import { BeerStyle } from '@/src/app/types/beer-style';
import StyleAnimatedCard from './StyleAnimatedCard';
import RelatedStyles from './RelatedStyles';

interface RelatedStylesCardProps {
  parentStyles: BeerStyle[];
  childStyles: BeerStyle[];
  siblingStyles: BeerStyle[];
  delay?: number;
}

export default function RelatedStylesCard({
  parentStyles,
  childStyles,
  siblingStyles,
  delay = 0.2,
}: RelatedStylesCardProps) {
  // 関連スタイルがない場合はレンダリングしない
  if (
    parentStyles.length === 0 &&
    childStyles.length === 0 &&
    siblingStyles.length === 0
  ) {
    return null;
  }

  return (
    <StyleAnimatedCard
      delay={delay}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <RelatedStyles
        parentStyles={parentStyles}
        childStyles={childStyles}
        siblingStyles={siblingStyles}
      />
    </StyleAnimatedCard>
  );
}
