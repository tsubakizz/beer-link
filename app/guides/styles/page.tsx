'use client';

import { useState } from 'react';
import { beerStyles } from '../../../src/app/lib/beers-data';
import Link from 'next/link';
import Image from 'next/image';

// スタイルイメージのプレースホルダー（実際の実装では画像ファイルへのパスを設定）
const styleImagePlaceholders: { [key: string]: string } = {
  ipa: 'bg-amber-400',
  stout: 'bg-amber-900',
  pilsner: 'bg-amber-200',
  wheat: 'bg-amber-100',
  'pale-ale': 'bg-amber-300',
  porter: 'bg-amber-800',
  sour: 'bg-amber-500',
  belgian: 'bg-amber-600',
};

// ビールスタイルのグループ分け
const styleGroups = [
  { name: 'ライト', styles: ['pilsner', 'wheat'] },
  { name: 'バランス', styles: ['pale-ale'] },
  { name: 'ホップ中心', styles: ['ipa'] },
  { name: 'モルト中心', styles: ['porter', 'stout'] },
  { name: '特殊', styles: ['sour', 'belgian'] },
];

export default function BeerStylesPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // フィルターと検索に基づいてスタイルをフィルタリング
  const filteredStyles = beerStyles.filter((style) => {
    // グループフィルター
    if (
      selectedFilter !== 'all' &&
      !styleGroups
        .find((g) => g.name === selectedFilter)
        ?.styles.includes(style.id)
    ) {
      return false;
    }

    // 検索フィルター
    if (
      searchQuery &&
      !style.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !style.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">ビールスタイルガイド</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          クラフトビールにはたくさんのスタイルがあります。それぞれのスタイルの特徴や味わいの違いを理解して、あなたの好みに合ったビールを見つけましょう。
        </p>
      </div>

      {/* フィルターと検索 */}
      <div className="bg-amber-50 p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 検索ボックス */}
          <div>
            <label htmlFor="search" className="block mb-2 text-sm font-medium">
              検索
            </label>
            <input
              type="text"
              id="search"
              placeholder="ビールスタイルを検索"
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* グループフィルター */}
          <div>
            <label htmlFor="filter" className="block mb-2 text-sm font-medium">
              タイプで絞り込む
            </label>
            <select
              id="filter"
              className="select select-bordered w-full"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">すべてのスタイル</option>
              {styleGroups.map((group) => (
                <option key={group.name} value={group.name}>
                  {group.name}スタイル
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 味わいの特徴比較チャート */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          ビールスタイルの特徴比較
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-amber-100">
                <th>スタイル</th>
                <th className="text-center">苦味</th>
                <th className="text-center">甘み</th>
                <th className="text-center">ボディ</th>
                <th className="text-center">アルコール度数</th>
              </tr>
            </thead>
            <tbody>
              {filteredStyles.map((style) => (
                <tr key={style.id} className="hover:bg-gray-50">
                  <td className="font-medium">{style.name}</td>
                  <td>
                    <div className="flex justify-center items-center">
                      <div className="w-32 bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-amber-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (style.characteristics.bitterness / 5) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">
                        {style.characteristics.bitterness}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center items-center">
                      <div className="w-32 bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (style.characteristics.sweetness / 5) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">
                        {style.characteristics.sweetness}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center items-center">
                      <div className="w-32 bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-amber-800 h-2 rounded-full"
                          style={{
                            width: `${(style.characteristics.body / 5) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">
                        {style.characteristics.body}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    {style.characteristics.alcohol}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* スタイル一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStyles.map((style) => (
          <div
            key={style.id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            {/* スタイル画像（プレースホルダー） */}
            <figure
              className={`relative h-48 ${
                styleImagePlaceholders[style.id] || 'bg-amber-300'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-4xl text-white opacity-30">
                🍺
              </div>
            </figure>
            <div className="card-body">
              <h2 className="card-title">{style.name}</h2>
              <p className="text-sm line-clamp-3">{style.description}</p>

              {/* 特徴の簡易表示 */}
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="font-medium">苦味:</span>
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < style.characteristics.bitterness
                              ? 'bg-amber-600'
                              : 'bg-gray-200'
                          } mx-0.5`}
                        />
                      ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">甘み:</span>
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < style.characteristics.sweetness
                              ? 'bg-amber-500'
                              : 'bg-gray-200'
                          } mx-0.5`}
                        />
                      ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">ボディ:</span>
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < style.characteristics.body
                              ? 'bg-amber-800'
                              : 'bg-gray-200'
                          } mx-0.5`}
                        />
                      ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">アルコール:</span>
                  <span>{style.characteristics.alcohol}%</span>
                </div>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  href={`/beers?style=${style.id}`}
                  className="btn btn-sm btn-primary"
                >
                  このスタイルのビールを見る
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 結果が0件の場合 */}
      {filteredStyles.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">
            条件に一致するビールスタイルが見つかりませんでした
          </h3>
          <p className="text-gray-600">検索条件を変更してみてください</p>
          <button
            className="btn btn-outline mt-4"
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter('all');
            }}
          >
            フィルターをリセット
          </button>
        </div>
      )}

      {/* ビールスタイルに関する説明 */}
      <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">ビールスタイルについて</h2>

        <div className="prose max-w-none">
          <p>
            ビールスタイルとは、世界各地で発展してきたビールの種類やタイプを分類したものです。それぞれのスタイルには、独自の歴史、製法、味わいの特徴があります。
          </p>

          <h3>スタイルの基本的な分類</h3>
          <p>
            ビールは大きく分けて「エール」と「ラガー」に分類されます。エールは比較的高温で発酵させるビールで、フルーティーな香りや複雑な味わいが特徴です。一方、ラガーは低温でじっくり発酵・熟成させるビールで、クリーンでスッキリとした味わいになります。
          </p>

          <h3>味わいを決める要素</h3>
          <ul>
            <li>
              <strong>ホップ</strong>
              ：ビールに苦味と香りを与える植物。IPAなどホップ主体のビールでは、柑橘系やハーブ、パイン、フローラルといった様々な香りをもたらします。
            </li>
            <li>
              <strong>麦芽</strong>
              ：ビールの主原料で、甘味やコク、色の濃さを決定します。焙煎度合いによって、パンのような香りからチョコレート、コーヒーのような風味まで様々です。
            </li>
            <li>
              <strong>酵母</strong>
              ：発酵を担う微生物で、ビールの香りやフレーバーに大きな影響を与えます。特にベルギースタイルでは、酵母由来のフルーティーでスパイシーな風味が特徴的です。
            </li>
            <li>
              <strong>水</strong>
              ：ビールの約90%を占める水は、硬水・軟水などの特性によって、最終的な味わいに影響します。
            </li>
          </ul>

          <h3>自分の好みを見つけるには</h3>
          <p>
            ビールスタイルを知ることは、自分の好みを見つける手助けになります。苦いのが苦手な方は、小麦ビールやフルーティなサワーから始めるのがおすすめです。濃い味わいが好きな方はスタウトやポーターなどの黒ビールがおすすめです。様々なスタイルのビールを試して、あなたの好みを発見してください。
          </p>
        </div>
      </div>
    </div>
  );
}
