import React from 'react';
import FeatureCard, { FeatureItem } from '../FeatureCard';

// 既存のインターフェイスは互換性のために維持
export interface GuideItem extends FeatureItem {}

interface GuideCardProps {
  item: GuideItem;
  index: number;
}

// FeatureCardのラッパーとして実装し、互換性を維持する
export default function GuideCard({ item, index }: GuideCardProps) {
  return <FeatureCard item={item} index={index} />;
}
