'use client';

import React from 'react';
import { Beer } from '@/src/app/lib/beers-data';
import StyleAnimatedCard from './StyleAnimatedCard';
import ExampleBeers from './ExampleBeers';

interface ExampleBeersCardProps {
  beers: Beer[];
  delay?: number;
}

export default function ExampleBeersCard({
  beers,
  delay = 0.3,
}: ExampleBeersCardProps) {
  if (beers.length === 0) {
    return null;
  }

  return (
    <StyleAnimatedCard
      delay={delay}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <ExampleBeers beers={beers} />
    </StyleAnimatedCard>
  );
}
