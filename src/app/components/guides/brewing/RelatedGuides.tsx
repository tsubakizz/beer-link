'use client';

import React from 'react';
import Link from 'next/link';
import BubbleDecoration from '@/src/app/components/BubbleDecoration';
import { motion } from 'framer-motion';

export default function RelatedGuides() {
  const guides = [
    {
      title: 'ビアスタイルガイド',
      description: '代表的なビールスタイルの特徴と味わいを解説します',
      link: '/styles',
    },
    {
      title: '初心者ガイド',
      description: 'クラフトビール入門者のための基本知識とおすすめビール',
      link: '/guides/beginners',
    },
    {
      title: 'ビアファインダー',
      description: 'あなたの好みに合ったクラフトビールを見つけましょう',
      link: '/guides/beer-finder',
    },
  ];

  return (
    <section className="mb-12 relative">
      <h2 className="text-2xl font-bold text-amber-800 mb-8">関連ガイド</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {guides.map((guide, index) => (
          <motion.div
            key={guide.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <Link
              href={guide.link}
              className="block h-full bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <h3 className="text-xl font-semibold text-amber-700 mb-2">
                {guide.title}
              </h3>
              <p className="text-gray-600">{guide.description}</p>
              <div className="mt-4 flex justify-end">
                <span className="flex items-center text-amber-600 font-medium text-sm">
                  詳しく見る
                  <svg
                    className="w-4 h-4 ml-1"
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
                </span>
              </div>
              <div className="absolute bottom-0 right-0 opacity-10">
                <BubbleDecoration count={2} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
