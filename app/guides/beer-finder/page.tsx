'use client';

import { useState, useEffect } from 'react';
import { beerStyles, beers } from '../../../src/app/lib/beers-data';
import Link from 'next/link';

// 質問のタイプ定義
type Question = {
  id: string;
  text: string;
  options: {
    value: number;
    label: string;
    description?: string;
  }[];
};

// 診断のための質問リスト
const questions: Question[] = [
  {
    id: 'bitterness',
    text: '苦味についてはどのくらい好きですか？',
    options: [
      {
        value: 1,
        label: '苦いのは苦手',
        description: '苦味はほとんど感じないものが好き',
      },
      {
        value: 2,
        label: '軽い苦味なら大丈夫',
        description: 'かすかな苦味は許容できる',
      },
      { value: 3, label: '普通', description: 'バランスの取れた苦味が好き' },
      {
        value: 4,
        label: '苦めが好き',
        description: 'はっきりとした苦味を楽しみたい',
      },
      {
        value: 5,
        label: '強い苦味が好き',
        description: '強烈な苦味を楽しむタイプ',
      },
    ],
  },
  {
    id: 'sweetness',
    text: '甘味についてはどうですか？',
    options: [
      {
        value: 1,
        label: '甘いのは苦手',
        description: 'ドライで甘くないものが好き',
      },
      {
        value: 2,
        label: 'やや控えめな甘さ',
        description: 'わずかな甘みがあるもの',
      },
      { value: 3, label: '普通', description: 'バランスの取れた甘みが好き' },
      {
        value: 4,
        label: '甘めが好き',
        description: 'はっきりとした甘みを感じたい',
      },
      {
        value: 5,
        label: '甘いものが好き',
        description: '豊かな甘みを楽しみたい',
      },
    ],
  },
  {
    id: 'body',
    text: 'ボディ（口当たりの重さ）はどうですか？',
    options: [
      {
        value: 1,
        label: 'とても軽いもの',
        description: 'さっぱりと軽快な飲み心地が好き',
      },
      {
        value: 2,
        label: 'やや軽め',
        description: '軽めだが少し存在感のあるもの',
      },
      { value: 3, label: '普通', description: '標準的な飲み応え' },
      {
        value: 4,
        label: 'やや重め',
        description: 'しっかりとした飲み応えのあるもの',
      },
      {
        value: 5,
        label: '濃厚なもの',
        description: '濃厚でリッチな味わいが好き',
      },
    ],
  },
  {
    id: 'flavor',
    text: 'どのような風味が好みですか？',
    options: [
      {
        value: 1,
        label: 'フルーティー',
        description: '果物のような爽やかな香りと味わい',
      },
      {
        value: 2,
        label: 'ハーバル/スパイシー',
        description: 'ハーブやスパイスのような風味',
      },
      {
        value: 3,
        label: 'モルティ',
        description: 'パンやビスケットのような麦芽の風味',
      },
      {
        value: 4,
        label: 'ローストした風味',
        description: 'コーヒーやチョコレートのようなロースト感',
      },
      {
        value: 5,
        label: '複雑な風味',
        description: '複数の風味が層になっているもの',
      },
    ],
  },
  {
    id: 'alcohol',
    text: 'アルコール度数はどのくらいがいいですか？',
    options: [
      {
        value: 1,
        label: '低め (4%以下)',
        description: '飲みやすい低アルコールのもの',
      },
      {
        value: 2,
        label: 'やや低め (4-5%)',
        description: '控えめなアルコール感',
      },
      { value: 3, label: '普通 (5-6%)', description: '標準的なアルコール度数' },
      {
        value: 4,
        label: 'やや高め (6-7%)',
        description: 'しっかりとしたアルコール感',
      },
      {
        value: 5,
        label: '高め (7%以上)',
        description: '強めのアルコールを感じるもの',
      },
    ],
  },
];

