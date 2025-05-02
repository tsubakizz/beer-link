import { beerStyles } from '../../../app/lib/beers-data';

// ビールスタイル名を取得する関数
export const getBeerStyleName = (styleId: string): string => {
  const style = beerStyles.find((style) => style.id === styleId);
  return style ? style.name : styleId;
};

// スタイルに基づく色を返す関数
export const getStyleColor = (styleId: string): string => {
  const styleColors: { [key: string]: string } = {
    lager: 'bg-amber-200',
    ipa: 'bg-orange-200',
    stout: 'bg-stone-800',
    porter: 'bg-stone-700',
    pale_ale: 'bg-amber-300',
    wheat: 'bg-yellow-100',
    pilsner: 'bg-yellow-200',
    sour: 'bg-red-200',
  };
  return styleColors[styleId] || 'bg-amber-100';
};
