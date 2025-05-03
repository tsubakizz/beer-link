import React from 'react';
import { ImageModalProps } from './types/review.types';

export default function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
        {/* 閉じるボタン */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 画像表示 */}
        <img
          src={imageUrl}
          alt="拡大画像"
          className="max-w-full max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
