import { getAllBeerStyles } from '@/src/app/lib/beer-styles-data';
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
export const dynamic = 'force-dynamic'; // SSRを強制
export const revalidate = 3600; // 1時間ごとにデータを再検証

// 本番環境ではエッジランタイム、開発環境ではNodeJSランタイムを使用
export const runtime = 'edge';

// サーバーサイドでビアスタイルの色を決定する関数
function getSpecialStyleColors() {
  return {
    'fruit-beer': 'bg-pink-200',
    'sour-ale': 'bg-rose-300',
    'berliner-weisse': 'bg-rose-200',
    gose: 'bg-rose-200',
    'flanders-red-ale': 'bg-red-300',
    kriek: 'bg-red-400',
    framboise: 'bg-pink-300',
  };
}

// メインコンポーネント（SSG対応）
export default async function BeerStylesPage() {
  // サーバーサイドで直接DBからスタイルデータを取得
  const styles = await getAllBeerStyles();
  const specialStyleColors = getSpecialStyleColors();

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 relative overflow-hidden">
      {/* ヒーローセクション */}
      <HeroSection
        title="スタイル図鑑"
        description="これってどんなビール？ 知りたいスタイルが見つかる検索ガイド"
      />

      {/* クライアントサイドのインタラクティブコンポーネントにデータを渡す */}
      <BeerStyleClient
        initialStyles={styles}
        specialStyleColors={specialStyleColors}
      />
    </div>
  );
}
