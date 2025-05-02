'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 flex flex-col gap-16">
      {/* ヒーローセクション（ビール図鑑スタイルに合わせる） */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300"
      >
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: '12px 12px',
            }}
          ></div>
        </div>

        <div className="relative z-10 px-6 py-12 md:py-16 flex flex-col md:flex-row items-center md:px-12">
          <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
            <div className="inline-block mb-4">
              <svg
                className="w-12 h-12 text-amber-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15 5.50002C15 5.23501 15.1054 4.98046 15.2929 4.7929C15.4804 4.60537 15.7348 4.50003 16 4.50003H19C19.2652 4.50003 19.5196 4.60537 19.7071 4.7929C19.8946 4.98046 20 5.23501 20 5.50002V7.50002C20 7.76503 19.8946 8.01958 19.7071 8.20711C19.5196 8.39464 19.2652 8.49998 19 8.49998H16C15.7348 8.49998 15.4804 8.39464 15.2929 8.20711C15.1054 8.01958 15 7.76503 15 7.50002V5.50002Z M11 4.50002C11 4.23501 11.1054 3.98046 11.2929 3.7929C11.4804 3.60537 11.7348 3.50003 12 3.50003H13C13.2652 3.50003 13.5196 3.60537 13.7071 3.7929C13.8946 3.98046 14 4.23501 14 4.50002V8.49998C14 8.76499 13.8946 9.01954 13.7071 9.20707C13.5196 9.3946 13.2652 9.49994 13 9.49994H12C11.7348 9.49994 11.4804 9.3946 11.2929 9.20707C11.1054 9.01954 11 8.76499 11 8.49998V4.50002Z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-amber-900 drop-shadow-sm">
              あなたの<span className="text-amber-700">完璧な一杯</span>を<br />
              見つける旅に出よう
            </h1>
            <p className="text-amber-900 max-w-2xl text-lg mb-8">
              初心者から愛好家まで、クラフトビールの多彩な味わいと物語を探求するコミュニティへようこそ。
              あなただけの特別なビールとの出会いをお手伝いします。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/guides/beginners"
                className="btn bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
              >
                クラフトビールを知る
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
                href="/beers"
                className="btn btn-outline border-amber-300 text-amber-900 hover:bg-amber-100"
              >
                ビールを探す
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <div className="absolute inset-0 rounded-full bg-amber-200 opacity-50 blur-lg"></div>
              <div className="relative flex items-center justify-center h-full text-6xl md:text-7xl">
                🍺
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 特徴カウンター（ビール図鑑スタイルに合わせる） */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        <div className="card bg-gradient-to-br from-amber-50 to-amber-100 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="card-body p-5 flex flex-row items-center">
            <div className="bg-amber-200 rounded-full p-3 mr-4">
              <svg
                className="w-8 h-8 text-amber-800"
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
              <p className="text-2xl font-bold text-amber-900">1,000+</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-amber-50 to-amber-100 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="card-body p-5 flex flex-row items-center">
            <div className="bg-amber-200 rounded-full p-3 mr-4">
              <svg
                className="w-8 h-8 text-amber-800"
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
              <p className="text-2xl font-bold text-amber-900">150+</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-amber-50 to-amber-100 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="card-body p-5 flex flex-row items-center">
            <div className="bg-amber-200 rounded-full p-3 mr-4">
              <svg
                className="w-8 h-8 text-amber-800"
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
              <p className="text-2xl font-bold text-amber-900">30+</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-amber-50 to-amber-100 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="card-body p-5 flex flex-row items-center">
            <div className="bg-amber-200 rounded-full p-3 mr-4">
              <svg
                className="w-8 h-8 text-amber-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-700">レビュー</h3>
              <p className="text-2xl font-bold text-amber-900">5,000+</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* クラフトビールの特徴紹介 - ビール図鑑スタイルに合わせる */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="py-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-900">
            クラフトビールの魅力
          </h2>
          <p className="text-amber-800 max-w-2xl mx-auto">
            大量生産のビールとは一線を画す、クラフトビールならではの特徴と体験をご紹介します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="card glass backdrop-blur-sm bg-white/70 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <figure className="px-6 pt-6 h-56 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-amber-400 opacity-20 blur-md"></div>
                <div className="relative w-full h-full flex items-center justify-center text-4xl">
                  🍺
                </div>
              </div>
            </figure>
            <div className="card-body p-6">
              <h3 className="card-title text-amber-900 mb-2">多様な味わい</h3>
              <p className="text-amber-800 mb-4">
                フルーティーな香りから、スパイシーな刺激まで。クラフトビールは無限の味わいを提供します。あなたの好みに合う一杯が必ず見つかります。
              </p>
              <div className="card-actions justify-end mt-auto">
                <Link
                  href="/guides/flavors"
                  className="btn btn-sm bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
                >
                  味わいを詳しく知る
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="card glass backdrop-blur-sm bg-white/70 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <figure className="px-6 pt-6 h-56 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-amber-400 opacity-20 blur-md"></div>
                <div className="relative w-full h-full flex items-center justify-center text-4xl">
                  🏭
                </div>
              </div>
            </figure>
            <div className="card-body p-6">
              <h3 className="card-title text-amber-900 mb-2">職人の技術</h3>
              <p className="text-amber-800 mb-4">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="card glass backdrop-blur-sm bg-white/70 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <figure className="px-6 pt-6 h-56 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-amber-400 opacity-20 blur-md"></div>
                <div className="relative w-full h-full flex items-center justify-center text-4xl">
                  🌍
                </div>
              </div>
            </figure>
            <div className="card-body p-6">
              <h3 className="card-title text-amber-900 mb-2">
                カルチャーとコミュニティ
              </h3>
              <p className="text-amber-800 mb-4">
                クラフトビールは単なる飲み物ではなく、文化とコミュニティを形成しています。共有と発見の喜びを体験しましょう。
              </p>
              <div className="card-actions justify-end mt-auto">
                <Link
                  href="/community"
                  className="btn btn-sm bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
                >
                  コミュニティに参加
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

      {/* 初心者ガイドへの導線 - ビール図鑑スタイル */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 shadow-md"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300 rounded-full opacity-10 transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 p-8 md:p-12">
          <div className="md:w-1/2">
            <div className="badge bg-amber-100 border-amber-200 text-amber-900 mb-4">
              初心者向け
            </div>
            <h2 className="text-3xl font-bold mb-6 text-amber-900">
              初めてのクラフトビール
            </h2>
            <p className="text-amber-800 mb-6 text-lg leading-relaxed">
              「どれを選べばいいのかわからない」「苦くて飲めるか心配」そんな悩みはもう終わりです。
              クラフトビールの世界は広く、誰もが楽しめるビールが必ず見つかります。
              あなたの好みに合った一杯を見つけるお手伝いをします。
            </p>
            <div className="flex flex-wrap gap-4">
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
            <div className="card glass backdrop-blur-sm bg-white/70 rounded-xl overflow-hidden shadow-md">
              <figure className="relative aspect-video bg-gradient-to-br from-amber-100 to-amber-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full bg-amber-400 opacity-20 blur-md"></div>
                    <div className="relative w-full h-full flex items-center justify-center text-5xl">
                      🍻
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-amber-200/50 to-transparent"></div>
              </figure>
              <div className="card-body p-6">
                <h3 className="card-title text-amber-900">
                  初めてのクラフトビール選び
                </h3>
                <p className="text-amber-800">
                  自分の味覚を理解して、好みのビールタイプを見つけるための簡単ガイド
                </p>
                <div className="card-actions justify-end mt-4">
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

      {/* 最新のレビューとおすすめ - ビール図鑑スタイル */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="py-10"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-amber-900">最新のレビュー</h2>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: '東京サンセットIPA',
              brewery: 'クラフト東京ブルワリー',
              style: 'IPA',
              description:
                'トロピカルなホップの香りと心地よい苦みが特徴の一杯。夕暮れのような琥珀色が美しい。',
              rating: 4.5,
            },
            {
              name: '京都の和ヴァイツェン',
              brewery: '古都醸造所',
              style: 'ヴァイツェン',
              description:
                '柚子と山椒を使った和テイストのヴァイツェン。フルーティーな香りと爽やかなスパイス感が絶妙。',
              rating: 4.7,
            },
            {
              name: '北海道ミルクスタウト',
              brewery: '雪国ビア',
              style: 'ミルクスタウト',
              description:
                '北海道産ミルクを使用した濃厚なスタウト。チョコレートとコーヒーのノートが広がる。',
              rating: 4.2,
            },
            {
              name: '瀬戸内レモンセゾン',
              brewery: '島々ブルワリー',
              style: 'セゾン',
              description:
                '地元レモンを使った爽やかなセゾンビール。軽やかな飲み口で夏にぴったり。',
              rating: 4.3,
            },
          ].map((beer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * (index % 8) + 0.6 }}
              className="card glass backdrop-blur-sm bg-white/70 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <figure className="h-52 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-100"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full bg-amber-400 opacity-20 blur-md"></div>
                    <div className="relative w-full h-full flex items-center justify-center text-4xl">
                      🍺
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1 bg-amber-50/90 backdrop-blur-sm text-amber-900 rounded-full px-2 py-1 shadow-sm">
                    <svg
                      className="w-4 h-4 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold">{beer.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <div className="badge badge-lg bg-amber-50 border-amber-200 text-amber-900 font-medium shadow-sm">
                    {beer.style}
                  </div>
                </div>
              </figure>
              <div className="card-body p-5">
                <h3 className="card-title text-xl text-amber-900 line-clamp-1">
                  {beer.name}
                </h3>
                <p className="text-sm text-amber-700 mb-2 flex items-center gap-1">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  {beer.brewery}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {beer.description}
                </p>

                <div className="card-actions justify-end mt-auto">
                  <div className="flex items-center gap-1 text-sm text-amber-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span>12件</span>
                  </div>
                  <Link
                    href={`/reviews/${index + 1}`}
                    className="btn btn-sm bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300 transition-all duration-300"
                  >
                    詳細を見る
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
          ))}
        </div>
      </motion.div>

      {/* コールトゥアクション - ビール図鑑スタイル */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 mb-8"
      >
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: '12px 12px',
            }}
          ></div>
        </div>

        {/* 泡の装飾 */}
        <div className="absolute inset-0 z-1 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/30"
              style={{
                width: `${Math.random() * 6 + 2}rem`,
                height: `${Math.random() * 6 + 2}rem`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 px-6 py-12 md:py-16 text-center">
          <div className="inline-block mb-6">
            <svg
              className="w-16 h-16 mx-auto text-amber-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-amber-900">
            あなたのクラフトビール体験を
            <br className="md:hidden" />
            共有しませんか？
          </h2>
          <p className="text-amber-900 max-w-2xl mx-auto text-lg mb-10">
            お気に入りのビールやブルワリーについて、他の愛好家と情報を共有してください。
            あなたの一言がきっと誰かの素敵な一杯につながります。Let's
            Beerコミュニティで、ビールの新たな魅力を一緒に発見しましょう。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
              href="/community/join"
              className="btn btn-outline border-amber-900 text-amber-900 hover:bg-amber-100"
            >
              コミュニティに参加する
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
