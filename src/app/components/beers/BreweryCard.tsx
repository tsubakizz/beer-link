import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BreweryCardProps {
  breweryName: string;
}

export default function BreweryCard({ breweryName }: BreweryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-amber-900 flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a1 1 0 011-1h8a1 1 0 011 1z"
            clipRule="evenodd"
          />
        </svg>
        ブルワリー
      </h2>
      <div className="flex items-center gap-4 mb-4">
        <div className="avatar">
          <div className="bg-gradient-to-br from-amber-200 to-amber-100 text-amber-800 rounded-full w-12 h-12 flex items-center justify-center font-bold">
            {breweryName.charAt(0)}
          </div>
        </div>
        <h3 className="text-lg font-medium text-amber-800">{breweryName}</h3>
      </div>
      <Link
        href={`/breweries?name=${encodeURIComponent(breweryName)}`}
        className="btn btn-outline w-full border-amber-300 text-amber-800 hover:bg-amber-50 hover:border-amber-400"
      >
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        このブルワリーの商品を見る
      </Link>
    </motion.div>
  );
}
