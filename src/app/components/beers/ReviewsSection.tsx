'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '../../lib/auth-context';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getCountFromServer,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import ReviewForm from './ReviewForm';
import LoadingSpinner from '../LoadingSpinner';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhotoURL?: string | null;
  rating: number;
  comment: string;
  createdAt: any; // Firestoreのタイムスタンプ
}

interface ReviewsSectionProps {
  beerId: string;
  beerName: string;
  maxReviews?: number; // 表示するレビュー数の上限
  onReviewsLoaded?: (reviewCount: number, avgRating: number) => void; // 親コンポーネントに情報を渡すためのコールバック
}

export default function ReviewsSection({
  beerId,
  beerName,
  maxReviews = 3,
  onReviewsLoaded,
}: ReviewsSectionProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviewCount, setTotalReviewCount] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean;
    reviewId: string;
  } | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // 全レビュー取得とレーティングの計算
  const fetchAllReviewsAndCalculateRating = async () => {
    try {
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('beerId', '==', beerId)
      );

      const snapshot = await getDocs(reviewsQuery);
      const reviewsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Review[];

      // レビュー総数
      const count = reviewsData.length;
      setTotalReviewCount(count);

      // 平均評価の計算
      if (count > 0) {
        const sum = reviewsData.reduce(
          (total, review) => total + review.rating,
          0
        );
        const avg = sum / count;
        setAverageRating(avg);

        // 親コンポーネントにデータを渡す
        if (onReviewsLoaded) {
          onReviewsLoaded(count, avg);
        }
      } else {
        setAverageRating(0);
        if (onReviewsLoaded) {
          onReviewsLoaded(0, 0);
        }
      }
    } catch (err) {
      console.error('レーティング計算中にエラーが発生しました:', err);
    }
  };

  // 全レビュー数を取得する関数
  const fetchTotalReviewCount = async () => {
    try {
      const countQuery = query(
        collection(db, 'reviews'),
        where('beerId', '==', beerId)
      );

      const snapshot = await getCountFromServer(countQuery);
      setTotalReviewCount(snapshot.data().count);
    } catch (err) {
      console.error('レビュー総数の取得中にエラーが発生しました:', err);
      // エラーがあっても処理は継続する
    }
  };

  // レビューデータの取得
  useEffect(() => {
    setLoading(true);

    try {
      // Firestoreからレビューデータを取得
      // 注意: where+orderByの複合クエリにはインデックスの作成が必要
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('beerId', '==', beerId),
        orderBy('createdAt', 'desc'),
        limit(maxReviews)
      );

      // リアルタイム監視を設定
      const unsubscribe = onSnapshot(
        reviewsQuery,
        (snapshot) => {
          const reviewsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Review[];

          setReviews(reviewsData);
          setLoading(false);

          // 全レビュー取得と評価の計算
          fetchAllReviewsAndCalculateRating();
        },
        (err) => {
          console.error('レビューデータの取得中にエラーが発生しました:', err);
          setError('レビューデータの取得に失敗しました');
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('レビューデータの取得中にエラーが発生しました:', err);
      setError('レビューデータの取得に失敗しました');
      setLoading(false);
    }
  }, [beerId, maxReviews]);

  // レビューが投稿された時の処理
  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    setEditingReview(null);

    // レビュー追加後に全件数と評価を更新
    fetchAllReviewsAndCalculateRating();
  };

  // レビュー編集を開始
  const handleEditReview = (review: Review) => {
    setEditingReview(review);
  };

  // レビュー編集をキャンセル
  const handleCancelEdit = () => {
    setEditingReview(null);
  };

  // レビュー削除の確認ダイアログを表示
  const handleDeleteConfirm = (reviewId: string) => {
    setDeleteConfirmation({ show: true, reviewId });
  };

  // レビュー削除を実行
  const handleDeleteReview = async () => {
    if (!deleteConfirmation) return;

    setActionLoading(true);
    try {
      await deleteDoc(doc(db, 'reviews', deleteConfirmation.reviewId));
      setDeleteConfirmation(null);

      // レビュー削除後に全件数と評価を更新
      fetchAllReviewsAndCalculateRating();
    } catch (err) {
      console.error('レビュー削除エラー:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // 日付をフォーマット
  const formatDate = (timestamp: any): string => {
    if (!timestamp) return '日付不明';

    // FirestoreのタイムスタンプをJSのDateに変換
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // レビュー所有者かどうかを確認
  const isReviewOwner = (review: Review): boolean => {
    return user?.uid === review.userId;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-amber-900 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          レビュー
          {totalReviewCount > 0 && (
            <span className="text-sm font-normal text-amber-600 ml-2">
              ({totalReviewCount}件)
            </span>
          )}
        </h2>
        {totalReviewCount > maxReviews && (
          <Link
            href={`/reviews?beerId=${beerId}`}
            className="text-amber-600 hover:text-amber-800 hover:underline text-sm font-medium flex items-center gap-1 transition-colors"
          >
            すべて見る
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      </div>

      {/* 削除確認モーダル */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              レビューを削除しますか？
            </h3>
            <p className="text-gray-600 mb-6">
              この操作は取り消せません。本当にこのレビューを削除しますか？
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="btn btn-ghost text-gray-700"
                disabled={actionLoading}
              >
                キャンセル
              </button>
              <button
                onClick={handleDeleteReview}
                className="btn bg-red-600 hover:bg-red-700 text-white"
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <div className="flex items-center">
                    <LoadingSpinner size="small" className="p-0" />
                    <span className="ml-2">削除中...</span>
                  </div>
                ) : (
                  '削除する'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <LoadingSpinner size="small" message="レビューを読み込み中..." />
      ) : error ? (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-amber-100 pb-6 last:border-b-0"
            >
              {/* 編集中のレビュー */}
              {editingReview && editingReview.id === review.id ? (
                <ReviewForm
                  beerId={beerId}
                  beerName={beerName}
                  isEditMode={true}
                  existingReview={{
                    id: review.id,
                    rating: review.rating,
                    comment: review.comment,
                  }}
                  onReviewSubmitted={handleReviewSubmitted}
                  onCancelEdit={handleCancelEdit}
                />
              ) : (
                /* レビュー表示 */
                <>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        {review.userPhotoURL ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={review.userPhotoURL}
                              alt={review.userName}
                            />
                          </div>
                        ) : (
                          <div className="bg-gradient-to-br from-amber-200 to-amber-100 text-amber-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                            {review.userName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-amber-900">
                          {review.userName}
                        </p>
                        <div className="flex items-center">
                          {/* 星評価の表示 */}
                          {[1, 2, 3, 4, 5].map((star) => {
                            // 整数部分の星
                            const fullStar = star <= Math.floor(review.rating);
                            // 部分的に塗りつぶす星（0.1〜0.9）
                            const partialFill =
                              !fullStar && star === Math.ceil(review.rating);
                            // 塗りつぶし率（小数点以下の値）
                            const fillPercentage = partialFill
                              ? (review.rating % 1) * 100
                              : 0;

                            return (
                              <div key={star} className="relative">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`h-4 w-4 ${
                                    fullStar || partialFill
                                      ? 'text-amber-500'
                                      : 'text-gray-300'
                                  }`}
                                  fill={
                                    fullStar
                                      ? 'currentColor'
                                      : partialFill
                                      ? `url(#partial-gradient-${review.id}-${star})`
                                      : 'none'
                                  }
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />

                                  {/* 部分的に塗りつぶす星のグラデーション */}
                                  {partialFill && (
                                    <defs>
                                      <linearGradient
                                        id={`partial-gradient-${review.id}-${star}`}
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="0%"
                                      >
                                        <stop
                                          offset={`${fillPercentage}%`}
                                          stopColor="currentColor"
                                        />
                                        <stop
                                          offset={`${fillPercentage}%`}
                                          stopColor="transparent"
                                        />
                                      </linearGradient>
                                    </defs>
                                  )}
                                </svg>
                              </div>
                            );
                          })}
                          <span className="text-xs text-amber-600 ml-1">
                            {review.rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-500 ml-3">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 編集・削除ボタン（自分のレビューの場合のみ表示） */}
                    {isReviewOwner(review) && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditReview(review)}
                          className="text-amber-600 hover:text-amber-800"
                          title="レビューを編集"
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
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteConfirm(review.id)}
                          className="text-red-500 hover:text-red-700"
                          title="レビューを削除"
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
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-amber-800 whitespace-pre-wrap">
                    {review.comment}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-amber-50/50 rounded-lg">
          <p className="text-amber-800">まだレビューがありません</p>
          <p className="text-amber-600 text-sm mt-1">
            このビールの最初のレビューを投稿しませんか？
          </p>
        </div>
      )}

      {/* レビュー投稿フォーム/レビュー投稿ボタン */}
      <div className="mt-6">
        {showReviewForm && !editingReview ? (
          <div className="mt-4">
            <ReviewForm
              beerId={beerId}
              beerName={beerName}
              onReviewSubmitted={handleReviewSubmitted}
            />
            <button
              onClick={() => setShowReviewForm(false)}
              className="w-full mt-3 btn btn-outline border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              キャンセル
            </button>
          </div>
        ) : (
          !editingReview && (
            <div className="text-center">
              <button
                onClick={() => setShowReviewForm(true)}
                className="btn bg-white hover:bg-amber-50 border-amber-300 text-amber-800"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                レビューを書く
              </button>
            </div>
          )
        )}
      </div>
    </motion.div>
  );
}
