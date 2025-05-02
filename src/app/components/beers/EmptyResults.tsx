import { motion } from 'framer-motion';

interface EmptyResultsProps {
  resetFilters: () => void;
  message?: string;
}

export default function EmptyResults({
  resetFilters,
  message,
}: EmptyResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 bg-amber-50/50 rounded-xl border border-amber-100"
    >
      <svg
        className="w-16 h-16 mx-auto text-amber-300 mb-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
      </svg>
      <h3 className="text-xl font-semibold mb-2 text-amber-900">
        {message || '条件に一致するビールが見つかりませんでした'}
      </h3>
      <p className="text-amber-700 mb-6">検索条件を変更してみてください</p>
      <button
        className="btn btn-outline border-amber-300 text-amber-800 hover:bg-amber-100 hover:border-amber-400"
        onClick={resetFilters}
      >
        フィルターをリセット
      </button>
    </motion.div>
  );
}
