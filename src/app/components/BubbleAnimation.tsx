import React from 'react';

type BubbleAnimationProps = {
  count?: number;
  className?: string;
};

// 泡のバブルアニメーション用コンポーネント
export default function BubbleAnimation({
  count = 20,
  className = 'bubbles',
}: BubbleAnimationProps) {
  return (
    <div className={className}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={
            {
              '--size': `${Math.random() * 4 + 1}rem`,
              '--distance': `${Math.random() * 6 + 4}rem`,
              '--position': `${Math.random() * 100}%`,
              '--time': `${Math.random() * 2 + 2}s`,
              '--delay': `${Math.random() * 2}s`,
            } as React.CSSProperties
          }
        ></div>
      ))}
    </div>
  );
}
