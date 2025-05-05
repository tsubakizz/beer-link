'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/src/app/lib/auth-context';
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
} from 'firebase/firestore';
import { db } from '@/src/app/lib/firebase';
import { updateBeerRatingStatistics } from '@/src/app/lib/review-utils';
import LoadingSpinner from '@/src/app/components/LoadingSpinner';
import AuthModal from '@/src/app/components/AuthModal';
import ReviewItem from '@/src/app/components/beers/ReviewItem';
import ImageModal from '@/src/app/components/beers/ImageModal';
import DeleteConfirmationModal from '@/src/app/components/beers/DeleteConfirmationModal';
import ReviewActions from '@/src/app/components/beers/ReviewActions';
import {
  Review,
  ReviewsSectionProps,
} from '@/src/app/components/beers/types/review.types';

export default function ReviewsSection({
  beerId,
  beerName,
  maxReviews = 3,
  onReviewsLoaded,
}: ReviewsSectionProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviewCount, setTotalReviewCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean;
    reviewId: string;
  } | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // 全レビュー取得とレーティングの計算
  const fetchAllReviewsAndCalculateRating = useCallback(async () => {
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

        // 親コンポーネントにデータを渡す
        if (onReviewsLoaded) {
          onReviewsLoaded(count, avg);
        }

        // ビールの評価統計を更新
        await updateBeerRatingStatistics(beerId, count, avg);
      } else {
        if (onReviewsLoaded) {
          onReviewsLoaded(0, 0);
        }

        // ビールの評価統計を更新
        await updateBeerRatingStatistics(beerId, 0, 0);
      }
    } catch (err) {
      console.error('レーティング計算中にエラーが発生しました:', err);
    }
  }, [beerId, onReviewsLoaded]);

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
  }, [beerId, maxReviews, fetchAllReviewsAndCalculateRating]);

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
  const formatDate = (
    timestamp: import('firebase/firestore').Timestamp
  ): string => {
    if (!timestamp) return '日付不明';

    // FirestoreのタイムスタンプをJSのDateに変換
    const date = timestamp.toDate ? timestamp.toDate() : new Date();

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

  const handleReviewButtonClick = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowReviewForm(true);
    }
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };

  // 画像を拡大表示
  const handleImageClick = (imageUrl: string) => {
    setEnlargedImage(imageUrl);
  };

  // 拡大表示を閉じる
  const handleCloseEnlargedImage = () => {
    setEnlargedImage(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      {/* ヘッダー部分 */}
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
      <DeleteConfirmationModal
        isOpen={!!deleteConfirmation}
        isLoading={actionLoading}
        onCancel={() => setDeleteConfirmation(null)}
        onConfirm={handleDeleteReview}
      />

      {/* 画像拡大表示モーダル */}
      <ImageModal imageUrl={enlargedImage} onClose={handleCloseEnlargedImage} />

      {/* コンテンツ部分 */}
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
              <ReviewItem
                review={review}
                isEditing={!!editingReview && editingReview.id === review.id}
                isOwner={isReviewOwner(review)}
                beerId={beerId}
                beerName={beerName}
                onEdit={handleEditReview}
                onDelete={handleDeleteConfirm}
                onImageClick={handleImageClick}
                onReviewSubmitted={handleReviewSubmitted}
                onCancelEdit={handleCancelEdit}
                formatDate={formatDate}
              />
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
        <ReviewActions
          showForm={showReviewForm}
          isEditing={!!editingReview}
          beerId={beerId}
          beerName={beerName}
          isLoggedIn={!!user}
          onReviewButtonClick={handleReviewButtonClick}
          onFormCancel={() => setShowReviewForm(false)}
          onReviewSubmitted={handleReviewSubmitted}
        />
      </div>

      {/* 認証モーダル */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={handleAuthModalClose}
        returnUrl={`/beers/${beerId}`}
      />
    </motion.div>
  );
}
