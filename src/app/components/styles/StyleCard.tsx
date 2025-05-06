'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BeerStyle } from '@/src/app/types/beer-style';
import { formatAbv, formatIbu } from '@/src/app/lib/beer-styles-decorator';
import { FaThermometerHalf } from 'react-icons/fa';
import { GiHops } from 'react-icons/gi';

interface styleProps {
  style: BeerStyle;
  index: number;
  styleImagePlaceholders: string;
}

export default function style({
  style,
  index,
  styleImagePlaceholders,
}: styleProps) {
  return (
    <Link href={`/styles/${style.slug}`} className="block">
      <motion.div
        key={style.slug}
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
            {style.name}
          </h2>

          <p className="text-amber-800 mb-1 line-clamp-2 text-sm">
            {style.shortDescription}
          </p>

          {/* 重要な特性だけをシンプルに表示 */}
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="beer-stat flex items-center gap-1 text-xs bg-amber-50 px-2 py-1 rounded-full">
              <FaThermometerHalf className="text-amber-600" />
              <span className="whitespace-nowrap">
                ABV {formatAbv(style.abv)}
              </span>
            </div>

            <div className="beer-stat flex items-center gap-1 text-xs bg-amber-50 px-2 py-1 rounded-full">
              <GiHops className="text-amber-600" />
              <span>IBU {formatIbu(style.ibu)}</span>
            </div>

            {style.characteristics.bitterness > 3 && (
              <div className="beer-stat text-xs bg-amber-50 px-2 py-1 rounded-full">
                苦め
              </div>
            )}
            {style.characteristics.sweetness > 3 && (
              <div className="beer-stat text-xs bg-amber-50 px-2 py-1 rounded-full">
                甘め
              </div>
            )}
            {style.characteristics.body > 3 && (
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
