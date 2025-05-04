import React from 'react';
import { ReviewActionsProps } from './types/review.types';
import ReviewForm from './ReviewForm';

export default function ReviewActions({
  showForm,
  isEditing,
  beerId,
  beerName,
  onReviewButtonClick,
  onFormCancel,
  onReviewSubmitted,
}: ReviewActionsProps) {
  // 編集中の場合は何も表示しない（編集はReviewItemで処理される）
  if (isEditing) return null;

  // レビュー投稿フォームを表示
  if (showForm) {
    return (
      <div className="mt-4">
        <ReviewForm
          beerId={beerId}
          beerName={beerName}
          onReviewSubmitted={onReviewSubmitted}
        />
        <button
          onClick={onFormCancel}
          className="w-full mt-3 btn btn-outline border-amber-300 text-amber-700 hover:bg-amber-100"
        >
          キャンセル
        </button>
      </div>
    );
  }

  // レビュー投稿ボタンを表示
  return (
    <div className="text-center">
      <button
        onClick={onReviewButtonClick}
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
  );
}
