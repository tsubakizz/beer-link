import React from 'react';
import { motion } from 'framer-motion';
import {
  breweryTypeNames,
  type BreweryType,
} from '@/src/app/lib/breweries-data';

// ブルワリータイプに基づく色を返す関数
export const getBreweryTypeColor = (type: BreweryType) => {
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

export default function BreweryTypeInfo() {
  // 選択可能なブルワリータイプリスト
  const types = ['all', ...Object.keys(breweryTypeNames)].filter(
    (t) => t !== 'all'
  ) as BreweryType[];

  const descriptions: Record<BreweryType, string> = {
    craft:
      'クラフトブルワリーは小規模で伝統的な製法を重視し、独創的で個性的なビールを製造する醸造所です。多様な原料や製法を用いて、独自のフレーバーやスタイルを追求しています。',
    macro:
      '大手ビールメーカーは大規模な設備を持ち、大量生産を行うビール会社です。品質の安定性に優れ、広い市場に流通させることができます。',
    brewpub:
      'ブリューパブは自家製ビールを提供するレストランやパブです。醸造設備とレストランが一体になっており、できたての新鮮なビールを食事と共に楽しむことができます。',
    contract:
      '委託醸造は自社の醸造設備を持たず、他のブルワリーの設備を借りてビールを製造するスタイルです。レシピや監修は自社で行いますが、製造は他社に委託します。',
    proprietary:
      '特殊/伝統的醸造所は修道院ビールなど、特殊な歴史や伝統を持つ醸造所です。何世紀にもわたる伝統的な製法でビールを作り続けているところもあります。',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-16 mb-8"
    >
      <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-6 text-amber-900 flex items-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          ブルワリーについて
        </h2>

        <div className="prose max-w-none text-amber-800">
          <p>
            ブルワリー（醸造所）は、ビールの生産を行う施設です。大量生産を行う大手メーカーから、
            小規模で個性的なビールを作るクラフトブルワリーまで、様々な種類があります。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {types.map((type) => {
              const typeColor = getBreweryTypeColor(type);
              return (
                <div
                  key={type}
                  className={`p-5 rounded-lg border ${
                    typeColor.border
                  } ${typeColor.bg.replace('bg-', 'bg-opacity-30 bg-')}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{typeColor.icon}</span>
                    <h3 className={`font-bold ${typeColor.text}`}>
                      {breweryTypeNames[type]}
                    </h3>
                  </div>
                  <p className="text-sm">{descriptions[type]}</p>
                </div>
              );
            })}
          </div>

          <h3 className="mt-6 font-bold text-lg">ブルワリー見学について</h3>
          <p>
            多くのブルワリーでは工場見学を実施しており、ビールの製造工程を間近で見学できます。
            また、直営のタップルームを併設しているブルワリーでは、その場で新鮮なビールを楽しむことができます。
            ブルワリー見学は、ビールの製造方法や歴史を学ぶ絶好の機会です。
          </p>
        </div>
      </div>
    </motion.div>
  );
}
