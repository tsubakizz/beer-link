'use client';

import React from 'react';
import StyleAnimatedCard from './StyleAnimatedCard';

interface StyleHistoryCardProps {
  history: string;
  delay?: number;
}

export default function StyleHistoryCard({
  history,
  delay = 0.1,
}: StyleHistoryCardProps) {
  return (
    <StyleAnimatedCard
      delay={delay}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <h3 className="text-xl font-bold text-amber-900 mb-4 border-l-4 border-amber-500 pl-4">
        歴史
      </h3>
      <div className="prose max-w-none text-amber-800">
        {history.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </StyleAnimatedCard>
  );
}
