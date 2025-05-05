import React from 'react';
import { BeerStyle } from '@/src/app/lib/beers-data';
import { motion } from 'framer-motion';

interface FlavorProfileCardProps {
  beerStyle: BeerStyle;
}

export default function FlavorProfileCard({
  beerStyle,
}: FlavorProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-xl shadow-sm p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-amber-900 flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
            clipRule="evenodd"
          />
        </svg>
        味わいプロファイル
      </h2>

      <div className="grid gap-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-amber-800">苦味</span>
            <span className="text-amber-700">強い</span>
          </div>
          <div className="w-full bg-amber-100 h-2 rounded-full">
            <div
              className="bg-gradient-to-r from-amber-300 to-amber-500 h-2 rounded-full"
              style={{
                width: `${(beerStyle.characteristics.bitterness / 5) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-amber-800">甘味</span>
            <span className="text-amber-700">強い</span>
          </div>
          <div className="w-full bg-amber-100 h-2 rounded-full">
            <div
              className="bg-gradient-to-r from-amber-300 to-amber-500 h-2 rounded-full"
              style={{
                width: `${(beerStyle.characteristics.sweetness / 5) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-amber-800">ボディ</span>
            <span className="text-amber-700">重い</span>
          </div>
          <div className="w-full bg-amber-100 h-2 rounded-full">
            <div
              className="bg-gradient-to-r from-amber-300 to-amber-500 h-2 rounded-full"
              style={{
                width: `${(beerStyle.characteristics.body / 5) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {beerStyle.characteristics.sourness !== undefined && (
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-amber-800">酸味</span>
              <span className="text-amber-700">強い</span>
            </div>
            <div className="w-full bg-amber-100 h-2 rounded-full">
              <div
                className="bg-gradient-to-r from-amber-300 to-amber-500 h-2 rounded-full"
                style={{
                  width: `${(beerStyle.characteristics.sourness / 5) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2 text-amber-900">
          このスタイルについて
        </h3>
        <p className="text-amber-800">{beerStyle.description}</p>
      </div>
    </motion.div>
  );
}
