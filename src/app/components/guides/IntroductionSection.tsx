import React from 'react';
import { motion } from 'framer-motion';

interface IntroductionSectionProps {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export default function IntroductionSection({
  title,
  content,
  icon,
}: IntroductionSectionProps) {
  // デフォルトのアイコン
  const defaultIcon = (
    <svg
      className="w-6 h-6 text-amber-600 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg mb-4">
        <div className="flex items-start p-3 sm:p-4">
          <div className="mt-1">{icon || defaultIcon}</div>
          <div className="ml-3">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-900">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              ビールの世界への一歩を踏み出しましょう。このガイドでは、初心者の方でも楽しめる基本知識から、
              ビールの選び方、そして様々なビアスタイルの特徴まで幅広くご紹介します。
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-lg">
        <div className="p-3 sm:p-4">
          <div className="prose max-w-none text-gray-700 text-sm sm:text-base">
            {content}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
