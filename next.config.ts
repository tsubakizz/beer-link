import type { NextConfig } from 'next';

// 環境変数からR2のドメインを取得
const r2PublicDomain = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN || '';
const r2EndpointDomain = process.env.NEXT_PUBLIC_R2_ENDPOINT_DOMAIN || '';

// ドメインの配列を作成
const imageDomains = [
  'lh3.googleusercontent.com', // Google認証のプロフィール画像用
];

// R2のドメインが設定されている場合は追加
if (r2PublicDomain) imageDomains.push(r2PublicDomain);
if (r2EndpointDomain) imageDomains.push(r2EndpointDomain);

const nextConfig: NextConfig = {
  images: {
    domains: imageDomains,
  },
};

export default nextConfig;
