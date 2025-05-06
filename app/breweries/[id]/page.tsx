import { Suspense } from 'react';
import BreweryDetailClient from '@/src/app/components/breweries/BreweryDetailClient';
import LoadingSpinner from '@/src/app/components/LoadingSpinner';

// Cloudflare Pagesのエッジランタイム設定
export const runtime = 'edge';

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
