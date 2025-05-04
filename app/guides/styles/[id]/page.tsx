import BeerStyleDetail from '../../../../src/app/components/guides/styles/BeerStyleDetail';
import { beerStyles } from '../../../../src/app/lib/beers-data';

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
  // スタイルIDをクライアントコンポーネントに渡す
  return <BeerStyleDetail id={params.id} />;
}
