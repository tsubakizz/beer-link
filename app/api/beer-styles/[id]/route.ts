import { NextResponse } from 'next/server';
import { createDb } from '@/src/app/lib/drizzle';
import { beerStyles } from '@/db/schema/beer-styles';
import { RelationType } from '@/db/schema/beer-style-relations';
import { eq } from 'drizzle-orm';

// エッジランタイム設定
export const runtime = 'edge';

// キャッシュの有効期間（1週間 = 604800秒）
const CACHE_TTL = 604800;

// APIをキャッシュして頻繁な再生成を防止
export const revalidate = 3600; // 1時間ごとに再検証

// Cloudflare Pages の context を受け取る
export async function GET(
  request: Request,
  context: {
    params: { id: string };
    env?: { BEER_STYLES_CACHE?: KVNamespace; BEER_LINK_DB?: any };
  }
) {
  try {
    const { id } = context.params;
    // スタイル固有のキャッシュキー
    const STYLE_CACHE_KEY = `beer-style-${id}`;

    // context.env から KV 名前空間を取得（存在する場合）
    const kvCache = context.env?.BEER_STYLES_CACHE;
    let cachedData;

    // 1. まず KV からキャッシュをチェック（利用可能な場合）
    try {
      // Cloudflare KV が利用可能かどうかをチェック
      if (kvCache) {
        cachedData = await kvCache.get(STYLE_CACHE_KEY, { type: 'json' });
        if (cachedData) {
          console.log(`Returning beer style ${id} from Cloudflare KV cache`);
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

    // D1データベース接続確認
    if (!context.env?.BEER_LINK_DB) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      );
    }

    // DrizzleインスタンスでD1データベースをラップ
    const db = createDb(context.env.BEER_LINK_DB);

    // slugに対応するビールスタイルをリレーションデータも含めて取得
    const style = await db.query.beerStyles.findFirst({
      where: eq(beerStyles.slug, id),
      with: {
        otherNames: true,
        styleRelations: {
          with: {
            relatedStyle: true,
          },
        },
      },
    });

    // スタイルが見つからない場合は404を返す
    if (!style) {
      return NextResponse.json(
        { error: `Beer style with slug ${id} not found` },
        { status: 404 }
      );
    }

    // styleRelationsからrelationTypeに基づいて分類
    const siblings = style.styleRelations
      .filter((relation) => relation.relationType === RelationType.SIBLING)
      .map((relation) => relation.relatedStyle.slug);

    const parents = style.styleRelations
      .filter((relation) => relation.relationType === RelationType.PARENT)
      .map((relation) => relation.relatedStyle.slug);

    const children = style.styleRelations
      .filter((relation) => relation.relationType === RelationType.CHILD)
      .map((relation) => relation.relatedStyle.slug);

    // リレーションデータを整形して返す
    const formattedStyle = {
      ...style,
      otherNames: style.otherNames.map((o) => o.name),
      siblings,
      parents,
      children,
      // styleRelationsは不要なので削除
      styleRelations: undefined,
    };

    // KVキャッシュがあればデータを保存
    try {
      if (kvCache) {
        await kvCache.put(STYLE_CACHE_KEY, JSON.stringify(formattedStyle), {
          expirationTtl: CACHE_TTL,
        });
        console.log(`Beer style ${id} cached in Cloudflare KV for 1 week`);
      }
    } catch (putError) {
      console.error('Error caching beer style data:', putError);
      // キャッシュ保存エラーは処理を中断しない
    }

    return NextResponse.json(formattedStyle, {
      headers: {
        'Cache-Control': 'public, max-age=3600', // ブラウザキャッシュは1時間
        'X-Cache-Source': 'd1-database',
      },
    });
  } catch (error) {
    console.error(
      `Error fetching beer style with slug ${context.params.id}:`,
      error
    );
    return NextResponse.json(
      { error: 'Failed to fetch beer style' },
      { status: 500 }
    );
  }
}
