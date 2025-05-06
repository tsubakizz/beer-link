import { BeerStyle } from '@/src/app/types/beer-style';

// SRMに基づいてビールスタイルの色を取得する
export const getStyleColorBySRM = (style: BeerStyle): string => {
  const avgSRM = style.srm ? (style.srm[0] + style.srm[1]) / 2 : 0;

  if (avgSRM < 2) {
    return 'bg-yellow-50';
  } else if (avgSRM < 4) {
    return 'bg-yellow-100';
  } else if (avgSRM < 6) {
    return 'bg-yellow-200';
  } else if (avgSRM < 8) {
    return 'bg-amber-100';
  } else if (avgSRM < 10) {
    return 'bg-amber-200';
  } else if (avgSRM < 14) {
    return 'bg-amber-300';
  } else if (avgSRM < 17) {
    return 'bg-amber-400';
  } else if (avgSRM < 20) {
    return 'bg-amber-500';
  } else if (avgSRM < 25) {
    return 'bg-amber-600';
  } else if (avgSRM < 30) {
    return 'bg-amber-700';
  } else if (avgSRM < 35) {
    return 'bg-amber-800';
  } else {
    return 'bg-amber-900';
  }
};

// 特別なスタイルの色のマッピング
const specialStyleColors: { [key: string]: string } = {
  'fruit-beer': 'bg-pink-200',
  'sour-ale': 'bg-rose-300',
  'berliner-weisse': 'bg-rose-200',
  gose: 'bg-rose-200',
  'flanders-red-ale': 'bg-red-300',
  kriek: 'bg-red-400',
  framboise: 'bg-pink-300',
};

// ビールスタイルの色を取得する関数
export const getStyleColor = (style: BeerStyle): string => {
  return specialStyleColors[style.slug] || getStyleColorBySRM(style);
};
