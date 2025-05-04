'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Beer } from '../../../../app/lib/beers-data';

interface ExampleBeersProps {
  beers: Beer[];
}

export default function ExampleBeers({ beers }: ExampleBeersProps) {
  if (!beers || beers.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-amber-900 mb-4 border-l-4 border-amber-500 pl-4">
        このスタイルの代表的なビール
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {beers.map((beer, index) => (
          <motion.div
            key={beer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card-beer bg-white hover:shadow-xl transition-all duration-300"
          >
            {/* ビール画像 */}
            <div className="card-beer-header">
              <div
                className={`relative h-48 overflow-hidden ${
                  beer.image ? '' : 'bg-amber-200'
                }`}
              >
                {beer.image ? (
                  <Image
                    src={beer.image}
                    alt={beer.name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-20">🍺</span>
                  </div>
                )}
              </div>
            </div>

            <div className="card-beer-body">
              <h4 className="card-beer-title text-amber-900">{beer.name}</h4>
              <p className="text-sm text-amber-700 mb-2">
                {beer.brewery} ({beer.country})
              </p>

              <div className="flex items-center mb-3">
                <span className="text-sm font-medium text-amber-700 mr-2">
                  ABV: {beer.abv}%
                </span>
                <span className="mx-2 text-amber-300">|</span>
                <span className="text-sm font-medium text-amber-700">
                  IBU: {beer.ibu || 'N/A'}
                </span>
              </div>

              <p className="text-amber-800 mb-4 line-clamp-3 text-sm">
                {beer.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {beer.flavors.map((flavor, i) => (
                  <span key={i} className="beer-badge text-xs">
                    {flavor}
                  </span>
                ))}
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  href={`/beers/${beer.id}`}
                  className="btn btn-beer-outline btn-sm"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          href={`/beers?style=${beers[0]?.style}`}
          className="btn btn-primary"
        >
          このスタイルのビールをもっと見る
        </Link>
      </div>
    </div>
  );
}
