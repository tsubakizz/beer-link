// 自ホストのAPIのベースURL取得
export function getApiBaseUrl() {
  // ブラウザ環境では相対パスを使用
  if (typeof window !== 'undefined') {
    return '';
  }

  // サーバー環境での実行時は絶対URLが必要
  // 環境変数から取得（デフォルトはlocalhost）
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
}
