import { NextResponse } from 'next/server';
import { getAllBeerStylesFromDb } from '@/src/app/lib/beer-styles-data';

// 本番環境ではエッジランタイム、開発環境ではNodeJSランタイムを使用
export const runtime =
  process.env.NODE_ENV === 'development' ? 'nodejs' : 'edge';

// キャッシュの有効期間（1週間 = 604800秒）
const CACHE_TTL = 604800;

// APIをキャッシュして頻繁な再生成を防止
export const revalidate = 3600; // 1時間ごとに再検証

// Cloudflare Pages の context を受け取る
export async function GET(
  request: Request,
  context: { env?: { BEER_STYLES_CACHE?: KVNamespace } }
) {
  try {
    const STYLES_CACHE_KEY = 'all-beer-styles';

    // KV 名前空間を取得（存在する場合）
    const kvCache = context.env?.BEER_STYLES_CACHE;
    let cachedData;

    // 1. まず KV からキャッシュをチェック（利用可能な場合）
    try {
      if (kvCache) {
        cachedData = await kvCache.get(STYLES_CACHE_KEY, { type: 'json' });
        if (cachedData) {
          console.log('Returning all beer styles from Cloudflare KV cache');
          return NextResponse.json(cachedData, {
            headers: {
              'Cache-Control': 'public, max-age=86400', // ブラウザキャッシュも1日設定
              'X-Cache-Source': 'cloudflare-kv',
            },
          });
        }
      }
    } catch (cacheError) {
      console.warn('KV cache access error:', cacheError);
      // キャッシュエラーは無視して継続
    }

    try {
      // beer-styles-data の関数を使用してスタイル情報を取得
      const formattedStyles = await getAllBeerStylesFromDb();

      // スタイルが見つからない場合はエラーを返す
      if (!formattedStyles || formattedStyles.length === 0) {
        return NextResponse.json(
          { error: 'No beer styles found' },
          { status: 404 }
        );
      }

      // KVキャッシュがあればデータを保存
      try {
        if (kvCache) {
          await kvCache.put(STYLES_CACHE_KEY, JSON.stringify(formattedStyles), {
            expirationTtl: CACHE_TTL,
          });
          console.log('All beer styles cached in Cloudflare KV for 1 week');
        }
      } catch (putError) {
        console.error('Error caching beer styles data:', putError);
        // キャッシュ保存エラーは処理を中断しない
      }

      return NextResponse.json(formattedStyles, {
        headers: {
          'Cache-Control': 'public, max-age=3600', // ブラウザキャッシュは1時間
          'X-Cache-Source': 'database',
        },
      });
    } catch (dbError) {
      console.error('Database query error:', dbError);
      return NextResponse.json(
        { error: 'Failed to query database', details: String(dbError) },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error fetching beer styles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch beer styles' },
      { status: 500 }
    );
  }
}
