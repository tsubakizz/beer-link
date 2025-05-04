import Link from 'next/link';

export const metadata = {
  title: "醸造の基礎知識 - Beer Link",
  description:
    'クラフトビールの醸造プロセスや基本的な知識を初心者にもわかりやすく解説します。',
};

export default function BrewingGuidePage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* ページヘッダー */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
          醸造の基礎知識
        </h1>
        <p className="text-lg text-gray-600">
          クラフトビールが出来上がるまでの工程と、醸造における重要なポイントを解説します
        </p>
      </div>

      {/* イントロダクション */}
      <section className="mb-12">
        <div className="prose max-w-none">
          <p className="text-lg">
            クラフトビールの魅力は、その多様な味わいと個性にあります。この多様性を生み出すのが「醸造」というプロセスです。
            醸造のステップや使用する原材料によって、ビールの風味は大きく変わります。
            このページでは、ビール醸造の基本的なプロセスと、美味しいビールを作るための重要なポイントを紹介します。
          </p>
        </div>
      </section>

      {/* 目次 */}
      <section className="mb-12 p-6 bg-amber-50 rounded-lg">
        <h2 className="text-xl font-bold text-amber-800 mb-4">
          このページの内容
        </h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="mr-2 text-amber-600">•</span>
            <a href="#ingredients" className="hover:text-amber-600">
              ビールの4大原料
            </a>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-amber-600">•</span>
            <a href="#process" className="hover:text-amber-600">
              醸造プロセスの基本ステップ
            </a>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-amber-600">•</span>
            <a href="#factors" className="hover:text-amber-600">
              風味に影響する要素
            </a>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-amber-600">•</span>
            <a href="#craftdifference" className="hover:text-amber-600">
              クラフトビールと大量生産ビールの違い
            </a>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-amber-600">•</span>
            <a href="#glossary" className="hover:text-amber-600">
              醸造用語集
            </a>
          </li>
        </ul>
      </section>

      {/* ビールの原料 */}
      <section id="ingredients" className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">
            ビールの4大原料
          </h2>
          <p className="mb-6">
            ビールは主に4つの原料から作られます。これらの原料の品質や組み合わせがビールの風味を決定づけます。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-amber-700 mb-3">
              麦芽 (Malt)
            </h3>
            <p>
              発芽させた大麦（麦芽）は、ビールの主な原料です。麦芽はアミラーゼという酵素を含み、デンプンを
              発酵可能な糖に変換します。麦芽の種類や焙煎度によって、ビールの色や風味が大きく変わります。
              軽く焙煎したペールモルトは淡い色と穏やかな風味を、濃く焙煎したダークモルトはコーヒーやチョコレートのような風味を持ちます。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
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

          <div className="bg-white p-6 rounded-lg shadow-md">
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

          <div className="bg-white p-6 rounded-lg shadow-md">
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
      </section>

      {/* 醸造プロセス */}
      <section id="process" className="mb-16">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">
          醸造プロセスの基本ステップ
        </h2>

        <div className="space-y-10">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 bg-amber-100 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-amber-800 mb-2">1</div>
              <h3 className="text-xl font-semibold text-center">
                麦芽の粉砕 (Milling)
              </h3>
            </div>
            <div className="md:w-2/3">
              <p>
                麦芽を粉砕して、内部のデンプンを露出させます。このステップでは、殻をあまり細かく砕きすぎないように注意します。
                殻はマッシングの際にろ過層として機能するためです。粉砕の程度はビールのスタイルや醸造設備によって調整されます。
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 bg-amber-100 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-amber-800 mb-2">2</div>
              <h3 className="text-xl font-semibold text-center">
                糖化 (Mashing)
              </h3>
            </div>
            <div className="md:w-2/3">
              <p>
                粉砕した麦芽を温水と混ぜ、一定の温度（通常60-70℃）に保ちます。この工程で、麦芽の酵素がデンプンを発酵可能な糖に分解します。
                温度や時間を変えることで、できあがるビールの特徴（ボディ感や発酵度など）を調整できます。
                例えば、より高い温度では、発酵しにくいデキストリンが多く生成され、ビールにボディ感が出ます。
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 bg-amber-100 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-amber-800 mb-2">3</div>
              <h3 className="text-xl font-semibold text-center">
                麦汁ろ過 (Lautering)
              </h3>
            </div>
            <div className="md:w-2/3">
              <p>
                糖化が終わると、液体部分（麦汁）と固体部分（モルトかす）を分離します。
                麦汁には発酵に必要な糖分やタンパク質、ミネラルが含まれています。
                ろ過後、スパージング（湯洗い）を行い、麦芽に残った糖分や風味成分を洗い出します。
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 bg-amber-100 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-amber-800 mb-2">4</div>
              <h3 className="text-xl font-semibold text-center">
                煮沸 (Boiling)
              </h3>
            </div>
            <div className="md:w-2/3">
              <p>
                麦汁を60-90分間煮沸します。この工程では主にホップを加え、ビールに苦味や香りを付与します。
                煮沸の初期に加えるホップは主に苦味を、終盤に加えるホップは香りを与えます（アロマホップ）。
                また、煮沸によって不要なタンパク質の凝固や、微生物の殺菌も行われます。
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 bg-amber-100 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-amber-800 mb-2">5</div>
              <h3 className="text-xl font-semibold text-center">
                冷却 (Cooling)
              </h3>
            </div>
            <div className="md:w-2/3">
              <p>
                煮沸後の高温の麦汁を、酵母投入に適した温度（エール酵母で約20℃、ラガー酵母で約10℃）まで
                急速に冷却します。この段階では、雑菌汚染を防ぐため、衛生管理が特に重要になります。
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 bg-amber-100 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-amber-800 mb-2">6</div>
              <h3 className="text-xl font-semibold text-center">
                発酵 (Fermentation)
              </h3>
            </div>
            <div className="md:w-2/3">
              <p>
                冷却した麦汁に酵母を加え、発酵を開始します。酵母は麦汁の糖を消費してアルコールと二酸化炭素を生成します。
                エール酵母は通常18-24℃の比較的高温で1-2週間発酵させます。ラガー酵母は8-12℃の低温で、
                数週間から数ヶ月かけてゆっくり発酵させます。発酵温度や期間はビールスタイルによって異なります。
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 bg-amber-100 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-amber-800 mb-2">7</div>
              <h3 className="text-xl font-semibold text-center">
                熟成 (Conditioning)
              </h3>
            </div>
            <div className="md:w-2/3">
              <p>
                発酵が完了したビールを低温で一定期間熟成させます。この期間に、風味が調和し、不要な化合物が減少します。
                ラガービールはより長い熟成期間（ラガリングと呼ばれる）が必要です。
                一部のビールスタイルでは、この段階でドライホッピング（冷蔵庫内でホップを漬け込む）を行い、芳香を付与します。
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 bg-amber-100 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-amber-800 mb-2">8</div>
              <h3 className="text-xl font-semibold text-center">
                パッケージング (Packaging)
              </h3>
            </div>
            <div className="md:w-2/3">
              <p>
                熟成が完了したビールをろ過し（一部のビールは意図的にろ過しない場合もある）、瓶、缶、樽などに充填します。
                この段階で、炭酸ガスの濃度調整や、瓶内二次発酵のための糖や酵母の添加を行うこともあります。
                充填後は、適切な温度で保管し、風味の安定化を待ちます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 風味に影響する要素 */}
      <section id="factors" className="mb-16">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">
          風味に影響する要素
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
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

          <div className="bg-white p-6 rounded-lg shadow-md">
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

          <div className="bg-white p-6 rounded-lg shadow-md">
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

          <div className="bg-white p-6 rounded-lg shadow-md">
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
      </section>

      {/* クラフトビールと大量生産ビールの違い */}
      <section id="craftdifference" className="mb-16">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">
          クラフトビールと大量生産ビールの違い
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-amber-100">
              <tr>
                <th className="px-6 py-3 text-left text-amber-800">要素</th>
                <th className="px-6 py-3 text-left text-amber-800">
                  クラフトビール
                </th>
                <th className="px-6 py-3 text-left text-amber-800">
                  大量生産ビール
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 font-medium">規模</td>
                <td className="px-6 py-4">
                  小規模・中規模（年間生産量は限定的）
                </td>
                <td className="px-6 py-4">
                  大規模（年間数百万～数千万バレル）
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">原材料</td>
                <td className="px-6 py-4">
                  高品質な麦芽、様々な特殊麦芽、多様なホップ品種
                </td>
                <td className="px-6 py-4">
                  コスト効率の高い原材料、コーンやライスなどの副原料使用も
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">革新性</td>
                <td className="px-6 py-4">
                  常に新しいレシピや技術を実験、ユニークな原材料の使用
                </td>
                <td className="px-6 py-4">
                  一貫した製品を大量に生産することに焦点
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">生産プロセス</td>
                <td className="px-6 py-4">
                  手作業の要素が多い、ブリュワーの技術に大きく依存
                </td>
                <td className="px-6 py-4">
                  高度に自動化、一貫性と効率性を重視
                </td>
              </tr>
              <tr>
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

      {/* 醸造用語集 */}
      <section id="glossary" className="mb-12">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">醸造用語集</h2>

        <div className="bg-white rounded-lg shadow-md p-6">
          <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <dt className="font-bold text-amber-700">
                IBU (International Bitterness Units)
              </dt>
              <dd className="mt-1">
                ビールの苦味を測定する単位。数値が高いほど苦味が強い。
              </dd>
            </div>

            <div>
              <dt className="font-bold text-amber-700">
                OG (Original Gravity)
              </dt>
              <dd className="mt-1">
                発酵前の麦汁の糖度を示す指標。アルコール生成可能な量を示す。
              </dd>
            </div>

            <div>
              <dt className="font-bold text-amber-700">FG (Final Gravity)</dt>
              <dd className="mt-1">
                発酵後の麦汁の糖度。OGとの差からアルコール度数を計算できる。
              </dd>
            </div>

            <div>
              <dt className="font-bold text-amber-700">
                ABV (Alcohol By Volume)
              </dt>
              <dd className="mt-1">
                アルコール度数。ビール全体に占めるアルコールの割合。
              </dd>
            </div>

            <div>
              <dt className="font-bold text-amber-700">ドライホッピング</dt>
              <dd className="mt-1">
                発酵後のビールにホップを漬け込み、芳香成分を抽出する技法。
              </dd>
            </div>

            <div>
              <dt className="font-bold text-amber-700">アジュンクト</dt>
              <dd className="mt-1">
                麦芽以外の発酵性糖源（米、トウモロコシ、小麦、ハチミツなど）。
              </dd>
            </div>

            <div>
              <dt className="font-bold text-amber-700">瓶内二次発酵</dt>
              <dd className="mt-1">
                瓶詰め時に糖と酵母を加え、瓶内で炭酸ガスを生成する方法。
              </dd>
            </div>

            <div>
              <dt className="font-bold text-amber-700">混濁度</dt>
              <dd className="mt-1">
                ビールの濁りの度合い。スタイルによっては混濁が望ましい場合も。
              </dd>
            </div>

            <div>
              <dt className="font-bold text-amber-700">
                SRM (Standard Reference Method)
              </dt>
              <dd className="mt-1">
                ビールの色の濃さを示す単位。数値が高いほど色が濃い。
              </dd>
            </div>

            <div>
              <dt className="font-bold text-amber-700">
                EBC (European Brewery Convention)
              </dt>
              <dd className="mt-1">
                ヨーロッパでのビールの色度単位。SRMの約2倍の値になる。
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 関連ガイドへのリンク */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">関連ガイド</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/guides/styles"
            className="bg-amber-50 rounded-lg p-6 hover:bg-amber-100 transition-colors"
          >
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              ビアスタイルガイド
            </h3>
            <p>代表的なビールスタイルの特徴と味わいを解説します</p>
          </Link>

          <Link
            href="/guides/beginners"
            className="bg-amber-50 rounded-lg p-6 hover:bg-amber-100 transition-colors"
          >
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              初心者ガイド
            </h3>
            <p>クラフトビール入門者のための基本知識とおすすめビール</p>
          </Link>

          <Link
            href="/guides/beer-finder"
            className="bg-amber-50 rounded-lg p-6 hover:bg-amber-100 transition-colors"
          >
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              ビアファインダー
            </h3>
            <p>あなたの好みに合ったクラフトビールを見つけましょう</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
