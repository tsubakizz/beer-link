import { drizzle } from 'drizzle-orm/d1';
import type { D1Database } from '@cloudflare/workers-types';
import * as schema from '../../../db/schema';

/**
 * データベースからDrizzleインスタンスを作成する関数
 * @param d1 D1Databaseインスタンス（本番環境またはwrangler pages devで提供）
 * @returns Drizzleインスタンス
 */
export function createDb(d1: D1Database) {
  // D1インスタンスを使用してDrizzleインスタンスを作成
  return drizzle(d1, { schema });
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
