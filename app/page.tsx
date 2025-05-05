'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { beerStyles } from '@/src/app/lib/beers-data';
import { breweries } from '@/src/app/lib/breweries-data';
import { useEffect, useState, Suspense } from 'react';
import LoadingSpinner from '@/src/app/components/LoadingSpinner';

// メインのページコンテンツをラップするコンポーネント
function HomePageContent() {
  // 画面幅の状態を管理
  const [isMobileWidth, setIsMobileWidth] = useState(false);

  // 画面幅を監視するeffect
  useEffect(() => {
    // 初期状態の設定
    setIsMobileWidth(window.innerWidth <= 400);

    // リサイズイベントのハンドラー
    const handleResize = () => {
      setIsMobileWidth(window.innerWidth <= 400);
    };

    // イベントリスナーの設定
    window.addEventListener('resize', handleResize);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // データから値を取得
  const beerStylesCount = beerStyles.length;
  const breweriesCount = breweries.length;
  // 一意なビアスタイルカテゴリーを取得
  const beerCategories = new Set(
    beerStyles.map((style) => style.id.split('-')[0])
  );
  const beerCategoriesCount = beerCategories.size;
  // レビューの総数（ダミーデータ、実際は別のデータから取得するか計算する）
  const reviewsCount = 5000;

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 flex flex-col gap-12">
      {/* シンプル化したヒーローセクション */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-xl overflow-hidden mb-6 shadow-md"
        style={{ aspectRatio: isMobileWidth ? '3/4' : '430/200' }}
      >
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/keyvisual.png"
            alt="ビールのキービジュアル"
            fill
            priority
            className="object-cover object-right"
          />
        </div>
        <div className="relative z-10 px-5 py-6 md:py-10 flex flex-col items-start md:px-10 md:w-3/5">
          <div className="mb-2 md:mb-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-3 text-amber-900 drop-shadow-sm">
              Beer Link
            </h1>
          </div>
          <div>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-amber-800 drop-shadow-sm">
              知って繋がる、
              <br />
              ビールの楽しさ
            </h2>
          </div>
        </div>
      </motion.div>

      {/* 特徴カウンター - データ取得版 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="card bg-gradient-to-br from-amber-50 to-amber-100 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="card-body p-4 flex flex-row items-center">
            <div className="bg-amber-200 rounded-full p-2 mr-3">
              <svg
                className="w-6 h-6 text-amber-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-700">ビール情報</h3>
              <p className="text-xl font-bold text-amber-900">
                {beerStylesCount}+
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-amber-50 to-amber-100 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="card-body p-4 flex flex-row items-center">
            <div className="bg-amber-200 rounded-full p-2 mr-3">
              <svg
                className="w-6 h-6 text-amber-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-700">ブルワリー</h3>
              <p className="text-xl font-bold text-amber-900">
                {breweriesCount}+
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-amber-50 to-amber-100 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="card-body p-4 flex flex-row items-center">
            <div className="bg-amber-200 rounded-full p-2 mr-3">
              <svg
                className="w-6 h-6 text-amber-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-700">
                ビアスタイル
              </h3>
              <p className="text-xl font-bold text-amber-900">
                {beerCategoriesCount}+
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-amber-50 to-amber-100 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="card-body p-4 flex flex-row items-center">
            <div className="bg-amber-200 rounded-full p-2 mr-3">
              <svg
                className="w-6 h-6 text-amber-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-700">レビュー</h3>
              <p className="text-xl font-bold text-amber-900">
                {reviewsCount}+
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* クラフトビールの特徴紹介 - シンプル化 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="py-8"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-amber-900">
            クラフトビールの魅力
          </h3>
          <p className="text-amber-800 max-w-2xl mx-auto">
            大量生産のビールとは一線を画す、クラフトビールならではの特徴と体験をご紹介します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="card glass backdrop-blur-sm bg-white/70 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <figure className="px-5 pt-5 h-40 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <div className="text-4xl">🍺</div>
            </figure>
            <div className="card-body p-5">
              <h4 className="card-title text-amber-900 mb-2">多様な味わい</h4>
              <p className="text-amber-800 mb-3">
                フルーティーな香りから、スパイシーな刺激まで。クラフトビールは無限の味わいを提供します。あなたの好みに合う一杯が必ず見つかります。
              </p>
              <div className="card-actions justify-end mt-auto">
                <Link
                  href="/styles"
                  className="btn btn-sm bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
                >
                  ビアスタイル一覧
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="card glass backdrop-blur-sm bg-white/70 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <figure className="px-5 pt-5 h-40 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <div className="text-4xl">🏭</div>
            </figure>
            <div className="card-body p-5">
              <h4 className="card-title text-amber-900 mb-2">職人の技術</h4>
              <p className="text-amber-800 mb-3">
                大量生産ではなく、小規模で丁寧に。ブルワリーごとの個性と工夫が詰まった一杯です。作り手の情熱と技術を味わいましょう。
              </p>
              <div className="card-actions justify-end mt-auto">
                <Link
                  href="/breweries"
                  className="btn btn-sm bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
                >
                  ブルワリーを探す
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="card glass backdrop-blur-sm bg-white/70 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <figure className="px-5 pt-5 h-40 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <div className="text-4xl">🌍</div>
            </figure>
            <div className="card-body p-5">
              <h4 className="card-title text-amber-900 mb-2">
                カルチャーとコミュニティ
              </h4>
              <p className="text-amber-800 mb-3">
                クラフトビールは単なる飲み物ではなく、文化とコミュニティを形成しています。共有と発見の喜びを体験しましょう。
              </p>
              <div className="card-actions justify-end mt-auto">
                <Link
                  href="/guides"
                  className="btn btn-sm bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
                >
                  ガイドを見る
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
          </motion.div>
        </div>
      </motion.div>

      {/* 初心者ガイドへの導線 - シンプル化 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative rounded-lg overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 shadow-md mb-8"
      >
        <div className="relative z-10 flex flex-col md:flex-row gap-6 p-6 md:p-8">
          <div className="md:w-1/2">
            <div className="badge bg-amber-100 border-amber-200 text-amber-900 mb-3">
              初心者向け
            </div>
            <h3 className="text-2xl font-bold mb-4 text-amber-900">
              初めてのクラフトビール
            </h3>
            <p className="text-amber-800 mb-5 text-base leading-relaxed">
              「どれを選べばいいのかわからない」「苦くて飲めるか心配」そんな悩みはもう終わりです。
              クラフトビールの世界は広く、誰もが楽しめるビールが必ず見つかります。
              あなたの好みに合った一杯を見つけるお手伝いをします。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/beginners"
                className="btn bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
              >
                初心者ガイドを読む
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                href="/guides/beer-finder"
                className="btn btn-outline border-amber-300 text-amber-900 hover:bg-amber-100"
              >
                好みのビールを診断
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="card glass backdrop-blur-sm bg-white/70 rounded-lg overflow-hidden shadow-md">
              <div className="relative aspect-video bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <div className="text-5xl">🍻</div>
              </div>
              <div className="card-body p-5">
                <h4 className="card-title text-amber-900">
                  初めてのクラフトビール選び
                </h4>
                <p className="text-amber-800">
                  自分の味覚を理解して、好みのビールタイプを見つけるための簡単ガイド
                </p>
                <div className="card-actions justify-end mt-3">
                  <Link
                    href="/guides/beginners"
                    className="btn btn-sm bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
                  >
                    詳しく見る
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
            </div>
          </div>
        </div>
      </motion.div>

      {/* 最新のレビューセクション - データからの生成に修正 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="py-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-amber-900">最新のレビュー</h3>
          <Link
            href="/reviews"
            className="flex items-center gap-1 text-amber-700 hover:text-amber-900 font-medium"
          >
            すべて見る
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              name: '東京サンセットIPA',
              brewery: 'クラフト東京ブルワリー',
              style: 'IPA',
              description:
                'トロピカルなホップの香りと心地よい苦みが特徴の一杯。夕暮れのような琥珀色が美しい。',
              rating: 4.5,
              reviews: 12,
            },
            {
              name: '京都の和ヴァイツェン',
              brewery: '古都醸造所',
              style: 'ヴァイツェン',
              description:
                '柚子と山椒を使った和テイストのヴァイツェン。フルーティーな香りと爽やかなスパイス感が絶妙。',
              rating: 4.7,
              reviews: 8,
            },
            {
              name: '北海道ミルクスタウト',
              brewery: '雪国ビア',
              style: 'ミルクスタウト',
              description:
                '北海道産ミルクを使用した濃厚なスタウト。チョコレートとコーヒーのノートが広がる。',
              rating: 4.2,
              reviews: 15,
            },
            {
              name: '瀬戸内レモンセゾン',
              brewery: '島々ブルワリー',
              style: 'セゾン',
              description:
                '地元レモンを使った爽やかなセゾンビール。軽やかな飲み口で夏にぴったり。',
              rating: 4.3,
              reviews: 10,
            },
          ].map((beer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * (index % 8) + 0.6 }}
              className="card glass backdrop-blur-sm bg-white/70 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <figure className="h-36 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-100 flex items-center justify-center">
                  <div className="text-4xl">🍺</div>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="flex items-center gap-1 bg-amber-50/90 backdrop-blur-sm text-amber-900 rounded-full px-2 py-1 shadow-sm text-sm">
                    <svg
                      className="w-3 h-3 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold">{beer.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <div className="badge badge-sm bg-amber-50 border-amber-200 text-amber-900 font-medium shadow-sm">
                    {beer.style}
                  </div>
                </div>
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title text-base text-amber-900 line-clamp-1">
                  {beer.name}
                </h3>
                <p className="text-xs text-amber-700 mb-2 flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  {beer.brewery}
                </p>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {beer.description}
                </p>

                <div className="card-actions justify-between items-center mt-auto">
                  <div className="flex items-center gap-1 text-xs text-amber-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span>{beer.reviews}件</span>
                  </div>
                  <Link
                    href={`/beers/${index + 1}`}
                    className="btn btn-xs bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* シンプル化したコールトゥアクション */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative rounded-lg overflow-hidden bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 mb-6 shadow-md"
      >
        <div className="relative z-10 px-5 py-8 md:py-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-amber-900">
            あなたのクラフトビール体験を共有しませんか？
          </h3>
          <p className="text-amber-900 max-w-2xl mx-auto text-base mb-6">
            お気に入りのビールやブルワリーについて、他の愛好家と情報を共有してください。
            あなたの一言がきっと誰かの素敵な一杯につながります。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/reviews/new"
              className="btn bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
            >
              レビューを投稿する
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              href="/guides"
              className="btn btn-outline border-amber-900 text-amber-900 hover:bg-amber-100"
            >
              ガイドを見る
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// トップページコンポーネント
export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-16 px-4 sm:px-6 text-center">
          <LoadingSpinner size="large" message="ページを読み込み中..." />
        </div>
      }
    >
      <HomePageContent />
    </Suspense>
  );
}
