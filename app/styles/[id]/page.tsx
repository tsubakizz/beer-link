import { Suspense } from 'react';
import BeerStyleDetail from '@/src/app/components/styles/BeerStyleDetail';
import LoadingSpinner from '@/src/app/components/LoadingSpinner';

// Cloudflare Pagesデプロイのために必要なEdge Runtime設定
export const runtime = 'edge';

// ページコンポーネント（サーバーサイド）
export default function BeerStyleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // クライアントコンポーネントをSuspenseで囲む
  return (
    <Suspense
      fallback={
        <LoadingSpinner size="large" message="ビールスタイルを読み込み中..." />
      }
    >
      <BeerStyleDetail id={params.id} />
    </Suspense>
  );
}
