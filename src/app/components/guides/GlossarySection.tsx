import React from 'react';
import { motion } from 'framer-motion';
import GlossaryCard from './GlossaryCard';

interface GlossaryItem {
  title: string;
  description: string;
}

interface GlossarySectionProps {
  title: string;
  items: GlossaryItem[];
}

export default function GlossarySection({
  title,
  items,
}: GlossarySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg mb-4">
        <div className="flex items-start p-3 sm:p-4">
          <svg
            className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c-1.255 0-2.443.29-3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          <div className="ml-3">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-900">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              ビールの世界をもっと楽しむための基本的な用語をご紹介します。
              これらの用語を知ることで、ビールの選び方や味わいの表現がより豊かになります。
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <GlossaryCard title={item.title} description={item.description} />
          </motion.div>
        ))}
      </div>

      <div className="mt-4 bg-amber-50 rounded-lg p-3 sm:p-4">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="ml-2">
            <p className="text-sm sm:text-base text-amber-800 font-medium">
              これらの用語はビールの会話でよく使われるものです。
              ラベルやメニューで見かけたら、ここで学んだ知識を活かしてみてください。
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              もっと専門的な用語や各ビアスタイルの特徴について知りたい方は、
              <a
                href="/guides/styles"
                className="text-amber-600 hover:underline"
              >
                ビアスタイルガイド
              </a>
              も参考にしてみてください。
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
