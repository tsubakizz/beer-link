import BeerStyleDetail from '../../../../src/app/components/guides/styles/BeerStyleDetail';

// ページコンポーネント（サーバーサイド）
export default function BeerStyleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // スタイルIDをクライアントコンポーネントに渡す
  return <BeerStyleDetail id={params.id} />;
}
