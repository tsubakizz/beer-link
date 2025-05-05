import { text, integer, sqliteTable, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { beerStyles } from './beer-styles';

// 関係性の種類を表す定数
export enum RelationType {
  SIBLING = 1, // 兄弟関係（同じグループの別スタイル）
  PARENT = 2, // 親関係（上位スタイル）
  CHILD = 3, // 子関係（下位スタイル）
}

// ビールスタイルの関連性テーブル（siblings, parents, childrenを統合）
export const beerStyleRelations = sqliteTable(
  'beer_style_relations',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    styleId: integer('style_id', { mode: 'number' })
      .notNull()
      .references(() => beerStyles.id, { onDelete: 'cascade' }),
    relatedStyleId: integer('related_style_id', { mode: 'number' })
      .notNull()
      .references(() => beerStyles.id, { onDelete: 'cascade' }),
    relationType: integer('relation_type').notNull(), // 1=siblings, 2=parents, 3=children
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      styleIdIdx: index('beer_style_relations_style_id_idx').on(table.styleId),
      relatedStyleIdIdx: index('beer_style_relations_related_style_id_idx').on(
        table.relatedStyleId
      ),
    };
  }
);

// beerStyleRelationsのリレーション定義
export const beerStyleRelationsRelations = relations(
  beerStyleRelations,
  ({ one }) => ({
    style: one(beerStyles, {
      fields: [beerStyleRelations.styleId],
      references: [beerStyles.id],
      relationName: 'styleRelation',
    }),
    relatedStyle: one(beerStyles, {
      fields: [beerStyleRelations.relatedStyleId],
      references: [beerStyles.id],
      relationName: 'relatedStyleRelation',
    }),
  })
);

// ビールスタイルの関連性の型定義（挿入時）
export type NewBeerStyleRelation = typeof beerStyleRelations.$inferInsert;

// ビールスタイルの関連性の型定義（選択時）
export type BeerStyleRelation = typeof beerStyleRelations.$inferSelect;
