'use client';

import React from 'react';

// インポートするコンポーネント
import HeroSection from '../../../src/app/components/HeroSection';
import IntroductionSection from '../../../src/app/components/guides/IntroductionSection';
import GlossarySection from '../../../src/app/components/guides/GlossarySection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BeerFinderCTA from '../../../src/app/components/guides/BeerFinderCTA';

// テイスティング用語の定義
const tastingGlossaryItems = [
  {
    title: '外観 (Appearance)',
    description:
      'ビールの視覚的特徴。色合い、透明度、泡の状態などを観察します。色はSRM（Standard Reference Method）という単位で表されることもあります。',
  },
  {
    title: '香り (Aroma)',
    description:
      'ビールから立ち上る匂い。ホップ由来の柑橘系や松の香り、モルト由来のパンやキャラメルの香り、酵母由来のフルーティーさや香辛料のような香りなどを感じ取ります。',
  },
  {
    title: '味わい (Flavor)',
    description:
      '口に含んだときの味覚と香りの組み合わせ。甘み、酸味、苦み、塩味、うま味の基本味覚に加え、ホップの風味や後味を評価します。',
  },
  {
    title: 'マウスフィール (Mouthfeel)',
    description:
      '口当たりや体感。ボディ（軽い〜重い）、炭酸の強さ、なめらかさ、ドライさ、アルコールの温かみなどの質感を表します。',
  },
  {
    title: 'フィニッシュ (Finish)',
    description:
      '飲み込んだ後に残る余韻や後味。長く続くか、すっきり消えるか、苦みが残るか甘みが残るかなどを評価します。',
  },
  {
    title: 'エステル (Esters)',
    description:
      '主に酵母によって生成される、フルーツのような香りの化合物。バナナやリンゴ、洋ナシなどの香りに例えられることが多いです。',
  },
  {
    title: 'フェノール (Phenols)',
    description:
      '一部の酵母や原料によって生じる風味化合物。クローブ、コショウ、スモーキーな特徴を持つことがあります。ベルギービールに多く見られます。',
  },
  {
    title: 'ジオスミン (Geosmin)',
    description:
      '不快な土臭い、カビ臭さを持つ化合物。ビールの欠陥として扱われることが多いですが、一部のスタイルでは特徴として受け入れられることもあります。',
  },
];

