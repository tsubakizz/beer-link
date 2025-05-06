import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { prefectures } from './prefectures';
import { countries } from './countries';
import { beers } from './beers';

// ブルワリーテーブルのスキーマ定義
export const breweries = sqliteTable(
  'breweries',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull().unique(), // 旧idをslugに置き換え
    name: text('name').notNull(),
    nameEn: text('name_en'),
    type: integer('type', { mode: 'number' }).notNull(), // 1=craft, 2=macro, 3=brewpub, 4=contract, 5=proprietary
    prefectureId: integer('prefecture_id').references(() => prefectures.id),
    countryId: integer('country_id')
      .notNull()
      .references(() => countries.id),
    website: text('website'),
    imageUrl: text('image_url'),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      slugIdx: index('breweries_slug_idx').on(table.slug),
      prefectureIdIdx: index('breweries_prefecture_id_idx').on(
        table.prefectureId
      ),
      countryIdIdx: index('breweries_country_id_idx').on(table.countryId),
    };
  }
);

// breweriesのリレーション定義
export const breweriesRelations = relations(breweries, ({ one, many }) => ({
  prefecture: one(prefectures, {
    fields: [breweries.prefectureId],
    references: [prefectures.id],
  }),
  country: one(countries, {
    fields: [breweries.countryId],
    references: [countries.id],
  }),
  beers: many(beers), // 追加：ブルワリーは複数のビールを製造する
}));

// ブルワリーの型定義（挿入時）
export type NewBrewery = typeof breweries.$inferInsert;

// ブルワリーの型定義（選択時）
export type Brewery = typeof breweries.$inferSelect;
