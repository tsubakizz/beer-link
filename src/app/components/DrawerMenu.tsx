'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ClientSideNav from './ClientSideNav';

// ドロワーメニューコンポーネント
export default function DrawerMenu() {
  // クライアントサイドでのみ使用する泡の状態
  const [bubbles, setBubbles] = useState<React.CSSProperties[]>([]);

  // クライアントサイドでのみ実行する副作用
  useEffect(() => {
    // 泡のスタイルをクライアントサイドでのみ生成
    const generatedBubbles = [...Array(8)].map(
      () =>
        ({
          '--size': `${Math.random() * 1.5 + 0.5}rem`,
          '--distance': `${Math.random() * 3 + 1}rem`,
          '--position': `${Math.random() * 100}%`,
          '--time': `${Math.random() * 2 + 4}s`,
          '--delay': `${Math.random() * 3}s`,
        } as React.CSSProperties)
    );

    setBubbles(generatedBubbles);
  }, []);

  // ドロワーメニューを閉じる関数
  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById(
      'beer-drawer'
    ) as HTMLInputElement;
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  return (
    <div className="drawer-side z-30">
      <label
        htmlFor="beer-drawer"
        aria-label="メニューを閉じる"
        className="drawer-overlay"
      ></label>

      {/* ビールジョッキ型メニュー */}
      <div className="w-80 min-h-full beer-mug-drawer bg-gradient-to-b from-amber-50 to-amber-200">
        {/* ビールジョッキのハンドル */}
        <div className="beer-mug-handle"></div>

        {/* ビールの泡部分 */}
        <div className="beer-mug-foam">
          {/* 泡のバブルアイコン */}
          <div
            className="bubble-icon"
            style={{ top: '8px', left: '15%' }}
          ></div>
          <div
            className="bubble-icon"
            style={{ top: '5px', left: '35%' }}
          ></div>
          <div
            className="bubble-icon"
            style={{ top: '10px', left: '55%' }}
          ></div>
          <div
            className="bubble-icon"
            style={{ top: '6px', left: '75%' }}
          ></div>
        </div>

        {/* メニューコンテンツ */}
        <div className="beer-mug-content">
          {/* モバイルメニューのタイトル */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-amber-200">
            <span className="flex items-center font-bold text-xl text-amber-900">
              <div className="avatar mr-2">
                <div className="w-8 rounded-full ring ring-primary ring-offset-1 ring-offset-base-100">
                  <div className="bg-amber-300 text-amber-900 flex items-center justify-center h-full">
                    <span className="text-sm">🍻</span>
                  </div>
                </div>
              </div>
              Beer Link
            </span>
            <label
              htmlFor="beer-drawer"
              className="btn btn-sm btn-circle btn-ghost text-amber-800"
            >
              ✕
            </label>
          </div>

          {/* ログイン・会員登録リンク（メニュー内に配置） */}
          <div className="mb-6 pb-4 border-b border-amber-200">
            <ClientSideNav closeDrawer={closeDrawer} />
          </div>

          {/* モバイルメニュー項目 */}
          <ul className="space-y-1">
            <li>
              <Link href="/" className="beer-menu-item" onClick={closeDrawer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                ホーム
              </Link>
            </li>
            <li>
              <Link
                href="/guides"
                className="beer-menu-item"
                onClick={closeDrawer}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c-1.255 0-2.443.29-3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                ビールガイド
              </Link>
            </li>
            <li>
              <Link
                href="/beers"
                className="beer-menu-item"
                onClick={closeDrawer}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                    clipRule="evenodd"
                  />
                  <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                </svg>
                ビール図鑑
              </Link>
            </li>
            <li>
              <Link
                href="/styles"
                className="beer-menu-item"
                onClick={closeDrawer}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                スタイル図鑑
              </Link>
            </li>
            <li>
              <Link
                href="/breweries"
                className="beer-menu-item"
                onClick={closeDrawer}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                    clipRule="evenodd"
                  />
                </svg>
                ブルワリー
              </Link>
            </li>
          </ul>

          {/* 泡のアニメーション - クライアントサイドでのみレンダリング */}
          <div className="absolute inset-x-0 top-24 h-full overflow-hidden pointer-events-none">
            {bubbles.map((style, i) => (
              <div key={i} className="bubble" style={style}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
