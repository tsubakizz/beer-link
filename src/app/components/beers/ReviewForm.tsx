'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import LoadingSpinner from '../LoadingSpinner';
import AuthModal from '../AuthModal';
import { uploadImageToR2 } from '../../lib/r2-storage';
import { compressImage } from '../../lib/image-compressor';
import Image from 'next/image';

interface ReviewFormProps {
  beerId: string;
  beerName: string;
  onReviewSubmitted?: () => void;
  isEditMode?: boolean;
  existingReview?: {
    id: string;
    rating: number;
    comment: string;
    imageUrl?: string;
  };
  onCancelEdit?: () => void;
}

/**
 * ビールレビュー投稿フォームコンポーネント
 * ログインユーザーのみ使用可能で、0.1点刻みの星評価とコメントを送信できます
 */
export default function ReviewForm({
  beerId,
  beerName,
  onReviewSubmitted,
  isEditMode = false,
  existingReview,
  onCancelEdit,
}: ReviewFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // フォーム状態
  const [rating, setRating] = useState<number>(
    isEditMode && existingReview ? existingReview.rating : 0
  );
  const [comment, setComment] = useState<string>(
    isEditMode && existingReview ? existingReview.comment : ''
  );
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    isEditMode && existingReview?.imageUrl ? existingReview.imageUrl : null
  );
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

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
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);

      try {
        // 画像を圧縮（ここでは保存せず、setImageで保持するだけ）
        const compressedImage = await compressImage(selectedFile, {
          maxSizeMB: 1, // 最大1MB
          maxWidthOrHeight: 1280, // 最大幅/高さ1280px
          quality: 0.8, // 品質80%
        });

        setImage(compressedImage);
        console.log(
          `画像圧縮: ${(selectedFile.size / 1024).toFixed(2)}KB → ${(
            compressedImage.size / 1024
          ).toFixed(2)}KB`
        );
      } catch (err) {
        console.error('画像圧縮エラー:', err);
        // 圧縮に失敗した場合は、元の画像をそのまま使用
        setImage(selectedFile);
      }
    }
  };

  // 画像削除ボタンのハンドラー
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // レビュー送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (rating === 0) {
      setError('評価を選択してください');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 画像のアップロード処理
      let imageUrl =
        isEditMode && existingReview?.imageUrl ? existingReview.imageUrl : null;

      if (image) {
        setIsUploading(true);
        try {
          // すでに圧縮済みの画像をR2にアップロード
          imageUrl = await uploadImageToR2(image, 'reviews');
          setIsUploading(false);
        } catch (uploadError) {
          console.error('画像アップロードエラー:', uploadError);
          setError('画像のアップロードに失敗しました');
          setIsSubmitting(false);
          setIsUploading(false);
          return;
        }
      }

      if (isEditMode && existingReview) {
        // 既存レビューの更新
        const reviewRef = doc(db, 'reviews', existingReview.id);
        await updateDoc(reviewRef, {
          rating,
          comment,
          updatedAt: serverTimestamp(),
          ...(imageUrl !== null ? { imageUrl } : {}),
          ...(imageUrl === null && existingReview.imageUrl
            ? { imageUrl: null }
            : {}),
        });
      } else {
        // 新規レビューの登録
        const reviewData = {
          beerId,
          beerName,
          userId: user.uid,
          userName: user.displayName || user.username || '匿名ユーザー',
          userPhotoURL: user.photoURL || null,
          rating,
          comment,
          imageUrl: imageUrl || null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await addDoc(collection(db, 'reviews'), reviewData);
      }

      // 成功時の処理
      setSuccess(true);

      // 編集モードでなければフォームをリセット
      if (!isEditMode) {
        setRating(0);
        setComment('');
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }

      // 親コンポーネントに通知（必要に応じて）
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }

      // 3秒後に成功メッセージをクリア
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('レビュー処理エラー:', err);
      setError(
        'レビューの処理中にエラーが発生しました。後でもう一度お試しください。'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Range sliderの変更ハンドラー
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 値を取得して数値に変換し、0.1刻みにする
    const value = parseFloat(e.target.value);
    setRating(Math.round(value * 10) / 10); // 0.1刻みに丸める
  };

  // 星評価のレンダリング（現在の評価値に基づいて星を表示）
  const renderStarRating = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const fullStar = i <= Math.floor(rating); // 整数部分まで塗りつぶす
      const partialFill = !fullStar && i === Math.ceil(rating); // 小数部分は部分的に塗りつぶす
      const fillPercentage = partialFill ? (rating % 1) * 100 : 0;

      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 ${
            fullStar || partialFill ? 'text-amber-500' : 'text-gray-300'
          }`}
          fill={fullStar ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            fill={
              fullStar
                ? 'currentColor'
                : partialFill
                ? `url(#partial-gradient-${i})`
                : 'none'
            }
          />
          {partialFill && (
            <defs>
              <linearGradient
                id={`partial-gradient-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset={`${fillPercentage}%`} stopColor="currentColor" />
                <stop offset={`${fillPercentage}%`} stopColor="transparent" />
              </linearGradient>
            </defs>
          )}
        </svg>
      );
    }

    return <div className="flex justify-center mt-2 mb-1">{stars}</div>;
  };

  return (
    <div className="bg-amber-50 rounded-xl p-6 shadow-sm border border-amber-100">
      <h3 className="text-lg font-semibold text-amber-900 mb-4">
        {isEditMode ? 'レビューを編集' : 'レビューを投稿'}
      </h3>

      {success ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {isEditMode
            ? 'レビューが更新されました！'
            : 'レビューが投稿されました！'}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-amber-800 text-sm font-medium mb-2">
              評価
            </label>

            {/* 星の表示 */}
            {renderStarRating()}

            {/* 評価の数値表示 */}
            <div className="text-center text-lg font-medium text-amber-700 mb-3">
              {rating > 0 ? rating.toFixed(1) : '評価なし'}
            </div>

            {/* Range Slider */}
            <div className="w-full px-2">
              <input
                type="range"
                min="0.1"
                max="5.0"
                value={rating}
                step="0.1"
                onChange={handleRatingChange}
                className="range range-sm range-warning"
              />

              {/* 主要な目盛りの表示 */}
              <div className="w-full flex justify-between text-xs text-amber-600 px-1">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-amber-800 text-sm font-medium mb-2"
            >
              コメント
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="このビールの感想を書いてください..."
              className="w-full p-3 border border-amber-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows={4}
              required
            />
          </div>

          {/* 画像アップロード部分 */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-amber-800 text-sm font-medium mb-2"
            >
              画像を追加 (オプション)
            </label>

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
                    <p className="text-xs text-amber-600">
                      (最大5MB、JPG、PNG)
                    </p>
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
          </div>

          {error && (
            <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="btn bg-amber-600 hover:bg-amber-700 text-white flex-1"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="small" className="p-0" />
                  <span className="ml-2">
                    {isEditMode ? '更新中...' : '送信中...'}
                  </span>
                </div>
              ) : isEditMode ? (
                '更新する'
              ) : (
                '投稿する'
              )}
            </button>

            {isEditMode && onCancelEdit && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="btn btn-outline border-amber-300 text-amber-700 hover:bg-amber-100 flex-1"
              >
                キャンセル
              </button>
            )}
          </div>
        </form>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        returnUrl={`/beers/${beerId}`}
      />
    </div>
  );
}
