import React from 'react';
import { Beer } from '../../../app/lib/beers-data';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface BeerDetailCardProps {
  beer: Beer;
  styleName: string;
}

export default function BeerDetailCard({
  beer,
  styleName,
}: BeerDetailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm p-6 mb-6"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* ビール画像 */}
        <div className="w-full md:w-1/3 relative h-60 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg flex items-center justify-center overflow-hidden">
          {beer.imageUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={beer.imageUrl}
                alt={beer.name}
                layout="fill"
                objectFit="contain"
                className="p-2"
              />
            </div>
          ) : (
            <div className="text-amber-800/30 text-7xl">🍺</div>
          )}
        </div>

        {/* ビール基本情報 */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-2 text-amber-900">
            {beer.name}
          </h1>
          <p className="text-lg text-amber-700 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            {beer.brewery}
          </p>

          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <div className="badge badge-lg bg-amber-400 text-white mr-2">
                {beer.rating.toFixed(1)}
              </div>
              <span className="text-sm text-amber-700">
                {beer.reviewCount}件のレビュー
              </span>
            </div>
            <button className="btn btn-sm bg-white hover:bg-amber-50 text-amber-700 border-amber-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              お気に入り
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-xs uppercase text-amber-600 font-medium">
                スタイル
              </h3>
              <p className="text-amber-900">{styleName || beer.style}</p>
            </div>
            <div>
              <h3 className="text-xs uppercase text-amber-600 font-medium">
                アルコール度数
              </h3>
              <p className="text-amber-900">{beer.abv}%</p>
            </div>
            {beer.ibu && (
              <div>
                <h3 className="text-xs uppercase text-amber-600 font-medium">
                  苦味 (IBU)
                </h3>
                <p className="text-amber-900">{beer.ibu}</p>
              </div>
            )}
            {beer.country && (
              <div>
                <h3 className="text-xs uppercase text-amber-600 font-medium">
                  原産国
                </h3>
                <p className="text-amber-900">{beer.country}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {beer.flavors.map((flavor, index) => (
              <span
                key={index}
                className="badge bg-amber-100 border-amber-200 text-amber-800"
              >
                {flavor}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 説明文 */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3 text-amber-900 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          テイスティングノート
        </h2>
        <p className="text-amber-800">{beer.description}</p>
      </div>
    </motion.div>
  );
}
