import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BeerFinderCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12 px-6 bg-gradient-to-r from-purple-100 via-amber-100 to-yellow-100 rounded-xl shadow-sm"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-amber-900">
        あなたにぴったりのビールを見つけよう
      </h2>
      <p className="max-w-2xl mx-auto mb-8 text-amber-800">
        好みや気分に合わせて、あなたにおすすめのビールスタイルを診断します。
        数問の質問に答えるだけで、あなたの新しいお気に入りが見つかるかもしれません。
      </p>
      <Link
        href="/guides/beer-finder"
        className="btn bg-purple-500 hover:bg-purple-600 text-white border-none rounded-full btn-lg"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        好みのビールを診断する
      </Link>
    </motion.div>
  );
}
