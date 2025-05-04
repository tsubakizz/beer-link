import React from 'react';

export default function TableOfContents() {
  return (
    <section className="mb-12 p-6 bg-amber-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-amber-800 mb-4">
        このページの内容
      </h2>
      <ul className="space-y-2">
        <li className="flex items-center">
          <span className="mr-2 text-amber-600">•</span>
          <a
            href="#ingredients"
            className="hover:text-amber-600 transition-colors"
          >
            ビールの4大原料
          </a>
        </li>
        <li className="flex items-center">
          <span className="mr-2 text-amber-600">•</span>
          <a href="#process" className="hover:text-amber-600 transition-colors">
            醸造プロセスの基本ステップ
          </a>
        </li>
        <li className="flex items-center">
          <span className="mr-2 text-amber-600">•</span>
          <a href="#factors" className="hover:text-amber-600 transition-colors">
            風味に影響する要素
          </a>
        </li>
        <li className="flex items-center">
          <span className="mr-2 text-amber-600">•</span>
          <a
            href="#craftdifference"
            className="hover:text-amber-600 transition-colors"
          >
            クラフトビールと大量生産ビールの違い
          </a>
        </li>
        <li className="flex items-center">
          <span className="mr-2 text-amber-600">•</span>
          <a
            href="#glossary"
            className="hover:text-amber-600 transition-colors"
          >
            醸造用語集
          </a>
        </li>
      </ul>
    </section>
  );
}
