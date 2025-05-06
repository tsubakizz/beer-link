import { NextResponse } from 'next/server';
import { createDb } from '@/src/app/lib/drizzle';
import { RelationType } from '@/db/schema/beer-style-relations';

// エッジランタイム設定
export const runtime = 'edge';

// キャッシュの有効期間（1週間 = 604800秒）
const CACHE_TTL = 604800;
const CACHE_KEY = 'beer-styles-data';

// APIをキャッシュして頻繁な再生成を防止
export const revalidate = 3600; // 1時間ごとに再検証

// Cloudflare Pages の context を受け取る
export async function GET(
  request: Request,
  context: { env?: { BEER_STYLES_CACHE?: KVNamespace; BEER_LINK_DB?: any } }
) {
  try {
    // context.env から KV 名前空間を取得（存在する場合）
    const kvCache = context.env?.BEER_STYLES_CACHE;
    let cachedData;

    // 1. まず KV からキャッシュをチェック（利用可能な場合）
    try {
      // Cloudflare KV が利用可能かどうかをチェック
      if (kvCache) {
        cachedData = await kvCache.get(CACHE_KEY, { type: 'json' });
        if (cachedData) {
          console.log('Returning beer styles from Cloudflare KV cache');
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

    // 2. D1データベースからデータを取得
    if (!context.env?.BEER_LINK_DB) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      );
    }

    // DrizzleインスタンスでD1データベースをラップ
    const db = createDb(context.env.BEER_LINK_DB);

    // ビールスタイルをリレーションデータも含めて取得
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

    // リレーションデータを含む形式に整形
    const styles = stylesData.map((style) => {
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

      // 関連データの形式を整える
      return {
        ...style,
        otherNames: style.otherNames.map((o) => o.name),
        siblings,
        parents,
        children,
        // styleRelationsは不要なので削除
        styleRelations: undefined,
      };
    });

    console.log(`Loaded ${styles.length} beer styles from D1 database`);

    // 3. KVキャッシュがあればデータを保存
    try {
      if (kvCache) {
        await kvCache.put(CACHE_KEY, JSON.stringify(styles), {
          expirationTtl: CACHE_TTL,
        });
        console.log('Beer styles cached in Cloudflare KV for 1 week');
      }
    } catch (putError) {
      console.error('Error caching beer styles data:', putError);
      // キャッシュ保存エラーは処理を中断しない
    }

    return NextResponse.json(styles, {
      headers: {
        'Cache-Control': 'public, max-age=3600', // ブラウザキャッシュは1時間
        'X-Cache-Source': 'd1-database',
      },
    });
  } catch (error) {
    console.error('Error fetching beer styles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch beer styles' },
      { status: 500 }
    );
  }
}
