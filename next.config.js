/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google認証のプロフィール画像用
      // R2のドメインがある場合は環境変数から追加
      ...(process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN
        ? [process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN]
        : []),
      ...(process.env.NEXT_PUBLIC_R2_ENDPOINT_DOMAIN
        ? [process.env.NEXT_PUBLIC_R2_ENDPOINT_DOMAIN]
        : []),
    ],
    unoptimized: true, // Cloudflare Pagesでは画像の最適化が不要
  },
  // デフォルトでは静的エクスポートを使用しない
  // Cloudflare Pages用の設定はプロダクション環境のみ適用
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  // ESLintとTypeScriptの型チェックを無効化
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

// CloudflareのNext.js on Pagesが環境に存在する場合の設定
if (process.env.NODE_ENV === 'production' && process.env.CF_PAGES) {
  // Cloudflare Pagesでは適切なモードを設定
  nextConfig.output = 'standalone';
}

module.exports = nextConfig;
