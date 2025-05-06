import React from 'react';
import { notFound } from 'next/navigation';
import { beers } from '@/src/app/lib/beers-data';
import {
  getBeerStyleBySlugFromDb,
  getAllBeerStylesFromDb,
} from '@/src/app/lib/beer-styles-data';
import { BeerStyle } from '@/src/app/types/beer-style';

// クライアントコンポーネントのインポート
import StyleBackLink from './StyleBackLink';
import StyleInfoCard from './StyleInfoCard';
import {
  StyleRadarChartCard,
  StyleCharacteristicsBarCard,
} from './StyleCharacteristicsCard';
import StyleDescriptionCard from './StyleDescriptionCard';
import StyleHistoryCard from './StyleHistoryCard';
import RelatedStylesCard from './RelatedStylesCard';
import ExampleBeersCard from './ExampleBeersCard';
import StyleNavigation from './StyleNavigation';

interface BeerStyleDetailProps {
  slug: string;
}

// ビールスタイル詳細ページコンポーネント
export default async function BeerStyleDetail({ slug }: BeerStyleDetailProps) {
  // サーバーサイドでのデータ取得
  const styleData = await getBeerStyleBySlugFromDb(slug);

  if (!styleData) {
    notFound();
  }

  // 関連スタイルの取得
  const allStyles = await getAllBeerStylesFromDb();

  const parents = styleData.parents
    ?.map((parentSlug) => allStyles.find((s) => s.slug === parentSlug))
    .filter(Boolean) as BeerStyle[];

  const children = styleData.children
    ?.map((childSlug) => allStyles.find((s) => s.slug === childSlug))
    .filter(Boolean) as BeerStyle[];

  const siblings = styleData.siblings
    ?.map((siblingSlug) => allStyles.find((s) => s.slug === siblingSlug))
    .filter(Boolean) as BeerStyle[];

  // 例のビールを取得
  const styleBeers = beers.filter((beer) => beer.style === slug).slice(0, 3);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 relative overflow-hidden">
      <StyleBackLink />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-1">
          <StyleInfoCard style={styleData} />
          <StyleRadarChartCard characteristics={styleData.characteristics} />
          <StyleCharacteristicsBarCard
            characteristics={styleData.characteristics}
          />
        </div>

        <div className="lg:col-span-2">
          <StyleDescriptionCard description={styleData.description} />

          <StyleHistoryCard
            history={
              styleData.history ||
              'このビールスタイルの詳細な歴史情報は現在準備中です。'
            }
          />

          <RelatedStylesCard
            parentStyles={parents}
            childStyles={children}
            siblingStyles={siblings}
          />

          <ExampleBeersCard beers={styleBeers} />
        </div>
      </div>

      <StyleNavigation />
    </div>
  );
}
