import React, { useRef } from 'react';
import Image from 'next/image';
import { ImageUploaderProps } from './types/review-form.types';
import LoadingSpinner from '../LoadingSpinner';
import { compressImage } from '../../lib/image-compressor';

export default function ImageUploader({
  initialImageUrl = null,
  onImageChange,
  onImagePreviewChange,
  isUploading = false,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(
    initialImageUrl
  );
  const [error, setError] = React.useState<string | null>(null);

  // 画像ファイル選択時のハンドラー
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // ファイルサイズのチェック (最大10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('画像サイズは10MB以下にしてください');
        return;
      }

      // 画像ファイルのみ許可
      if (!selectedFile.type.startsWith('image/')) {
        setError('画像ファイルのみアップロードできます');
        return;
      }

      setError(null);

      // プレビュー表示（元のサイズの画像）
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string;
        setImagePreview(previewUrl);
        onImagePreviewChange(previewUrl);
      };
      reader.readAsDataURL(selectedFile);

      try {
        // 画像を圧縮（ここでは保存せず、setImageで保持するだけ）
        const compressedImage = await compressImage(selectedFile, {
          maxSizeMB: 1, // 最大1MB
          maxWidthOrHeight: 1280, // 最大幅/高さ1280px
          quality: 0.8, // 品質80%
        });

        onImageChange(compressedImage);
        console.log(
          `画像圧縮: ${(selectedFile.size / 1024).toFixed(2)}KB → ${(
            compressedImage.size / 1024
          ).toFixed(2)}KB`
        );
      } catch (err) {
        console.error('画像圧縮エラー:', err);
        // 圧縮に失敗した場合は、元の画像をそのまま使用
        onImageChange(selectedFile);
      }
    }
  };

  // 画像削除ボタンのハンドラー
  const handleRemoveImage = () => {
    onImageChange(null);
    onImagePreviewChange(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {imagePreview ? (
        <div className="relative mb-3">
          <div className="relative h-48 w-full bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={imagePreview}
              alt="レビュー画像プレビュー"
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
            />
          </div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            title="画像を削除"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-amber-300 border-dashed rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-2 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-amber-800">
                クリックして画像をアップロード
              </p>
              <p className="text-xs text-amber-600">(最大10MB、JPG、PNG)</p>
            </div>
            <input
              id="image-upload"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      )}

      {isUploading && (
        <div className="flex items-center mt-2 text-amber-700">
          <LoadingSpinner size="small" />
          <span className="ml-2 text-sm">画像をアップロード中...</span>
        </div>
      )}

      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </>
  );
}
