import React from 'react';
import { motion } from 'framer-motion';
import FAQAccordion from '../FAQAccordion';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqItems: FAQItem[];
}

export default function FAQSection({ faqItems }: FAQSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-6 text-amber-900 flex items-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          よくある質問
        </h2>

        <FAQAccordion items={faqItems} />
      </div>
    </motion.div>
  );
}
