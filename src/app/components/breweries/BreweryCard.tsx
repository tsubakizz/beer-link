import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BreweryType, Region } from '@/src/app/lib/breweries-data';
import { beerStyles } from '@/src/app/lib/beer-styles-data';

interface BreweryCardProps {
  brewery: {
    id: string;
    name: string;
    nameEn?: string;
    description: string;
    type: BreweryType;
    region?: Region;
    prefecture?: string;
    country: string;
    foundedYear: number;
    taproom: boolean;
    tours: boolean;
    featured?: boolean;
    specialties?: string[];
    imageUrl?: string;
  };
  typeNames: Record<BreweryType, string>;
  beerCount: number;
  index: number;
}

export default function BreweryCard({
  brewery,
  typeNames,
  beerCount,
  index,
}: BreweryCardProps) {
  // ブルワリータイプに基づく色を返す関数
  const getBreweryTypeColor = (type: BreweryType) => {
    const typeColors: Record<
      BreweryType,
      { bg: string; text: string; border: string; icon: string }
    > = {
      craft: {
        bg: 'bg-amber-100',
        text: 'text-amber-900',
        border: 'border-amber-300',
        icon: '🍻',
      },
      macro: {
        bg: 'bg-blue-100',
        text: 'text-blue-900',
        border: 'border-blue-300',
        icon: '🏭',
      },
      brewpub: {
        bg: 'bg-green-100',
        text: 'text-green-900',
        border: 'border-green-300',
        icon: '🍽️',
      },
      contract: {
        bg: 'bg-purple-100',
        text: 'text-purple-900',
        border: 'border-purple-300',
        icon: '📝',
      },
      proprietary: {
        bg: 'bg-red-100',
        text: 'text-red-900',
        border: 'border-red-300',
        icon: '✨',
      },
    };

    return (
      typeColors[type] || {
        bg: 'bg-gray-100',
        text: 'text-gray-900',
        border: 'border-gray-300',
        icon: '🏠',
      }
    );
  };

  // 地域に基づく色を返す関数
  const getRegionColor = (region: Region) => {
    const regionColors: Record<Region, string> = {
      hokkaido: 'from-blue-100 to-blue-50',
      tohoku: 'from-green-100 to-green-50',
      kanto: 'from-amber-100 to-amber-50',
      chubu: 'from-red-100 to-red-50',
      kansai: 'from-purple-100 to-purple-50', // 関西を追加
      chugoku: 'from-indigo-100 to-indigo-50',
      shikoku: 'from-emerald-100 to-emerald-50',
      kyushu: 'from-orange-100 to-orange-50',
      okinawa: 'from-pink-100 to-pink-50', // 沖縄を追加
      overseas: 'from-teal-100 to-teal-50', // 海外を追加
    };

    return regionColors[region] || 'from-amber-100 to-amber-50';
  };

  // カード用の泡スタイルを事前に定義
  const cardBubbleStyles = Array(3)
    .fill(0)
    .map((_, i) => ({
      width: `${10 + i * 5}px`,
      height: `${10 + i * 5}px`,
      top: `${20 + i * 30}%`,
      left: `${20 + i * 30}%`,
      animation: `float ${5 + i * 2}s infinite ease-in-out`,
    }));

  const typeColor = getBreweryTypeColor(brewery.type);
  const regionColor = brewery.region
    ? getRegionColor(brewery.region as Region)
    : 'from-amber-100 to-amber-50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * (index % 8) }}
    >
      <Link
        href={`/breweries/${brewery.id}`}
        className="block h-full card glass backdrop-blur-sm bg-white/70 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        <div
          className={`bg-gradient-to-br ${regionColor} p-5 relative overflow-hidden`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${typeColor.bg} ${typeColor.text} text-xs font-medium mb-3 w-fit`}
              >
                <span>{typeColor.icon}</span>
                {typeNames[brewery.type]}
              </div>
              <h2 className="font-bold text-lg text-amber-900 mb-1">
                {brewery.name}
              </h2>
              {brewery.nameEn && (
                <p className="text-xs text-amber-700 mb-2">{brewery.nameEn}</p>
              )}
            </div>
            {brewery.featured && (
              <div className="badge badge-sm bg-yellow-400 text-yellow-900 border-none">
                ★ 注目
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            <div className="badge badge-sm bg-white/80 text-gray-800 backdrop-blur-sm">
              {brewery.prefecture || ''} {brewery.country}
            </div>
            <div className="badge badge-sm bg-white/80 text-gray-800 backdrop-blur-sm">
              {brewery.foundedYear}年創業
            </div>
          </div>

          {/* 装飾的な泡 */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
            {cardBubbleStyles.map((style, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={style}
              ></div>
            ))}
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {brewery.description}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
              </svg>
              <span>タップルーム: {brewery.taproom ? 'あり' : 'なし'}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>工場見学: {brewery.tours ? '可能' : '不可'}</span>
            </div>
          </div>

          {brewery.specialties && brewery.specialties.length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-amber-800 mb-1 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>得意スタイル:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {brewery.specialties.slice(0, 3).map((styleId, idx) => {
                  const style = beerStyles.find((s) => s.id === styleId);
                  return style ? (
                    <span
                      key={idx}
                      className="badge badge-sm bg-white border-amber-200 text-amber-800"
                    >
                      {style.name}
                    </span>
                  ) : null;
                })}
                {brewery.specialties.length > 3 && (
                  <span className="badge badge-sm bg-white border-amber-200 text-amber-800">
                    +{brewery.specialties.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-auto pt-2 border-t border-amber-100">
            <div className="flex items-center gap-1 text-sm text-amber-800">
              <svg
                className="w-4 h-4 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              <span>取扱: {beerCount}種</span>
            </div>
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
        </div>
      </Link>
    </motion.div>
  );
}
