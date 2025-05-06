import {
  integer,
  text,
  sqliteTable,
  index,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { beers } from './beers';

// ビールのお気に入りテーブルのスキーマ定義
export const beerFavorites = sqliteTable(
  'beer_favorites',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    userId: integer('user_id', { mode: 'number' })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    beerId: integer('beer_id', { mode: 'number' })
      .notNull()
      .references(() => beers.id, { onDelete: 'cascade' }),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      userIdIdx: index('beer_favorites_user_id_idx').on(table.userId),
      beerIdIdx: index('beer_favorites_beer_id_idx').on(table.beerId),
      // 同じユーザーが同じビールを複数回お気に入りに追加できないようにユニーク制約
      userBeerUnique: uniqueIndex('beer_favorites_user_beer_unique_idx').on(
        table.userId,
        table.beerId
      ),
    };
  }
);

// beerFavoritesのリレーション定義
export const beerFavoritesRelations = relations(beerFavorites, ({ one }) => ({
  user: one(users, {
    fields: [beerFavorites.userId],
    references: [users.id],
  }),
  beer: one(beers, {
    fields: [beerFavorites.beerId],
    references: [beers.id],
  }),
}));

// ビールのお気に入りの型定義（挿入時）
export type NewBeerFavorite = typeof beerFavorites.$inferInsert;

// ビールのお気に入りの型定義（選択時）
export type BeerFavorite = typeof beerFavorites.$inferSelect;
