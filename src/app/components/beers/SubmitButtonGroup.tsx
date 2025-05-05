import React from 'react';
import { SubmitButtonGroupProps } from './types/review-form.types';
import LoadingSpinner from '@/LoadingSpinner';

export default function SubmitButtonGroup({
  isSubmitting,
  isEditMode,
  onCancel,
}: SubmitButtonGroupProps) {
  return (
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

      {isEditMode && onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline border-amber-300 text-amber-700 hover:bg-amber-100 flex-1"
        >
          キャンセル
        </button>
      )}
    </div>
  );
}
