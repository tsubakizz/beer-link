/**
 * Cloudflare D1データベースアクセス用のユーティリティ
 */

// D1データベースの型定義
export interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: {
    served_by: string;
    duration: number;
    changes?: number;
    last_row_id?: number;
  };
}

// D1データベース接続インターフェース
export interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
  dump: () => Promise<ArrayBuffer>;
  batch: <T = unknown>(
    statements: D1PreparedStatement[]
  ) => Promise<D1Result<T>[]>;
  exec: <T = unknown>(query: string) => Promise<D1Result<T>>;
}

// D1プリペアドステートメント
export interface D1PreparedStatement {
  bind: (...values: any[]) => D1PreparedStatement;
  first: <T = unknown>(colName?: string) => Promise<T>;
  run: <T = unknown>() => Promise<D1Result<T>>;
  all: <T = unknown>() => Promise<D1Result<T>>;
  raw: <T = unknown>() => Promise<T[]>;
}

// ビールスタイルの型定義
export interface BeerStyle {
  id: string;
  name: string;
  description: string;
  other_names?: string[]; // JSON配列をパースしたもの
  bitterness: number;
  sweetness: number;
  body: number;
  aroma: number;
  sourness: number;
  history?: string;
  origin?: string;
  abv_min?: number;
  abv_max?: number;
  ibu_min?: number;
  ibu_max?: number;
  srm_min?: number;
  srm_max?: number;
  siblings?: string[]; // JSON配列をパースしたもの
  parents?: string[]; // JSON配列をパースしたもの
  children?: string[]; // JSON配列をパースしたもの
  serving_temp_min?: number;
  serving_temp_max?: number;
  created_at?: string;
  updated_at?: string;
}

// ブルワリーの型定義
export interface Brewery {
  id: string;
  name: string;
  name_en?: string;
  type: string; // 'craft', 'macro', 'brewpub', 'contract', 'proprietary'
  region: string;
  prefecture?: string;
  country: string;
  founded_year?: number;
  description?: string;
  website?: string;
  taproom: boolean;
  tours: boolean;
  image_url?: string;
  address?: string;
  featured: boolean;
  specialties?: string[]; // JSON配列をパースしたもの
  created_at?: string;
  updated_at?: string;
}

// ビールの型定義
export interface Beer {
  id: string;
  name: string;
  brewery_id: string;
  style_id: string;
  abv: number;
  ibu?: number;
  description: string;
  image_url?: string;
  rating?: number;
  review_count: number;
  flavors?: string[]; // JSON配列をパースしたもの
  country: string;
  created_at?: string;
  updated_at?: string;
}

// D1データベースラッパークラス - データアクセスメソッドを提供
export class D1Client {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  // SQLの結果からJSONフィールドを自動的にパースする
  private parseJsonFields<T>(item: any, jsonFields: string[]): T {
    const result = { ...item };
    jsonFields.forEach((field) => {
      if (result[field] && typeof result[field] === 'string') {
        try {
          result[field] = JSON.parse(result[field]);
        } catch (e) {
          console.error(`Failed to parse JSON for field ${field}:`, e);
          // パースに失敗した場合は空の配列を設定
          result[field] = [];
        }
      }
    });
    return result as T;
  }

  // すべてのビールスタイルを取得
  async getAllBeerStyles(): Promise<BeerStyle[]> {
    try {
      const result = await this.db
        .prepare('SELECT * FROM beer_styles')
        .all<BeerStyle>();

      // JSON文字列フィールドをパース
      return result.results.map((style) =>
        this.parseJsonFields<BeerStyle>(style, [
          'other_names',
          'siblings',
          'parents',
          'children',
        ])
      );
    } catch (error) {
      console.error('Failed to fetch beer styles from D1:', error);
      return [];
    }
  }

