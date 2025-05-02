'use client';

import React, { useState, useEffect } from 'react';
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

interface ReviewFormProps {
  beerId: string;
  beerName: string;
  onReviewSubmitted?: () => void;
  // 編集モード用の追加プロパティ
  isEditMode?: boolean;
  existingReview?: {
    id: string;
    rating: number;
    comment: string;
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

  // フォーム状態
  const [rating, setRating] = useState<number>(
    isEditMode && existingReview ? existingReview.rating : 0
  );
  const [comment, setComment] = useState<string>(
    isEditMode && existingReview ? existingReview.comment : ''
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // ログインしていない場合はログインページへリダイレクト
  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      // 遷移前にセッションストレージにリダイレクト情報を保存
      sessionStorage.setItem('redirectAfterLogin', `/beers/${beerId}`);
      router.push('/login?redirect=true');
    }
  }, [user, router, beerId]);

  // レビュー送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError('レビューを投稿するにはログインが必要です');
      return;
    }

    if (rating === 0) {
      setError('評価を選択してください');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (isEditMode && existingReview) {
        // 既存レビューの更新
        const reviewRef = doc(db, 'reviews', existingReview.id);
        await updateDoc(reviewRef, {
          rating,
          comment,
          updatedAt: serverTimestamp(),
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

  // ログインしていない場合はローディング表示
  if (!user) {
    return (
      <LoadingSpinner
        size="small"
        message="ログインページへリダイレクト中..."
      />
    );
  }

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

          {error && (
            <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
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
    </div>
  );
}
