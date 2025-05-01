import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-amber-300 via-amber-400 to-amber-300 text-amber-900 py-10 relative overflow-hidden">
      {/* 泡の装飾 - フッター用（少なめ） */}
      <div className="bubbles-footer">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={
              {
                '--size': `${Math.random() * 3 + 0.8}rem`,
                '--distance': `${Math.random() * 4 + 2}rem`,
                '--position': `${Math.random() * 100}%`,
                '--time': `${Math.random() * 2 + 4}s`,
                '--delay': `${Math.random() * 3}s`,
              } as React.CSSProperties
            }
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center mb-5">
              <div className="avatar mr-3">
                <div className="w-8 rounded-full ring ring-primary ring-offset-1 ring-offset-base-100">
                  <div className="bg-amber-300 text-amber-900 flex items-center justify-center h-full">
                    <span className="text-sm">🍻</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold">Let&apos;s Beer</h3>
            </div>
            <p className="text-amber-800">
              クラフトビールの魅力を初心者から愛好家まで楽しめるファンサイト
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-5 border-l-4 border-amber-500 pl-3">
              コンテンツ
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <Link
                  href="/guides"
                  className="footer-link text-amber-800 hover:text-amber-950"
                >
                  ビールガイド
                </Link>
              </li>
              <li>
                <Link
                  href="/beers"
                  className="footer-link text-amber-800 hover:text-amber-950"
                >
                  ビール図鑑
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="footer-link text-amber-800 hover:text-amber-950"
                >
                  レビュー
                </Link>
              </li>
              <li>
                <Link
                  href="/breweries"
                  className="footer-link text-amber-800 hover:text-amber-950"
                >
                  ブルワリー
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="footer-link text-amber-800 hover:text-amber-950"
                >
                  コミュニティ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="footer-link text-amber-800 hover:text-amber-950"
                >
                  サイトについて
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-5 border-l-4 border-amber-500 pl-3">
              お問い合わせ
            </h3>
            <p className="mb-4 text-amber-800">
              クラフトビール情報の提供やサイトに関するお問い合わせはこちらまで
            </p>
            <Link
              href="/about"
              className="btn bg-amber-500 hover:bg-amber-600 text-white border-none rounded-full"
            >
              お問い合わせフォーム
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-amber-500/30 text-center">
          <p className="text-amber-800">
            &copy; {new Date().getFullYear()} Let&apos;s Beer. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
