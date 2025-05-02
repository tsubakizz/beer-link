import React from 'react';
import { motion } from 'framer-motion';
import GlossaryCard from './GlossaryCard';

interface GlossaryItem {
  title: string;
  description: string;
}

interface GlossarySectionProps {
  title: string;
  items: GlossaryItem[];
}

export default function GlossarySection({
  title,
  items,
}: GlossarySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-6 text-amber-900">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <GlossaryCard
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </motion.div>
  );
}
