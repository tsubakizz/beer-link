import { getAllBeerStylesFromDb } from '@/src/app/lib/beer-styles-data';
import BeerFinderQuiz, {
  BeerStyle,
} from '@/src/app/components/guides/BeerFinderQuiz';

export const dynamic = 'force-dynamic'; // SSRを強制
export const revalidate = 3600; // 1時間ごとに再検証
export const runtime = 'edge';

// ビールスタイルデータをサーバー側で処理するための型変換関数
function transformBeerStyleData(styles: any[]): BeerStyle[] {
  return styles.map((style) => ({
    id: style.id,
    name: style.name,
    slug: style.slug,
    description: style.description,
    abv: [style.abv[0], style.abv[1]],
    characteristics: {
      bitterness: style.characteristics.bitterness,
      sweetness: style.characteristics.sweetness,
      body: style.characteristics.body,
    },
  }));
}

export default async function BeerFinderPage() {
  // サーバーサイドでデータベースから直接ビールスタイルを取得
  const styles = await getAllBeerStylesFromDb();
  const simplifiedStyles = transformBeerStyleData(styles);

  return (
    <>
      {/* クライアントコンポーネントにビールスタイルデータを渡す */}
      <BeerFinderQuiz beerStyles={simplifiedStyles} />
    </>
  );
}
