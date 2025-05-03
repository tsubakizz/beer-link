import React from 'react';
import { ReviewStarsProps } from './types/review.types';

export default function ReviewStars({
  rating,
  reviewId,
  showValue = true,
  size = 'small',
}: ReviewStarsProps) {
  // サイズに応じたスタイル
  const starSize = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6',
  }[size];

  return (
    <div className="flex items-center">
      {/* 星評価の表示 */}
      {[1, 2, 3, 4, 5].map((star) => {
        // 整数部分の星
        const fullStar = star <= Math.floor(rating);
        // 部分的に塗りつぶす星（0.1〜0.9）
        const partialFill = !fullStar && star === Math.ceil(rating);
        // 塗りつぶし率（小数点以下の値）
        const fillPercentage = partialFill ? (rating % 1) * 100 : 0;

        return (
          <div key={star} className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${starSize} ${
                fullStar || partialFill ? 'text-amber-500' : 'text-gray-300'
              }`}
              fill={
                fullStar
                  ? 'currentColor'
                  : partialFill
                  ? `url(#partial-gradient-${reviewId}-${star})`
                  : 'none'
              }
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />

              {/* 部分的に塗りつぶす星のグラデーション */}
              {partialFill && (
                <defs>
                  <linearGradient
                    id={`partial-gradient-${reviewId}-${star}`}
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

      {/* 評価値の表示（オプション） */}
      {showValue && (
        <span className="text-xs text-amber-600 ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
