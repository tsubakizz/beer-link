import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SelectionTipsSectionProps {
  title: string;
  content: React.ReactNode;
  ctaLink?: string;
  ctaText?: string;
}

export default function SelectionTipsSection({
  title,
  content,
  ctaLink,
  ctaText,
}: SelectionTipsSectionProps) {
  // タイトルに基づいて適切なアイコンを表示（選び方のポイントか楽しむコツか）
  const renderIcon = () => {
    if (title.includes('選び方')) {
      return (
        <svg
          className="w-6 h-6 text-amber-600 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-6 h-6 text-amber-600 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  };

  // タイトルに基づいた説明文を表示
  const renderDescription = () => {
    if (title.includes('選び方')) {
      return '初めてのビール選びに役立つポイントをご紹介します。苦みが苦手な方でも美味しく楽しめるビールがきっと見つかります。';
    } else {
      return 'ビールをより美味しく、より楽しむためのポイントをご紹介します。適切な温度やグラス、料理との組み合わせなど、ちょっとした工夫で楽しさが広がります。';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg mb-4">
        <div className="flex items-start p-3 sm:p-4">
          <div className="mt-1">{renderIcon()}</div>
          <div className="ml-3">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-900">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              {renderDescription()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-lg">
        <div className="p-3 sm:p-4">
          <div className="prose max-w-none text-sm sm:text-base text-gray-700">
            {content}
          </div>

          {ctaLink && ctaText && (
            <div className="mt-6 flex justify-center">
              <Link
                href={ctaLink}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-5 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 flex items-center shadow-sm hover:shadow"
              >
                {ctaText}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
