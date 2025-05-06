'use client';

import { useState } from 'react';
import { BeerStyle } from '@/src/app/types/beer-style';
import StyleFilter, { FilterParams } from './StyleFilter';
import StyleResults from './StyleResults';
import { Suspense } from 'react';
import LoadingSpinner from '@/src/app/components/LoadingSpinner';

interface BeerStyleClientContainerProps {
  styles: BeerStyle[];
  specialStyleColors: { [key: string]: string };
}

export default function BeerStyleClientContainer({
  styles,
  specialStyleColors,
}: BeerStyleClientContainerProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

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

  // スタイルイメージのプレースホルダー - クライアント側で再実装
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

  // スタイルに対して色を決定する関数
  const getStyleColor = (style: BeerStyle): string => {
    return specialStyleColors[style.slug] || getStyleColorBySRM(style);
  };

  // 検索時に1ページ目に戻すための処理を追加したラッパー関数
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // フィルター変更時に1ページ目に戻すための処理を追加したラッパー関数
  const handleFilterChange = (params: FilterParams) => {
    setFilterParams(params);
    setCurrentPage(1);
  };

  // フィルターと検索に基づいてスタイルをフィルタリング
  const filteredStyles = styles.filter((style) => {
    // テキスト検索フィルター
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const nameMatch = style.name.toLowerCase().includes(searchLower);
      const descMatch = style.description.toLowerCase().includes(searchLower);
      const otherNameMatch =
        style.otherNames?.some((name) =>
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
    setCurrentPage(1);
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
    <>
      {/* フィルターと検索 */}
      <Suspense
        fallback={
          <LoadingSpinner size="medium" message="フィルターを読み込み中..." />
        }
      >
        <StyleFilter
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          filterParams={filterParams}
          setFilterParams={handleFilterChange}
        />
      </Suspense>

      {/* 結果の表示 */}
      <Suspense
        fallback={
          <LoadingSpinner
            size="large"
            message="ビールスタイルを読み込み中..."
          />
        }
      >
        <StyleResults
          filteredStyles={filteredStyles}
          currentItems={currentItems}
          getStyleColor={getStyleColor}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          resetFilters={resetFilters}
        />
      </Suspense>
    </>
  );
}
