import React from 'react';

export default function BrewingComparison() {
  return (
    <section id="craftdifference" className="mb-16">
      <h2 className="text-2xl font-bold text-amber-800 mb-6">
        クラフトビールと大量生産ビールの違い
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gradient-to-r from-amber-100 to-amber-200">
            <tr>
              <th className="px-6 py-4 text-left text-amber-800 font-bold">
                要素
              </th>
              <th className="px-6 py-4 text-left text-amber-800 font-bold">
                クラフトビール
              </th>
              <th className="px-6 py-4 text-left text-amber-800 font-bold">
                大量生産ビール
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-amber-50 transition-colors">
              <td className="px-6 py-4 font-medium">規模</td>
              <td className="px-6 py-4">
                小規模・中規模（年間生産量は限定的）
              </td>
              <td className="px-6 py-4">大規模（年間数百万～数千万バレル）</td>
            </tr>
            <tr className="hover:bg-amber-50 transition-colors">
              <td className="px-6 py-4 font-medium">原材料</td>
              <td className="px-6 py-4">
                高品質な麦芽、様々な特殊麦芽、多様なホップ品種
              </td>
              <td className="px-6 py-4">
                コスト効率の高い原材料、コーンやライスなどの副原料使用も
              </td>
            </tr>
            <tr className="hover:bg-amber-50 transition-colors">
              <td className="px-6 py-4 font-medium">革新性</td>
              <td className="px-6 py-4">
                常に新しいレシピや技術を実験、ユニークな原材料の使用
              </td>
              <td className="px-6 py-4">
                一貫した製品を大量に生産することに焦点
              </td>
            </tr>
            <tr className="hover:bg-amber-50 transition-colors">
              <td className="px-6 py-4 font-medium">生産プロセス</td>
              <td className="px-6 py-4">
                手作業の要素が多い、ブリュワーの技術に大きく依存
              </td>
              <td className="px-6 py-4">高度に自動化、一貫性と効率性を重視</td>
            </tr>
            <tr className="hover:bg-amber-50 transition-colors">
              <td className="px-6 py-4 font-medium">風味プロファイル</td>
              <td className="px-6 py-4">
                複雑で多様、個性的でインパクトのある風味
              </td>
              <td className="px-6 py-4">
                より穏やかでアクセスしやすい風味、地域ごとの変動は少ない
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-gray-600 italic">
        ※これは一般的な傾向であり、例外も多く存在します。優れた大量生産ビールや、質の低いクラフトビールもあります。
      </p>
    </section>
  );
}
