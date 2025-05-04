'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// 共通コンポーネントのインポート
import HeroSection from '../../../src/app/components/HeroSection';
import IntroductionSection from '../../../src/app/components/guides/IntroductionSection';
import GlossaryCard from '../../../src/app/components/guides/GlossaryCard'; // 用語解説カード
import SelectionTipsSection from '../../../src/app/components/guides/SelectionTipsSection'; // ビール選びのヒント
import BeerFinderCTA from '../../../src/app/components/guides/BeerFinderCTA';

// イントロダクションのコンテンツ (変更なし)
const introductionContent = (
  <>
    <p>
      ビールの世界へようこそ！「ビールって種類が多くて何から飲めばいいかわからない」「苦いのはちょっと苦手かも…」と感じている方もいるかもしれません。
      でも、心配はいりません。ビールには驚くほど多様な味わいがあり、きっとあなたのお気に入りが見つかるはずです。
    </p>
    <p>
      このページでは、ビールをこれから楽しみたいと考えている初心者の方に向けて、知っておくと役立つ基本的な用語や、自分に合ったビールの見つけ方をご紹介します。
      一緒にビールの魅力的な世界を探求しましょう！
    </p>
  </>
);

// ビールの基礎知識・用語解説コンテンツ
const basicKnowledgeContent = (
  <div className="space-y-6">
    {/* ラガーとエールの説明は残す */}
    <div className="bg-amber-50 p-5 rounded-lg shadow">
      <h3 className="text-xl font-bold text-amber-900 mb-3">
        まずは基本！ラガーとエール
      </h3>
      <p className="text-amber-800 mb-2">
        ビールは発酵方法の違いで大きく「ラガー」と「エール」に分けられます。味わいの傾向が異なるので、覚えておくとビール選びの参考になります。
      </p>
      <ul className="list-disc pl-6 space-y-1 text-amber-800">
        <li>
          <span className="font-semibold">ラガー (Lager):</span>{' '}
          低温でゆっくり発酵。すっきりクリアな味わい。日本の大手ビールに多い。（例：ピルスナー）
        </li>
        <li>
          <span className="font-semibold">エール (Ale):</span>{' '}
          常温に近い温度で発酵。香り豊かで複雑な味わい。（例：ペールエール、IPA）
        </li>
      </ul>
    </div>

    {/* 主要な用語解説 (props修正) */}
    <h3 className="text-xl font-bold text-amber-900 pt-4">
      知っておくと便利！ビール用語ミニ解説
    </h3>
    <div className="grid md:grid-cols-2 gap-4">
      <GlossaryCard
        title="ABV (Alcohol By Volume)"
        description="アルコール度数のこと。ビールの強さを示します。一般的なビールは4-6%程度ですが、10%を超えるものもあります。"
      />
      <GlossaryCard
        title="IBU (International Bitterness Units)"
        description="国際苦味単位。ビールの苦味の度合いを示す指標です。数値が高いほど苦味が強い傾向にありますが、感じ方は他の要素（甘みなど）にも影響されます。"
      />
      <GlossaryCard
        title="ボディ (Body)"
        description="口にしたときの飲みごたえや重さのこと。「ライトボディ（軽快）」「ミディアムボディ（中間）」「フルボディ（重厚）」のように表現されます。"
      />
      <GlossaryCard
        title="ホップ (Hop)"
        description="ビールの苦味や香りのもとになる植物。品種によって柑橘系、花、松のような香りなど、多様なキャラクターを与えます。"
      />
      <GlossaryCard
        title="麦芽 (Malt)"
        description="ビールの色、甘み、コクのもとになる大麦を発芽させたもの。焙煎度合いによって、淡い金色から黒色まで様々な色合いと風味を生み出します。"
      />
      <GlossaryCard
        title="スタイル (Style)"
        description="ビールの種類のこと。原料、製法、発祥地などによって分類され、それぞれ特徴的な味わいや香りがあります。（例：ピルスナー、IPA、スタウトなど）"
      />
      <GlossaryCard
        title="SRM (Standard Reference Method)"
        description="ビールの色度を示す単位。数値が低いほど淡い色（黄金色など）、高いほど濃い色（黒色など）になります。色からも味わいの傾向を推測できます。"
      />
    </div>
    <p className="text-sm text-amber-700 mt-2">
      これらの用語はビールのラベルや説明によく登場します。少しずつ覚えていくと、ビール選びがもっと楽しくなりますよ。
    </p>
  </div>
);

