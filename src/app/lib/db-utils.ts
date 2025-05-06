/**
 * データベース直接アクセス用のユーティリティ
 *
 * 注意: このモジュールはビルド時やサーバーサイドレンダリング時のみ使用してください。
 * クライアントサイドでは動作しません。
 */

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../../../db/schema';

/**
 * データベース接続を取得する
 * @returns SQLiteデータベース接続と接続オブジェクトのタプル [drizzleDb, sqliteConnection]
 */
export function getDb() {
  const sqlite = new Database('beer_link_db.db');
  const db = drizzle(sqlite, { schema });
  return { db, sqlite };
}
