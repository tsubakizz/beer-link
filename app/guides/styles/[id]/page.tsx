'use client';

import { useState, useEffect } from 'react';
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

// スタイル間の関係（派生元、派生先、類似スタイル）
const styleRelationships: {
  [key: string]: {
    parents?: string[]; // 派生元スタイル
    children?: string[]; // 派生したスタイル
    siblings?: string[]; // 類似スタイル
  };
} = {
  ipa: {
    parents: ['pale-ale'],
    children: ['session-ipa', 'double-ipa', 'hazy-ipa', 'black-ipa'],
    siblings: ['american-pale-ale', 'english-ipa'],
  },
  stout: {
    parents: ['porter'],
    children: ['milk-stout', 'imperial-stout', 'oatmeal-stout'],
    siblings: ['porter', 'black-ipa'],
  },
  'pale-ale': {
    children: ['ipa', 'american-pale-ale', 'english-pale-ale'],
    siblings: ['amber-ale', 'esb'],
  },
  porter: {
    children: ['stout'],
    siblings: ['brown-ale', 'schwarzbier'],
  },
  pilsner: {
    parents: ['lager'],
    siblings: ['helles', 'czech-pilsner', 'german-pilsner'],
  },
  weissbier: {
    siblings: ['witbier', 'american-wheat', 'berliner-weisse'],
  },
  // 他のスタイル関係も同様に追加
};

// スタイルイメージのプレースホルダー
const styleImagePlaceholders: { [key: string]: string } = {
  ipa: 'bg-amber-400',
  stout: 'bg-amber-900',
  pilsner: 'bg-amber-200',
  weissbier: 'bg-amber-100',
  witbier: 'bg-amber-50',
  'pale-ale': 'bg-amber-300',
  porter: 'bg-amber-800',
  'sour-ale': 'bg-amber-500',
  saison: 'bg-amber-300',
  'belgian-blonde-ale': 'bg-amber-200',
  lager: 'bg-amber-100',
  'black-ipa': 'bg-amber-900',
  'fruit-beer': 'bg-pink-200',
  'hazy-ipa': 'bg-amber-300',
  'milk-stout': 'bg-amber-900',
};

// ビールスタイル詳細ページコンポーネント
export default function BeerStyleDetailPage({
  params,
}: {
  params: { id: string };
}) {
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
        const foundStyle = beerStyles.find((s) => s.id === params.id);

        if (!foundStyle) {
          notFound();
          return;
        }

        setStyle(foundStyle);

        // このスタイルの代表的なビールを最大3つ取得
        const styleBeers = beers
          .filter((beer) => beer.style === params.id)
          .slice(0, 3);

        setExampleBeers(styleBeers);

        // 関連スタイルを取得
        const relationship = styleRelationships[params.id] || {};

        const parents = relationship.parents
          ?.map((id) => beerStyles.find((s) => s.id === id))
          .filter(Boolean) as BeerStyle[];

        const children = relationship.children
          ?.map((id) => beerStyles.find((s) => s.id === id))
          .filter(Boolean) as BeerStyle[];

        const siblings = relationship.siblings
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
  }, [params.id]);

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
              className={`relative h-48 ${
                styleImagePlaceholders[style.id] || 'bg-amber-300'
              } overflow-hidden`}
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
                    {style.abv_range
                      ? `${style.abv_range[0]}% ~ ${style.abv_range[1]}%`
                      : '情報なし'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">
                    一般的なIBU（苦味の指標）
                  </h3>
                  <p>
                    {style.ibu_range
                      ? `${style.ibu_range[0]} ~ ${style.ibu_range[1]}`
                      : '情報なし'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">色調（SRM）</h3>
                  <p>
                    {style.srm_range
                      ? `${style.srm_range[0]} ~ ${style.srm_range[1]}`
                      : '情報なし'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">代表的な風味</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {style.flavors?.map((flavor, i) => (
                      <span key={i} className="beer-badge text-xs">
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">主な原料</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {style.ingredients?.map((ingredient, i) => (
                      <span key={i} className="beer-badge text-xs">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
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
              <p>{styleHistory.history}</p>
            </div>
          </motion.div>

          {/* 関連スタイル */}
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

          {/* 代表的なビール */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <ExampleBeers beers={exampleBeers} />
          </motion.div>
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
