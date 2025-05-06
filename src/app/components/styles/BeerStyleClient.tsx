'use client';

import { BeerStyle } from '@/src/app/types/beer-style';
import BeerStyleClientContainer from './BeerStyleClientContainer';

interface BeerStyleClientProps {
  initialStyles: BeerStyle[];
  specialStyleColors: { [key: string]: string };
}

// このコンポーネントはサーバーサイドから受け取ったデータを
// クライアントサイドのインタラクティブなコンテナに渡すラッパーとして機能します
export default function BeerStyleClient({
  initialStyles,
  specialStyleColors,
}: BeerStyleClientProps) {
  return (
    <BeerStyleClientContainer
      styles={initialStyles}
      specialStyleColors={specialStyleColors}
    />
  );
}
