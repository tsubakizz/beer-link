// 全てのスキーマをエクスポート
export * from './beer-favorites';
export * from './beer-style-other-names';
export * from './beer-style-relations';
export * from './beer-styles';
export * from './beers';
export * from './breweries';
export * from './countries';
export * from './prefectures';
export * from './reviews';
export * from './users';

// 各テーブルオブジェクトをまとめてエクスポート（マイグレーション生成時に使用）
import { beerFavorites } from './beer-favorites';
import { beerStyleOtherNames } from './beer-style-other-names';
import { beerStyleRelations } from './beer-style-relations';
import { beerStyles } from './beer-styles';
import { beers } from './beers';
import { breweries } from './breweries';
import { countries } from './countries';
import { prefectures } from './prefectures';
import { reviews } from './reviews';
import { users } from './users';

export const schema = {
  beerFavorites,
  beerStyles,
  beerStyleOtherNames,
  beerStyleRelations,
  beers,
  breweries,
  countries,
  prefectures,
  reviews,
  users,
};