// ビール選びのヒント コンテンツ
const selectionTipsContent = (
  <ul className="space-y-4 list-disc pl-5">
    <li>
      <strong>まずは「ラガー」か「エール」か？</strong>
      <p className="ml-4">
        すっきりゴクゴク飲みたいなら「ラガー」、豊かな香りや味わいを楽しみたいなら「エール」から試してみるのがおすすめです。
      </p>
    </li>
    <li>
      <strong>苦味（IBU）をチェック！</strong>
      <p className="ml-4">
        苦いのが苦手な方は、IBUが低い（10〜20程度）ビールを選んでみましょう。ヴァイツェンやフルーツビールなどは苦味が穏やかな傾向があります。
      </p>
    </li>
    <li>
      <strong>好きな香りや風味で選ぶ</strong>
      <p className="ml-4">
        柑橘系の爽やかな香りが好きならホップの特徴が際立つペールエールやIPA、コーヒーやチョコレートのような香ばしさが好きならスタウトやポーターなどが良いかもしれません。
      </p>
    </li>
    <li>
      <strong>色（SRM）で選んでみる</strong>
      <p className="ml-4">
        淡い黄金色のビールはすっきり軽快、濃い色のビールはどっしりとした味わいの傾向があります。ビールの色を示す「SRM」という指標も参考にしてみましょう。
        <Link
          href="/guides/styles"
          className="text-amber-600 hover:underline ml-1"
        >
          スタイル図鑑
        </Link>
        では各スタイルのSRM目安も確認できます。
      </p>
    </li>
    <li>
      <strong>適正温度で味わいが変わる！</strong>
      <p className="ml-4">
        ビールは冷やしすぎると香りが感じにくくなり、温度が高すぎるとキレが悪くなることがあります。スタイルによって美味しく飲める温度帯は異なります。
        <Link
          href="/guides/styles"
          className="text-amber-600 hover:underline ml-1"
        >
          スタイル図鑑
        </Link>
        で推奨温度をチェックして、最高の状態で楽しんでみてください。
      </p>
    </li>
    <li>
      <strong>少量から試せるお店やセットを活用</strong>
      <p className="ml-4">
        ビアバーやブルワリーのタップルームでは、少量ずつ色々な種類を試せる「テイスティングセット」を提供していることがあります。色々なスタイルを飲み比べて、自分の好みを探るのに最適です。
      </p>
    </li>
  </ul>
);

export default function BeginnersGuidePage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      {/* ヒーローセクション */}
      <HeroSection
        title="ビール初心者ガイド"
        description="ビール選びが楽しくなる！基礎知識とあなた好みの一杯を見つけるヒント。"
      />

      {/* イントロダクションセクション */}
      <IntroductionSection
        title="ようこそ、奥深きビールの世界へ！"
        content={introductionContent}
      />

      {/* ビールの基礎知識 & 用語解説 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="my-12"
      >
        <h2 className="text-2xl font-bold text-amber-900 mb-6 border-l-4 border-amber-500 pl-4">
          これだけは押さえたい！ビールのキホン
        </h2>
        {basicKnowledgeContent}
      </motion.div>

      {/* 自分に合ったビールの探し方 */}
      <SelectionTipsSection
        title="あなた好みの一杯を見つけるヒント"
        content={selectionTipsContent}
      />

      {/* スタイル図鑑への誘導 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="my-12 text-center bg-amber-50 p-8 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-amber-900 mb-4">
          どんな種類があるの？ビールスタイル図鑑
        </h2>
        <p className="text-amber-800 mb-6 max-w-2xl mx-auto">
          世界には100種類以上のビアスタイルがあると言われています。ピルスナー、IPA、スタウト…
          それぞれどんな特徴があるのでしょうか？
          スタイル図鑑で、あなたの好みに合いそうなビールを探してみましょう！
        </p>
        <Link href="/guides/styles" className="btn btn-primary">
          ビールスタイル図鑑を見る
        </Link>
      </motion.div>

      {/* ビールを探すCTA */}
      <BeerFinderCTA />

      {/* 次のステップ (少し調整) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }} // delay調整
        className="my-12 text-center bg-amber-100 p-8 rounded-lg"
      >
        <h2 className="text-2xl font-bold text-amber-900 mb-4">
          さあ、ビールを楽しもう！
        </h2>
        <p className="text-amber-800 mb-6 max-w-2xl mx-auto">
          基本的な知識と探し方のヒントがわかったら、あとは実際に飲んでみるのが一番！
          色々なビールを試して、あなただけのお気に入りを見つけてくださいね。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/beers" className="btn btn-secondary">
            ビールを探してみる
          </Link>
          <Link href="/guides/tasting" className="btn btn-outline">
            テイスティング方法を学ぶ
          </Link>
          <Link href="/guides" className="btn btn-outline">
            他のガイドも見る
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
