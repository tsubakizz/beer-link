import React from 'react';
import { Beer } from '@/src/app/lib/beers-data';
import BeerCard from './BeerCard';
import EmptyResults from './EmptyResults';
import Pagination from './Pagination';

interface BeerListProps {
  filters: {
    beerTypes: string[];
    breweries: string[];
    abvRange: { min: number; max: number };
    ibuRange: { min: number; max: number };
    search: string;
  };
  filteredBeerIds: string[];
  beers?: Beer[]; // 後方互換性のために残す
  itemsPerPage?: number;
}

export default function BeerList({
  filters,
  filteredBeerIds,
  beers = [], // デフォルト値として空の配列を設定
  itemsPerPage = 12,
}: BeerListProps) {
  const [currentPage, setCurrentPage] = React.useState(1);

  // 表示するビールの配列
  // filtersとfilteredBeerIdsから適切なビールを取得する処理が必要
  // または親コンポーネントから完全なリストを受け取る
  const displayBeers = beers.length > 0 ? beers : [];

  // ページネーションの計算
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBeers = displayBeers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayBeers.length / itemsPerPage);

  // ページ変更ハンドラー
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // ページトップへスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* ビールが0件の場合は結果なしの表示 */}
      {displayBeers.length === 0 ? (
        <EmptyResults
          title="ビールが見つかりませんでした"
          message="検索条件を変更して再度お試しください。"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentBeers.map((beer, index) => (
            <BeerCard
              key={beer.id}
              beer={beer}
              index={index}
              reviewCount={beer.ratingCount}
              reviewRating={beer.rating}
            />
          ))}
        </div>
      )}

      {/* ページネーション - ビールが12件以上ある場合のみ表示 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