  // IDでビールスタイルを取得
  async getBeerStyleById(id: string): Promise<BeerStyle | null> {
    try {
      const result = await this.db
        .prepare('SELECT * FROM beer_styles WHERE id = ?')
        .bind(id)
        .first<BeerStyle>();

      if (!result) return null;

      // JSON文字列フィールドをパース
      return this.parseJsonFields<BeerStyle>(result, [
        'other_names',
        'siblings',
        'parents',
        'children',
      ]);
    } catch (error) {
      console.error(`Failed to fetch beer style with ID ${id}:`, error);
      return null;
    }
  }

  // すべてのブルワリーを取得
  async getAllBreweries(): Promise<Brewery[]> {
    try {
      const result = await this.db
        .prepare('SELECT * FROM breweries')
        .all<Brewery>();

      // JSON文字列フィールドをパース
      return result.results.map((brewery) =>
        this.parseJsonFields<Brewery>(brewery, ['specialties'])
      );
    } catch (error) {
      console.error('Failed to fetch breweries from D1:', error);
      return [];
    }
  }

  // IDでブルワリーを取得
  async getBreweryById(id: string): Promise<Brewery | null> {
    try {
      const result = await this.db
        .prepare('SELECT * FROM breweries WHERE id = ?')
        .bind(id)
        .first<Brewery>();

      if (!result) return null;

      // JSON文字列フィールドをパース
      return this.parseJsonFields<Brewery>(result, ['specialties']);
    } catch (error) {
      console.error(`Failed to fetch brewery with ID ${id}:`, error);
      return null;
    }
  }

  // すべてのビールを取得
  async getAllBeers(): Promise<Beer[]> {
    try {
      const result = await this.db.prepare('SELECT * FROM beers').all<Beer>();

      // JSON文字列フィールドをパース
      return result.results.map((beer) =>
        this.parseJsonFields<Beer>(beer, ['flavors'])
      );
    } catch (error) {
      console.error('Failed to fetch beers from D1:', error);
      return [];
    }
  }

  // IDでビールを取得
  async getBeerById(id: string): Promise<Beer | null> {
    try {
      const result = await this.db
        .prepare('SELECT * FROM beers WHERE id = ?')
        .bind(id)
        .first<Beer>();

      if (!result) return null;

      // JSON文字列フィールドをパース
      return this.parseJsonFields<Beer>(result, ['flavors']);
    } catch (error) {
      console.error(`Failed to fetch beer with ID ${id}:`, error);
      return null;
    }
  }

  // ブルワリーIDでビールを検索
  async getBeersByBreweryId(breweryId: string): Promise<Beer[]> {
    try {
      const result = await this.db
        .prepare('SELECT * FROM beers WHERE brewery_id = ?')
        .bind(breweryId)
        .all<Beer>();

      // JSON文字列フィールドをパース
      return result.results.map((beer) =>
        this.parseJsonFields<Beer>(beer, ['flavors'])
      );
    } catch (error) {
      console.error(
        `Failed to fetch beers for brewery ID ${breweryId}:`,
        error
      );
      return [];
    }
  }

  // スタイルのスラッグでビールを検索
  async getBeersByStyleSlug(styleSlug: string): Promise<Beer[]> {
    try {
      const result = await this.db
        .prepare('SELECT * FROM beers WHERE style_id = ?')
        .bind(styleSlug)
        .all<Beer>();

      // JSON文字列フィールドをパース
      return result.results.map((beer) =>
        this.parseJsonFields<Beer>(beer, ['flavors'])
      );
    } catch (error) {
      console.error(
        `Failed to fetch beers for style slug ${styleSlug}:`,
        error
      );
      return [];
    }
  }
}

// D1クライアントのシングルトンインスタンスを取得する関数
// contextはCloudflare WorkersやPagesから渡されるランタイムコンテキスト
export function getD1Client(context: {
  env?: { BEER_LINK_DB?: D1Database };
}): D1Client | null {
  if (!context.env?.BEER_LINK_DB) {
    console.error('D1 database binding not found in environment');
    return null;
  }

  return new D1Client(context.env.BEER_LINK_DB);
}
