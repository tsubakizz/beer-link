import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/db/schema';

// キャッシュの有効期間（1週間 = 604800秒）
const CACHE_TTL = 604800;
const STYLES_CACHE_KEY = 'all-beer-styles';

export interface Env {
  BEER_LINK_DB: D1Database;
  BEER_STYLES_CACHE: KVNamespace;
}

/**
 * すべてのビールスタイルを取得する関数
 */
export async function onRequest(context: { env: Env }) {
  try {
    const { BEER_LINK_DB, BEER_STYLES_CACHE } = context.env;
    let cachedData;

    // 1. まずKVからキャッシュをチェック
    try {
      cachedData = await BEER_STYLES_CACHE.get(STYLES_CACHE_KEY, {
        type: 'json',
      });
      if (cachedData) {
        console.log('Returning all beer styles from Cloudflare KV cache');
        return new Response(JSON.stringify(cachedData), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400', // ブラウザキャッシュも1日設定
            'X-Cache-Source': 'cloudflare-kv',
          },
        });
      }
    } catch (cacheError) {
      console.warn('KV cache access error:', cacheError);
      // キャッシュエラーは無視して継続
    }

    try {
      // D1データベース接続を初期化
      const db = drizzle(BEER_LINK_DB, { schema });

      // スタイルとリレーションを取得
      const stylesData = await db.query.beerStyles.findMany({
        with: {
          otherNames: true,
          styleRelations: {
            with: {
              relatedStyle: true,
            },
          },
        },
      });

      // スタイルが見つからない場合はエラーを返す
      if (!stylesData || stylesData.length === 0) {
        return new Response(JSON.stringify({ error: 'No beer styles found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // KVキャッシュにデータを保存
      try {
        await BEER_STYLES_CACHE.put(
          STYLES_CACHE_KEY,
          JSON.stringify(stylesData),
          {
            expirationTtl: CACHE_TTL,
          }
        );
        console.log('All beer styles cached in Cloudflare KV for 1 week');
      } catch (putError) {
        console.error('Error caching beer styles data:', putError);
        // キャッシュ保存エラーは処理を中断しない
      }

      return new Response(JSON.stringify(stylesData), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600', // ブラウザキャッシュは1時間
          'X-Cache-Source': 'database',
        },
      });
    } catch (dbError) {
      console.error('Database query error:', dbError);
      return new Response(
        JSON.stringify({
          error: 'Failed to query database',
          details: String(dbError),
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Error fetching beer styles:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch beer styles' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
