import { motion } from 'framer-motion';
import { beerStyles } from '@/src/app/lib/beer-styles-data';
import { getStyleColor } from './BeerUtils';

interface StyleNavigationProps {
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
}

export default function StyleNavigation({
  selectedStyle,
  setSelectedStyle,
}: StyleNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-8 overflow-x-auto pb-2"
    >
      <div className="flex gap-2 min-w-max px-1">
        {beerStyles.map((style) => (
          <button
            key={style.slug}
            onClick={() =>
              setSelectedStyle(selectedStyle === style.slug ? '' : style.slug)
            }
            className={`btn btn-sm rounded-full transition-all duration-300 ${
              selectedStyle === style.slug
                ? `${getStyleColor(style.slug)} text-amber-900 border-amber-400`
                : 'bg-white border-amber-200 text-amber-800 hover:bg-amber-50'
            }`}
          >
            {style.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