// テイスティングの基本ステップのコンテンツ
const tastingBasicStepsContent = (
  <>
    <div className="grid md:grid-cols-5 gap-6 mt-6">
      <div className="md:col-span-3">
        <div className="space-y-6">
          <div className="bg-amber-50 p-5 rounded-lg">
            <h3 className="text-xl font-bold text-amber-900 mb-2">
              1. 外観を観察する
            </h3>
            <p className="text-amber-800">
              グラスに注いだビールをまずは目で観察しましょう。光に透かしてみるとよりはっきりと色や透明度が分かります。以下のポイントに注目してください：
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-amber-800">
              <li>色合い（淡い黄金色、琥珀色、濃い茶色、黒など）</li>
              <li>透明度（クリアか、ヘイジー（濁り）があるか）</li>
              <li>泡の色、量、持続性、きめ細かさ</li>
              <li>炭酸の様子（気泡の大きさ、量）</li>
            </ul>
          </div>

          <div className="bg-amber-50 p-5 rounded-lg">
            <h3 className="text-xl font-bold text-amber-900 mb-2">
              2. 香りを感じる
            </h3>
            <p className="text-amber-800">
              グラスを軽く回して香りを立たせ、短く息を吸いながら香りを感じ取ります。最初は浅く、次に深く香りを嗅いでみましょう：
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-amber-800">
              <li>ホップの香り（柑橘系、松、ハーブ、花など）</li>
              <li>
                モルトの香り（パン、ビスケット、キャラメル、チョコレートなど）
              </li>
              <li>酵母由来の香り（フルーティー、スパイシーなど）</li>
              <li>
                その他の特徴的な香り（コーヒー、ココア、ナッツ、スモーキーなど）
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 p-5 rounded-lg">
            <h3 className="text-xl font-bold text-amber-900 mb-2">
              3. 味わいを楽しむ
            </h3>
            <p className="text-amber-800">
              少量を口に含み、舌全体に行き渡らせます。最初の印象と、飲み込む直前の味わいの変化に注意を払ってください：
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-amber-800">
              <li>甘み（モルト由来の甘さ、カラメル、蜂蜜のような風味）</li>
              <li>苦み（ホップの苦味、その強さと質）</li>
              <li>酸味（さわやかさ、酸っぱさの度合い）</li>
              <li>全体的なバランス（甘みと苦みのバランスなど）</li>
              <li>複雑さ（味の層や深み）</li>
            </ul>
          </div>

          <div className="bg-amber-50 p-5 rounded-lg">
            <h3 className="text-xl font-bold text-amber-900 mb-2">
              4. マウスフィールと余韻を評価する
            </h3>
            <p className="text-amber-800">
              口当たりや飲み込んだ後の余韻も重要な要素です：
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-amber-800">
              <li>ボディ感（軽い、ミディアム、重いなど）</li>
              <li>炭酸の強さ（弱い、適度、強いなど）</li>
              <li>舌触り（なめらか、クリーミー、ドライなど）</li>
              <li>アルコール感（温かみ、刺激など）</li>
              <li>余韻の長さと特徴（短くすっきり、長く複雑など）</li>
              <li>後味（心地よい、不快など）</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="sticky top-24 bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-amber-700 p-4">
            <h3 className="text-xl font-bold text-white">
              テイスティングチェックリスト
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <h4 className="font-semibold text-amber-900">外観</h4>
              <div className="mt-1 space-y-1">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 w-20">色：</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-yellow-100 text-xs rounded">
                      淡い黄金色
                    </span>
                    <span className="px-2 py-1 bg-amber-200 text-xs rounded">
                      琥珀色
                    </span>
                    <span className="px-2 py-1 bg-amber-700 text-white text-xs rounded">
                      茶色
                    </span>
                    <span className="px-2 py-1 bg-amber-950 text-white text-xs rounded">
                      黒
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 w-20">透明度：</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                      クリア
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                      やや濁り
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                      濁り
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 w-20">泡：</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                      豊か
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                      普通
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                      少ない
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-amber-900">香り</h4>
              <div className="mt-1 flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-green-100 text-xs rounded">
                  柑橘系
                </span>
                <span className="px-2 py-1 bg-green-100 text-xs rounded">
                  トロピカル
                </span>
                <span className="px-2 py-1 bg-green-100 text-xs rounded">
                  松/樹脂
                </span>
                <span className="px-2 py-1 bg-yellow-100 text-xs rounded">
                  パン/ビスケット
                </span>
                <span className="px-2 py-1 bg-yellow-100 text-xs rounded">
                  キャラメル
                </span>
                <span className="px-2 py-1 bg-yellow-100 text-xs rounded">
                  チョコレート
                </span>
                <span className="px-2 py-1 bg-red-100 text-xs rounded">
                  フルーティー
                </span>
                <span className="px-2 py-1 bg-red-100 text-xs rounded">
                  スパイス
                </span>
                <span className="px-2 py-1 bg-red-100 text-xs rounded">
                  バナナ
                </span>
                <span className="px-2 py-1 bg-blue-100 text-xs rounded">
                  コーヒー
                </span>
                <span className="px-2 py-1 bg-blue-100 text-xs rounded">
                  スモーキー
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-amber-900">味わい</h4>
              <div className="space-y-2 mt-1">
                <div>
                  <span className="text-sm text-gray-600">甘み：</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">苦み：</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: '40%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">酸味：</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: '20%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">ボディ：</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: '50%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-amber-900">総合評価</h4>
              <div className="flex items-center mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>

            <div className="pt-2 border-t">
              <Link
                href="/reviews/new"
                className="btn btn-primary btn-sm w-full"
              >
                レビューを書く
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

// フレーバーホイールのコンテンツ
const flavorWheelContent = (
  <>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <h3 className="text-xl font-bold text-amber-900 mb-4">
              フレーバーホイールとは
            </h3>
            <p className="text-amber-800 mb-4">
              フレーバーホイールは、ビールの風味を体系的に分類・整理したツールです。センターから外側に向かって、より具体的な風味表現になっていきます。
            </p>
            <p className="text-amber-800 mb-4">
              初心者から専門家まで、ビールの風味を言語化する際の共通言語として活用されています。テイスティング時に感じた風味を探して表現する際に役立ちます。
            </p>
            <p className="text-amber-800">
              右のイメージはビールのフレーバーホイールの例です。実際のテイスティングで感じた風味を探してみましょう。
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-amber-900 mb-4">
              フレーバーホイールの使い方
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-amber-800">
              <li>ビールをテイスティングして感じた風味を思い浮かべます</li>
              <li>
                ホイールの中心から始めて、該当する大きなカテゴリーを選びます
              </li>
              <li>より具体的な風味を外側に向かって探していきます</li>
              <li>
                複数の風味を感じた場合は、それぞれについて同じプロセスを繰り返します
              </li>
              <li>見つけた風味表現を使ってビールを表現してみましょう</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-lg shadow-xl"
        >
          <div className="aspect-square relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              {/* フレーバーホイール画像のプレースホルダー - 実際の実装ではここに画像を挿入 */}
              <div className="w-full h-full flex items-center justify-center bg-amber-50">
                <div className="text-center p-8">
                  <p className="text-amber-800 mb-4">フレーバーホイール画像</p>
                  <p className="text-sm text-amber-600">
                    ※
                    実際の実装では、詳細なフレーバーホイールの画像またはインタラクティブなコンポーネントを挿入します
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">ホップの風味例</h4>
            <ul className="text-green-700 space-y-1">
              <li>柑橘系：グレープフルーツ、レモン、オレンジ</li>
              <li>トロピカル：マンゴー、パイナップル、パッションフルーツ</li>
              <li>ハーブ系：パイン、草、ハーブ</li>
              <li>花系：花、ジャスミン、ローズ</li>
              <li>樹脂系：松、樹脂</li>
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-bold text-amber-800 mb-2">モルトの風味例</h4>
            <ul className="text-amber-700 space-y-1">
              <li>穀物系：パン、ビスケット、クラッカー、穀物</li>
              <li>キャラメル系：トフィー、キャラメル、蜂蜜</li>
              <li>ナッツ系：アーモンド、ヘーゼルナッツ、ピーカン</li>
              <li>焙煎系：コーヒー、チョコレート、ココア</li>
              <li>スモーキー：焚き火、燻製、灰</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>
);

// プロのテイスティングテクニックのコンテンツ
const proTastingTechniquesContent = (
  <>
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-amber-900 mb-4">
          適切な環境を整える
        </h3>
        <ul className="list-disc pl-6 text-amber-800 space-y-2">
          <li>
            <span className="font-semibold">中立的な環境</span>
            ：強い香りのある場所（料理の匂い、香水など）は避け、できるだけ臭いのない清潔な環境で行います。
          </li>
          <li>
            <span className="font-semibold">適切な照明</span>
            ：ビールの色を正確に評価するために、自然光か中程度の明るさの照明が理想的です。
          </li>
          <li>
            <span className="font-semibold">テイスティング前の注意点</span>
            ：テイスティングの少なくとも30分前からは、強い香りや味のするものを食べたり飲んだりすることは避けましょう。喫煙もテイスティングに影響します。
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-amber-900 mb-4">
          適切なグラスの選択
        </h3>
        <p className="text-amber-800 mb-4">
          ビールスタイルに合ったグラスを使うことで、そのビールの特徴を最大限に引き出すことができます：
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-amber-50 p-3 rounded-lg text-center">
            <div className="h-24 flex items-center justify-center">
              {/* チューリップ型グラスのイラスト - 実際の実装では画像に置き換え */}
              <div className="w-12 h-24 bg-gray-200 rounded-b-full relative">
                <div className="absolute bottom-0 w-full h-16 bg-amber-200 opacity-50 rounded-b-full"></div>
              </div>
            </div>
            <h4 className="font-semibold text-amber-900 mt-2">
              チューリップ型
            </h4>
            <p className="text-xs text-amber-700 mt-1">
              ベルジャンエール、IPAなど
            </p>
          </div>

          <div className="bg-amber-50 p-3 rounded-lg text-center">
            <div className="h-24 flex items-center justify-center">
              {/* ウィーゼンのイラスト - 実際の実装では画像に置き換え */}
              <div className="w-16 h-24 bg-gray-200 rounded-b-full relative">
                <div className="absolute bottom-0 w-full h-12 bg-amber-200 opacity-50 rounded-b-full"></div>
              </div>
            </div>
            <h4 className="font-semibold text-amber-900 mt-2">ウィーゼン</h4>
            <p className="text-xs text-amber-700 mt-1">
              ヴァイツェン、小麦ビールなど
            </p>
          </div>

          <div className="bg-amber-50 p-3 rounded-lg text-center">
            <div className="h-24 flex items-center justify-center">
              {/* シュタンゲのイラスト - 実際の実装では画像に置き換え */}
              <div className="w-10 h-24 bg-gray-200 rounded-b-full relative">
                <div className="absolute bottom-0 w-full h-8 bg-amber-200 opacity-50 rounded-b-full"></div>
              </div>
            </div>
            <h4 className="font-semibold text-amber-900 mt-2">シュタンゲ</h4>
            <p className="text-xs text-amber-700 mt-1">ケルシュ、アルトなど</p>
          </div>

          <div className="bg-amber-50 p-3 rounded-lg text-center">
            <div className="h-24 flex items-center justify-center">
              {/* パイントのイラスト - 実際の実装では画像に置き換え */}
              <div
                className="w-16 h-24 bg-gray-200 relative"
                style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }}
              >
                <div
                  className="absolute bottom-0 w-full h-12 bg-amber-200 opacity-50"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
                  }}
                ></div>
              </div>
            </div>
            <h4 className="font-semibold text-amber-900 mt-2">パイント</h4>
            <p className="text-xs text-amber-700 mt-1">
              スタウト、ポーター、ペールエールなど
            </p>
          </div>

          <div className="bg-amber-50 p-3 rounded-lg text-center">
            <div className="h-24 flex items-center justify-center">
              {/* ピルスナーのイラスト - 実際の実装では画像に置き換え */}
              <div
                className="w-12 h-24 bg-gray-200 relative"
                style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' }}
              >
                <div
                  className="absolute bottom-0 w-full h-10 bg-amber-200 opacity-50"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)',
                  }}
                ></div>
              </div>
            </div>
            <h4 className="font-semibold text-amber-900 mt-2">ピルスナー</h4>
            <p className="text-xs text-amber-700 mt-1">
              ピルスナー、ラガーなど
            </p>
          </div>

          <div className="bg-amber-50 p-3 rounded-lg text-center">
            <div className="h-24 flex items-center justify-center">
              {/* スニフターのイラスト - 実際の実装では画像に置き換え */}
              <div className="w-18 h-18 bg-gray-200 rounded-full relative">
                <div className="absolute bottom-0 w-full h-8 bg-amber-200 opacity-50 rounded-b-full"></div>
              </div>
            </div>
            <h4 className="font-semibold text-amber-900 mt-2">スニフター</h4>
            <p className="text-xs text-amber-700 mt-1">
              バーレイワイン、インペリアルスタウトなど
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-amber-900 mb-4">
          テイスティングノートの取り方
        </h3>
        <p className="text-amber-800 mb-4">
          テイスティングの記録を取ることで、時間の経過とともに自分の好みや経験を振り返ることができます。基本的なテイスティングノートには以下の要素を含めましょう：
        </p>
        <ul className="list-disc pl-6 text-amber-800 space-y-2">
          <li>
            基本情報：ビール名、ブルワリー名、スタイル、ABV（アルコール度数）
          </li>
          <li>テイスティング日時、場所、飲用温度</li>
          <li>外観：色、透明度、泡の状態</li>
          <li>香り：検出された香りの具体的な描写</li>
          <li>味わい：味のバランス、強度、複雑さ</li>
          <li>マウスフィール：ボディ感、炭酸、クリーミーさなど</li>
          <li>全体的な印象と評価（5段階評価など）</li>
          <li>個人的なメモ（料理との相性、購入場所、価格など）</li>
        </ul>
        <div className="mt-4">
          <Link
            href="/reviews/new"
            className="text-amber-600 hover:text-amber-800 font-semibold flex items-center"
          >
            テイスティングノートを残す（レビュー投稿）
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-amber-900 mb-4">
          比較テイスティングのススメ
        </h3>
        <p className="text-amber-800 mb-4">
          複数のビールを並べて飲み比べることで、それぞれの特徴がより明確に理解できます：
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">
              スタイル別比較
            </h4>
            <p className="text-amber-800 mb-2">
              同じスタイルの異なるブランドのビールを飲み比べることで、そのスタイルの幅と各ブルワリーの個性を理解できます。
            </p>
            <div className="bg-amber-50 p-3 rounded-lg text-sm">
              <p className="font-semibold text-amber-800">例：IPA飲み比べ</p>
              <ul className="list-disc pl-5 text-amber-700 mt-1">
                <li>アメリカンIPA</li>
                <li>イングリッシュIPA</li>
                <li>ニューイングランドIPA</li>
                <li>ウエストコーストIPA</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-amber-900 mb-2">テーマ別比較</h4>
            <p className="text-amber-800 mb-2">
              特定のホップ種、発祥地域、醸造所などをテーマにした比較もより深い理解につながります。
            </p>
            <div className="bg-amber-50 p-3 rounded-lg text-sm">
              <p className="font-semibold text-amber-800">
                例：特定ホップのビール飲み比べ
              </p>
              <ul className="list-disc pl-5 text-amber-700 mt-1">
                <li>シトラホップ使用ビール</li>
                <li>モザイクホップ使用ビール</li>
                <li>サバトホップ使用ビール</li>
                <li>ネルソンソーヴィンホップ使用ビール</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

