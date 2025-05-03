import React from 'react';
import {
  ErrorMessageProps,
  SuccessMessageProps,
} from './types/review-form.types';

/**
 * エラーメッセージコンポーネント
 */
export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4">{message}</div>
  );
}

/**
 * 成功メッセージコンポーネント
 */
export function SuccessMessage({ isEditMode }: SuccessMessageProps) {
  return (
    <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 flex items-center">
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      {isEditMode ? 'レビューが更新されました！' : 'レビューが投稿されました！'}
    </div>
  );
}
