import { Suspense } from 'react';
import BeerStyleDetail from '@/src/app/components/styles/BeerStyleDetail';
import LoadingSpinner from '@/src/app/components/LoadingSpinner';

// Cloudflare Pagesのエッジランタイム設定
export const runtime = 'edge';

// ページコンポーネント（サーバーサイド）- 非同期関数に変更
export default async function BeerStyleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // 動的ルートパラメータを使用する前に、必要に応じて非同期処理を行う
  // Next.js 14以降ではこのようにasync関数にする必要があります
  const styleId = params.id;

  // クライアントコンポーネントをSuspenseで囲む
  return (
    <Suspense
      fallback={
        <LoadingSpinner size="large" message="ビールスタイルを読み込み中..." />
      }
    >
      <BeerStyleDetail id={styleId} />
    </Suspense>
  );
}
