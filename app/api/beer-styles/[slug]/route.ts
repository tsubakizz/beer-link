import { NextResponse } from 'next/server';
import { getBeerStyleBySlugFromDb } from '@/src/app/lib/beer-styles-data';

// 本番環境ではエッジランタイム、開発環境ではNodeJSランタイムを使用
export const runtime = 'edge';

// キャッシュの有効期間（1週間 = 604800秒）
const CACHE_TTL = 604800;

// APIをキャッシュして頻繁な再生成を防止
export const revalidate = 3600; // 1時間ごとに再検証

// Cloudflare Pages の context を受け取る
export async function GET(
  request: Request,
  context: {
    params: { slug: string };
    env?: { BEER_STYLES_CACHE?: KVNamespace; BEER_LINK_DB?: any };
  }
) {
  try {
    const { slug } = context.params;
    // スタイル固有のキャッシュキー
    const STYLE_CACHE_KEY = `beer-style-${slug}`;

    // context.env から KV 名前空間を取得（存在する場合）
    const kvCache = context.env?.BEER_STYLES_CACHE;
    let cachedData;

    // 1. まず KV からキャッシュをチェック（利用可能な場合）
    try {
      // Cloudflare KV が利用可能かどうかをチェック
      if (kvCache) {
        cachedData = await kvCache.get(STYLE_CACHE_KEY, { type: 'json' });
        if (cachedData) {
          console.log(`Returning beer style ${slug} from Cloudflare KV cache`);
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
      // beer-styles-data から共通関数を使用してスタイル情報を取得
      const formattedStyle = await getBeerStyleBySlugFromDb(slug);

      // スタイルが見つからない場合は404を返す
      if (!formattedStyle) {
        return NextResponse.json(
          { error: `Beer style with slug ${slug} not found` },
          { status: 404 }
        );
      }

      // KVキャッシュがあればデータを保存
      try {
        if (kvCache) {
          await kvCache.put(STYLE_CACHE_KEY, JSON.stringify(formattedStyle), {
            expirationTtl: CACHE_TTL,
          });
          console.log(`Beer style ${slug} cached in Cloudflare KV for 1 week`);
        }
      } catch (putError) {
        console.error('Error caching beer style data:', putError);
        // キャッシュ保存エラーは処理を中断しない
      }

      return NextResponse.json(formattedStyle, {
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
    console.error(
      `Error fetching beer style with slug ${context.params.slug}:`,
      error
    );
    return NextResponse.json(
      { error: 'Failed to fetch beer style' },
      { status: 500 }
    );
  }
}
