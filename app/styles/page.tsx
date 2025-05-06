import { Suspense } from 'react';
import { BeerStyle, fetchBeerStyles } from '@/src/app/lib/beer-styles-data';
import LoadingSpinner from '@/src/app/components/LoadingSpinner';

// インポートするコンポーネント
import HeroSection from '@/src/app/components/HeroSection';
import { Metadata } from 'next';
import BeerStyleClient from '@/src/app/components/styles/BeerStyleClient';

// メタデータ設定
export const metadata: Metadata = {
  title: 'ビールスタイル図鑑 | Beer Link',
  description:
    'ビールスタイルの知識を深めよう。さまざまなビールスタイルの特徴、歴史、味わいを知ることができる図鑑です。',
};

// 静的データ生成を有効化
export const dynamic = 'force-static';
export const revalidate = 3600; // 1時間ごとにデータを再検証

// サーバーサイドでデータを事前取得
export async function generateStaticParams() {
  await fetchBeerStyles();
  return [];
}

// メインコンポーネント（SSG対応）
export default async function BeerStylesPage() {
  // サーバーサイドでデータを取得
  const styles = await fetchBeerStyles();

  // スタイルごとの特別な色の定義をオブジェクトとして渡す
  const specialStyleColors = {
    'fruit-beer': 'bg-pink-200',
    'sour-ale': 'bg-rose-300',
    'berliner-weisse': 'bg-rose-200',
    gose: 'bg-rose-200',
    'flanders-red-ale': 'bg-red-300',
    kriek: 'bg-red-400',
    framboise: 'bg-pink-300',
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 relative overflow-hidden">
      {/* ヒーローセクション */}
      <HeroSection
        title="スタイル図鑑"
        description="これってどんなビール？ 知りたいスタイルが見つかる検索ガイド"
      />

      {/* クライアントサイドのフィルタリングとページネーションを持つコンポーネント */}
      <BeerStyleClient
        initialStyles={styles}
        specialStyleColors={specialStyleColors}
      />
    </div>
  );
}