// イントロダクションのコンテンツ
const introductionContent = (
  <>
    <p>
      ビールテイスティングは、ただビールを飲む以上の体験です。それは、各ビールの複雑な特徴や風味を理解し、評価するための体系的なアプローチです。
      プロの醸造家から熱心な愛好家まで、テイスティングスキルを磨くことで、ビールの奥深さをより深く理解し、楽しむことができます。
    </p>

    <p>
      このガイドでは、ビールの見た目、香り、味わい、マウスフィールを評価するための基本的な手順から、
      専門的なテイスティング用語、フレーバーホイールの使い方、そしてプロのようなテイスティングのコツまでをご紹介します。
    </p>

    <p>
      初心者の方でも実践しやすい方法から始めて、徐々にスキルを向上させていくことで、
      お気に入りのビールの新しい魅力を発見したり、今まで試したことのないスタイルに挑戦する楽しさを感じられるようになるでしょう。
    </p>
  </>
);

export default function TastingGuidePage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      {/* ヒーローセクション */}
      <HeroSection
        title="ビールテイスティングガイド"
        description="ビールの味わいを深く理解し、評価するための専門知識とテクニックをご紹介します。"
      />

      {/* イントロダクションセクション */}
      <IntroductionSection
        title="テイスティングの世界へようこそ"
        content={introductionContent}
      />

      {/* テイスティングの基本ステップ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="my-12"
      >
        <h2 className="text-2xl font-bold text-amber-900 mb-6 border-l-4 border-amber-500 pl-4">
          テイスティングの基本ステップ
        </h2>
        {tastingBasicStepsContent}
      </motion.div>

      {/* テイスティング用語の解説 */}
      <GlossarySection
        title="テイスティング用語の解説"
        items={tastingGlossaryItems}
      />

      {/* フレーバーホイール */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="my-12"
      >
        <h2 className="text-2xl font-bold text-amber-900 mb-6 border-l-4 border-amber-500 pl-4">
          ビールのフレーバーホイール
        </h2>
        {flavorWheelContent}
      </motion.div>

      {/* ビールを探す */}
      <BeerFinderCTA />

      {/* プロのテイスティングテクニック */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="my-12"
      >
        <h2 className="text-2xl font-bold text-amber-900 mb-6 border-l-4 border-amber-500 pl-4">
          プロのテイスティングテクニック
        </h2>
        {proTastingTechniquesContent}
      </motion.div>

      {/* もっとビールを探す */}
      <div className="text-center my-16">
        <h3 className="text-xl font-bold text-amber-900 mb-4">
          テイスティングスキルを活かそう
        </h3>
        <p className="text-amber-800 mb-6">
          新しいビールを発見して、あなたのテイスティング体験を広げましょう
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/beers" className="btn btn-primary">
            ビールを探す
          </Link>
          <Link href="/styles" className="btn btn-outline">
            ビールスタイルを学ぶ
          </Link>
        </div>
      </div>
    </div>
  );
}
