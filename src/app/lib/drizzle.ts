import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import { drizzle as drizzleSQLite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import type { D1Database } from '@cloudflare/workers-types';
import * as schema from '../../../db/schema';

// データベースからDrizzleインスタンスを作成する関数
export function createDb(d1?: D1Database) {
  // 環境によって適切なデータベース接続を選択
  // D1が提供されていない場合は、ローカルSQLiteを使用
  if (!d1 || process.env.NODE_ENV === 'development') {
    // ローカル環境ではSQLiteを使用
    const sqlite = new Database('beer_link_db.db');
    return drizzleSQLite(sqlite, { schema });
  }

  // Cloudflare D1を使用
  return drizzleD1(d1, { schema });
}

// 型変換ユーティリティ
export class DbUtils {
  /**
   * ブール値に変換する（SQLiteでは0/1で格納）
   * @param val 数値
   * @returns ブール値
   */
  static toBoolean(val: number): boolean {
    return val === 1;
  }

  /**
   * ブール値を数値に変換する（SQLiteでの格納用）
   * @param val ブール値
   * @returns 数値（0 or 1）
   */
  static fromBoolean(val: boolean): number {
    return val ? 1 : 0;
  }
}
