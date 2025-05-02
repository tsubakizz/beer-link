import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SelectionTipsSectionProps {
  title: string;
  content: React.ReactNode;
  ctaLink?: string;
  ctaText?: string;
}

export default function SelectionTipsSection({
  title,
  content,
  ctaLink,
  ctaText,
}: SelectionTipsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-sm p-8 mb-12"
    >
      <h2 className="text-2xl font-bold mb-6 text-amber-900">{title}</h2>

      <div className="prose max-w-none text-amber-800">{content}</div>

      {ctaLink && ctaText && (
        <div className="mt-8 flex justify-center">
          <Link
            href={ctaLink}
            className="btn bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300 transition-all duration-300"
          >
            {ctaText}
            <svg
              className="w-4 h-4 ml-2"
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
          </Link>
        </div>
      )}
    </motion.div>
  );
}
