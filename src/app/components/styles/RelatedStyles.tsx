'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BeerStyle } from '@/src/app/lib/beers-data';

interface RelatedStylesProps {
  parentStyles?: BeerStyle[];
  childStyles?: BeerStyle[];
  siblingStyles?: BeerStyle[];
}

export default function RelatedStyles({
  parentStyles,
  childStyles,
  siblingStyles,
}: RelatedStylesProps) {
  // いずれの関連スタイルもない場合は何も表示しない
  if (
    (!parentStyles || parentStyles.length === 0) &&
    (!childStyles || childStyles.length === 0) &&
    (!siblingStyles || siblingStyles.length === 0)
  ) {
    return null;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.5 },
    }),
  };

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-amber-900 mb-4 border-l-4 border-amber-500 pl-4">
        関連するビールスタイル
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 派生元スタイル */}
        {parentStyles && parentStyles.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-3">
              派生元スタイル
            </h4>
            <ul className="space-y-2">
              {parentStyles.map((style, index) => (
                <motion.li
                  key={style.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="bg-amber-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link
                    href={`/styles/${style.id}`}
                    className="flex items-center text-amber-900 hover:text-amber-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span>{style.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* 派生したスタイル */}
        {childStyles && childStyles.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-3">
              派生スタイル
            </h4>
            <ul className="space-y-2">
              {childStyles.map((style, index) => (
                <motion.li
                  key={style.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="bg-amber-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link
                    href={`/styles/${style.id}`}
                    className="flex items-center text-amber-900 hover:text-amber-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span>{style.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* 類似スタイル */}
        {siblingStyles && siblingStyles.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-3">
              類似スタイル
            </h4>
            <ul className="space-y-2">
              {siblingStyles.map((style, index) => (
                <motion.li
                  key={style.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="bg-amber-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link
                    href={`/styles/${style.id}`}
                    className="flex items-center text-amber-900 hover:text-amber-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span>{style.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
