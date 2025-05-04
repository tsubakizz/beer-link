import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BubbleDecoration from './BubbleDecoration';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  iconBg: string;
  link: string;
}

interface FeatureCardProps {
  item: FeatureItem;
  index: number;
}

export default function FeatureCard({ item, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * (index % 6) }}
    >
      <Link
        href={item.link}
        className="block h-full card glass backdrop-blur-sm bg-white/70 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        <div
          className={`bg-gradient-to-br ${item.color} p-6 relative overflow-hidden`}
        >
          <div
            className={`w-14 h-14 ${item.iconBg} rounded-xl flex items-center justify-center text-2xl mb-2 shadow-sm`}
          >
            <span className="text-2xl">{item.icon}</span>
          </div>
          <h3 className="text-xl font-bold mb-1 text-amber-900">
            {item.title}
          </h3>
          <BubbleDecoration count={3} className="opacity-30" />
        </div>
        <div className="p-5">
          <p className="text-gray-600 mb-6">{item.description}</p>
          <div className="mt-auto flex justify-end">
            <span className="flex items-center text-amber-600 font-medium text-sm">
              詳しく見る
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
