'use client';

import { motion } from 'framer-motion';

export default function StyleInformation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mt-16 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-amber-900 border-l-4 border-amber-500 pl-4">
        ビールスタイルについて
      </h2>

      <div className="prose max-w-none text-amber-900">
        <p>
          ビールスタイルとは、世界各地で発展してきたビールの種類やタイプを分類したものです。それぞれのスタイルには、独自の歴史、製法、味わいの特徴があります。
        </p>

        <h3 className="text-amber-800">スタイルの基本的な分類</h3>
        <p>
          ビールは大きく分けて「エール」と「ラガー」に分類されます。エールは比較的高温で発酵させるビールで、フルーティーな香りや複雑な味わいが特徴です。一方、ラガーは低温でじっくり発酵・熟成させるビールで、クリーンでスッキリとした味わいになります。
        </p>

        <h3 className="text-amber-800">味わいを決める要素</h3>
        <ul className="text-amber-800">
          <li>
            <strong>ホップ</strong>
            ：ビールに苦味と香りを与える植物。IPAなどホップ主体のビールでは、柑橘系やハーブ、パイン、フローラルといった様々な香りをもたらします。
          </li>
          <li>
            <strong>麦芽</strong>
            ：ビールの主原料で、甘味やコク、色の濃さを決定します。焙煎度合いによって、パンのような香りからチョコレート、コーヒーのような風味まで様々です。
          </li>
          <li>
            <strong>酵母</strong>
            ：発酵を担う微生物で、ビールの香りやフレーバーに大きな影響を与えます。特にベルギースタイルでは、酵母由来のフルーティーでスパイシーな風味が特徴的です。
          </li>
          <li>
            <strong>水</strong>
            ：ビールの約90%を占める水は、硬水・軟水などの特性によって、最終的な味わいに影響します。
          </li>
        </ul>

        <h3 className="text-amber-800">自分の好みを見つけるには</h3>
        <p>
          ビールスタイルを知ることは、自分の好みを見つける手助けになります。苦いのが苦手な方は、小麦ビールやフルーティなサワーから始めるのがおすすめです。濃い味わいが好きな方はスタウトやポーターなどの黒ビールがおすすめです。様々なスタイルのビールを試して、あなたの好みを発見してください。
        </p>
      </div>
    </motion.div>
  );
}
