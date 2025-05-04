'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  beerStyles,
  beers,
  BeerStyle,
} from '../../../../src/app/lib/beers-data';

// コンポーネントのインポート
import HeroSection from '../../../../src/app/components/HeroSection';
import StyleRadarChart from '../../../../src/app/components/guides/styles/StyleRadarChart';
import StyleCharacteristics from '../../../../src/app/components/guides/styles/StyleCharacteristics';
import RelatedStyles from '../../../../src/app/components/guides/styles/RelatedStyles';
import ExampleBeers from '../../../../src/app/components/guides/styles/ExampleBeers';
import LoadingSpinner from '../../../../src/app/components/LoadingSpinner';

// スタイルイメージのプレースホルダー
const getStyleColorBySRM = (style: any): string => {
  // SRMの範囲の中央値を計算（最小値と最大値の平均）
  const avgSRM = style.srm ? (style.srm[0] + style.srm[1]) / 2 : 0;

  // SRMの値に基づいて色を返す（実際のビールの色に近い色）
  if (avgSRM < 2) {
    return 'bg-yellow-50'; // 非常に淡い色（ピルスナーライト、ライトラガー等）
  } else if (avgSRM < 4) {
    return 'bg-yellow-100'; // 淡い黄金色（ピルスナー、ヘレス、ヴィットビア等）
  } else if (avgSRM < 6) {
    return 'bg-yellow-200'; // 黄金色（ブロンドエール、ケルシュ等）
  } else if (avgSRM < 8) {
    return 'bg-amber-100'; // 淡い琥珀色（ペールエール等）
  } else if (avgSRM < 10) {
    return 'bg-amber-200'; // やや濃い琥珀色（アンバーエール、ウィンナラガー等）
  } else if (avgSRM < 14) {
    return 'bg-amber-300'; // 琥珀色（ESB、ボック等）
  } else if (avgSRM < 17) {
    return 'bg-amber-400'; // 濃い琥珀色（デュッベル、アンバーエール等）
  } else if (avgSRM < 20) {
    return 'bg-amber-500'; // 明るい茶色（ブラウンエール等）
  } else if (avgSRM < 25) {
    return 'bg-amber-600'; // 茶色（ブラウンエール、デュンケル等）
  } else if (avgSRM < 30) {
    return 'bg-amber-700'; // 濃い茶色（ポーター等）
  } else if (avgSRM < 35) {
    return 'bg-amber-800'; // 暗褐色（スタウト等）
  } else {
    return 'bg-amber-900'; // ほぼ黒色（インペリアルスタウト、シュヴァルツビア等）
  }
};

// 特定のスタイルには特別な色を設定（SRM以外の特徴を強調したい場合）
const specialStyleColors: { [key: string]: string } = {
  'fruit-beer': 'bg-pink-200',
  'sour-ale': 'bg-rose-300',
  'berliner-weisse': 'bg-rose-200',
  gose: 'bg-rose-200',
  'flanders-red-ale': 'bg-red-300',
  kriek: 'bg-red-400',
  framboise: 'bg-pink-300',
};

// スタイルに対して色を決定する関数
const getStyleColor = (style: any): string => {
  // 特別なスタイルがあればそれを返す、なければSRMベースの色を返す
  return specialStyleColors[style.id] || getStyleColorBySRM(style);
};

// ビールスタイル詳細ページコンポーネント
export default function BeerStyleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // パラメータからIDを抽出
  const id = params.id;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [style, setStyle] = useState<BeerStyle | null>(null);
  const [exampleBeers, setExampleBeers] = useState<any[]>([]);
  const [relatedStyles, setRelatedStyles] = useState<{
    parentStyles: BeerStyle[];
    childStyles: BeerStyle[];
    siblingStyles: BeerStyle[];
  }>({
    parentStyles: [],
    childStyles: [],
    siblingStyles: [],
  });

  const router = useRouter();

  useEffect(() => {
    const fetchStyleData = async () => {
      setIsLoading(true);

      try {
        // スタイル情報を取得
        const foundStyle = beerStyles.find((s) => s.id === id);

        if (!foundStyle) {
          notFound();
          return;
        }

        setStyle(foundStyle);

        // このスタイルの代表的なビールを最大3つ取得
        const styleBeers = beers
          .filter((beer) => beer.style === id)
          .slice(0, 3);

        setExampleBeers(styleBeers);

        // 関連スタイルを取得
        const parents = foundStyle.parents
          ?.map((id) => beerStyles.find((s) => s.id === id))
          .filter(Boolean) as BeerStyle[];

        const children = foundStyle.children
          ?.map((id) => beerStyles.find((s) => s.id === id))
          .filter(Boolean) as BeerStyle[];

        const siblings = foundStyle.siblings
          ?.map((id) => beerStyles.find((s) => s.id === id))
          .filter(Boolean) as BeerStyle[];

        setRelatedStyles({
          parentStyles: parents || [],
          childStyles: children || [],
          siblingStyles: siblings || [],
        });
      } catch (error) {
        console.error('スタイルデータの取得中にエラーが発生しました:', error);
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

  // スタイルの歴史情報（ない場合はデフォルトのテキスト）
  const styleHistory = {
    history:
      style.history || 'このビールスタイルの詳細な歴史情報は現在準備中です。',
    origin: style.origin || '情報なし',
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 relative overflow-hidden">
      {/* ヒーローセクション */}
      <div className="mb-6">
        <Link
          href="/guides/styles"
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
          ビールスタイルガイドへ戻る
        </Link>

        <HeroSection
          title={style.name}
          description={
            style.other_name ? `${style.other_name.join('、')}とも呼ばれる` : ''
          }
        />
      </div>

      {/* スタイル情報のメイン部分 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* 左カラム: スタイル基本情報と特性 */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-6"
          >
            {/* スタイル画像（プレースホルダー） */}
            <div
              className={`relative h-48 ${getStyleColor(
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

              {style.other_name && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {style.other_name.map((name, i) => (
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
                  <h3 className="font-semibold mb-1">色調（SRM）</h3>
                  <p>
                    {style.srm
                      ? `${style.srm[0]}～${style.srm[1]}`
                      : '情報なし'}
                  </p>
                </div>

                {style.servingTemperature && (
                  <div>
                    <h3 className="font-semibold mb-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      適正温度
                    </h3>
                    <p>{style.servingTemperature[0]}～{style.servingTemperature[1]}℃</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* スタイルの特性レーダーチャート */}
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

          {/* バーでも表示 */}
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

        {/* 右カラム: 詳細な説明、歴史、関連スタイル */}
        <div className="lg:col-span-2">
          {/* 詳細な説明 */}
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

          {/* 歴史 */}
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

          {/* 関連スタイル - 関連スタイルがない場合は表示しない */}
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

          {/* 代表的なビール - リストが空の場合は表示しない */}
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

      {/* 他のスタイルを見るセクション */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <h3 className="text-xl font-bold text-amber-900 mb-6">
          他のビールスタイルを探す
        </h3>
        <Link href="/guides/styles" className="btn btn-primary btn-lg">
          ビールスタイルガイドへ
        </Link>
      </motion.div>
    </div>
  );
}
