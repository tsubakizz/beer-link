'use client';

import React from 'react';
import StyleAnimatedCard from './StyleAnimatedCard';

interface StyleDescriptionCardProps {
  description: string;
  delay?: number;
}

export default function StyleDescriptionCard({
  description,
  delay = 0,
}: StyleDescriptionCardProps) {
  return (
    <StyleAnimatedCard
      delay={delay}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <h3 className="text-xl font-bold text-amber-900 mb-4 border-l-4 border-amber-500 pl-4">
        スタイルの特徴
      </h3>
      <div className="prose max-w-none text-amber-800">
        <p>{description}</p>
      </div>
    </StyleAnimatedCard>
  );
}
