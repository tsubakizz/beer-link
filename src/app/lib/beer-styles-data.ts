// クライアントでも使用できる型定義を別ファイルからインポート
import { BeerStyle, ApiStyle } from '@/src/app/types/beer-style';
import { getApiBaseUrl } from './api-utils';
import { createShortDescription } from '@/src/app/lib/beer-styles-decorator';

// ビールスタイルのデータを保持する配列（メモリキャッシュ用）
export const beerStyles: BeerStyle[] = [];

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
    shortDescription:
      style.shortDescription || createShortDescription(style.description),
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

/**
 * 環境に応じたデータソースからすべてのビールスタイルを取得
 * - 開発/本番共通: Cloudflare Functions を使用
 * @returns ビールスタイルの配列
 */
export async function getAllBeerStyles(): Promise<BeerStyle[]> {
  try {
    // すでにメモリにデータが読み込まれている場合は再取得しない
    if (beerStyles.length > 0) {
      return beerStyles;
    }

    // Cloudflare Functions からデータを取得
    return getAllBeerStylesFromFunction();
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

    // Cloudflare Functions からデータを取得
    return getBeerStyleBySlugFromFunction(slug);
  } catch (error) {
    console.error(`Error in getBeerStyleBySlug for ${slug}:`, error);
    return null;
  }
}

/**
 * Cloudflare Functions からすべてのビールスタイルを取得する関数
 * @returns ビールスタイルの配列
 */
export async function getAllBeerStylesFromFunction(): Promise<BeerStyle[]> {
  try {
    // すでにメモリにデータが読み込まれている場合は再取得しない
    if (beerStyles.length > 0) {
      console.log('Using in-memory cached beer styles');
      return beerStyles;
    }

    // Cloudflare Functions 経由でデータを取得
    const baseUrl = getApiBaseUrl();
    // URL を /api/beer-styles から /beer-styles に変更（Cloudflare Functions のパス）
    const functionUrl = `${baseUrl}/api/beer-styles`;

    console.log('Fetching beer styles from Cloudflare Function:', functionUrl);

    const response = await fetch(functionUrl);

    if (!response.ok) {
      console.error(
        `Function returned status: ${response.status} - ${response.statusText}`
      );
      throw new Error(`データの取得に失敗しました (${response.status})`);
    }

    const styles = (await response.json()) as ApiStyle[];

    if (!styles || styles.length === 0) {
      throw new Error('ビールスタイルデータが見つかりませんでした');
    }

    // 型の整合性を確保するためにデータを整形
    const formattedStyles = styles.map((style: ApiStyle) =>
      formatBeerStyleData(style)
    );

    // メモリキャッシュをクリアして新しいデータを追加
    beerStyles.length = 0;
    beerStyles.push(...formattedStyles);

    console.log(
      `Loaded ${beerStyles.length} beer styles from Cloudflare Function`
    );
    return beerStyles;
  } catch (error) {
    console.error('Error in getAllBeerStylesFromFunction:', error);
    // エラーを上位に伝播させる
    throw error;
  }
}

/**
 * Cloudflare Functions からスラッグでビールスタイルを取得する関数
 * @param slug スタイルのスラッグ
 * @returns ビールスタイル情報、存在しない場合はnull
 */
export async function getBeerStyleBySlugFromFunction(
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
      await getAllBeerStylesFromFunction();
      const style = beerStyles.find((style) => style.slug === slug);
      if (style) {
        return style;
      }
    } catch (listError) {
      console.error('Error fetching style list:', listError);
      // リストの取得に失敗した場合は個別取得を試みる
    }

    // それでも見つからない場合は個別に取得
    const baseUrl = getApiBaseUrl();
    // URL を /api/beer-styles/${slug} から /beer-styles/${slug} に変更（Cloudflare Functions のパス）
    const functionUrl = `${baseUrl}/api/beer-styles/${slug}`;

    console.log(
      `Fetching beer style ${slug} from Cloudflare Function:`,
      functionUrl
    );

    const response = await fetch(functionUrl);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`スタイル情報の取得に失敗しました (${response.status})`);
    }

    const styleData = (await response.json()) as ApiStyle;

    // 型の整合性を確保するためにデータを整形
    const formattedStyle = formatBeerStyleData(styleData);

    // キャッシュに追加
    beerStyles.push(formattedStyle);

    return formattedStyle;
  } catch (error) {
    console.error(
      `Error in getBeerStyleBySlugFromFunction for ${slug}:`,
      error
    );
    return null;
  }
}
