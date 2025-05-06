import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// 都道府県テーブルのスキーマ定義
export const prefectures = sqliteTable(
  'prefectures',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull().unique(),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      nameIdx: index('prefectures_name_idx').on(table.name),
    };
  }
);

// 都道府県の型定義（挿入時）
export type NewPrefecture = typeof prefectures.$inferInsert;

// 都道府県の型定義（選択時）
export type Prefecture = typeof prefectures.$inferSelect;
