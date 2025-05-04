import { breweries } from '../../../src/app/lib/breweries-data';
import BreweryDetailClient from '../../../src/app/components/breweries/BreweryDetailClient';

// Cloudflare Pagesで動作させるためにEdge Runtimeを指定
export const runtime = 'edge';

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
  // クライアントコンポーネントにIDを渡す
  return <BreweryDetailClient id={params.id} />;
}
