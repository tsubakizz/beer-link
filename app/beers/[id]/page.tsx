'use client';

import { useParams } from 'next/navigation';
import {
  Beer,
  BeerStyle,
  beers,
  beerStyles,
} from '../../../src/app/lib/beers-data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BeerDetailPage() {
  const params = useParams();
  const beerId = params.id as string;
  const [beer, setBeer] = useState<Beer | null>(null);
  const [beerStyle, setBeerStyle] = useState<BeerStyle | null>(null);
  const [similarBeers, setSimilarBeers] = useState<Beer[]>([]);

  useEffect(() => {
    // 指定されたIDのビールを検索
    const foundBeer = beers.find((b) => b.id === beerId) || null;
    setBeer(foundBeer);

    if (foundBeer) {
      // ビールスタイルを検索
      const style = beerStyles.find((s) => s.id === foundBeer.style) || null;
      setBeerStyle(style);

      // 同じスタイルの類似ビールを検索 (同じビールを除く、最大4つ)
      const similar = beers
        .filter((b) => b.style === foundBeer.style && b.id !== foundBeer.id)
        .slice(0, 4);
      setSimilarBeers(similar);
    }
  }, [beerId]);

  if (!beer) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">ビールが見つかりません</h1>
        <p>指定されたIDのビールは存在しないか、削除された可能性があります。</p>
        <Link href="/beers" className="btn btn-primary mt-6">
          ビール図鑑に戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <nav className="breadcrumbs mb-6 text-sm">
        <ul>
          <li>
            <Link href="/">ホーム</Link>
          </li>
          <li>
            <Link href="/beers">ビール図鑑</Link>
          </li>
          <li>{beer.name}</li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* メイン情報エリア */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* ビール画像 */}
              <div className="w-full md:w-1/3 relative h-60 bg-amber-100 rounded-lg flex items-center justify-center">
                {beer.imageUrl ? (
                  <img
                    src={beer.imageUrl}
                    alt={beer.name}
                    className="object-contain h-full w-full"
                  />
                ) : (
                  <div className="text-amber-800/30 text-5xl">🍺</div>
                )}
              </div>

              {/* ビール基本情報 */}
              <div className="w-full md:w-2/3">
                <h1 className="text-3xl font-bold mb-2">{beer.name}</h1>
                <p className="text-lg text-gray-700 mb-4">{beer.brewery}</p>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <div className="badge badge-lg badge-primary mr-2">
                      {beer.rating.toFixed(1)}
                    </div>
                    <span className="text-sm">
                      {beer.reviewCount}件のレビュー
                    </span>
                  </div>
                  <button className="btn btn-sm btn-outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    お気に入り
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-xs uppercase text-gray-500">
                      スタイル
                    </h3>
                    <p>{beerStyle?.name || beer.style}</p>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase text-gray-500">
                      アルコール度数
                    </h3>
                    <p>{beer.abv}%</p>
                  </div>
                  {beer.ibu && (
                    <div>
                      <h3 className="text-xs uppercase text-gray-500">
                        苦味 (IBU)
                      </h3>
                      <p>{beer.ibu}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {beer.flavors.map((flavor, index) => (
                    <span key={index} className="badge badge-outline">
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 説明文 */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3">
                テイスティングノート
              </h2>
              <p className="text-gray-700">{beer.description}</p>
            </div>

            {/* レビューを書くボタン */}
            <div className="mt-8">
              <Link
                href={`/reviews/new?beerId=${beer.id}`}
                className="btn btn-primary"
              >
                このビールのレビューを書く
              </Link>
            </div>
          </div>

          {/* 味わいプロファイル */}
          {beerStyle && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">味わいプロファイル</h2>

              <div className="grid gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>苦味</span>
                    <span>強い</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-amber-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (beerStyle.characteristics.bitterness / 5) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>甘味</span>
                    <span>強い</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-amber-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (beerStyle.characteristics.sweetness / 5) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>ボディ</span>
                    <span>重い</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-amber-600 h-2 rounded-full"
                      style={{
                        width: `${(beerStyle.characteristics.body / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">このスタイルについて</h3>
                <p>{beerStyle.description}</p>
              </div>
            </div>
          )}

          {/* レビューセクション (ダミー) */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">レビュー</h2>
              <Link
                href={`/reviews?beerId=${beer.id}`}
                className="btn btn-sm btn-link"
              >
                すべて見る
              </Link>
            </div>

            <div className="space-y-6">
              {/* ダミーレビュー */}
              {[1, 2].map((i) => (
                <div key={i} className="border-b pb-6 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                          <span>U{i}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">ユーザー{i}</p>
                        <div className="flex items-center">
                          {Array(5)
                            .fill(0)
                            .map((_, idx) => (
                              <svg
                                key={idx}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ${
                                  idx < 4 ? 'text-amber-500' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          <span className="text-xs text-gray-500 ml-1">
                            2023年10月12日
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700">
                    {i === 1
                      ? `香りが良くて飲みやすいビールです。甘みと苦みのバランスが絶妙で、夏の夕暮れに飲むのにぴったりでした。またリピートします。`
                      : `ホップの香りがしっかりと感じられて、苦味も適度です。個人的にはもう少し強めの味が好きですが、このスタイルとしては素晴らしいビールだと思います。`}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                href={`/reviews/new?beerId=${beer.id}`}
                className="btn btn-outline"
              >
                レビューを書く
              </Link>
            </div>
          </div>
        </div>

        {/* サイドバー */}
        <div className="lg:col-span-1">
          {/* ブルワリー情報 */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">ブルワリー</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                  <span>{beer.brewery.charAt(0)}</span>
                </div>
              </div>
              <h3 className="text-lg font-medium">{beer.brewery}</h3>
            </div>
            <Link
              href={`/breweries?name=${encodeURIComponent(beer.brewery)}`}
              className="btn btn-outline btn-sm w-full"
            >
              このブルワリーの商品を見る
            </Link>
          </div>

          {/* 類似ビール */}
          {similarBeers.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">類似のビール</h2>
              <div className="space-y-4">
                {similarBeers.map((similarBeer) => (
                  <Link
                    href={`/beers/${similarBeer.id}`}
                    key={similarBeer.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center">
                      {similarBeer.imageUrl ? (
                        <img
                          src={similarBeer.imageUrl}
                          alt={similarBeer.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-amber-800/30 text-xl">🍺</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{similarBeer.name}</h4>
                      <p className="text-sm text-gray-500">
                        {similarBeer.brewery}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
