'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  getDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../src/app/lib/firebase';
import { beers } from '../../src/app/lib/beers-data';
import LoadingSpinner from '../../src/app/components/LoadingSpinner';
import ReviewForm from '../../src/app/components/beers/ReviewForm';
import Pagination from '../../src/app/components/beers/Pagination';
import Image from 'next/image';

// レビュータイプの定義
interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhotoURL?: string | null;
  rating: number;
  comment: string;
  createdAt: Timestamp; // Firestoreのタイムスタンプ
}

// ビール情報の型
interface Beer {
  id: string;
  name: string;
  brewery: string;
  style: string;
  imageUrl?: string;
}

// useSearchParamsを使用する部分を別コンポーネントに分離
function ReviewsContent() {
  const searchParams = useSearchParams();
  const beerId = searchParams.get('beerId');

  const [beer, setBeer] = useState<Beer | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // ページネーション用の状態
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const reviewsPerPage = 10;

  // ビール情報の取得
  useEffect(() => {
    if (!beerId) {
      setError('ビールIDが指定されていません');
      setLoading(false);
      return;
    }

    // モックデータからビール情報を取得
    const foundBeer = beers.find((b) => b.id === beerId);

    if (foundBeer) {
      setBeer({
        id: foundBeer.id,
        name: foundBeer.name,
        brewery: foundBeer.brewery,
        style: foundBeer.style,
        imageUrl: foundBeer.imageUrl,
      });
    } else {
      // モックデータになければFirestoreからの取得を試みる
      const fetchBeerFromFirestore = async () => {
        try {
          const beerDoc = await getDoc(doc(db, 'beers', beerId));
          if (beerDoc.exists()) {
            const beerData = beerDoc.data() as Beer;
            setBeer({
              ...beerData,
            });
          } else {
            setError('指定されたビールが見つかりません');
          }
        } catch (err) {
          console.error('ビールデータの取得エラー:', err);
          setError('ビール情報の取得に失敗しました');
        }
      };

      fetchBeerFromFirestore();
    }
  }, [beerId]);

  // レビューデータの取得
  useEffect(() => {
    if (!beerId) return;

    setLoading(true);
    setError(null);

    // Firestoreからレビューを取得
    const fetchReviews = async () => {
      try {
        // 最初のページの場合はリセット
        if (currentPage === 1) setLastDoc(null);

        let reviewsQuery;

        if (lastDoc && currentPage > 1) {
          // 2ページ目以降
          reviewsQuery = query(
            collection(db, 'reviews'),
            where('beerId', '==', beerId),
            orderBy('createdAt', 'desc'),
            startAfter(lastDoc),
            limit(reviewsPerPage)
          );
        } else {
          // 1ページ目
          reviewsQuery = query(
            collection(db, 'reviews'),
            where('beerId', '==', beerId),
            orderBy('createdAt', 'desc'),
            limit(reviewsPerPage)
          );
        }

        // レビュー取得
        const snapshot = await getDocs(reviewsQuery);

        if (snapshot.empty && currentPage > 1) {
          setCurrentPage(1); // データがなければ1ページ目に戻る
          return;
        }

        const reviewsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Review[];

        // 最後のドキュメントを保存（次ページ用）
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        setLastDoc(lastVisible || null);

        setReviews(reviewsData);

        // 総ページ数の計算
        const totalReviewsQuery = query(
          collection(db, 'reviews'),
          where('beerId', '==', beerId)
        );

        const totalSnapshot = await getDocs(totalReviewsQuery);
        const totalReviews = totalSnapshot.size;
        const pages = Math.ceil(totalReviews / reviewsPerPage);
        setTotalPages(pages || 1); // ページがない場合は1ページとする
      } catch (err) {
        console.error('レビュー取得エラー:', err);
        setError('レビューデータの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [beerId, currentPage, lastDoc]);

  // 日付フォーマット
  const formatDate = (timestamp: Timestamp): string => {
    if (!timestamp) return '日付不明';

    // FirestoreのタイムスタンプをJSのDateに変換
    const date = timestamp.toDate();

    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  // レビュー投稿完了時の処理
  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    // 1ページ目に戻して再取得
    setCurrentPage(1);
  };

  // ビールIDがない場合
  if (!beerId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-amber-800">エラー</h1>
          <p className="mt-4 text-amber-700">ビールIDが指定されていません</p>
          <Link
            href="/beers"
            className="mt-6 btn bg-amber-500 text-white hover:bg-amber-600"
          >
            ビール図鑑に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* パンくずリスト */}
      <nav className="breadcrumbs mb-6 text-sm">
        <ul className="flex items-center text-amber-600">
          <li className="flex items-center">
            <Link href="/" className="hover:text-amber-800">
              ホーム
            </Link>
            <svg
              className="mx-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li className="flex items-center">
            <Link href="/beers" className="hover:text-amber-800">
              ビール図鑑
            </Link>
            <svg
              className="mx-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          {beer && (
            <>
              <li className="flex items-center">
                <Link
                  href={`/beers/${beerId}`}
                  className="hover:text-amber-800"
                >
                  {beer.name}
                </Link>
                <svg
                  className="mx-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
            </>
          )}
          <li className="text-amber-800 font-medium">レビュー一覧</li>
        </ul>
      </nav>

      {/* ページヘッダー */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-amber-100/50 rounded-xl p-6 mb-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-amber-900 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {beer ? `${beer.name}のレビュー` : 'レビュー一覧'}
        </h1>
        {beer && (
          <div className="flex items-center text-amber-700 mt-2">
            <span className="mr-4">醸造所: {beer.brewery}</span>
            <span>スタイル: {beer.style}</span>
          </div>
        )}
      </motion.div>

      {/* レビュー投稿ボタン */}
      {beer && !showReviewForm && (
        <div className="mb-6">
          <button
            onClick={() => setShowReviewForm(true)}
            className="btn bg-amber-500 hover:bg-amber-600 text-white"
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
            レビューを投稿する
          </button>
        </div>
      )}

      {/* レビュー投稿フォーム */}
      {beer && showReviewForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <ReviewForm
            beerId={beerId}
            beerName={beer.name}
            onReviewSubmitted={handleReviewSubmitted}
          />
          <button
            onClick={() => setShowReviewForm(false)}
            className="mt-3 btn btn-outline border-amber-300 text-amber-700 hover:bg-amber-100"
          >
            キャンセル
          </button>
        </motion.div>
      )}

      {/* ローディング表示 */}
      {loading && (
        <div className="my-12">
          <LoadingSpinner message="レビューを読み込み中..." />
        </div>
      )}

      {/* エラー表示 */}
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* レビュー一覧 */}
      {!loading && !error && (
        <>
          {reviews.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-1">
                {reviews.map((review, index) => (
                  <div
                    key={review.id}
                    className={`p-5 ${
                      index < reviews.length - 1
                        ? 'border-b border-amber-100'
                        : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <div className="avatar">
                          {review.userPhotoURL ? (
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <Image
                                src={review.userPhotoURL}
                                alt={review.userName}
                                width={48}
                                height={48}
                              />
                            </div>
                          ) : (
                            <div className="bg-gradient-to-br from-amber-200 to-amber-100 text-amber-800 rounded-full w-12 h-12 flex items-center justify-center font-bold">
                              {review.userName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center flex-wrap gap-2">
                            <h3 className="font-semibold text-amber-900">
                              {review.userName}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            {/* 星評価の表示 */}
                            {[1, 2, 3, 4, 5].map((star) => {
                              // 整数部分の星
                              const fullStar =
                                star <= Math.floor(review.rating);
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
                                    className={`h-5 w-5 ${
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
                            <span className="text-amber-600 ml-2 font-medium">
                              {review.rating.toFixed(1)}
                            </span>
                          </div>
                          <p className="mt-3 text-amber-800 whitespace-pre-wrap">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-amber-50 rounded-xl">
              <svg
                className="mx-auto h-12 w-12 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-amber-900">
                レビューはまだありません
              </h3>
              <p className="mt-1 text-amber-700">
                このビールの最初のレビューを投稿してみませんか？
              </p>
              <button
                onClick={() => setShowReviewForm(true)}
                className="mt-6 btn bg-amber-500 hover:bg-amber-600 text-white"
              >
                レビューを投稿する
              </button>
            </div>
          )}
        </>
      )}

      {/* ページネーション */}
      {!loading && !error && totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* ビール詳細ページへ戻るリンク */}
      {beer && (
        <div className="mt-10 text-center">
          <Link
            href={`/beers/${beerId}`}
            className="btn btn-outline border-amber-300 text-amber-700 hover:bg-amber-100"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {beer.name}の詳細ページに戻る
          </Link>
        </div>
      )}
    </div>
  );
}

// メインコンポーネント
export default function ReviewsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-amber-50/50">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-amber-800">読み込み中...</p>
        </div>
      </div>
    }>
      <ReviewsContent />
    </Suspense>
  );
}
