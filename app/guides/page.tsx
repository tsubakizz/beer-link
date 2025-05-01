'use client';

import Link from 'next/link';

// ガイド項目のデータ
const guideItems = [
  {
    id: 'styles',
    title: 'ビールスタイル図鑑',
    description:
      'IPA、スタウト、ヴァイツェンなど様々なビールスタイルの特徴や味わいを解説します。',
    icon: '🍺',
    color: 'bg-amber-100',
    link: '/guides/styles',
  },
  {
    id: 'tasting',
    title: 'テイスティングガイド',
    description:
      'ビールの味わいを表現する言葉や、正しい飲み方、香りの感じ方などを紹介します。',
    icon: '👅',
    color: 'bg-green-100',
    link: '/guides/tasting',
  },
  {
    id: 'brewing',
    title: '醸造の基礎知識',
    description:
      'ビールがどのように作られているのか、原料や製法について解説します。',
    icon: '🌾',
    color: 'bg-yellow-100',
    link: '/guides/brewing',
  },
  {
    id: 'pairing',
    title: 'フードペアリング',
    description:
      'ビールと料理の組み合わせについて。スタイルごとの相性の良い料理を紹介します。',
    icon: '🍽️',
    color: 'bg-red-100',
    link: '/guides/pairing',
  },
  {
    id: 'beginners',
    title: '初心者向けガイド',
    description:
      'クラフトビールを初めて飲む方向けに、おすすめのビールや基礎知識を紹介します。',
    icon: '🔰',
    color: 'bg-blue-100',
    link: '/guides/beginners',
  },
  {
    id: 'beer-finder',
    title: '好みの診断ツール',
    description:
      '簡単な質問に答えるだけで、あなたの好みに合ったビールスタイルを診断します。',
    icon: '🔍',
    color: 'bg-purple-100',
    link: '/guides/beer-finder',
  },
];

export default function GuidesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">ビールガイド</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          クラフトビールの世界をより深く楽しむための情報を集めました。初心者の方も愛好家の方も、ぜひご活用ください。
        </p>
      </div>

      {/* ガイド項目一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {guideItems.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="card-body">
              <div
                className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-2xl mb-4`}
              >
                {item.icon}
              </div>
              <h2 className="card-title">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
              <div className="card-actions justify-end mt-4">
                <span className="btn btn-sm btn-primary">詳しく見る →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ビール初心者のための導入セクション */}
      <div className="bg-amber-50 rounded-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">
              クラフトビールを始めるなら
            </h2>
            <p className="mb-4">
              「クラフトビールって苦いんでしょ？」「何を選んだらいいかわからない」そんな疑問をお持ちの方は多いでしょう。
              実はクラフトビールには、フルーティな味わいのものや、チョコレートのような風味のもの、すっきり飲みやすいものなど
              様々な種類があります。
            </p>
            <p className="mb-6">
              ここでは、クラフトビールが初めての方でも楽しめる基礎知識や、初心者におすすめのビールをご紹介します。
              一緒にクラフトビールの魅力を探してみましょう。
            </p>
            <Link href="/guides/beginners" className="btn btn-primary">
              初心者ガイドを見る
            </Link>
          </div>
          <div className="w-full md:w-1/3 aspect-square rounded-lg bg-amber-200 flex items-center justify-center">
            <span className="text-6xl">🍻</span>
          </div>
        </div>
      </div>

      {/* よくある質問 */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">よくある質問</h2>

        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              クラフトビールと普通のビールの違いは何ですか？
            </div>
            <div className="collapse-content">
              <p>
                クラフトビールは、小規模な醸造所で職人（クラフトマン）によって丁寧に作られたビールを指します。大量生産のビールと比べて、より多様な原料や製法を用いて個性的な味わいを追求していることが特徴です。地域性や醸造家の個性が反映された、バリエーション豊かな味わいを楽しめます。
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              クラフトビールはどこで買えますか？
            </div>
            <div className="collapse-content">
              <p>
                近年ではスーパーマーケットやコンビニでも取り扱いが増えています。また、専門のビアショップやオンラインショップ、直接ブルワリーのタップルームなどで購入することができます。特に専門店では希少なビールや季節限定商品なども見つけられるでしょう。
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              クラフトビールの適切な保存方法は？
            </div>
            <div className="collapse-content">
              <p>
                クラフトビールは一般的に直射日光と高温を避け、冷暗所で保存するのが理想的です。多くのビールは冷蔵庫で保存すると風味が長持ちします。特にホップの香りが強いIPAなどは、新鮮なうちに飲むことをおすすめします。また、缶や瓶はなるべく立てて保存すると良いでしょう。
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              初心者におすすめのクラフトビールは？
            </div>
            <div className="collapse-content">
              <p>
                ビールが初めての方や、苦みが苦手な方には、小麦ビール（ヴァイツェン）やフルーティなペールエールがおすすめです。例えば「よなよなエール」「COEDO
                白」などは比較的飲みやすいでしょう。詳しくは「初心者向けガイド」ページをご覧ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
