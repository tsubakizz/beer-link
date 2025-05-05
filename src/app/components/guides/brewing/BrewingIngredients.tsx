import React from 'react';
import BubbleDecoration from '@/BubbleDecoration';

export default function BrewingIngredients() {
  return (
    <section id="ingredients" className="mb-16 relative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">
          ビールの4大原料
        </h2>
        <p className="mb-6">
          ビールは主に4つの原料から作られます。これらの原料の品質や組み合わせがビールの風味を決定づけます。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-amber-700 mb-3">
            麦芽 (Malt)
          </h3>
          <p>
            発芽させた大麦（麦芽）は、ビールの主な原料です。麦芽はアミラーゼという酵素を含み、デンプンを
            発酵可能な糖に変換します。麦芽の種類や焙煎度によって、ビールの色や風味が大きく変わります。
            軽く焙煎したペールモルトは淡い色と穏やかな風味を、濃く焙煎したダークモルトはコーヒーやチョコレートのような風味を持ちます。
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-amber-700 mb-3">
            ホップ (Hops)
          </h3>
          <p>
            ホップはビールに苦味と香りを与える重要な原料です。ホップには天然の防腐剤の役割もあります。
            様々な品種があり、それぞれ独特の風味特性を持っています。例えば、アメリカンホップは柑橘系やパイン、
            トロピカルな香りを、ヨーロピアンホップはスパイシーやフローラルな特徴を持ちます。
            ホップをいつ、どのように加えるかによっても、ビールの苦さや香りは大きく変わります。
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-amber-700 mb-3">
            水 (Water)
          </h3>
          <p>
            ビールの約90%以上は水です。水の硬度やミネラル含有量はビールの風味に大きな影響を与えます。
            歴史的に、地域ごとのビールスタイルの違いは、その地域の水質に大きく依存していました。
            例えば、チェコのピルゼンは軟水を使用することで、クリアでスムースなピルスナーが生まれました。
            一方、イギリスのバートンの硬水は、バランスの取れたペールエールの醸造に適していました。
            現代のブルワリーでは、水質を調整して理想的なプロファイルを作り出すことが一般的です。
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-xl font-semibold text-amber-700 mb-3">
            酵母 (Yeast)
          </h3>
          <p>
            酵母はビール醸造においてもっとも重要な要素の一つで、糖をアルコールと二酸化炭素に変換します。
            主に「エール酵母（上面発酵）」と「ラガー酵母（下面発酵）」の2つのタイプがあります。
            エール酵母は高温で発酵し、フルーティーでエステリーな風味を作り出す傾向があります。
            一方、ラガー酵母は低温でゆっくり発酵し、クリーンでクリスプな風味特性をビールに与えます。
            ワイルドイースト（野生酵母）や乳酸菌を使用する特殊なスタイルもあります。
          </p>
        </div>
      </div>
      <BubbleDecoration count={5} className="opacity-20" />
    </section>
  );
}
