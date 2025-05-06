import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { reviews } from './reviews';
import { beerFavorites } from './beer-favorites';

// ユーザーテーブルのスキーマ定義
export const users = sqliteTable(
  'users',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    firebaseUid: text('firebase_uid').notNull().unique(), // Firebase認証ID
    email: text('email').notNull().unique(),
    displayName: text('display_name'),
    bio: text('bio'),
    profileImageUrl: text('profile_image_url'),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      firebaseUidIdx: index('users_firebase_uid_idx').on(table.firebaseUid),
      emailIdx: index('users_email_idx').on(table.email),
    };
  }
);

// usersのリレーション定義
export const usersRelations = relations(users, ({ many }) => ({
  reviews: many(reviews),
  favorites: many(beerFavorites), // お気に入りビールへの参照を追加
}));

// ユーザーの型定義（挿入時）
export type NewUser = typeof users.$inferInsert;

// ユーザーの型定義（選択時）
export type User = typeof users.$inferSelect;