export default function BeerFinderPage() {
  // 状態管理
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState(false);
  const [recommendedStyles, setRecommendedStyles] = useState<typeof beerStyles>(
    []
  );
  const [recommendedBeers, setRecommendedBeers] = useState<typeof beers>([]);

  // 現在の質問
  const currentQuestion = questions[currentQuestionIndex];

  // 進行状況を計算 (例: 3/5 = 60%)
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  // 質問に回答時の処理
  const handleAnswer = (value: number) => {
    // 回答を記録
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    // 次の質問へ進むか、診断を完了
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 全質問回答完了
      setCompleted(true);
      calculateResults(newAnswers);
    }
  };

  // 前の質問に戻る処理
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // 診断をリセットする処理
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCompleted(false);
    setRecommendedStyles([]);
    setRecommendedBeers([]);
  };

  // 回答に基づいて結果を計算
  const calculateResults = (userAnswers: Record<string, number>) => {
    // 各ビールスタイルのスコアを計算
    const styleScores = beerStyles.map((style) => {
      let score = 0;

      // 苦味のマッチング (5段階評価から差を計算、差が小さいほど高スコア)
      const bitternessDiff = Math.abs(
        style.characteristics.bitterness - userAnswers.bitterness
      );
      score += (5 - bitternessDiff) * 2; // 苦味は重要なので2倍の重み付け

      // 甘さのマッチング
      const sweetnessDiff = Math.abs(
        style.characteristics.sweetness - userAnswers.sweetness
      );
      score += (5 - sweetnessDiff) * 1.5; // 甘さも重要な要素

      // ボディのマッチング
      const bodyDiff = Math.abs(style.characteristics.body - userAnswers.body);
      score += (5 - bodyDiff) * 1.5;

      // 風味の好みによるボーナススコア（簡易版）
      if (
        userAnswers.flavor === 1 &&
        ['ipa', 'wheat', 'pale-ale'].includes(style.id)
      ) {
        score += 3; // フルーティーな好みにはIPA、小麦ビール、ペールエールが合う
      } else if (
        userAnswers.flavor === 2 &&
        ['ipa', 'belgian'].includes(style.id)
      ) {
        score += 3; // ハーバル/スパイシーな好みにはIPA、ベルギービールが合う
      } else if (
        userAnswers.flavor === 3 &&
        ['pilsner', 'pale-ale'].includes(style.id)
      ) {
        score += 3; // モルティな好みにはピルスナー、ペールエールが合う
      } else if (
        userAnswers.flavor === 4 &&
        ['stout', 'porter'].includes(style.id)
      ) {
        score += 3; // ローストした風味はスタウト、ポーターが合う
      } else if (
        userAnswers.flavor === 5 &&
        ['belgian', 'stout'].includes(style.id)
      ) {
        score += 3; // 複雑な風味にはベルギービール、スタウトが合う
      }

      // アルコール度数のマッチング
      const alcoholScore =
        5 -
        Math.abs(
          Math.ceil(style.characteristics.alcohol / 2) - userAnswers.alcohol
        );
      score += alcoholScore;

      return {
        style,
        score,
      };
    });

    // スコアで並べ替えて上位3つを取得
    const sortedStyles = styleScores
      .sort((a, b) => b.score - a.score)
      .map((item) => item.style)
      .slice(0, 3);

    setRecommendedStyles(sortedStyles);

    // おすすめスタイルに基づいたビール例を探す
    const topStyleIds = sortedStyles.map((style) => style.id);
    const matchingBeers = beers
      .filter((beer) => topStyleIds.includes(beer.style))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);

    setRecommendedBeers(matchingBeers);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">好みのビール診断ツール</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          簡単な質問に答えるだけで、あなたの好みに合ったビールスタイルを見つけましょう。
        </p>
      </div>

      {!completed ? (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          {/* 進行状況バー */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>
                質問 {currentQuestionIndex + 1} / {questions.length}
              </span>
              <span>{Math.round(progressPercentage)}% 完了</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* 質問表示 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">{currentQuestion.text}</h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-amber-50 transition-colors flex justify-between items-center"
                  onClick={() => handleAnswer(option.value)}
                >
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-gray-600">
                        {option.description}
                      </div>
                    )}
                  </div>
                  <div className="text-amber-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ナビゲーションボタン */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="btn btn-outline btn-sm"
            >
              前の質問
            </button>
            <div className="text-sm text-gray-500">
              好みに最も近い選択肢を選んでください
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* 診断結果 */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              あなたにおすすめのビールスタイル
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recommendedStyles.map((style, index) => (
                <div
                  key={style.id}
                  className={`card ${
                    index === 0
                      ? 'bg-amber-50 border-amber-200 border-2'
                      : 'bg-base-100'
                  } shadow-lg`}
                >
                  <div className="card-body">
                    {index === 0 && (
                      <div className="absolute -top-3 -right-3 bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                    )}
                    <h3 className="card-title">{style.name}</h3>
                    <p className="text-sm">{style.description}</p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="w-20">苦味:</span>
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-full mx-0.5 ${
                                  i < style.characteristics.bitterness
                                    ? 'bg-amber-500'
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-20">甘み:</span>
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-full mx-0.5 ${
                                  i < style.characteristics.sweetness
                                    ? 'bg-amber-500'
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-20">ボディ:</span>
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-full mx-0.5 ${
                                  i < style.characteristics.body
                                    ? 'bg-amber-500'
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="card-actions justify-end mt-4">
                      <Link
                        href={`/beers?style=${style.id}`}
                        className="btn btn-sm btn-primary"
                      >
                        このスタイルを探す
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider">おすすめビール</div>

            {/* おすすめビール */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedBeers.map((beer) => (
                <div key={beer.id} className="card bg-base-100 shadow-sm">
                  <div className="h-32 bg-amber-100 flex items-center justify-center">
                    <span className="text-4xl">🍺</span>
                  </div>
                  <div className="card-body p-4">
                    <h3 className="font-bold">{beer.name}</h3>
                    <p className="text-xs text-gray-600">{beer.brewery}</p>
                    <div className="flex items-center mt-1">
                      <div className="badge badge-sm">
                        {beer.rating.toFixed(1)}
                      </div>
                      <span className="text-xs ml-1">
                        ({beer.reviewCount}件のレビュー)
                      </span>
                    </div>
                    <div className="card-actions justify-end mt-2">
                      <Link
                        href={`/beers/${beer.id}`}
                        className="btn btn-xs btn-outline"
                      >
                        詳細を見る
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 診断をやり直すボタン */}
            <div className="mt-8 text-center">
              <button onClick={handleReset} className="btn btn-outline">
                診断をやり直す
              </button>
            </div>
          </div>

          {/* 診断結果の説明 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">診断結果について</h2>
            <div className="prose max-w-none">
              <p>
                あなたの回答から、好みに合いそうなビールスタイルをいくつかピックアップしました。
                上記のおすすめスタイルから、気になるものを試してみてください。
              </p>
              <p>
                同じスタイルでも、醸造所によって味わいは大きく異なります。
                いろいろなブルワリーのビールを試して、お気に入りを見つけてみましょう。
              </p>
              <p>
                もし提案されたビールが好みに合わなかった場合は、診断をやり直すか、
                <Link
                  href="/guides/styles"
                  className="text-amber-600 hover:underline"
                >
                  ビールスタイル図鑑
                </Link>
                で他のスタイルも探してみてください。
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
