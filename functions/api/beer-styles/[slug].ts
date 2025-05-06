import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { beerStyles as beerStylesTable } from '@/db/schema/beer-styles';

// キャッシュの有効期間（1週間 = 604800秒）
const CACHE_TTL = 604800;
const STYLE_PREFIX_CACHE_KEY = 'beer-style-';

export interface Env {
  BEER_LINK_DB: D1Database;
  BEER_STYLES_CACHE: KVNamespace;
}

/**
 * スラッグで特定のビールスタイルを取得する関数
 */
export async function onRequest(context: {
  env: Env;
  params: { slug: string };
}) {
  try {
    const { BEER_LINK_DB, BEER_STYLES_CACHE } = context.env;
    const { slug } = context.params;

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cacheKey = `${STYLE_PREFIX_CACHE_KEY}${slug}`;
    let cachedData;

    // 1. まずKVからキャッシュをチェック
    try {
      cachedData = await BEER_STYLES_CACHE.get(cacheKey, { type: 'json' });
      if (cachedData) {
        console.log(`Returning beer style ${slug} from Cloudflare KV cache`);
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
      const style = await db.query.beerStyles.findFirst({
        where: eq(beerStylesTable.slug, slug),
        with: {
          otherNames: true,
          styleRelations: {
            with: {
              relatedStyle: true,
            },
          },
        },
      });

      if (!style) {
        return new Response(JSON.stringify({ error: 'Beer style not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // KVキャッシュにデータを保存
      try {
        await BEER_STYLES_CACHE.put(cacheKey, JSON.stringify(style), {
          expirationTtl: CACHE_TTL,
        });
        console.log(`Beer style ${slug} cached in Cloudflare KV for 1 week`);
      } catch (putError) {
        console.error('Error caching beer style data:', putError);
        // キャッシュ保存エラーは処理を中断しない
      }

      return new Response(JSON.stringify(style), {
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
    console.error('Error fetching beer style:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch beer style' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
