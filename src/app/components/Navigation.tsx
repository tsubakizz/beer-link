import Link from 'next/link';
import React from 'react';
import ClientSideNav from './ClientSideNav';

// ナビゲーションコンポーネント（ハンバーガーメニュー対応版）
export default function Navigation() {
  return (
    <>
      {/* デスクトップとタブレット向けナビゲーション（lg以上のサイズ） */}
      <div className="navbar bg-transparent">
        <div className="navbar-start">
          <Link href="/" className="flex items-center">
            <div className="avatar mr-3">
              <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <div className="flex items-center justify-center bg-amber-300 text-amber-900 w-full h-full">
                  <span className="text-lg">🍻</span>
                </div>
              </div>
            </div>
            <span className="text-2xl font-bold text-[#7c2d12] hover:text-amber-800 transition-colors duration-300">
              <span className="font-montserrat mr-1">Let's</span>
              <span className="font-bold">Beer</span>
            </span>
          </Link>
        </div>

        {/* モバイルでは非表示、lg以上で表示 */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">
            <li>
              <Link href="/" className="nav-link group text-[#7c2d12]">
                <span className="nav-text">ホーム</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li>
              <Link href="/guides" className="nav-link group text-[#7c2d12]">
                <span className="nav-text">ビールガイド</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li>
              <Link href="/beers" className="nav-link group text-[#7c2d12]">
                <span className="nav-text">ビール図鑑</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li>
              <Link href="/breweries" className="nav-link group text-[#7c2d12]">
                <span className="nav-text">ブルワリー</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="nav-link group text-[#7c2d12]">
                <span className="nav-text">レビュー</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li>
              <Link href="/community" className="nav-link group text-[#7c2d12]">
                <span className="nav-text">コミュニティ</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li>
              <Link href="/about" className="nav-link group text-[#7c2d12]">
                <span className="nav-text">サイトについて</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {/* PC表示時のログイン・会員登録ボタン */}
          <div className="hidden lg:flex gap-2">
            <Link
              href="/login"
              className="btn btn-sm bg-white text-[#7c2d12] border-[#7c2d12] hover:bg-gray-100"
            >
              ログイン
            </Link>
            <Link
              href="/register"
              className="btn btn-sm bg-[#7c2d12] text-white hover:bg-amber-800 border-none"
            >
              新規登録
            </Link>
          </div>

          {/* ハンバーガーメニューのトリガー（モバイル時のみ表示） */}
          <label
            htmlFor="beer-drawer"
            aria-label="メニューを開く"
            className="lg:hidden btn btn-square btn-ghost text-[#7c2d12]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
      </div>
    </>
  );
}
