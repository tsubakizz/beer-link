import React from 'react';
import BubbleDecoration from '@/src/app/components/BubbleDecoration';

export default function BrewingProcess() {
  return (
    <section id="process" className="mb-16 relative">
      <h2 className="text-2xl font-bold text-amber-800 mb-6">
        醸造プロセスの基本ステップ
      </h2>

      <div className="space-y-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg p-4 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <div className="text-3xl font-bold text-amber-800 mb-2">1</div>
            <h3 className="text-xl font-semibold text-center">
              麦芽の粉砕 (Milling)
            </h3>
          </div>
          <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <p>
              麦芽を粉砕して、内部のデンプンを露出させます。このステップでは、殻をあまり細かく砕きすぎないように注意します。
              殻はマッシングの際にろ過層として機能するためです。粉砕の程度はビールのスタイルや醸造設備によって調整されます。
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg p-4 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <div className="text-3xl font-bold text-amber-800 mb-2">2</div>
            <h3 className="text-xl font-semibold text-center">
              糖化 (Mashing)
            </h3>
          </div>
          <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <p>
              粉砕した麦芽を温水と混ぜ、一定の温度（通常60-70℃）に保ちます。この工程で、麦芽の酵素がデンプンを発酵可能な糖に分解します。
              温度や時間を変えることで、できあがるビールの特徴（ボディ感や発酵度など）を調整できます。
              例えば、より高い温度では、発酵しにくいデキストリンが多く生成され、ビールにボディ感が出ます。
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg p-4 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <div className="text-3xl font-bold text-amber-800 mb-2">3</div>
            <h3 className="text-xl font-semibold text-center">
              麦汁ろ過 (Lautering)
            </h3>
          </div>
          <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <p>
              糖化が終わると、液体部分（麦汁）と固体部分（モルトかす）を分離します。
              麦汁には発酵に必要な糖分やタンパク質、ミネラルが含まれています。
              ろ過後、スパージング（湯洗い）を行い、麦芽に残った糖分や風味成分を洗い出します。
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg p-4 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <div className="text-3xl font-bold text-amber-800 mb-2">4</div>
            <h3 className="text-xl font-semibold text-center">
              煮沸 (Boiling)
            </h3>
          </div>
          <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <p>
              麦汁を60-90分間煮沸します。この工程では主にホップを加え、ビールに苦味や香りを付与します。
              煮沸の初期に加えるホップは主に苦味を、終盤に加えるホップは香りを与えます（アロマホップ）。
              また、煮沸によって不要なタンパク質の凝固や、微生物の殺菌も行われます。
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg p-4 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <div className="text-3xl font-bold text-amber-800 mb-2">5</div>
            <h3 className="text-xl font-semibold text-center">
              冷却 (Cooling)
            </h3>
          </div>
          <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <p>
              煮沸後の高温の麦汁を、酵母投入に適した温度（エール酵母で約20℃、ラガー酵母で約10℃）まで
              急速に冷却します。この段階では、雑菌汚染を防ぐため、衛生管理が特に重要になります。
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg p-4 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <div className="text-3xl font-bold text-amber-800 mb-2">6</div>
            <h3 className="text-xl font-semibold text-center">
              発酵 (Fermentation)
            </h3>
          </div>
          <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <p>
              冷却した麦汁に酵母を加え、発酵を開始します。酵母は麦汁の糖を消費してアルコールと二酸化炭素を生成します。
              エール酵母は通常18-24℃の比較的高温で1-2週間発酵させます。ラガー酵母は8-12℃の低温で、
              数週間から数ヶ月かけてゆっくり発酵させます。発酵温度や期間はビールスタイルによって異なります。
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg p-4 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <div className="text-3xl font-bold text-amber-800 mb-2">7</div>
            <h3 className="text-xl font-semibold text-center">
              熟成 (Conditioning)
            </h3>
          </div>
          <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <p>
              発酵が完了したビールを低温で一定期間熟成させます。この期間に、風味が調和し、不要な化合物が減少します。
              ラガービールはより長い熟成期間（ラガリングと呼ばれる）が必要です。
              一部のビールスタイルでは、この段階でドライホッピング（冷蔵庫内でホップを漬け込む）を行い、芳香を付与します。
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg p-4 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
            <div className="text-3xl font-bold text-amber-800 mb-2">8</div>
            <h3 className="text-xl font-semibold text-center">
              パッケージング (Packaging)
            </h3>
          </div>
          <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <p>
              熟成が完了したビールをろ過し（一部のビールは意図的にろ過しない場合もある）、瓶、缶、樽などに充填します。
              この段階で、炭酸ガスの濃度調整や、瓶内二次発酵のための糖や酵母の添加を行うこともあります。
              充填後は、適切な温度で保管し、風味の安定化を待ちます。
            </p>
          </div>
        </div>
      </div>
      <BubbleDecoration count={4} className="opacity-20" />
    </section>
  );
}
