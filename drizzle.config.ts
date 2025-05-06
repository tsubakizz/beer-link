import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema/index.ts',
  out: './db/migrations',
  dialect: 'sqlite', // SQLiteを使用
  dbCredentials: {
    url: './beer_link_db.db', // ローカルのSQLiteデータベースファイル
  },
  // マイグレーション適用時の挙動を設定
  strict: true,
  verbose: true,
} satisfies Config;
