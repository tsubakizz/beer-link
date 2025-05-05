import { drizzle } from 'drizzle-orm/d1';
import type { D1Database } from '@cloudflare/workers-types';
import * as schema from '../../../db/schema';

// D1データベースからDrizzleインスタンスを作成する関数
export function createDb(d1: D1Database) {
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
