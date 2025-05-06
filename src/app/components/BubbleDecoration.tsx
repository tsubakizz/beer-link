'use client';

import React, { useState, useEffect } from 'react';

interface BubbleDecorationProps {
  count?: number;
  className?: string;
}

interface BubbleProps {
  width: number;
  height: number;
  top: number;
  left: number;
  animationDuration: number;
}

export default function BubbleDecoration({
  count = 6,
  className = '',
}: BubbleDecorationProps) {
  // 初期状態では空の配列（サーバーサイドでも同じ状態になる）
  const [bubbles, setBubbles] = useState<BubbleProps[]>([]);

  // クライアントサイドでのみランダム値を生成
  useEffect(() => {
    const newBubbles = Array.from({ length: count }, () => ({
      width: Math.random() * 40 + 20,
      height: Math.random() * 40 + 20,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 15,
    }));
    setBubbles(newBubbles);
  }, [count]);

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
    >
      {bubbles.map((bubble, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-60"
          style={{
            width: `${bubble.width}px`,
            height: `${bubble.height}px`,
            top: `${bubble.top}%`,
            left: `${bubble.left}%`,
            animation: `float ${bubble.animationDuration}s infinite ease-in-out`,
          }}
        ></div>
      ))}
    </div>
  );
}
