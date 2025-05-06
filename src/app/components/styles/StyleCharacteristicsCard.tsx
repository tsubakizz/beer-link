'use client';

import React from 'react';
import StyleAnimatedCard from './StyleAnimatedCard';
import StyleRadarChart from './StyleRadarChart';
import StyleCharacteristics from './StyleCharacteristics';

interface StyleCharacteristicsCardProps {
  characteristics: any;
  delay?: number;
}

export function StyleRadarChartCard({
  characteristics,
  delay = 0.2,
}: StyleCharacteristicsCardProps) {
  return (
    <StyleAnimatedCard
      delay={delay}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <h3 className="text-xl font-bold text-amber-900 mb-4">スタイルの特性</h3>
      <StyleRadarChart characteristics={characteristics} />
    </StyleAnimatedCard>
  );
}

export function StyleCharacteristicsBarCard({
  characteristics,
  delay = 0.3,
}: StyleCharacteristicsCardProps) {
  return (
    <StyleAnimatedCard
      delay={delay}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-xl font-bold text-amber-900 mb-4">
        スタイルの特性バー
      </h3>
      <StyleCharacteristics characteristics={characteristics} />
    </StyleAnimatedCard>
  );
}
