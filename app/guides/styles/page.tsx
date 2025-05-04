'use client';

import { useState } from 'react';
import { beerStyles, BeerStyle } from '../../../src/app/lib/beers-data';
import { motion } from 'framer-motion';

// インポートするコンポーネント
import HeroSection from '../../../src/app/components/HeroSection';
import StyleFilter from '../../../src/app/components/guides/styles/StyleFilter';
import StyleGroupNavigation from '../../../src/app/components/guides/styles/StyleGroupNavigation';
import StyleCard from '../../../src/app/components/guides/styles/StyleCard';
import EmptyStyleResults from '../../../src/app/components/guides/styles/EmptyStyleResults';
import StyleInformation from '../../../src/app/components/guides/styles/StyleInformation';

// スタイルイメージのプレースホルダー
const getStyleColorBySRM = (style: BeerStyle): string => {
  // SRMの範囲の中央値を計算（最小値と最大値の平均）
  const avgSRM = style.srm ? (style.srm[0] + style.srm[1]) / 2 : 0;

  // SRMの値に基づいて色を返す（実際のビールの色に近い色）
  if (avgSRM < 2) {
    return 'bg-yellow-50'; // 非常に淡い色（ピルスナーライト、ライトラガー等）
  } else if (avgSRM < 4) {
    return 'bg-yellow-100'; // 淡い黄金色（ピルスナー、ヘレス、ヴィットビア等）
  } else if (avgSRM < 6) {
    return 'bg-yellow-200'; // 黄金色（ブロンドエール、ケルシュ等）
  } else if (avgSRM < 8) {
    return 'bg-amber-100'; // 淡い琥珀色（ペールエール等）
  } else if (avgSRM < 10) {
    return 'bg-amber-200'; // やや濃い琥珀色（アンバーエール、ウィンナラガー等）
  } else if (avgSRM < 14) {
    return 'bg-amber-300'; // 琥珀色（ESB、ボック等）
  } else if (avgSRM < 17) {
    return 'bg-amber-400'; // 濃い琥珀色（デュッベル、アンバーエール等）
  } else if (avgSRM < 20) {
    return 'bg-amber-500'; // 明るい茶色（ブラウンエール等）
  } else if (avgSRM < 25) {
    return 'bg-amber-600'; // 茶色（ブラウンエール、デュンケル等）
  } else if (avgSRM < 30) {
    return 'bg-amber-700'; // 濃い茶色（ポーター等）
  } else if (avgSRM < 35) {
    return 'bg-amber-800'; // 暗褐色（スタウト等）
  } else {
    return 'bg-amber-900'; // ほぼ黒色（インペリアルスタウト、シュヴァルツビア等）
  }
};

// 特定のスタイルには特別な色を設定（SRM以外の特徴を強調したい場合）
const specialStyleColors: { [key: string]: string } = {
  'fruit-beer': 'bg-pink-200',
  'sour-ale': 'bg-rose-300',
  'berliner-weisse': 'bg-rose-200',
  gose: 'bg-rose-200',
  'flanders-red-ale': 'bg-red-300',
  kriek: 'bg-red-400',
  framboise: 'bg-pink-300',
};

// スタイルに対して色を決定する関数
const getStyleColor = (style: BeerStyle): string => {
  // 特別なスタイルがあればそれを返す、なければSRMベースの色を返す
  return specialStyleColors[style.id] || getStyleColorBySRM(style);
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
      {/* スタイル一覧 */}
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
            styleImagePlaceholders={getStyleColor(style)}
          />
        ))}
      </motion.div>

      {/* 結果が0件の場合 */}
      {filteredStyles.length === 0 && (
        <EmptyStyleResults resetFilters={resetFilters} />
      )}

      {/* ビールスタイルに関する説明 */}
      <StyleInformation />
    </div>
  );
}
