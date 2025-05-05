import {
  text,
  integer,
  real,
  sqliteTable,
  index,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { breweries } from './breweries';
import { beerStyles } from './beer-styles';
import { prefectures } from './prefectures';
import { countries } from './countries';
import { reviews } from './reviews';
import { beerFavorites } from './beer-favorites';

// ビールテーブルのスキーマ定義
export const beers = sqliteTable(
  'beers',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    breweryId: integer('brewery_id', { mode: 'number' })
      .notNull()
      .references(() => breweries.id),
    styleId: integer('style_id', { mode: 'number' })
      .notNull()
      .references(() => beerStyles.id),
    abv: real('abv').notNull(),
    ibu: integer('ibu'),
    imageUrl: text('image_url'),
    rating: real('rating'),
    reviewCount: integer('review_count').notNull().default(0),
    prefectureId: integer('prefecture_id').references(() => prefectures.id),
    countryId: integer('country_id')
      .notNull()
      .references(() => countries.id),
    officialUrl: text('official_url'),
    sourceUrl: text('source_url').notNull().default(''),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      breweryIdIdx: index('beers_brewery_id_idx').on(table.breweryId),
      styleIdIdx: index('beers_style_id_idx').on(table.styleId),
      prefectureIdIdx: index('beers_prefecture_id_idx').on(table.prefectureId),
      countryIdIdx: index('beers_country_id_idx').on(table.countryId),
    };
  }
);

// beersのリレーション定義
export const beersRelations = relations(beers, ({ one, many }) => ({
  brewery: one(breweries, {
    fields: [beers.breweryId],
    references: [breweries.id],
  }),
  style: one(beerStyles, {
    fields: [beers.styleId],
    references: [beerStyles.id],
  }),
  prefecture: one(prefectures, {
    fields: [beers.prefectureId],
    references: [prefectures.id],
  }),
  country: one(countries, {
    fields: [beers.countryId],
    references: [countries.id],
  }),
  reviews: many(reviews), // ビールは複数のレビューを持つ
  favorites: many(beerFavorites), // ビールは複数のお気に入り登録を持つ
}));

// ビールの型定義（挿入時）
export type NewBeer = typeof beers.$inferInsert;

// ビールの型定義（選択時）
export type Beer = typeof beers.$inferSelect;
