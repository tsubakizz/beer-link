import React from 'react';
import BubbleDecoration from '@/BubbleDecoration';

export default function FlavorFactors() {
  return (
    <section id="factors" className="mb-16 relative">
      <h2 className="text-2xl font-bold text-amber-800 mb-6">
        風味に影響する要素
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-amber-700 mb-3">
            麦芽の選択
          </h3>
          <p>
            ベースモルト（ペールモルト、ピルスナーモルトなど）は主に発酵可能な糖を提供し、
            スペシャルティモルト（キャラメルモルト、チョコレートモルト、ローステッドバーレイなど）は
            色と風味の複雑さを加えます。例えば、キャラメルモルトはトフィーやキャラメルの風味を、
            ロースト麦芽はコーヒーや焼いたパンの風味を与えます。
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-amber-700 mb-3">
            ホップの使用方法
          </h3>
          <p>
            ホップの品種、使用量、添加タイミングがビールの苦味、風味、香りに大きく影響します。
            煮沸の初期に加えるビタリングホップは主に苦味を、終盤に加えるアロマホップは香りを提供します。
            また、発酵後にホップを漬け込むドライホッピングは、華やかな香りを最大限に引き出します。
            同じホップでも、使用方法によって全く異なる風味特性を引き出すことができます。
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-amber-700 mb-3">
            酵母の特性
          </h3>
          <p>
            酵母は単にアルコールを作るだけでなく、多様な風味化合物も生成します。
            エール酵母は一般的にフルーティーなエステル（バナナ、洋ナシなど）や
            スパイシーなフェノール（クローブ、こしょうなど）を生成します。
            ベルギービールの独特の風味の多くは酵母に由来しています。
            ワイルドイーストや乳酸菌は複雑な酸味やファンキーな風味を作り出します。
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-amber-700 mb-3">
            醸造技術
          </h3>
          <p>
            マッシングの温度と時間、煮沸時間、発酵温度、熟成期間などの醸造技術も
            ビールの最終的な風味に大きく影響します。例えば、高温のマッシングはビールに
            ボディ感をもたらしますが、低温ではよりドライなビールになります。
            発酵温度が高いとエステル生成が促進され、フルーティーな風味が強調されます。
          </p>
        </div>
      </div>
      <BubbleDecoration count={3} className="opacity-20" />
    </section>
  );
}
