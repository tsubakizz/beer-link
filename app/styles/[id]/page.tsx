import { Suspense } from 'react';
import BeerStyleDetail from '../../../src/app/components/styles/BeerStyleDetail';
import { beerStyles } from '../../../src/app/lib/beers-data';
import LoadingSpinner from '../../../src/app/components/LoadingSpinner';

// 静的ページ生成のためのパラメータを指定
export async function generateStaticParams() {
  // すべてのビールスタイルIDのパスを生成
  return beerStyles.map((style) => ({
    id: style.id,
  }));
}

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
