'use client';

import React from 'react';

type BubbleAnimationProps = {
  count?: number;
  className?: string;
  type?: 'header' | 'footer' | 'background';
  minSize?: number;
  maxSize?: number;
};

// 泡のバブルアニメーション用コンポーネント
export default function BubbleAnimation({
  count = 20,
  className = 'bubbles',
  type = 'header',
  minSize = 1,
  maxSize = 4,
}: BubbleAnimationProps) {
  // タイプに基づいてスタイルを調整
  let containerClassName = className;
  let bubbleBaseStyle: React.CSSProperties = {};

  if (type === 'background') {
    containerClassName =
      'absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none';
    bubbleBaseStyle = {
      backgroundColor: '#fef3c7', // amber-100
      opacity: 0.3,
    };
  } else if (type === 'footer') {
    containerClassName = 'bubbles-footer';
  }

  return (
    <div className={containerClassName}>
      {[...Array(count)].map((_, i) => {
        // タイプごとにカスタマイズされた泡のスタイル
        const randomSize = Math.random() * (maxSize - minSize) + minSize;
        const bubbleStyle: React.CSSProperties = {
          ...bubbleBaseStyle,
          '--size': `${randomSize}rem`,
          '--distance': `${Math.random() * 6 + 4}rem`,
          '--position': `${Math.random() * 100}%`,
          '--time': `${Math.random() * 10 + (type === 'background' ? 20 : 2)}s`,
          '--delay': `${Math.random() * (type === 'background' ? 10 : 2)}s`,
        };

        if (type === 'background') {
          Object.assign(bubbleStyle, {
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 20 + 30}s infinite ease-in-out`,
          });
        }

        return (
          <div
            key={i}
            className={
              type === 'background' ? 'absolute rounded-full' : 'bubble'
            }
            style={bubbleStyle as React.CSSProperties}
          ></div>
        );
      })}
    </div>
  );
}
