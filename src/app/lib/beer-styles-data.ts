// クライアントでも使用できる型定義を別ファイルからインポート
import { BeerStyle, ApiStyle } from '@/src/app/types/beer-style';
import { createShortDescription } from '@/src/app/lib/beer-styles-decorator';
import { eq } from 'drizzle-orm';
import { beerStyles as beerStylesTable } from '../../../db/schema/beer-styles';
import { RelationType } from '../../../db/schema/beer-style-relations';
import { getApiBaseUrl } from './api-utils';
// fs/pathモジュールを削除し、必要な場合はビルド時のみ使用するように修正
import { getDb } from './db-utils';

/**
 * スタイルの関連情報（親子関係など）を抽出する共通関数
 * @param styleRelations スタイル関係のデータ配列
 * @returns 親・子・兄弟スタイルのスラッグの配列を含むオブジェクト
 */
function extractStyleRelations(styleRelations: any[]) {
  const siblings = styleRelations
    .filter((relation) => relation.relationType === RelationType.SIBLING)
    .map((relation) => relation.relatedStyle.slug);

  const parents = styleRelations
    .filter((relation) => relation.relationType === RelationType.PARENT)
    .map((relation) => relation.relatedStyle.slug);

  const children = styleRelations
    .filter((relation) => relation.relationType === RelationType.CHILD)
    .map((relation) => relation.relatedStyle.slug);

  return { siblings, parents, children };
}

/**
 * データベースまたはAPIから取得したデータをBeerStyle型に変換する共通関数
 * @param style 変換元のデータ
 * @param relations 関連スタイルのデータ（オプション）
 * @param otherNames 別名のデータ（オプション）
 * @returns 整形されたBeerStyle型のオブジェクト
 */
function formatBeerStyleData(
  style: any,
  relations?: { siblings: string[]; parents: string[]; children: string[] },
  otherNames?: string[]
): BeerStyle {
  return {
    id: style.id,
    slug: style.slug,
    name: style.name,
    description: style.description,
    shortDescription: createShortDescription(style.description),
    otherNames: otherNames || style.otherNames || [],
    characteristics: {
      bitterness: style.bitterness || 0,
      sweetness: style.sweetness || 0,
      body: style.body || 0,
      aroma: style.aroma || 0,
      sourness: style.sourness || 0,
    },
    history: style.history || '',
    origin: style.origin || '',
    abv: [
      style.abvMin !== null ? parseFloat(String(style.abvMin)) : 0,
      style.abvMax !== null ? parseFloat(String(style.abvMax)) : 0,
    ],
    ibu: [
      style.ibuMin !== null ? parseInt(String(style.ibuMin)) : 0,
      style.ibuMax !== null ? parseInt(String(style.ibuMax)) : 0,
    ],
    srm: [
      style.srmMin !== null ? parseInt(String(style.srmMin)) : 0,
      style.srmMax !== null ? parseInt(String(style.srmMax)) : 0,
    ],
    siblings: relations ? relations.siblings : style.siblings || [],
    parents: relations ? relations.parents : style.parents || [],
    children: relations ? relations.children : style.children || [],
    servingTemperature: [
      style.servingTempMin !== null
        ? parseInt(String(style.servingTempMin))
        : 4,
      style.servingTempMax !== null
        ? parseInt(String(style.servingTempMax))
        : 12,
    ],
  };
}

// ビールスタイルのデータを保持する配列（メモリキャッシュ用）
export const beerStyles: BeerStyle[] = [];

/**
 * 環境に応じたデータソースからすべてのビールスタイルを取得
 * - 開発/本番共通: D1データベースを使用
 * @returns ビールスタイルの配列
 */
export async function getAllBeerStyles(): Promise<BeerStyle[]> {
  try {
    // すでにメモリにデータが読み込まれている場合は再取得しない
    if (beerStyles.length > 0) {
      return beerStyles;
    }

    // サーバーサイドの場合、DBから直接取得
    if (typeof window === 'undefined') {
      return getAllBeerStylesFromDb();
    }

    // クライアントサイドの場合、APIから取得
    return getAllBeerStylesFromAPI();
  } catch (error) {
    console.error('Failed to load beer styles:', error);
    return [];
  }
}

/**
 * 環境に応じたデータソースからスラッグでビールスタイルを取得
 * @param slug スタイルのスラッグ
 * @returns ビールスタイル情報、存在しない場合はnull
 */
export async function getBeerStyleBySlug(
  slug: string
): Promise<BeerStyle | null> {
  try {
    // まずメモリキャッシュから検索
    const cachedStyle = beerStyles.find((style) => style.slug === slug);
    if (cachedStyle) {
      return cachedStyle;
    }

    // サーバーサイドの場合、DBから直接取得
    if (typeof window === 'undefined') {
      return getBeerStyleBySlugFromDb(slug);
    }

    // クライアントサイドの場合、APIから取得
    return getBeerStyleBySlugFromAPI(slug);
  } catch (error) {
    console.error(`Error in getBeerStyleBySlug for ${slug}:`, error);
    return null;
  }
}

/**
 * APIからすべてのビールスタイルを取得する関数
 * @returns ビールスタイルの配列
 */
