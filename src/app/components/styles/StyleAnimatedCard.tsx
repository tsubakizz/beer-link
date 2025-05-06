'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StyleAnimatedCardProps {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}

export default function StyleAnimatedCard({
  className = '',
  delay = 0,
  children,
}: StyleAnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
