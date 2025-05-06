'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface StyleNavigationProps {
  delay?: number;
}

export default function StyleNavigation({ delay = 0.4 }: StyleNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mt-12 text-center"
    >
      <h3 className="text-xl font-bold text-amber-900 mb-6">
        他のスタイルを探す
      </h3>
      <Link href="/styles" className="btn btn-primary btn-lg">
        スタイル図鑑へ
      </Link>
    </motion.div>
  );
}
