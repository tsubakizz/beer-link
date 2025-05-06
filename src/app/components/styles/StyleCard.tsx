'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BeerStyle, getBeerStyleCard } from '@/src/app/lib/beer-styles-data';
import { FaThermometerHalf } from 'react-icons/fa';
import { GiHops } from 'react-icons/gi';

interface StyleCardProps {
  style: BeerStyle;
  index: number;
  styleImagePlaceholders: string;
}

export default function StyleCard({
  style,
  index,
  styleImagePlaceholders,
}: StyleCardProps) {
  // ビールスタイルデータをカード表示用に変換
  const styleCard = getBeerStyleCard(style);

  return (
    <Link href={`/styles/${style.id}`} className="block">
      <motion.div
        key={style.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.1 + index * 0.05,
        }}
        className="card-beer bg-white hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 cursor-pointer h-full relative group"
      >
        {/* スタイル画像（プレースホルダー） */}
        <div className="card-beer-header">
          <div
            className={`relative h-24 ${styleImagePlaceholders} overflow-hidden`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-20">🍺</span>
            </div>
          </div>
        </div>

        <div className="card-beer-body p-4">
          <h2 className="card-beer-title text-amber-900 text-xl font-bold mb-2">
            {styleCard.name}
          </h2>

          <p className="text-amber-800 mb-1 line-clamp-2 text-sm">
            {styleCard.shortDescription}
          </p>

          {/* 重要な特性だけをシンプルに表示 */}
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="beer-stat flex items-center gap-1 text-xs bg-amber-50 px-2 py-1 rounded-full">
              <FaThermometerHalf className="text-amber-600" />
              <span className="whitespace-nowrap">ABV {styleCard.abv}</span>
            </div>

            <div className="beer-stat flex items-center gap-1 text-xs bg-amber-50 px-2 py-1 rounded-full">
              <GiHops className="text-amber-600" />
              <span>IBU {styleCard.ibu}</span>
            </div>

            {styleCard.characteristics.bitterness > 3 && (
              <div className="beer-stat text-xs bg-amber-50 px-2 py-1 rounded-full">
                苦め
              </div>
            )}
            {styleCard.characteristics.sweetness > 3 && (
              <div className="beer-stat text-xs bg-amber-50 px-2 py-1 rounded-full">
                甘め
              </div>
            )}
            {styleCard.characteristics.body > 3 && (
              <div className="beer-stat text-xs bg-amber-50 px-2 py-1 rounded-full">
                重め
              </div>
            )}
          </div>

          {/* クリック可能であることを示すインジケーター */}
          <div className="flex items-center justify-end text-amber-600 group-hover:text-amber-800 text-sm mt-2 transition-colors">
            <span>詳細を見る</span>
          </div>
        </div>

        {/* ホバー時に表示される装飾エフェクト */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-200 rounded-lg pointer-events-none transition-colors duration-300"></div>
      </motion.div>
    </Link>
  );
}
