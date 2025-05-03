import imageCompression from 'browser-image-compression';

/**
 * 画像を圧縮するユーティリティ関数
 * @param imageFile 圧縮する画像ファイル
 * @param options 圧縮オプション
 * @returns 圧縮後の画像ファイル
 */
export async function compressImage(
  imageFile: File,
  options: {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    quality?: number;
  } = {}
): Promise<File> {
  // デフォルト値と合併
  const compressionOptions = {
    maxSizeMB: options.maxSizeMB || 1, // 最大サイズ（MB）
    maxWidthOrHeight: options.maxWidthOrHeight || 1280, // 最大幅/高さ（px）
    useWebWorker: true, // WebWorkerを使用
    initialQuality: options.quality || 0.7, // 初期品質（0-1）
  };

  try {
    console.log(`画像圧縮開始: ${(imageFile.size / 1024 / 1024).toFixed(2)}MB`);

    // 画像が小さい場合は圧縮しない
    if (imageFile.size / 1024 / 1024 < 0.3) {
      console.log('画像サイズが十分小さいため、圧縮をスキップします');
      return imageFile;
    }

    // 画像を圧縮
    const compressedFile = await imageCompression(
      imageFile,
      compressionOptions
    );

    console.log(
      `画像圧縮完了: ${(imageFile.size / 1024 / 1024).toFixed(2)}MB → ${(
        compressedFile.size /
        1024 /
        1024
      ).toFixed(2)}MB`
    );

    return compressedFile;
  } catch (error) {
    console.error('画像の圧縮に失敗しました:', error);
    // 圧縮に失敗した場合は元の画像を返す
    return imageFile;
  }
}

/**
 * 画像をリサイズして圧縮するためのより高度な関数
 * @param imageFile 元の画像ファイル
 * @param options リサイズオプション
 * @returns 処理後の画像ファイル（Blob）
 */
export async function resizeAndCompressImage(
  imageFile: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    format?: 'jpeg' | 'png' | 'webp';
  } = {}
): Promise<Blob> {
  // デフォルト値の設定
  const settings = {
    maxWidth: options.maxWidth || 1280,
    maxHeight: options.maxHeight || 1280,
    quality: options.quality || 0.8,
    format: options.format || 'jpeg',
  };

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();

      img.onload = () => {
        // 元の画像のサイズを取得
        const originalWidth = img.width;
        const originalHeight = img.height;

        // アスペクト比を維持しながら新しいサイズを計算
        let newWidth = originalWidth;
        let newHeight = originalHeight;

        if (originalWidth > settings.maxWidth) {
          newWidth = settings.maxWidth;
          newHeight = (originalHeight * settings.maxWidth) / originalWidth;
        }

        if (newHeight > settings.maxHeight) {
          newHeight = settings.maxHeight;
          newWidth = (newWidth * settings.maxHeight) / newHeight;
        }

        // Canvasを作成してリサイズ
        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context could not be created'));
          return;
        }

        // 画像を描画
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // BlobとしてCanvasの内容を取得
        canvas.toBlob(
          (blob) => {
            if (blob) {
              console.log(
                `画像リサイズ完了: ${originalWidth}x${originalHeight} → ${newWidth}x${newHeight}`
              );
              console.log(
                `圧縮率: ${((blob.size / imageFile.size) * 100).toFixed(2)}%`
              );
              resolve(blob);
            } else {
              reject(new Error('Blob creation failed'));
            }
          },
          `image/${settings.format}`,
          settings.quality
        );
      };

      img.onerror = () => {
        reject(new Error('Image loading error'));
      };

      if (typeof readerEvent.target?.result === 'string') {
        img.src = readerEvent.target.result;
      } else {
        reject(new Error('FileReader resulted in an invalid data type'));
      }
    };

    reader.onerror = () => {
      reject(new Error('FileReader error'));
    };

    reader.readAsDataURL(imageFile);
  });
}
