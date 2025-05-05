import { Suspense } from 'react';
import { breweries } from '@/src/app/lib/breweries-data';
import BreweryDetailClient from '@/src/app/components/breweries/BreweryDetailClient';
import LoadingSpinner from '@/src/app/components/LoadingSpinner';

// 静的ページ生成のためのパラメータを指定
export async function generateStaticParams() {
  // すべてのブルワリーIDのパスを生成
  return breweries.map((brewery) => ({
    id: brewery.id,
  }));
}

// サーバーコンポーネント
export default function BreweryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // クライアントコンポーネントをSuspenseで囲む
  return (
    <Suspense
      fallback={<LoadingSpinner size="large" message="読み込み中..." />}
    >
      <BreweryDetailClient id={params.id} />
    </Suspense>
  );
}
