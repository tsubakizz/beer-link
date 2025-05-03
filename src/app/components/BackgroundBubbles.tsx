import React from 'react';

type BackgroundBubblesProps = {
  count?: number;
  opacity?: number;
  minSize?: number;
  maxSize?: number;
  color?: string;
  minDuration?: number;
  maxDuration?: number;
  className?: string;
};

/**
 * 背景に泡のアニメーション効果を追加するコンポーネント
 * ビールの雰囲気を演出するために全ページで利用可能
 */
export default function BackgroundBubbles({
  count = 13,
  opacity = 0.3,
  minSize = 50,
  maxSize = 100,
  color = 'bg-amber-100',
  minDuration = 40,
  maxDuration = 70,
  className = '',
}: BackgroundBubblesProps) {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none ${className}`}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${color}`}
          style={{
            width: `${Math.random() * (maxSize - minSize) + minSize}px`,
            height: `${Math.random() * (maxSize - minSize) + minSize}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: opacity,
            animation: `float ${
              Math.random() * (maxDuration - minDuration) + minDuration
            }s infinite ease-in-out`,
            animationDelay: `${Math.random() * -20}s`,
          }}
        ></div>
      ))}
    </div>
  );
}
