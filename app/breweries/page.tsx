'use client';

import { useState, useEffect, Suspense } from 'react';
import {
  breweries,
  breweryTypeNames,
  regionNames,
  type BreweryType,
  type Region,
} from '../../src/app/lib/breweries-data';
import { beers } from '../../src/app/lib/beers-data';
import { motion } from 'framer-motion';
import HeroSection from '../../src/app/components/HeroSection';
import BreweryFilter from '../../src/app/components/breweries/BreweryFilter';
import QuickTypeFilter from '../../src/app/components/breweries/QuickTypeFilter';
import BreweryList from '../../src/app/components/breweries/BreweryList';
import BreweryTypeInfo from '../../src/app/components/breweries/BreweryTypeInfo';
import EmptyResults from '../../src/app/components/beers/EmptyResults';
import LoadingSpinner from '../../src/app/components/LoadingSpinner';

// 内部コンポーネントをSuspenseで囲むためのラッパーコンポーネント
function BreweriesContent() {
  // フィルターステート
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // クライアントサイドレンダリングを追跡
  const [isMounted, setIsMounted] = useState(false);
  // 処理済みのブルワリーデータを保存するステート
  const [processedBreweries, setProcessedBreweries] = useState<
    typeof breweries
  >([]);

  // コンポーネントがマウントされたかどうかを確認し、ブルワリーデータを処理
  useEffect(() => {
    // ブルワリーデータの処理とソート
    const processBreweriesData = () => {
      // フィルタリング処理
      const filtered = breweries.filter((brewery) => {
        // 検索クエリでフィルタリング
        if (
          searchQuery &&
          !brewery.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !(
            brewery.nameEn &&
            brewery.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
          ) &&
          !brewery.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) &&
          !(brewery.prefecture && brewery.prefecture.includes(searchQuery)) &&
          !brewery.country.includes(searchQuery)
        ) {
          return false;
        }

        // 地域でフィルタリング
        if (selectedRegion !== 'all' && brewery.region !== selectedRegion) {
          return false;
        }

        // タイプでフィルタリング
        if (selectedType !== 'all' && brewery.type !== selectedType) {
          return false;
        }

        // 特徴でフィルタリング
        if (selectedFeatures.includes('taproom') && !brewery.taproom) {
          return false;
        }
        if (selectedFeatures.includes('tours') && !brewery.tours) {
          return false;
        }
        if (
          selectedFeatures.includes('domestic') &&
          brewery.country !== '日本'
        ) {
          return false;
        }
        if (
          selectedFeatures.includes('overseas') &&
          brewery.country === '日本'
        ) {
          return false;
        }

        return true;
      });

      // 安定したソート
      const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name, 'ja');
        } else if (sortBy === 'year-old') {
          return a.foundedYear - b.foundedYear || a.id.localeCompare(b.id);
        } else if (sortBy === 'year-new') {
          return b.foundedYear - a.foundedYear || a.id.localeCompare(b.id);
        } else if (sortBy === 'country') {
          return (
            a.country.localeCompare(b.country, 'ja') ||
            a.name.localeCompare(b.name, 'ja')
          );
        }
        // デフォルトはIDでソートして安定させる
        return a.id.localeCompare(b.id);
      });

      setProcessedBreweries(sorted);
    };

    processBreweriesData();
  }, [searchQuery, selectedRegion, selectedType, selectedFeatures, sortBy]);

  // LoadingSpinnerが非表示になったときに呼ばれるコールバック
  const handleLoadingComplete = () => {
    setIsMounted(true);
  };

  // ブルワリーの製造しているビールの数を計算
  const getBeerCount = (breweryId: string) => {
    // ビールのデータからブルワリー名と一致するものを検索
    return beers.filter((beer) => {
      const breweryName = breweries.find(
        (brewery) => brewery.id === breweryId
      )?.name;
      return breweryName && beer.brewery === breweryName;
    }).length;
  };

  // フィルターをリセットする関数
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedType('all');
    setSelectedFeatures([]);
    setSortBy('name');
  };

  // 選択可能な地域リスト（重複なし）
  const regions = ['all', ...Object.keys(regionNames)] as ('all' | Region)[];

  // 選択可能なブルワリータイプリスト
  const types = ['all', ...Object.keys(breweryTypeNames)] as (
    | 'all'
    | BreweryType
  )[];

  // クライアント側でレンダリングされるまで何も表示しない
  if (!isMounted) {
    return (
      <div className="container mx-auto">
        <LoadingSpinner
          size="medium"
          message="ブルワリー情報を読み込み中..."
          minDisplayTime={700}
          initialLoading={false} // データ取得はすでに完了している
          onLoadingComplete={handleLoadingComplete}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      {/* ヒーローセクション */}
      <HeroSection
        title="ブルワリーを探る"
        description="日本全国のクラフトブルワリーから大手メーカーまで、
            あなたのお気に入りの醸造所を見つけよう。
            ブルワリーごとの特徴やこだわりをチェックして、ビール選びの幅を広げましょう。"
      />

      {/* フィルターと検索セクション */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            ブルワリーを探す
          </h2>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="btn btn-sm bg-amber-100 text-amber-900 border-amber-300 gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            フィルター {isFilterOpen ? '閉じる' : '開く'}
          </button>
        </div>

        <BreweryFilter
          isOpen={isFilterOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedFeatures={selectedFeatures}
          setSelectedFeatures={setSelectedFeatures}
          sortBy={sortBy}
          setSortBy={setSortBy}
          regions={regions}
          types={types}
          resetFilters={resetFilters}
        />
      </motion.div>

      {/* クイックフィルター - ブルワリータイプ */}
      <QuickTypeFilter
        selectedType={selectedType as BreweryType | null}
        setSelectedType={(type) => setSelectedType(type || 'all')}
      />

      {/* 結果件数 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6 flex items-center justify-between"
      >
        <p className="text-amber-800 font-medium">
          {processedBreweries.length} 件のブルワリーが見つかりました
        </p>
      </motion.div>

      {/* ブルワリーリスト */}
      {processedBreweries.length > 0 ? (
        <BreweryList
          breweries={processedBreweries}
          getBeerCount={getBeerCount}
          resetFilters={resetFilters}
        />
      ) : (
        <EmptyResults
          resetFilters={resetFilters}
          message="条件に一致するブルワリーが見つかりませんでした"
        />
      )}

      {/* ブルワリータイプの説明セクション */}
      <BreweryTypeInfo />
    </div>
  );
}

// メインコンポーネント
export default function BreweriesPage() {
  return (
    <Suspense
      fallback={
        <LoadingSpinner
          size="large"
          message="ブルワリーページを読み込み中..."
        />
      }
    >
      <BreweriesContent />
    </Suspense>
  );
}
