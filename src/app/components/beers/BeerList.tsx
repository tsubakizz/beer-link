import React from 'react';
import { Beer } from '../../lib/beers-data';
import BeerCard from './BeerCard';
import EmptyResults from './EmptyResults';
import Pagination from './Pagination';

interface BeerListProps {
  beers: Beer[];
  itemsPerPage?: number;
}

export default function BeerList({ beers, itemsPerPage = 12 }: BeerListProps) {
  const [currentPage, setCurrentPage] = React.useState(1);

  // ページネーションの計算
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBeers = beers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(beers.length / itemsPerPage);

  // ページ変更ハンドラー
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // ページトップへスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* ビールが0件の場合は結果なしの表示 */}
      {beers.length === 0 ? (
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
