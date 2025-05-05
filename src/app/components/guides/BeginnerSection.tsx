import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BubbleDecoration from '@/src/app/components/BubbleDecoration';

export default function BeginnerSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-16 relative"
    >
      <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-2/3 relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-amber-900">
              クラフトビールを始めるなら
            </h2>
            <p className="mb-4 text-amber-800">
              「クラフトビールって苦いんでしょ？」「何を選んだらいいかわからない」そんな疑問をお持ちの方は多いでしょう。
              実はクラフトビールには、フルーティな味わいのものや、チョコレートのような風味のもの、すっきり飲みやすいものなど
              様々な種類があります。
            </p>
            <p className="mb-6 text-amber-800">
              ここでは、クラフトビールが初めての方でも楽しめる基礎知識や、初心者におすすめのビールをご紹介します。
              一緒にクラフトビールの魅力を探してみましょう。
            </p>
            <Link
              href="/guides/beginners"
              className="btn bg-amber-500 hover:bg-amber-600 text-white border-none rounded-full"
            >
              初心者ガイドを見る
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
          <div className="w-full md:w-1/3 relative">
            <div className="aspect-square rounded-xl bg-gradient-to-br from-amber-300 to-amber-200 flex items-center justify-center shadow-inner relative overflow-hidden">
              <span className="text-8xl relative z-10">🍻</span>
              <BubbleDecoration count={8} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
