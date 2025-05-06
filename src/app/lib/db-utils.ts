/**
 * データベース直接アクセス用のユーティリティ
 *
 * 注意: このモジュールはサーバーサイドでのみ使用してください。
 * クライアントサイドでは動作しません。
 */

import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/db/schema';

// 環境変数からD1インスタンスを取得
declare const BEER_LINK_DB: D1Database;

/**
 * データベース接続を取得する
 * @returns D1データベース接続とクローズメソッドを持つオブジェクトのタプル
 */
export async function getDb() {
  // サーバーサイドでのみ実行可能
  if (typeof window !== 'undefined') {
    throw new Error('このモジュールはサーバーサイドでのみ使用できます');
  }

  try {
    // グローバル変数からD1インスタンスを取得（wrangler pages devまたは本番環境で設定される）
    if (typeof BEER_LINK_DB === 'undefined') {
      throw new Error(
        'BEER_LINK_DB バインディングが見つかりません。wrangler pages dev を使用して実行しているか確認してください。'
      );
    }

    const db = drizzle(BEER_LINK_DB, { schema });

    // 互換性のためにcloseメソッドを提供
    const d1WithClose = {
      ...BEER_LINK_DB,
      close: () => {
        // D1には明示的なcloseメソッドはない
        // console.log('D1 connections do not need explicit closing');
      },
    };

    return { db, sqlite: d1WithClose };
  } catch (error) {
    console.error('D1データベース接続の取得に失敗しました:', error);
    throw new Error(`データベース接続を確立できませんでした: ${error}`);
  }
}
