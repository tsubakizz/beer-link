import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { beerStyles } from './beer-styles';

// ビールスタイルの別名テーブル
export const beerStyleOtherNames = sqliteTable(
  'beer_style_other_names',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    styleId: integer('style_id', { mode: 'number' })
      .notNull()
      .references(() => beerStyles.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      styleIdIdx: index('beer_style_other_names_style_id_idx').on(
        table.styleId
      ),
    };
  }
);

// beerStyleOtherNamesのリレーション定義
export const beerStyleOtherNamesRelations = relations(
  beerStyleOtherNames,
  ({ one }) => ({
    style: one(beerStyles, {
      fields: [beerStyleOtherNames.styleId],
      references: [beerStyles.id],
    }),
  })
);

// ビールスタイルの別名の型定義（挿入時）
export type NewBeerStyleOtherName = typeof beerStyleOtherNames.$inferInsert;

// ビールスタイルの別名の型定義（選択時）
export type BeerStyleOtherName = typeof beerStyleOtherNames.$inferSelect;
