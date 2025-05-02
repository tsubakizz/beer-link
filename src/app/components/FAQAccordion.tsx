import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-amber-200 rounded-xl overflow-hidden">
      {items.map((item, index) => (
        <div key={index} className="bg-white">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex justify-between items-center w-full p-5 text-left font-medium text-amber-900 hover:bg-amber-50/50 transition-all"
          >
            <span className="flex-1">{item.question}</span>
            <svg
              className={`w-5 h-5 text-amber-600 transform transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-5 pt-0 text-amber-800 bg-amber-50/30">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
