import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
// 国テーブルのスキーマ定義
export const countries = sqliteTable(
  'countries',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull().unique(),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      nameIdx: index('countries_name_idx').on(table.name),
    };
  }
);

// 国の型定義（挿入時）
export type NewCountry = typeof countries.$inferInsert;

// 国の型定義（選択時）
export type Country = typeof countries.$inferSelect;
