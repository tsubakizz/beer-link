'use client';

import React, { useEffect, useState } from 'react';

interface LoadingSpinnerProps {
  /**
   * スピナーのサイズ（small, medium, large）
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * スピナーの下に表示するメッセージ
   * @default 'ロード中...'
   */
  message?: string;

  /**
   * コンテナのカスタムCSS
   */
  className?: string;

  /**
   * スピナーを表示する最低時間（ミリ秒）
   * @default 700 (0.7秒)
   */
  minDisplayTime?: number;

  /**
   * 初期ロード状態
   * @default true
   */
  initialLoading?: boolean;

  /**
   * スピナー非表示時に呼ばれるコールバック
   * このコールバックを通じて親コンポーネントに読み込み完了を通知
   */
  onLoadingComplete?: () => void;
}

/**
 * 読み込み中を表すスピナーコンポーネント
 * アプリケーション全体で統一されたローディング表示を提供します
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  message = 'ロード中...',
  className = '',
  minDisplayTime = 700,
  initialLoading = true,
  onLoadingComplete,
}) => {
  // 内部の表示状態を管理
  const [shouldDisplay, setShouldDisplay] = useState(true);
  // 読み込み開始時刻を記録
  const [startTime] = useState(Date.now());

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // 初期ロードが完了している場合
    if (!initialLoading) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      // 最低表示時間を確保するために、必要に応じて遅延させる
      timer = setTimeout(() => {
        setShouldDisplay(false);
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, remainingTime);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [initialLoading, minDisplayTime, onLoadingComplete, startTime]);

  // スピナーを表示しない場合は何も返さない
  if (!shouldDisplay) {
    return null;
  }

  // サイズに基づいてクラス名を決定
  const spinnerSizeClass = {
    small: 'loading-sm',
    medium: 'loading-md',
    large: 'loading-lg',
  }[size];

  // コンテナのパディングもサイズに応じて調整
  const containerPaddingClass = {
    small: 'py-6',
    medium: 'py-10',
    large: 'py-16',
  }[size];

  return (
    <div
      className={`flex flex-col items-center justify-center ${containerPaddingClass} ${className}`}
    >
      <div
        className={`loading loading-spinner ${spinnerSizeClass} text-amber-600`}
      ></div>
      {message && <p className="mt-4 text-amber-800">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
