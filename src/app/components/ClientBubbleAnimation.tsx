'use client';

import React, { useEffect, useState } from 'react';
import BubbleAnimation from './BubbleAnimation';

type BubbleAnimationProps = {
  count?: number;
  className?: string;
  type?: 'header' | 'footer' | 'background';
  minSize?: number;
  maxSize?: number;
};

export default function ClientBubbleAnimation(props: BubbleAnimationProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // サーバーサイドレンダリング時は何も表示しない
  if (!isMounted) {
    return null;
  }

  return <BubbleAnimation {...props} />;
}
