'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { beers, Beer } from '@/src/app/lib/beers-data';
import {
  BeerStyle,
  getBeerStyleBySlug,
  fetchBeerStyles,
} from '@/src/app/lib/beer-styles-data';
import LoadingSpinner from '@/src/app/components/LoadingSpinner';

// コンポーネントのインポート
import StyleRadarChart from './StyleRadarChart';
import StyleCharacteristics from './StyleCharacteristics';
import RelatedStyles from './RelatedStyles';
import ExampleBeers from './ExampleBeers';

interface BeerStyleDetailProps {
  id: string;
}

// スタイルイメージのプレースホルダー
const getStyleColorBySRM = (style: BeerStyle): string => {
  const avgSRM = style.srm ? (style.srm[0] + style.srm[1]) / 2 : 0;

  if (avgSRM < 2) {
    return 'bg-yellow-50';
  } else if (avgSRM < 4) {
    return 'bg-yellow-100';
  } else if (avgSRM < 6) {
    return 'bg-yellow-200';
  } else if (avgSRM < 8) {
    return 'bg-amber-100';
  } else if (avgSRM < 10) {
    return 'bg-amber-200';
  } else if (avgSRM < 14) {
    return 'bg-amber-300';
  } else if (avgSRM < 17) {
    return 'bg-amber-400';
  } else if (avgSRM < 20) {
    return 'bg-amber-500';
  } else if (avgSRM < 25) {
    return 'bg-amber-600';
  } else if (avgSRM < 30) {
    return 'bg-amber-700';
  } else if (avgSRM < 35) {
    return 'bg-amber-800';
  } else {
    return 'bg-amber-900';
  }
};

const specialStyleColors: { [key: string]: string } = {
  'fruit-beer': 'bg-pink-200',
  'sour-ale': 'bg-rose-300',
  'berliner-weisse': 'bg-rose-200',
  gose: 'bg-rose-200',
  'flanders-red-ale': 'bg-red-300',
  kriek: 'bg-red-400',
  framboise: 'bg-pink-300',
};

const getStyleColor = (style: BeerStyle): string => {
  return specialStyleColors[style.slug] || getStyleColorBySRM(style);
};

// スタイル詳細のメインコンテンツコンポーネント - Suspenseのターゲットにするため分離
function BeerStyleDetailContent({ id }: BeerStyleDetailProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [style, setStyle] = useState<BeerStyle | null>(null);
  const [exampleBeers, setExampleBeers] = useState<Beer[]>([]);
  const [relatedStyles, setRelatedStyles] = useState<{
    parentStyles: BeerStyle[];
    childStyles: BeerStyle[];
    siblingStyles: BeerStyle[];
  }>({
    parentStyles: [],
    childStyles: [],
    siblingStyles: [],
  });

  useEffect(() => {
    const fetchStyleData = async () => {
      setIsLoading(true);

      try {
        const styleData = await getBeerStyleBySlug(id);

        if (!styleData) {
          notFound();
          return;
        }

        setStyle(styleData);

        const allStyles = await fetchBeerStyles();

        const parents = styleData.parents
          ?.map((parentSlug) => allStyles.find((s) => s.slug === parentSlug))
          .filter(Boolean) as BeerStyle[];

        const children = styleData.children
          ?.map((childSlug) => allStyles.find((s) => s.slug === childSlug))
          .filter(Boolean) as BeerStyle[];

        const siblings = styleData.siblings
          ?.map((siblingSlug) => allStyles.find((s) => s.slug === siblingSlug))
          .filter(Boolean) as BeerStyle[];

        setRelatedStyles({
          parentStyles: parents || [],
          childStyles: children || [],
          siblingStyles: siblings || [],
        });

        const styleBeers = beers
          .filter((beer) => beer.style === id)
          .slice(0, 3);

        setExampleBeers(styleBeers);
      } catch (error) {
        console.error('スタイルデータの取得中にエラーが発生しました:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchStyleData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 sm:px-6 text-center">
        <LoadingSpinner
          size="large"
          message="ビールスタイル情報を読み込み中..."
        />
      </div>
    );
  }

  if (!style) {
    return notFound();
  }

  const styleHistory = {
    history:
      style.history || 'このビールスタイルの詳細な歴史情報は現在準備中です。',
    origin: style.origin || '情報なし',
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 relative overflow-hidden">
      <div className="mb-6">
        <Link
          href="/styles"
          className="text-amber-700 hover:text-amber-500 flex items-center mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          スタイル図鑑へ戻る
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-6"
          >
            <div
              className={`relative h-24 ${getStyleColor(
                style
              )} overflow-hidden`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl opacity-20">🍺</span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-amber-900 mb-2">
                {style.name}
              </h2>

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
                  <p>{styleHistory.origin}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">
                    一般的なABV（アルコール度数）
                  </h3>
                  <p>
                    {style.abv
                      ? `${style.abv[0]}～${style.abv[1]}%`
                      : '情報なし'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">
                    一般的なIBU（苦味の指標）
                  </h3>
                  <p>
                    {style.ibu
                      ? `${style.ibu[0]}～${style.ibu[1]}`
                      : '情報なし'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">一般的な色調（SRM）</h3>
                  <p>
                    {style.srm
                      ? `${style.srm[0]}～${style.srm[1]}`
                      : '情報なし'}
                  </p>
                </div>

                {style.servingTemperature && (
                  <div>
                    <h3 className="font-semibold mb-1 flex items-center">
                      適正温度
                    </h3>
                    <p>
                      {style.servingTemperature[0]}～
                      {style.servingTemperature[1]}℃
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-xl font-bold text-amber-900 mb-4">
              スタイルの特性
            </h3>
            <StyleRadarChart characteristics={style.characteristics} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-amber-900 mb-4">
              スタイルの特性バー
            </h3>
            <StyleCharacteristics characteristics={style.characteristics} />
          </motion.div>
        </div>

        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-xl font-bold text-amber-900 mb-4 border-l-4 border-amber-500 pl-4">
              スタイルの特徴
            </h3>
            <div className="prose max-w-none text-amber-800">
              <p>{style.description}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-xl font-bold text-amber-900 mb-4 border-l-4 border-amber-500 pl-4">
              歴史
            </h3>
            <div className="prose max-w-none text-amber-800">
              {styleHistory.history.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {(relatedStyles.parentStyles.length > 0 ||
            relatedStyles.childStyles.length > 0 ||
            relatedStyles.siblingStyles.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <RelatedStyles
                parentStyles={relatedStyles.parentStyles}
                childStyles={relatedStyles.childStyles}
                siblingStyles={relatedStyles.siblingStyles}
              />
            </motion.div>
          )}

          {exampleBeers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <ExampleBeers beers={exampleBeers} />
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <h3 className="text-xl font-bold text-amber-900 mb-6">
          他のスタイルを探す
        </h3>
        <Link href="/styles" className="btn btn-primary btn-lg">
          スタイル図鑑へ
        </Link>
      </motion.div>
    </div>
  );
}

// ビールスタイル詳細ページコンポーネント
export default function BeerStyleDetail({ id }: BeerStyleDetailProps) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-16 px-4 sm:px-6 text-center">
          <LoadingSpinner
            size="large"
            message="ビールスタイル情報を読み込み中..."
          />
        </div>
      }
    >
      <BeerStyleDetailContent id={id} />
    </Suspense>
  );
}
