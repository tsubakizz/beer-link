interface PaginationProps {
  hasResults?: boolean; // オプショナルに変更
  currentPage?: number; // 追加
  totalPages?: number; // 追加
  onPageChange?: (page: number) => void; // 追加
}

export default function Pagination({
  hasResults = true,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: PaginationProps) {
  // 結果がない場合、または1ページしかない場合は表示しない
  if (!hasResults || totalPages <= 1) return null;

  // ページ移動処理
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    if (onPageChange) onPageChange(page);
  };

  // 表示するページ番号の計算
  const renderPageNumbers = () => {
    const pages = [];
    // 常に現在のページを中心に表示
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    // 表示するページ数を最大5つに調整
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`join-item btn btn-sm ${
            i === currentPage
              ? 'bg-amber-100 border-amber-300 text-amber-900'
              : 'bg-white border-amber-200 text-amber-900'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex justify-center">
      {' '}
      {/* mt-12から変更 */}
      <div className="join">
        <button
          className="join-item btn btn-sm bg-white border-amber-200 text-amber-900"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>

        {renderPageNumbers()}

        <button
          className="join-item btn btn-sm bg-white border-amber-200 text-amber-900"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
