import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { beers } from './beers';
import { users } from './users';

// レビューテーブルのスキーマ定義
export const reviews = sqliteTable(
  'reviews',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    beerId: integer('beer_id', { mode: 'number' })
      .notNull()
      .references(() => beers.id),
    beerName: text('beer_name').notNull(),
    userId: integer('user_id', { mode: 'number' })
      .notNull()
      .references(() => users.id),
    userName: text('user_name').notNull(),
    userProfileImageUrl: text('user_profile_image_url'),
    rating: integer('rating').notNull(),
    comment: text('comment').notNull(),
    imageUrl: text('image_url'),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      beerIdIdx: index('reviews_beer_id_idx').on(table.beerId),
      userIdIdx: index('reviews_user_id_idx').on(table.userId),
    };
  }
);

// reviewsのリレーション定義
export const reviewsRelations = relations(reviews, ({ one }) => ({
  beer: one(beers, {
    fields: [reviews.beerId],
    references: [beers.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

// レビューの型定義（挿入時）
export type NewReview = typeof reviews.$inferInsert;

// レビューの型定義（選択時）
export type Review = typeof reviews.$inferSelect;
