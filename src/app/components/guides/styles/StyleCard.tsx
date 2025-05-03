'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BeerStyle } from '../../../../app/lib/beers-data';
import StyleCharacteristics from './StyleCharacteristics';

interface StyleCardProps {
  style: BeerStyle;
  index: number;
  styleImagePlaceholders: { [key: string]: string };
}

export default function StyleCard({
  style,
  index,
  styleImagePlaceholders,
}: StyleCardProps) {
  return (
    <Link href={`/guides/styles/${style.id}`} className="block">
      <motion.div
        key={style.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.1 + index * 0.05,
        }}
        className="card-beer bg-white hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
      >
        {/* スタイル画像（プレースホルダー） */}
        <div className="card-beer-header">
          <div
            className={`relative h-48 ${
              styleImagePlaceholders[style.id] || 'bg-amber-300'
            } overflow-hidden`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-20">🍺</span>
            </div>
          </div>
        </div>

        <div className="card-beer-body">
          <h2 className="card-beer-title text-amber-900">{style.name}</h2>
          {style.other_name && (
            <div className="flex flex-wrap gap-1 mb-2">
              {style.other_name.map((name, i) => (
                <span key={i} className="beer-badge text-xs">
                  {name}
                </span>
              ))}
            </div>
          )}
          <p className="text-amber-800 mb-4 line-clamp-3">
            {style.description}
          </p>

          {/* 特性の詳細表示 */}
          <StyleCharacteristics characteristics={style.characteristics} />

          <div className="card-actions justify-between mt-4">
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/guides/styles/${style.id}`;
              }}
            >
              詳細を見る
            </button>

            <Link
              href={`/beers?style=${style.id}`}
              className="btn btn-beer-outline btn-sm"
              onClick={(e) => e.stopPropagation()}
            >
              このスタイルのビールを見る
            </Link>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
