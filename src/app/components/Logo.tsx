'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// ロゴコンポーネントのプロパティ定義
interface LogoProps {
  size?: 'small' | 'medium' | 'large'; // サイズ指定
  showText?: boolean; // テキストを表示するか
  withLink?: boolean; // リンクとして表示するか
  className?: string; // 追加のクラス
}

/**
 * 共通ロゴコンポーネント
 * ヘッダー・フッターなど場所に応じてサイズやスタイルを調整できる
 */
export default function Logo({
  size = 'medium',
  showText = true,
  withLink = true,
  className = '',
}: LogoProps) {
  // サイズに応じた設定を定義
  const sizeConfig = {
    small: {
      containerSize: 'w-8 h-8',
      imageSize: 40,
      borderWidth: 'border-2',
      bubbleClasses: 'w-2 h-2 -top-0.5 -right-0.5 border',
      smallBubbleClasses: 'w-1.5 h-1.5 top-1 right-4 border',
      textClass: 'text-lg',
    },
    medium: {
      containerSize: 'w-10 h-10',
      imageSize: 50,
      borderWidth: 'border-2',
      bubbleClasses: 'w-3 h-3 -top-1 -right-1 border-2',
      smallBubbleClasses: 'w-1.5 h-1.5 top-1 right-4 border',
      textClass: 'text-xl',
    },
    large: {
      containerSize: 'w-12 h-12',
      imageSize: 60,
      borderWidth: 'border-2',
      bubbleClasses: 'w-4 h-4 -top-1 -right-1 border-2',
      smallBubbleClasses: 'w-2 h-2 top-1 right-5 border',
      textClass: 'text-2xl',
    },
  };

  const config = sizeConfig[size];

  // ロゴ本体（画像と泡の装飾）
  const logoElement = (
    <div className={`${config.containerSize} relative ${className}`}>
      <div
        className={`rounded-full overflow-hidden ${config.borderWidth} border-amber-600 shadow-lg w-full h-full`}
      >
        <Image
          src="/logo.png"
          alt="Beer Link Logo"
          width={config.imageSize}
          height={config.imageSize}
          className="object-cover"
          priority={size === 'large'} // 大きいサイズの場合は優先的に読み込む
        />
      </div>
      {/* 泡の装飾 */}
      <div
        className={`absolute ${config.bubbleClasses} bg-white rounded-full border-amber-500`}
      ></div>
      <div
        className={`absolute ${config.smallBubbleClasses} bg-white rounded-full border-amber-500`}
      ></div>
    </div>
  );

  // テキスト部分（表示する場合）
  const textElement = showText && (
    <span className={`font-bold text-[#7c2d12] ${config.textClass}`}>
      <span className="font-montserrat mr-1">Beer</span>
      <span className="font-bold">Link</span>
    </span>
  );

  // リンクとして表示するか、ただの要素として表示するか
  if (withLink) {
    return (
      <Link href="/" className="flex items-center">
        {logoElement}
        {textElement && <div className="ml-2">{textElement}</div>}
      </Link>
    );
  }

  // リンクではない場合
  return (
    <div className="flex items-center">
      {logoElement}
      {textElement && <div className="ml-2">{textElement}</div>}
    </div>
  );
}
