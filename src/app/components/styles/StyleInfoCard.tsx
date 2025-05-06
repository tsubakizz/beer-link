'use client';

import React from 'react';
import { BeerStyle } from '@/src/app/types/beer-style';
import { getStyleColor } from '@/src/app/lib/style-color-utils';
import StyleAnimatedCard from './StyleAnimatedCard';

interface StyleInfoCardProps {
  style: BeerStyle;
}

export default function StyleInfoCard({ style }: StyleInfoCardProps) {
  return (
    <StyleAnimatedCard className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      <div className={`relative h-24 ${getStyleColor(style)} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-20">🍺</span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-2">{style.name}</h2>

        {style.otherNames && style.otherNames.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {style.otherNames.map((name, i) => (
              <span key={i} className="beer-badge">
                {name}
              </span>
            ))}
          </div>
        )}

        <div className="divider beer-divider"></div>

        <div className="space-y-4 text-amber-800">
          <div>
            <h3 className="font-semibold mb-1">発祥</h3>
            <p>{style.origin || '情報なし'}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              一般的なABV（アルコール度数）
            </h3>
            <p>
              {style.abv ? `${style.abv[0]}～${style.abv[1]}%` : '情報なし'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">一般的なIBU（苦味の指標）</h3>
            <p>{style.ibu ? `${style.ibu[0]}～${style.ibu[1]}` : '情報なし'}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">一般的な色調（SRM）</h3>
            <p>{style.srm ? `${style.srm[0]}～${style.srm[1]}` : '情報なし'}</p>
          </div>

          {style.servingTemperature && (
            <div>
              <h3 className="font-semibold mb-1 flex items-center">適正温度</h3>
              <p>
                {style.servingTemperature[0]}～{style.servingTemperature[1]}℃
              </p>
            </div>
          )}
        </div>
      </div>
    </StyleAnimatedCard>
  );
}
