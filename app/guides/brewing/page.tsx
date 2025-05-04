import React from 'react';
import HeroSection from '../../../src/app/components/HeroSection';
import BrewingIntroduction from '../../../src/app/components/guides/brewing/BrewingIntroduction';
import TableOfContents from '../../../src/app/components/guides/brewing/TableOfContents';
import BrewingIngredients from '../../../src/app/components/guides/brewing/BrewingIngredients';
import BrewingProcess from '../../../src/app/components/guides/brewing/BrewingProcess';
import FlavorFactors from '../../../src/app/components/guides/brewing/FlavorFactors';
import BrewingComparison from '../../../src/app/components/guides/brewing/BrewingComparison';
import BrewingGlossary from '../../../src/app/components/guides/brewing/BrewingGlossary';
import RelatedGuides from '../../../src/app/components/guides/brewing/RelatedGuides';
import BubbleDecoration from '../../../src/app/components/BubbleDecoration';

export const metadata = {
  title: '醸造の基礎知識 - Beer Link',
  description:
    'クラフトビールの醸造プロセスや基本的な知識を初心者にもわかりやすく解説します。',
};

export default function BrewingGuidePage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 relative overflow-hidden">
      {/* ヒーローセクション */}
      <HeroSection
        title="醸造の基礎知識"
        description="クラフトビールが出来上がるまでのプロセスと、美味しさの秘密を解説"
      />

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto relative">
        {/* 背景の装飾 */}
        <div className="absolute top-0 right-0 -z-10 opacity-20">
          <BubbleDecoration count={8} />
        </div>

        {/* イントロダクション */}
        <BrewingIntroduction />

        {/* 目次 */}
        <TableOfContents />

        {/* ビールの4大原料 */}
        <BrewingIngredients />

        {/* 醸造プロセス */}
        <BrewingProcess />

        {/* 風味に影響する要素 */}
        <FlavorFactors />

        {/* クラフトビールと大量生産ビールの違い */}
        <BrewingComparison />

        {/* 醸造用語集 */}
        <BrewingGlossary />

        {/* 関連ガイド */}
        <RelatedGuides />
      </div>
    </div>
  );
}
