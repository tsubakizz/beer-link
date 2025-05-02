import { Brewery } from '../../../app/lib/breweries-data';
import { Beer } from '../../../app/lib/beers-data';

// ブルワリーのフィルタリング処理
export function filterBreweries(
  breweries: Brewery[],
  {
    searchQuery = '',
    selectedRegion = 'all',
    selectedType = 'all',
    selectedFeatures = [],
  }: {
    searchQuery?: string;
    selectedRegion?: string;
    selectedType?: string;
    selectedFeatures?: string[];
  }
): Brewery[] {
  return breweries.filter((brewery) => {
    // 検索クエリでフィルタリング
    if (
      searchQuery &&
      !brewery.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(
        brewery.nameEn &&
        brewery.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      !brewery.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(brewery.prefecture && brewery.prefecture.includes(searchQuery)) &&
      !brewery.country.includes(searchQuery)
    ) {
      return false;
    }

    // 地域でフィルタリング
    if (selectedRegion !== 'all' && brewery.region !== selectedRegion) {
      return false;
    }

    // タイプでフィルタリング
    if (selectedType !== 'all' && brewery.type !== selectedType) {
      return false;
    }

    // 特徴でフィルタリング
    if (selectedFeatures.includes('taproom') && !brewery.taproom) {
      return false;
    }
    if (selectedFeatures.includes('tours') && !brewery.tours) {
      return false;
    }
    if (selectedFeatures.includes('domestic') && brewery.country !== '日本') {
      return false;
    }
    if (selectedFeatures.includes('overseas') && brewery.country === '日本') {
      return false;
    }

    return true;
  });
}

// ブルワリーのソート処理
export function sortBreweries(
  breweries: Brewery[],
  sortBy: string = 'name'
): Brewery[] {
  return [...breweries].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'year-old') {
      return a.foundedYear - b.foundedYear;
    } else if (sortBy === 'year-new') {
      return b.foundedYear - a.foundedYear;
    } else if (sortBy === 'country') {
      return a.country.localeCompare(b.country) || a.name.localeCompare(b.name);
    }
    return 0;
  });
}

// ブルワリーの製造しているビールの数を計算
export function getBeerCount(
  breweryId: string,
  breweries: Brewery[],
  beers: Beer[]
): number {
  // ビールのデータからブルワリー名と一致するものを検索
  return beers.filter((beer) => {
    const breweryName = breweries.find(
      (brewery) => brewery.id === breweryId
    )?.name;
    return breweryName && beer.brewery === breweryName;
  }).length;
}
