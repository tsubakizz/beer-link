// Cloudflare Workers および KV の型定義

interface KVNamespaceGetOptions<Type> {
  type: Type;
  cacheTtl?: number;
}

interface KVNamespacePutOptions {
  expiration?: number;
  expirationTtl?: number;
  metadata?: Record<string, unknown>;
}

interface KVNamespaceListOptions {
  limit?: number;
  prefix?: string;
  cursor?: string;
}

interface KVNamespaceListKey {
  name: string;
  expiration?: number;
  metadata?: Record<string, unknown>;
}

interface KVNamespaceListResult {
  keys: KVNamespaceListKey[];
  list_complete: boolean;
  cursor?: string;
}

interface KVNamespace {
  get(
    key: string,
    options?: Partial<KVNamespaceGetOptions<'text'>>
  ): Promise<string | null>;
  get(key: string, options: KVNamespaceGetOptions<'json'>): Promise<unknown>;
  get(
    key: string,
    options: KVNamespaceGetOptions<'arrayBuffer'>
  ): Promise<ArrayBuffer | null>;
  get(
    key: string,
    options: KVNamespaceGetOptions<'stream'>
  ): Promise<ReadableStream | null>;

  put(
    key: string,
    value: string | ReadableStream | ArrayBuffer | FormData,
    options?: KVNamespacePutOptions
  ): Promise<void>;

  delete(key: string): Promise<void>;

  list(options?: KVNamespaceListOptions): Promise<KVNamespaceListResult>;
}

// Cloudflare Pages の環境変数の型定義
declare namespace Cloudflare {
  interface Env {
    BEER_STYLES_CACHE?: KVNamespace;
    // 他の環境変数をここに追加する場合
    // ANOTHER_ENV_VAR?: string;
  }

  interface RouteContext {
    env: Env;
    params: Record<string, string | string[]>;
  }
}

// Next.js の Route Handler コンテキストを拡張
declare global {
  namespace NextApiHandler {
    interface RouteHandlerContext {
      env?: Cloudflare.Env;
      params?: Record<string, string | string[]>;
    }
  }
}
