import { beers } from '../../../src/app/lib/beers-data';
import BeerDetailClient from '../../../src/app/components/beers/BeerDetailClient';

// 静的ページ生成のためのパラメータを指定
export async function generateStaticParams() {
  // すべてのビールIDのパスを生成
  return beers.map((beer) => ({
    id: beer.id,
  }));
}

// サーバーコンポーネント
export default function BeerDetailPage({ params }: { params: { id: string } }) {
  // クライアントコンポーネントにIDを渡す
  return <BeerDetailClient id={params.id} />;
}
