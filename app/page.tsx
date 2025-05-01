import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      {/* モダンなヒーローセクション */}
      <section className="hero min-h-[600px] rounded-3xl overflow-hidden relative bg-gradient-to-r from-secondary/90 via-secondary/80 to-primary/70">
        {/* 泡の装飾 */}
        <div className="absolute inset-0 z-10 overflow-hidden opacity-30">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/30"
              style={{
                width: `${Math.random() * 8 + 2}rem`,
                height: `${Math.random() * 8 + 2}rem`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5,
                filter: 'blur(1px)',
                transform: `scale(${Math.random() * 0.6 + 0.4})`,
              }}
            />
          ))}
        </div>

        <div className="hero-content text-center text-white relative z-20 flex-col lg:flex-row-reverse">
          <div className="absolute inset-y-0 right-0 w-full md:w-1/2 lg:w-2/5 z-0 opacity-20 md:opacity-70">
            <div className="relative w-full h-full">
              <div className="absolute right-0 bottom-0 w-full h-full bg-amber-300/50 rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4"></div>
            </div>
          </div>

          <div className="max-w-3xl text-left">
            <div className="badge badge-primary mb-4">
              クラフトビールの新しい発見
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              あなたの<span className="text-accent">完璧な一杯</span>を<br />
              見つける旅に出よう
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mb-10 leading-relaxed">
              初心者から愛好家まで、クラフトビールの多彩な味わいと物語を探求するコミュニティへようこそ。
              あなただけの特別なビールとの出会いをお手伝いします。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/guides/beginners"
                className="btn btn-primary btn-lg rounded-full"
              >
                クラフトビールを知る
              </Link>
              <Link
                href="/beers"
                className="btn btn-outline btn-primary btn-lg rounded-full"
              >
                ビールを探す
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴カウンター */}
      <section className="stats shadow bg-base-100 rounded-box">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">ビール情報</div>
          <div className="stat-value text-primary">1,000+</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">ブルワリー</div>
          <div className="stat-value text-secondary">150+</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">ビアスタイル</div>
          <div className="stat-value text-accent">30+</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">レビュー</div>
          <div className="stat-value text-primary">5,000+</div>
        </div>
      </section>

      {/* クラフトビールの特徴紹介 - モダンなカード */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">クラフトビールの魅力</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            大量生産のビールとは一線を画す、クラフトビールならではの特徴と体験をご紹介します。
          </p>
          <div className="divider max-w-xs mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <figure className="px-6 pt-6 h-64 bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-amber-400 opacity-20 blur-md transform group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative w-full h-full flex items-center justify-center text-4xl">
                  🍺
                </div>
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-primary-focus">多様な味わい</h3>
              <p className="text-gray-600">
                フルーティーな香りから、スパイシーな刺激まで。クラフトビールは無限の味わいを提供します。あなたの好みに合う一杯が必ず見つかります。
              </p>
              <div className="card-actions justify-end mt-4">
                <Link
                  href="/guides/flavors"
                  className="btn btn-primary btn-sm btn-outline"
                >
                  味わいを詳しく知る
                </Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <figure className="px-6 pt-6 h-64 bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-amber-400 opacity-20 blur-md transform group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative w-full h-full flex items-center justify-center text-4xl">
                  🏭
                </div>
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-primary-focus">職人の技術</h3>
              <p className="text-gray-600">
                大量生産ではなく、小規模で丁寧に。ブルワリーごとの個性と工夫が詰まった一杯です。作り手の情熱と技術を味わいましょう。
              </p>
              <div className="card-actions justify-end mt-4">
                <Link
                  href="/breweries"
                  className="btn btn-primary btn-sm btn-outline"
                >
                  ブルワリーを探す
                </Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <figure className="px-6 pt-6 h-64 bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-amber-400 opacity-20 blur-md transform group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative w-full h-full flex items-center justify-center text-4xl">
                  🌍
                </div>
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-primary-focus">
                カルチャーとコミュニティ
              </h3>
              <p className="text-gray-600">
                クラフトビールは単なる飲み物ではなく、文化とコミュニティを形成しています。共有と発見の喜びを体験しましょう。
              </p>
              <div className="card-actions justify-end mt-4">
                <Link
                  href="/community"
                  className="btn btn-primary btn-sm btn-outline"
                >
                  コミュニティに参加
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 初心者ガイドへの導線 - モダンなデザイン */}
      <section className="hero bg-base-200 rounded-3xl overflow-hidden relative">
        {/* 装飾的な丸 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300 rounded-full opacity-10 transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="hero-content flex-col md:flex-row gap-12 py-12">
          <div className="max-w-md">
            <div className="badge badge-primary mb-4">初心者向け</div>
            <h2 className="text-3xl font-bold mb-6">初めてのクラフトビール</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              「どれを選べばいいのかわからない」「苦くて飲めるか心配」そんな悩みはもう終わりです。
              クラフトビールの世界は広く、誰もが楽しめるビールが必ず見つかります。
              あなたの好みに合った一杯を見つけるお手伝いをします。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/guides/beginners"
                className="btn btn-primary rounded-full"
              >
                初心者ガイドを読む
              </Link>
              <Link
                href="/guides/beer-finder"
                className="btn btn-outline btn-primary rounded-full"
              >
                好みのビールを診断
              </Link>
            </div>
          </div>
          <div className="card w-full max-w-sm bg-base-100 shadow-xl">
            <figure className="relative aspect-video bg-amber-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl">🍻</div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-amber-200/50 to-transparent"></div>
            </figure>
            <div className="card-body">
              <h3 className="card-title">初めてのクラフトビール選び</h3>
              <p>
                自分の味覚を理解して、好みのビールタイプを見つけるための簡単ガイド
              </p>
              <div className="card-actions justify-end">
                <Link
                  href="/guides/beginners"
                  className="btn btn-primary btn-sm"
                >
                  詳しく見る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 最新のレビューとおすすめ - スタイリッシュなカード */}
      <section className="py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">最新のレビュー</h2>
          <Link href="/reviews" className="btn btn-link">
            すべて見る →
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
            <div key={index} className="card bg-base-100 shadow-xl">
              <figure className="h-48 bg-gradient-to-br from-amber-300 to-amber-100 flex items-center justify-center">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-white/30 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">
                    🍺
                  </div>
                </div>
              </figure>
              <div className="card-body">
                <div className="flex items-center justify-between mb-2">
                  <div className="badge badge-primary">{beer.style}</div>
                  <div className="flex items-center">
                    <div className="rating rating-sm">
                      <input
                        type="radio"
                        name={`rating-${index}`}
                        className="mask mask-star-2 bg-amber-400"
                        checked={beer.rating <= 1}
                        readOnly
                      />
                      <input
                        type="radio"
                        name={`rating-${index}`}
                        className="mask mask-star-2 bg-amber-400"
                        checked={beer.rating > 1 && beer.rating <= 2}
                        readOnly
                      />
                      <input
                        type="radio"
                        name={`rating-${index}`}
                        className="mask mask-star-2 bg-amber-400"
                        checked={beer.rating > 2 && beer.rating <= 3}
                        readOnly
                      />
                      <input
                        type="radio"
                        name={`rating-${index}`}
                        className="mask mask-star-2 bg-amber-400"
                        checked={beer.rating > 3 && beer.rating <= 4}
                        readOnly
                      />
                      <input
                        type="radio"
                        name={`rating-${index}`}
                        className="mask mask-star-2 bg-amber-400"
                        checked={beer.rating > 4}
                        readOnly
                      />
                    </div>
                    <span className="text-amber-500 font-bold ml-1 text-sm">
                      {beer.rating}
                    </span>
                  </div>
                </div>
                <h3 className="card-title text-primary-focus">{beer.name}</h3>
                <p className="text-amber-700 text-sm mb-3">{beer.brewery}</p>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {beer.description}
                </p>
                <div className="card-actions justify-end">
                  <Link
                    href={`/reviews/${index + 1}`}
                    className="btn btn-primary btn-sm btn-outline"
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* コールトゥアクション - スタイリッシュなデザイン */}
      <section className="hero rounded-3xl relative overflow-hidden bg-gradient-to-br from-secondary via-primary to-secondary">
        {/* 泡の装飾 */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/30"
              style={{
                width: `${Math.random() * 6 + 2}rem`,
                height: `${Math.random() * 6 + 2}rem`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>

        <div className="hero-content text-center text-white py-12 relative z-10">
          <div className="max-w-md">
            <div className="badge badge-accent mb-6">コミュニティ</div>
            <h2 className="text-3xl font-bold mb-6">
              あなたのクラフトビール体験を
              <br className="md:hidden" />
              共有しませんか？
            </h2>
            <p className="mb-10 leading-relaxed">
              お気に入りのビールやブルワリーについて、他の愛好家と情報を共有してください。
              あなたの一言がきっと誰かの素敵な一杯につながります。 Let's
              Beerコミュニティで、ビールの新たな魅力を一緒に発見しましょう。
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/reviews/new"
                className="btn bg-white text-primary hover:bg-base-200 border-white"
              >
                レビューを投稿する
              </Link>
              <Link
                href="/community/join"
                className="btn btn-outline text-white border-white hover:bg-white/10"
              >
                コミュニティに参加する
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