export async function getAllBeerStylesFromAPI(): Promise<BeerStyle[]> {
  try {
    // すでにメモリにデータが読み込まれている場合は再取得しない
    if (beerStyles.length > 0) {
      console.log('Using in-memory cached beer styles');
      return beerStyles;
    }

    // API経由でデータを取得
    const apiUrl = `${getApiBaseUrl()}/api/beer-styles`;
    console.log('Fetching beer styles from:', apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error(
        `API returned status: ${response.status} - ${response.statusText}`
      );
      throw new Error(`データの取得に失敗しました (${response.status})`);
    }

    const styles = (await response.json()) as ApiStyle[];

    // D1から取得したデータをBeerStyle形式に変換
    const formattedStyles = styles.map((style: ApiStyle) =>
      formatBeerStyleData(style)
    );

    if (formattedStyles.length === 0) {
      throw new Error('ビールスタイルデータが見つかりませんでした');
    }

    // メモリキャッシュをクリアして新しいデータを追加
    beerStyles.length = 0;
    beerStyles.push(...formattedStyles);

    console.log(`Loaded ${beerStyles.length} beer styles from database`);
    return beerStyles;
  } catch (error) {
    console.error('Error in getAllBeerStylesFromAPI:', error);
    // エラーを上位に伝播させる
    throw error;
  }
}

/**
 * APIからスラッグでビールスタイルを取得する関数
 * @param slug スタイルのスラッグ
 * @returns ビールスタイル情報、存在しない場合はnull
 */
export async function getBeerStyleBySlugFromAPI(
  slug: string
): Promise<BeerStyle | null> {
  try {
    // まずメモリキャッシュから検索
    const cachedStyle = beerStyles.find((style) => style.slug === slug);
    if (cachedStyle) {
      return cachedStyle;
    }

    // スタイルリストをロードしてから再検索
    try {
      await getAllBeerStylesFromAPI();
      const style = beerStyles.find((style) => style.slug === slug);
      if (style) {
        return style;
      }
    } catch (listError) {
      console.error('Error fetching style list:', listError);
      // リストの取得に失敗した場合は個別取得を試みる
    }

    // それでも見つからない場合は個別に取得
    const apiUrl = `${getApiBaseUrl()}/api/beer-styles/${slug}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`スタイル情報の取得に失敗しました (${response.status})`);
    }

    const styleData = (await response.json()) as ApiStyle;

    // データ形式を変換
    const formattedStyle = formatBeerStyleData(styleData);

    // キャッシュに追加
    beerStyles.push(formattedStyle);

    return formattedStyle;
  } catch (error) {
    console.error(`Error in getBeerStyleBySlugFromAPI for ${slug}:`, error);
    return null;
  }
}

/**
 * すべてのビールスタイルをデータベースから直接取得する
 * @returns ビールスタイルの配列
 */
export async function getAllBeerStylesFromDb(): Promise<BeerStyle[]> {
  try {
    // サーバーサイドでない場合は空の配列を返す
    if (typeof window !== 'undefined') {
      console.warn('getAllBeerStylesFromDb はサーバーサイドでのみ使用可能です');
      return [];
    }

    // すでにメモリにデータが読み込まれている場合は再取得しない
    if (beerStyles.length > 0) {
      console.log('Using in-memory cached beer styles');
      return beerStyles;
    }

    try {
      // 非同期でデータベース接続を取得
      const { db, sqlite } = await getDb();

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

      // DBを閉じる（互換性のための空の実装）
      sqlite.close();

      // データを整形
      const formattedStyles = stylesData.map((style) => {
        const relations = extractStyleRelations(style.styleRelations);
        const otherNames = style.otherNames.map((o) => o.name);

        return formatBeerStyleData(style, relations, otherNames);
      });

      // メモリキャッシュに保存
      beerStyles.length = 0;
      beerStyles.push(...formattedStyles);

      return formattedStyles;
    } catch (error) {
      console.error('Error loading database:', error);
      throw error; // エラーを上位に伝播
    }
  } catch (error) {
    console.error('Error fetching beer styles from DB:', error);
    return [];
  }
}

/**
 * スラッグでビールスタイルをデータベースから直接取得する
 * @param slug スタイルのスラッグ
 * @returns ビールスタイル情報、存在しない場合はnull
 */
export async function getBeerStyleBySlugFromDb(
  slug: string
): Promise<BeerStyle | null> {
  try {
    // サーバーサイドでない場合はnullを返す
    if (typeof window !== 'undefined') {
      console.warn(
        'getBeerStyleBySlugFromDb はサーバーサイドでのみ使用可能です'
      );
      return null;
    }

    // まずメモリキャッシュから検索
    const cachedStyle = beerStyles.find((style) => style.slug === slug);
    if (cachedStyle) {
      return cachedStyle;
    }

    try {
      // 非同期でデータベース接続を取得
      const { db, sqlite } = await getDb();

      console.log('Fetching beer style from DB:', slug);
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

      // DBを閉じる（互換性のための空の実装）
      sqlite.close();

      if (!style) {
        return null;
      }

      // styleRelationsからrelationTypeに基づいて分類
      const relations = extractStyleRelations(style.styleRelations);
      const otherNames = style.otherNames.map((o) => o.name);

      // データを整形して返す
      const formattedStyle = formatBeerStyleData(style, relations, otherNames);

      // キャッシュに追加
      beerStyles.push(formattedStyle);

      return formattedStyle;
    } catch (error) {
      console.error('Error accessing database:', error);
      return null;
    }
  } catch (error) {
    console.error(
      `Error fetching beer style with slug ${slug} from DB:`,
      error
    );
    return null;
  }
}
