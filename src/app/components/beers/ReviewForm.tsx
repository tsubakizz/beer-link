'use client';

import React, { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import AuthModal from '../AuthModal';
import { uploadImageToR2 } from '../../lib/r2-storage';
import { ReviewFormProps } from './types/review-form.types';

// インポートしたサブコンポーネント
import RatingInput from './RatingInput';
import ImageUploader from './ImageUploader';
import SubmitButtonGroup from './SubmitButtonGroup';
import { ErrorMessage, SuccessMessage } from './FormMessages';

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

  return (
    <div className="bg-amber-50 rounded-xl p-6 shadow-sm border border-amber-100">
      <h3 className="text-lg font-semibold text-amber-900 mb-4">
        {isEditMode ? 'レビューを編集' : 'レビューを投稿'}
      </h3>

      {success ? (
        <SuccessMessage isEditMode={isEditMode} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-amber-800 text-sm font-medium mb-2">
              評価
            </label>
            <RatingInput rating={rating} onChange={setRating} />
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
              htmlFor="image-upload"
              className="block text-amber-800 text-sm font-medium mb-2"
            >
              画像を追加 (オプション)
            </label>
            <ImageUploader
              initialImageUrl={imagePreview}
              onImageChange={setImage}
              onImagePreviewChange={setImagePreview}
              isUploading={isUploading}
            />
          </div>

          <ErrorMessage message={error} />

          <SubmitButtonGroup
            isSubmitting={isSubmitting}
            isEditMode={isEditMode}
            onCancel={onCancelEdit}
          />
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
