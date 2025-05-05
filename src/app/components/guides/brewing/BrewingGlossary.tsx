import React from 'react';
import BubbleDecoration from '@/src/app/components/BubbleDecoration';

export default function BrewingGlossary() {
  return (
    <section id="glossary" className="mb-16 relative">
      <h2 className="text-2xl font-bold text-amber-800 mb-6">醸造用語集</h2>

      <div className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden">
        <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="p-3 hover:bg-amber-50 rounded-md transition-colors">
            <dt className="font-bold text-amber-700">
              IBU (International Bitterness Units)
            </dt>
            <dd className="mt-1">
              ビールの苦味を測定する単位。数値が高いほど苦味が強い。
            </dd>
          </div>

          <div className="p-3 hover:bg-amber-50 rounded-md transition-colors">
            <dt className="font-bold text-amber-700">OG (Original Gravity)</dt>
            <dd className="mt-1">
              発酵前の麦汁の糖度を示す指標。アルコール生成可能な量を示す。
            </dd>
          </div>

          <div className="p-3 hover:bg-amber-50 rounded-md transition-colors">
            <dt className="font-bold text-amber-700">FG (Final Gravity)</dt>
            <dd className="mt-1">
              発酵後の麦汁の糖度。OGとの差からアルコール度数を計算できる。
            </dd>
          </div>

          <div className="p-3 hover:bg-amber-50 rounded-md transition-colors">
            <dt className="font-bold text-amber-700">
              ABV (Alcohol By Volume)
            </dt>
            <dd className="mt-1">
              アルコール度数。ビール全体に占めるアルコールの割合。
            </dd>
          </div>

          <div className="p-3 hover:bg-amber-50 rounded-md transition-colors">
            <dt className="font-bold text-amber-700">ドライホッピング</dt>
            <dd className="mt-1">
              発酵後のビールにホップを漬け込み、芳香成分を抽出する技法。
            </dd>
          </div>

          <div className="p-3 hover:bg-amber-50 rounded-md transition-colors">
            <dt className="font-bold text-amber-700">アジュンクト</dt>
            <dd className="mt-1">
              麦芽以外の発酵性糖源（米、トウモロコシ、小麦、ハチミツなど）。
            </dd>
          </div>

          <div className="p-3 hover:bg-amber-50 rounded-md transition-colors">
            <dt className="font-bold text-amber-700">瓶内二次発酵</dt>
            <dd className="mt-1">
              瓶詰め時に糖と酵母を加え、瓶内で炭酸ガスを生成する方法。
            </dd>
          </div>

          <div className="p-3 hover:bg-amber-50 rounded-md transition-colors">
            <dt className="font-bold text-amber-700">混濁度</dt>
            <dd className="mt-1">
              ビールの濁りの度合い。スタイルによっては混濁が望ましい場合も。
            </dd>
          </div>

          <div className="p-3 hover:bg-amber-50 rounded-md transition-colors">
            <dt className="font-bold text-amber-700">
              SRM (Standard Reference Method)
            </dt>
            <dd className="mt-1">
              ビールの色の濃さを示す単位。数値が高いほど色が濃い。
            </dd>
          </div>

          <div className="p-3 hover:bg-amber-50 rounded-md transition-colors">
            <dt className="font-bold text-amber-700">
              EBC (European Brewery Convention)
            </dt>
            <dd className="mt-1">
              ヨーロッパでのビールの色度単位。SRMの約2倍の値になる。
            </dd>
          </div>
        </dl>
        <BubbleDecoration count={4} className="opacity-10" />
      </div>
    </section>
  );
}
