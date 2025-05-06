'use client';

import React, { useEffect, useState } from 'react';
import BackgroundBubbles from './BackgroundBubbles';

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

export default function ClientBackgroundBubbles(props: BackgroundBubblesProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // サーバーサイドレンダリング時は何も表示しない
  if (!isMounted) {
    return null;
  }

  return <BackgroundBubbles {...props} />;
}
