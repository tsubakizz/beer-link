'use client';

import { useState } from 'react';
import { beerStyles, BeerStyle } from '../../../src/app/lib/beers-data';
import { motion } from 'framer-motion';

// インポートするコンポーネント
import HeroSection from '../../../src/app/components/HeroSection';
import StyleFilter, {
  FilterParams,
} from '../../../src/app/components/guides/styles/StyleFilter';
import StyleCard from '../../../src/app/components/guides/styles/StyleCard';
import EmptyStyleResults from '../../../src/app/components/guides/styles/EmptyStyleResults';
import StyleInformation from '../../../src/app/components/guides/styles/StyleInformation';
import Pagination from '../../../src/app/components/beers/Pagination';

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

export default function BeerStylesPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  // ページネーション用の状態
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20; // 1ページあたり20件表示

  // フィルター用の状態
  const [filterParams, setFilterParams] = useState<FilterParams>({
    bitterness: null,
    sweetness: null,
    body: null,
    aroma: null,
    sourness: null,
    abvMin: null,
    abvMax: null,
    origin: null,
  });

  // 検索時に1ページ目に戻すための処理を追加したラッパー関数
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // 検索時は1ページ目に戻す
  };

  // フィルター変更時に1ページ目に戻すための処理を追加したラッパー関数
  const handleFilterChange = (params: FilterParams) => {
    setFilterParams(params);
    setCurrentPage(1); // フィルター変更時は1ページ目に戻す
  };

  // フィルターと検索に基づいてスタイルをフィルタリング
  const filteredStyles = beerStyles.filter((style) => {
    // テキスト検索フィルター
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const nameMatch = style.name.toLowerCase().includes(searchLower);
      const descMatch = style.description.toLowerCase().includes(searchLower);
      const otherNameMatch =
        style.other_name?.some((name) =>
          name.toLowerCase().includes(searchLower)
        ) || false;
      const originMatch = style.origin.toLowerCase().includes(searchLower);

      if (!(nameMatch || descMatch || otherNameMatch || originMatch)) {
        return false;
      }
    }

    // 味わいプロファイル フィルター
    if (
      filterParams.bitterness !== null &&
      style.characteristics.bitterness !== filterParams.bitterness
    ) {
      return false;
    }
    if (
      filterParams.sweetness !== null &&
      style.characteristics.sweetness !== filterParams.sweetness
    ) {
      return false;
    }
    if (
      filterParams.body !== null &&
      style.characteristics.body !== filterParams.body
    ) {
      return false;
    }
    if (
      filterParams.aroma !== null &&
      style.characteristics.aroma !== filterParams.aroma
    ) {
      return false;
    }
    if (
      filterParams.sourness !== null &&
      style.characteristics.sourness !== filterParams.sourness
    ) {
      return false;
    }

    // アルコール度数フィルター
    const avgAbv = (style.abv[0] + style.abv[1]) / 2;
    if (filterParams.abvMin !== null && avgAbv < filterParams.abvMin) {
      return false;
    }
    if (filterParams.abvMax !== null && avgAbv > filterParams.abvMax) {
      return false;
    }

    // 原産国/地域フィルター
    if (filterParams.origin !== null) {
      if (!style.origin.includes(filterParams.origin)) {
        return false;
      }
    }

    return true;
  });

  // 総ページ数を計算
  const totalPages = Math.ceil(filteredStyles.length / itemsPerPage);

  // 現在のページに表示する項目を取得
  const currentItems = filteredStyles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // フィルターをリセットする関数
  const resetFilters = () => {
    setSearchQuery('');
    setFilterParams({
      bitterness: null,
      sweetness: null,
      body: null,
      aroma: null,
      sourness: null,
      abvMin: null,
      abvMax: null,
      origin: null,
    });
    setCurrentPage(1); // フィルターリセット時にページもリセット
  };

  // ページ変更時の処理
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // ページトップにスクロール
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
        setSearchQuery={handleSearchChange}
        filterParams={filterParams}
        setFilterParams={handleFilterChange}
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
          {filteredStyles.length > itemsPerPage &&
            ` (${(currentPage - 1) * itemsPerPage + 1}〜${Math.min(
              currentPage * itemsPerPage,
              filteredStyles.length
            )}件表示中)`}
        </p>
      </motion.div>

      {/* 上部ページネーション - 結果が20件以上ある場合に表示 */}
      {filteredStyles.length > itemsPerPage && (
        <div className="mb-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* スタイル一覧 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {currentItems.map((style, index) => (
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

      {/* ページネーション */}
      {filteredStyles.length > itemsPerPage && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* ビールスタイルに関する説明 */}
      <StyleInformation />
    </div>
  );
}
