import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import BeerStyleDetail from '@/src/app/components/styles/BeerStyleDetail';
import {
  getBeerStyleBySlug,
  getAllBeerStyles,
} from '@/src/app/lib/beer-styles-data';

// メタデータの生成
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const style = await getBeerStyleBySlug(params.slug);

  if (!style) {
    return {
      title: 'ビアスタイル詳細 | Beer Link',
      description: 'ビールスタイルの詳細情報が見つかりませんでした。',
    };
  }

  return {
    title: `${style.name} | ビアスタイル詳細 | Beer Link`,
    description: style.description.substring(0, 160),
    openGraph: {
      title: `${style.name} | ビアスタイル詳細 | Beer Link`,
      description: style.description.substring(0, 160),
      images: ['/og-image.png'],
    },
  };
}

// 静的データ生成を有効化
export const dynamic = 'force-static'; // SSGを強制
export const revalidate = 86400; // 1日ごとに再検証

// 静的生成するパスを定義
export async function generateStaticParams() {
  const styles = await getAllBeerStyles();

  return styles.map((style) => ({
    slug: style.slug,
  }));
}

// ページコンポーネント
export default async function StyleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <BeerStyleDetail slug={params.slug} />;
}
