'use client';

import React, { Suspense } from 'react';
import HeroSection from '../../src/app/components/HeroSection';
import GuideCategorySection from '../../src/app/components/guides/GuideCategorySection';
import BeginnerSection from '../../src/app/components/guides/BeginnerSection';
import FAQSection from '../../src/app/components/guides/FAQSection';
import BeerFinderCTA from '../../src/app/components/guides/BeerFinderCTA';
import LoadingSpinner from '../../src/app/components/LoadingSpinner';

// ガイド項目のデータ
const guideItems = [
  {
    id: 'tasting',
    title: 'テイスティングガイド',
    description:
      'ビールの味わいを表現する言葉や、正しい飲み方、香りの感じ方などを紹介します。',
    icon: '👅',
    color: 'from-green-200 to-green-100',
    iconBg: 'bg-green-200',
    link: '/guides/tasting',
  },
  {
    id: 'brewing',
    title: '醸造の基礎知識',
    description:
      'ビールがどのように作られているのか、原料や製法について解説します。',
    icon: '🌾',
    color: 'from-yellow-200 to-yellow-100',
    iconBg: 'bg-yellow-200',
    link: '/guides/brewing',
  },
  {
    id: 'beginners',
    title: '初心者向けガイド',
    description:
      'クラフトビールを初めて飲む方向けに、おすすめのビールや基礎知識を紹介します。',
    icon: '🔰',
    color: 'from-blue-200 to-blue-100',
    iconBg: 'bg-blue-200',
    link: '/guides/beginners',
  },
  {
    id: 'beer-finder',
    title: '好みの診断ツール',
    description:
      '簡単な質問に答えるだけで、あなたの好みに合ったビールスタイルを診断します。',
    icon: '🔍',
    color: 'from-purple-200 to-purple-100',
    iconBg: 'bg-purple-200',
    link: '/guides/beer-finder',
  },
];

// FAQ項目
const faqItems = [
  {
    question: 'クラフトビールと普通のビールの違いは何ですか？',
    answer:
      'クラフトビールは、小規模な醸造所で職人（クラフトマン）によって丁寧に作られたビールを指します。大量生産のビールと比べて、より多様な原料や製法を用いて個性的な味わいを追求していることが特徴です。地域性や醸造家の個性が反映された、バリエーション豊かな味わいを楽しめます。',
  },
  {
    question: 'クラフトビールはどこで買えますか？',
    answer:
      '近年ではスーパーマーケットやコンビニでも取り扱いが増えています。また、専門のビアショップやオンラインショップ、直接ブルワリーのタップルームなどで購入することができます。特に専門店では希少なビールや季節限定商品なども見つけられるでしょう。',
  },
  {
    question: 'クラフトビールの適切な保存方法は？',
    answer:
      'クラフトビールは一般的に直射日光と高温を避け、冷暗所で保存するのが理想的です。多くのビールは冷蔵庫で保存すると風味が長持ちします。特にホップの香りが強いIPAなどは、新鮮なうちに飲むことをおすすめします。また、缶や瓶はなるべく立てて保存すると良いでしょう。',
  },
  {
    question: '初心者におすすめのクラフトビールは？',
    answer:
      'ビールが初めての方や、苦みが苦手な方には、小麦ビール（ヴァイツェン）やフルーティなペールエールがおすすめです。例えば「よなよなエール」「COEDO 白」などは比較的飲みやすいでしょう。詳しくは「初心者向けガイド」ページをご覧ください。',
  },
];

// 内部コンポーネントをSuspenseで囲むためのラッパーコンポーネント
function GuidesContent() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      {/* ヒーローセクション */}
      <div className="relative">
        <HeroSection
          title="ビールガイド"
          description="クラフトビールの世界をより深く楽しむための情報を集めました。初心者の方も愛好家の方も、ぜひご活用ください。"
        />
      </div>

      {/* ガイド項目一覧 */}
      <GuideCategorySection guideItems={guideItems} />

      {/* ビール初心者のための導入セクション */}
      <BeginnerSection />

      {/* よくある質問 */}
      <FAQSection faqItems={faqItems} />

      {/* ビールスタイル診断へのCTA */}
      <BeerFinderCTA />
    </div>
  );
}

export default function GuidesPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="large" message="ガイドページを読み込み中..." />}>
      <GuidesContent />
    </Suspense>
  );
}
