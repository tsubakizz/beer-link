import React from 'react';
import { motion } from 'framer-motion';

interface IntroductionSectionProps {
  title: string;
  content: React.ReactNode;
}

export default function IntroductionSection({
  title,
  content,
}: IntroductionSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-xl shadow-sm mb-12"
    >
      <h2 className="text-2xl font-bold mb-6 text-amber-900">{title}</h2>
      <div className="prose max-w-none text-amber-800">{content}</div>
    </motion.div>
  );
}
