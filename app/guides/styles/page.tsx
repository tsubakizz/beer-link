'use client';

import { useState } from 'react';
import { beerStyles } from '../../../src/app/lib/beers-data';
import { motion } from 'framer-motion';

// インポートするコンポーネント
import HeroSection from '../../../src/app/components/HeroSection';
import LoadingSpinner from '../../../src/app/components/LoadingSpinner';
import StyleFilter from '../../../src/app/components/guides/styles/StyleFilter';
import StyleGroupNavigation from '../../../src/app/components/guides/styles/StyleGroupNavigation';
import StyleCard from '../../../src/app/components/guides/styles/StyleCard';
import EmptyStyleResults from '../../../src/app/components/guides/styles/EmptyStyleResults';
import StyleInformation from '../../../src/app/components/guides/styles/StyleInformation';

// スタイルイメージのプレースホルダー
const styleImagePlaceholders: { [key: string]: string } = {
  ipa: 'bg-amber-400',
  stout: 'bg-amber-900',
  pilsner: 'bg-amber-200',
  weissbier: 'bg-amber-100',
  witbier: 'bg-amber-50',
  'pale-ale': 'bg-amber-300',
  porter: 'bg-amber-800',
  'sour-ale': 'bg-amber-500',
  saison: 'bg-amber-300',
  'belgian-blonde-ale': 'bg-amber-200',
  lager: 'bg-amber-100',
  'black-ipa': 'bg-amber-900',
  'fruit-beer': 'bg-pink-200',
  'hazy-ipa': 'bg-amber-300',
  'milk-stout': 'bg-amber-900',
};

// ビールスタイルのグループ分け
const styleGroups = [
  { id: 'light', name: 'ライト', description: '軽やかで爽快な飲み口のビール' },
  {
    id: 'balanced',
    name: 'バランス',
    description: '苦味と甘みのバランスが特徴的なビール',
  },
  {
    id: 'hoppy',
    name: 'ホップ中心',
    description: 'ホップの香りと苦味が特徴的なビール',
  },
  {
    id: 'malty',
    name: 'モルト中心',
    description: 'モルトの風味と深みのあるビール',
  },
  {
    id: 'special',
    name: '特殊',
    description: '酸味や特殊な製法で作られるビール',
  },
];

// グループごとのスタイルIDのマッピング
const styleGroupMapping: { [key: string]: string[] } = {
  light: [
    'pilsner',
    'lager',
    'weissbier',
    'witbier',
    'american-wheat',
    'kolsch',
    'cream-ale',
    'helles',
  ],
  balanced: [
    'pale-ale',
    'amber-ale',
    'altbier',
    'vienna-lager',
    'marzen',
    'esb',
    'english-pale-ale',
    'american-pale-ale',
  ],
  hoppy: [
    'ipa',
    'hazy-ipa',
    'session-ipa',
    'double-ipa',
    'triple-ipa',
    'black-ipa',
  ],
  malty: [
    'stout',
    'porter',
    'milk-stout',
    'imperial-stout',
    'dunkel',
    'oatmeal-stout',
    'bock',
    'doppelbock',
    'dubbel',
    'quadrupel',
  ],
  special: [
    'saison',
    'belgian-blonde-ale',
    'sour-ale',
    'fruit-beer',
    'rauchbier',
    'gose',
    'berliner-weisse',
    'flanders-red-ale',
    'tripel',
  ],
};

export default function BeerStylesPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // フィルターと検索に基づいてスタイルをフィルタリング
  const filteredStyles = beerStyles.filter((style) => {
    // グループフィルター
    if (
      selectedFilter !== 'all' &&
      !styleGroupMapping[selectedFilter]?.includes(style.id)
    ) {
      return false;
    }

    // 検索フィルター
    if (
      searchQuery &&
      !style.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !style.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(
        style.other_name?.some((name) =>
          name.toLowerCase().includes(searchQuery.toLowerCase())
        ) || false
      )
    ) {
      return false;
    }

    return true;
  });

  // フィルターをリセットする関数
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFilter('all');
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 relative overflow-hidden">
      {/* ヒーローセクション */}
      <HeroSection
        title="ビールスタイルガイド"
        description="クラフトビールの世界を広げるスタイル図鑑。各ビールスタイルの特徴や味わいの違いを理解して、あなたの好みに合ったビールを見つけましょう。"
      />

      {/* フィルターと検索 */}
      <StyleFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        styleGroups={styleGroups}
      />

      {/* スタイルグループのナビゲーション */}
      <StyleGroupNavigation
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        styleGroups={styleGroups}
      />

      {/* 結果の表示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6 flex items-center justify-between"
      >
        <p className="text-amber-800 font-medium">
          {filteredStyles.length} 件のビールスタイルが見つかりました
        </p>
      </motion.div>

      {/* ローディング表示 */}
      {isLoading && (
        <div className="my-4">
          <LoadingSpinner size="small" message="スタイル情報を読み込み中..." />
        </div>
      )}

      {/* スタイル一覧 */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredStyles.map((style, index) => (
            <StyleCard
              key={style.id}
              style={style}
              index={index}
              styleImagePlaceholders={styleImagePlaceholders}
            />
          ))}
        </motion.div>
      )}

      {/* 結果が0件の場合 */}
      {filteredStyles.length === 0 && (
        <EmptyStyleResults resetFilters={resetFilters} />
      )}

      {/* ビールスタイルに関する説明 */}
      <StyleInformation />
    </div>
  );
}
