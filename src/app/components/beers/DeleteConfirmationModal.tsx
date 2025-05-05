import React from 'react';
import { DeleteConfirmationModalProps } from './types/review.types';
import LoadingSpinner from '@/LoadingSpinner';

export default function DeleteConfirmationModal({
  isOpen,
  isLoading,
  onCancel,
  onConfirm,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
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
            onClick={onCancel}
            className="btn btn-ghost text-gray-700"
            disabled={isLoading}
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="btn bg-red-600 hover:bg-red-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
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
  );
}
