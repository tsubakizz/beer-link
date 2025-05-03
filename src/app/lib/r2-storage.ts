import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// R2の接続情報
const R2_ENDPOINT_DOMAIN = process.env.NEXT_PUBLIC_R2_ENDPOINT_DOMAIN || '';
const R2_ACCESSKEY = process.env.NEXT_PUBLIC_R2_ACCESSKEY || '';
const R2_SECRETKEY = process.env.NEXT_PUBLIC_R2_SECRETKET || '';
const BUCKET_NAME = process.env.NEXT_PUBLIC_R2_BUCKET || 'lets-beer'; // 環境変数からバケット名を取得
const R2_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN || ''; // パブリックアクセス用のドメイン

// R2クライアントの初期化
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ENDPOINT_DOMAIN}`,
  credentials: {
    accessKeyId: R2_ACCESSKEY,
    secretAccessKey: R2_SECRETKEY,
  },
});

/**
 * 画像をR2にアップロードする関数
 * @param file アップロードするファイル
 * @param folder 保存先フォルダ（例: 'reviews', 'beers'など）
 * @returns アップロードした画像のURL
 */
export const uploadImageToR2 = async (
  file: File,
  folder: string = 'reviews'
): Promise<string> => {
  try {
    // ファイル名をランダムなUUIDに変更して重複防止
    const fileExtension = file.name.split('.').pop();
    const randomFileName = `${uuidv4()}.${fileExtension}`;
    const key = `${folder}/${randomFileName}`;

    // ファイルをArrayBufferに変換
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // R2にアップロードするためのコマンド作成
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    // R2にアップロード実行
    await r2Client.send(command);

    // アップロードした画像のURLを返す
    let imageUrl;
    if (R2_PUBLIC_DOMAIN) {
      // パブリックアクセス用ドメインを使用
      imageUrl = `https://${R2_PUBLIC_DOMAIN}/${key}`;
    } else {
      // R2エンドポイントベースのURL（非推奨: アクセス権限の問題が発生する可能性あり）
      imageUrl = `https://${R2_ENDPOINT_DOMAIN}/${BUCKET_NAME}/${key}`;
    }

    return imageUrl;
  } catch (error) {
    console.error('画像のアップロードに失敗しました:', error);
    throw new Error('画像のアップロードに失敗しました');
  }
};
