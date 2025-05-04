'use client';

import React from 'react';

interface BubbleDecorationProps {
  count?: number;
  className?: string;
}

export default function BubbleDecoration({
  count = 6,
  className = '',
}: BubbleDecorationProps) {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-60"
          style={{
            width: `${Math.random() * 40 + 20}px`,
            height: `${Math.random() * 40 + 20}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
          }}
        ></div>
      ))}
    </div>
  );
}
