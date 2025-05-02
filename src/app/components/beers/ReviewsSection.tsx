import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Review {
  id: number;
  userName: string;
  rating: number;
  reviewText: string;
  date: string;
}

interface ReviewsSectionProps {
  beerId: string;
  reviews?: Review[]; // 将来的に実際のレビューデータを渡せるようにしておく
}

export default function ReviewsSection({
  beerId,
  reviews,
}: ReviewsSectionProps) {
  // サンプルレビュー（将来的にはpropsから受け取る）
  const sampleReviews = [
    {
      id: 1,
      userName: 'ユーザー1',
      rating: 4,
      reviewText:
        '香りが良くて飲みやすいビールです。甘みと苦みのバランスが絶妙で、夏の夕暮れに飲むのにぴったりでした。またリピートします。',
      date: '2023年10月12日',
    },
    {
      id: 2,
      userName: 'ユーザー2',
      rating: 4,
      reviewText:
        'ホップの香りがしっかりと感じられて、苦味も適度です。個人的にはもう少し強めの味が好きですが、このスタイルとしては素晴らしいビールだと思います。',
      date: '2023年9月18日',
    },
  ];

  const displayReviews = reviews || sampleReviews;

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
        </h2>
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
      </div>

      <div className="space-y-6">
        {displayReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-amber-100 pb-6 last:border-b-0"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="bg-gradient-to-br from-amber-200 to-amber-100 text-amber-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {review.userName.charAt(0)}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-amber-900">
                    {review.userName}
                  </p>
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, idx) => (
                        <svg
                          key={idx}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ${
                            idx < review.rating
                              ? 'text-amber-500'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    <span className="text-xs text-amber-600 ml-1">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-amber-800">{review.reviewText}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href={`/reviews/new?beerId=${beerId}`}
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
        </Link>
      </div>
    </motion.div>
  );
}
