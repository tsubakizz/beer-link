'use client';

import { motion } from 'framer-motion';

interface StyleGroupNavigationProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  styleGroups: { id: string; name: string; description: string }[];
}

export default function StyleGroupNavigation({
  selectedFilter,
  setSelectedFilter,
  styleGroups,
}: StyleGroupNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8"
    >
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          className={`btn ${
            selectedFilter === 'all' ? 'btn-primary' : 'btn-outline btn-primary'
          }`}
          onClick={() => setSelectedFilter('all')}
        >
          すべて
        </button>
        {styleGroups.map((group) => (
          <button
            key={group.id}
            className={`btn ${
              selectedFilter === group.id
                ? 'btn-primary'
                : 'btn-outline btn-primary'
            }`}
            onClick={() => setSelectedFilter(group.id)}
          >
            {group.name}
          </button>
        ))}
      </div>
      {selectedFilter !== 'all' && (
        <p className="text-center mt-2 text-amber-800">
          {styleGroups.find((g) => g.id === selectedFilter)?.description}
        </p>
      )}
    </motion.div>
  );
}
