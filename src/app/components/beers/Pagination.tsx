import { motion } from 'framer-motion';

interface PaginationProps {
  hasResults: boolean;
}

export default function Pagination({ hasResults }: PaginationProps) {
  // 現時点では機能は実装せず、UIのみを表示
  if (!hasResults) return null;

  return (
    <div className="flex justify-center mt-12">
      <div className="join">
        <button className="join-item btn btn-sm bg-white border-amber-200 text-amber-900">
          «
        </button>
        <button className="join-item btn btn-sm bg-amber-100 border-amber-300 text-amber-900">
          1
        </button>
        <button className="join-item btn btn-sm bg-white border-amber-200 text-amber-900">
          2
        </button>
        <button className="join-item btn btn-sm bg-white border-amber-200 text-amber-900">
          3
        </button>
        <button className="join-item btn btn-sm bg-white border-amber-200 text-amber-900">
          »
        </button>
      </div>
    </div>
  );
}
