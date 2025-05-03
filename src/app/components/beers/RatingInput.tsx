import React from 'react';
import { RatingInputProps } from './types/review-form.types';

/**
 * 星評価入力コンポーネント
 * 0.1点刻みの評価値を入力・表示する
 */
export default function RatingInput({ rating, onChange }: RatingInputProps) {
  // Range sliderの変更ハンドラー
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 値を取得して数値に変換し、0.1刻みにする
    const value = parseFloat(e.target.value);
    onChange(Math.round(value * 10) / 10); // 0.1刻みに丸める
  };

  // 星評価のレンダリング（現在の評価値に基づいて星を表示）
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const fullStar = i <= Math.floor(rating); // 整数部分まで塗りつぶす
      const partialFill = !fullStar && i === Math.ceil(rating); // 小数部分は部分的に塗りつぶす
      const fillPercentage = partialFill ? (rating % 1) * 100 : 0;

      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 ${
            fullStar || partialFill ? 'text-amber-500' : 'text-gray-300'
          }`}
          fill={fullStar ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            fill={
              fullStar
                ? 'currentColor'
                : partialFill
                ? `url(#partial-gradient-${i})`
                : 'none'
            }
          />
          {partialFill && (
            <defs>
              <linearGradient
                id={`partial-gradient-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset={`${fillPercentage}%`} stopColor="currentColor" />
                <stop offset={`${fillPercentage}%`} stopColor="transparent" />
              </linearGradient>
            </defs>
          )}
        </svg>
      );
    }

    return stars;
  };

  return (
    <>
      {/* 星の表示 */}
      <div className="flex justify-center mt-2 mb-1">{renderStars()}</div>

      {/* 評価の数値表示 */}
      <div className="text-center text-lg font-medium text-amber-700 mb-3">
        {rating > 0 ? rating.toFixed(1) : '評価なし'}
      </div>

      {/* Range Slider */}
      <div className="w-full px-2">
        <input
          type="range"
          min="0.1"
          max="5.0"
          value={rating}
          step="0.1"
          onChange={handleRatingChange}
          className="range range-sm range-warning"
        />

        {/* 主要な目盛りの表示 */}
        <div className="w-full flex justify-between text-xs text-amber-600 px-1">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </>
  );
}
