import React from 'react';
import Image from 'next/image';
import { ReviewItemProps } from './types/review.types';
import ReviewForm from './ReviewForm';
import ReviewStars from './ReviewStars';

export default function ReviewItem({
  review,
  isEditing,
  isOwner,
  beerId,
  beerName,
  onEdit,
  onDelete,
  onImageClick,
  onReviewSubmitted,
  onCancelEdit,
  formatDate,
}: ReviewItemProps) {
  // 編集モードの場合はReviewFormを表示
  if (isEditing) {
    return (
      <ReviewForm
        beerId={beerId}
        beerName={beerName}
        isEditMode={true}
        existingReview={{
          id: review.id,
          rating: review.rating,
          comment: review.comment,
          imageUrl: review.imageUrl || '',
        }}
        onReviewSubmitted={onReviewSubmitted}
        onCancelEdit={onCancelEdit}
      />
    );
  }

  // 通常のレビュー表示
  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {/* ユーザーアバター */}
          <div className="avatar">
            {review.userPhotoURL ? (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={review.userPhotoURL} alt={review.userName} />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-amber-200 to-amber-100 text-amber-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {review.userName.charAt(0)}
              </div>
            )}
          </div>

          {/* ユーザー名と評価情報 */}
          <div>
            <p className="font-medium text-amber-900">{review.userName}</p>
            <div className="flex items-center">
              {/* 星評価 */}
              <ReviewStars rating={review.rating} reviewId={review.id} />

              {/* 投稿日 */}
              <span className="text-xs text-gray-500 ml-3">
                {formatDate(review.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* 編集・削除ボタン（自分のレビューの場合のみ表示） */}
        {isOwner && (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(review)}
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
              onClick={() => onDelete(review.id)}
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

      {/* レビューコメント */}
      <p className="mt-3 text-amber-800 whitespace-pre-wrap">
        {review.comment}
      </p>

      {/* レビュー画像表示 */}
      {review.imageUrl && (
        <div className="mt-3">
          <div
            className="relative h-48 w-full md:w-1/2 lg:w-1/3 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => onImageClick(review.imageUrl!)}
          >
            <Image
              src={review.imageUrl || ''}
              alt={`${review.userName}さんのレビュー画像`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-200 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
