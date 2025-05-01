'use client';

import Link from 'next/link';
import { beers, beerStyles } from '../../../src/app/lib/beers-data';

// 初心者におすすめのビールID
const recommendedBeerIds = [
  'yona-yona',
  'coedo-shiro',
  'suiyoubi-cat',
  'pilsner-urquell',
];

export default function BeginnersGuidePage() {
  // 初心者におすすめのビールを取得
  const recommendedBeers = beers.filter((beer) =>
    recommendedBeerIds.includes(beer.id)
  );

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">クラフトビール初心者ガイド</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          クラフトビールを始めてみたい方のために、基礎知識やおすすめのビールをご紹介します。
        </p>
      </div>

      {/* イントロダクションセクション */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">クラフトビールって何？</h2>
        <div className="prose max-w-none">
          <p>
            クラフトビールとは、主に小規模な醸造所で職人によって丁寧に作られたビールのことです。
            大量生産のビールと比べて、より多様な原料や製法を用いて、個性的な味わいを追求しています。
          </p>

          <p>
            クラフトビールの魅力は、その多様性にあります。フルーティーな香りのもの、コーヒーやチョコレートを思わせるもの、
            すっきりと飲みやすいもの、複雑な味わいが楽しめるものなど、様々なスタイルや味わいがあります。
          </p>

          <p>
            初めてクラフトビールを飲む方は「何を選べばいいのかわからない」「苦くて飲めないのでは？」という不安があるかもしれません。
            このガイドでは、クラフトビールを楽しむためのポイントや、初心者におすすめのビールをご紹介します。
          </p>
        </div>
      </div>

      {/* クラフトビールの基本用語 */}
      <div className="bg-amber-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">知っておきたい基本用語</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-white">
            <div className="card-body">
              <h3 className="card-title">ABV（アルコール度数）</h3>
              <p>
                Alcohol By Volume
                の略。ビールに含まれるアルコールの割合を示します。一般的なビールは4〜5%程度ですが、クラフトビールでは10%を超えるものもあります。
              </p>
            </div>
          </div>

          <div className="card bg-white">
            <div className="card-body">
              <h3 className="card-title">IBU（苦味指数）</h3>
              <p>
                International Bitterness Units
                の略。ビールの苦味を数値化したもの。数値が高いほど苦みが強いですが、甘みなど他の要素とのバランスも重要です。
              </p>
            </div>
          </div>

          <div className="card bg-white">
            <div className="card-body">
              <h3 className="card-title">ホップ</h3>
              <p>
                ビールに苦味や香りを与える植物。様々な種類があり、柑橘系、パイン、ハーブ、フローラルなど多様な香りや風味をビールにもたらします。
              </p>
            </div>
          </div>

          <div className="card bg-white">
            <div className="card-body">
              <h3 className="card-title">モルト</h3>
              <p>
                発芽させた穀物（主に大麦）を乾燥させたもの。ビールの甘みやコク、色合いの基になります。焙煎度合いによって風味や色が変わります。
              </p>
            </div>
          </div>

          <div className="card bg-white">
            <div className="card-body">
              <h3 className="card-title">エール</h3>
              <p>
                上面発酵で作られるビール。比較的温かい環境で発酵させるため、フルーティーで複雑な風味になりやすいです。IPA、ペールエール、スタウトなどが含まれます。
              </p>
            </div>
          </div>

          <div className="card bg-white">
            <div className="card-body">
              <h3 className="card-title">ラガー</h3>
              <p>
                下面発酵で作られるビール。低温でじっくり熟成させるため、クリーンでスッキリとした味わいが特徴です。ピルスナーなどが代表的です。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 初めてのクラフトビールの選び方 */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">
          初めてのクラフトビール - 選び方のポイント
        </h2>

        <div className="prose max-w-none">
          <p>
            クラフトビールを初めて飲む方には、以下のポイントを参考に選んでみることをおすすめします：
          </p>

          <h3>1. 自分の好みから考えてみる</h3>
          <p>
            コーヒーやチョコレートが好きな方は、スタウトやポーターなどの濃色ビールが好みに合うかもしれません。
            フルーティーな飲み物が好きな方は、フルーティーなIPAやヴァイツェン（小麦ビール）が合うかもしれません。
            すっきりとした味わいが好きな方は、ピルスナーやブロンドエールがおすすめです。
          </p>

          <h3>2. 苦みの強さに注目する</h3>
          <p>
            ビールの苦みが苦手な方は、IBU値が低めのビールを選ぶと良いでしょう。ヴァイツェン（小麦ビール）やフルーティなペールエールは
            比較的苦みが控えめで飲みやすいことが多いです。
          </p>

          <h3>3. アルコール度数をチェック</h3>
          <p>
            初めてなら、アルコール度数が低めのビール（4〜5%程度）から試すのがおすすめです。アルコール度数が高いビールは
            風味も強く感じられることがあるため、慣れてから挑戦すると良いでしょう。
          </p>

          <h3>4. 小さいサイズから試してみる</h3>
          <p>
            クラフトビールバーなどでは小さいサイズ（テイスティングサイズ）で提供していることも多いです。
            いろいろな種類を少しずつ試すことで、自分の好みを見つけることができます。
          </p>

          <h3>5. スタッフに相談する</h3>
          <p>
            専門店やクラフトビールバーでは、スタッフに好みや経験を伝えれば適切なビールを提案してくれることが多いです。
            「初めてなので飲みやすいものを」と伝えるのも良いでしょう。
          </p>
        </div>

        <div className="mt-8">
          <Link href="/guides/beer-finder" className="btn btn-primary">
            好みのビールを診断する
          </Link>
        </div>
      </div>

      {/* 初心者におすすめのビール */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          初心者におすすめのビール
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedBeers.map((beer) => (
            <div key={beer.id} className="card bg-base-100 shadow-lg">
              <figure className="relative h-40 bg-amber-100"></figure>
              <div className="card-body">
                <h3 className="card-title text-lg">{beer.name}</h3>
                <p className="text-sm text-gray-600">{beer.brewery}</p>
                <p className="text-sm line-clamp-3">{beer.description}</p>
                <div className="mt-2">
                  <div className="badge badge-outline mb-2">
                    {beerStyles.find((style) => style.id === beer.style)
                      ?.name || beer.style}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ABV: {beer.abv}%</span>
                    {beer.ibu && <span>IBU: {beer.ibu}</span>}
                  </div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link
                    href={`/beers/${beer.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/beers" className="btn btn-outline">
            もっとビールを探す
          </Link>
        </div>
      </div>

      {/* クラフトビールを楽しむコツ */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">クラフトビールを楽しむコツ</h2>

        <div className="prose max-w-none">
          <h3>適切な温度で飲む</h3>
          <p>
            ビールは冷たすぎると香りや味わいが感じにくくなります。クラフトビールは一般的に7〜10℃程度（冷蔵庫から出して5〜10分程度経ったくらい）で飲むのがおすすめです。
            ただし、スタイルによって最適な温度は異なります。スタウトのような濃色ビールはやや温度が高めでも美味しく飲めます。
          </p>

          <h3>香りを楽しむ</h3>
          <p>
            ビールの魅力は香りにもあります。グラスに注いだら、まず香りを楽しんでみましょう。ホップの香り、モルトの香り、
            フルーティな香りなど、様々な香りを感じ取ることができます。
          </p>

          <h3>適切なグラスを使う</h3>
          <p>
            可能であれば、ビールの種類に合ったグラスを使うとより香りや味わいを楽しめます。
            ただ、家庭では全てのビールスタイルに合わせたグラスを用意するのは難しいので、
            ワイングラスのような上部が少し狭まったグラスがあると、多くのビールに対応できて便利です。
          </p>

          <h3>料理と合わせる</h3>
          <p>
            ビールは食事と一緒に楽しむと、また違った魅力があります。ペアリングの基本としては、味の強さのバランスを考えると良いでしょう。
            たとえば、スパイシーな料理には苦みのあるIPAが、シーフードには爽やかなヴァイツェンが合うことが多いです。
          </p>

          <h3>記録をつける</h3>
          <p>
            飲んだビールの感想や評価を記録しておくと、自分の好みが分かるようになってきます。
            このサイトのレビュー機能を使って、あなたの感想をシェアしてみてください。
          </p>
        </div>
      </div>
    </div>
  );
}
