import {
  text,
  integer,
  real,
  sqliteTable,
  index,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { beerStyleOtherNames } from './beer-style-other-names';
import { beerStyleRelations } from './beer-style-relations';
import { beers } from './beers';

// ビールスタイルテーブルのスキーマ定義
export const beerStyles = sqliteTable(
  'beer_styles',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull().unique(), // 旧idをslugに置き換え
    name: text('name').notNull(),
    description: text('description').notNull(),
    bitterness: integer('bitterness').notNull().default(0),
    sweetness: integer('sweetness').notNull().default(0),
    body: integer('body').notNull().default(0),
    aroma: integer('aroma').notNull().default(0),
    sourness: integer('sourness').notNull().default(0),
    history: text('history').notNull().default(''),
    origin: text('origin').notNull().default(''),
    abvMin: real('abv_min').notNull().default(0),
    abvMax: real('abv_max').notNull().default(0),
    ibuMin: integer('ibu_min').notNull().default(0),
    ibuMax: integer('ibu_max').notNull().default(0),
    srmMin: integer('srm_min').notNull().default(0),
    srmMax: integer('srm_max').notNull().default(0),
    servingTempMin: integer('serving_temp_min').notNull().default(0),
    servingTempMax: integer('serving_temp_max').notNull().default(0),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      slugIdx: index('beer_styles_slug_idx').on(table.slug),
    };
  }
);

// beerStylesのリレーション定義
export const beerStylesRelations = relations(beerStyles, ({ many }) => ({
  otherNames: many(beerStyleOtherNames), // 別名との関連
  styleRelations: many(beerStyleRelations, { relationName: 'styleRelation' }), // 他スタイルとの関連（親子、兄弟）
  relatedStyles: many(beerStyleRelations, {
    relationName: 'relatedStyleRelation',
  }), // 関連先として参照されている場合
  beers: many(beers), // このスタイルに属するビール
}));

// ビールスタイルの型定義（挿入時）
export type NewBeerStyle = typeof beerStyles.$inferInsert;

// ビールスタイルの型定義（選択時）
export type BeerStyle = typeof beerStyles.$inferSelect;
