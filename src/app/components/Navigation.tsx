'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import Logo from './Logo';

// ナビゲーションコンポーネント（ハンバーガーメニュー対応版）
export default function Navigation() {
  const { user, logout, isLoading } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [pathname]);

  // ログアウト処理
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // ユーザーメニューのトグル
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // ユーザーメニューの外側をクリックしたときに閉じる
  const handleClickOutside = (e: MouseEvent) => {
    if (
      menuRef.current &&
      buttonRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setIsUserMenuOpen(false);
    }
  };

  // メニュー表示時に外側クリックのイベントリスナーを設定
  useEffect(() => {
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <>
      {/* デスクトップとタブレット向けナビゲーション（lg以上のサイズ） */}
      <div className="navbar bg-transparent">
        <div className="navbar-start">
          {/* ロゴコンポーネントを使用 */}
          <Logo size="large" showText={true} withLink={true} />
        </div>

        {/* モバイルでは非表示、lg以上で表示 */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">
            <li>
              <Link
                href="/"
                className="btn btn-ghost rounded-btn text-[#7c2d12] hover:bg-amber-100/50"
              >
                ホーム
              </Link>
            </li>
            <li>
              <Link
                href="/guides"
                className="btn btn-ghost rounded-btn text-[#7c2d12] hover:bg-amber-100/50"
              >
                ビールガイド
              </Link>
            </li>
            <li>
              <Link
                href="/beers"
                className="btn btn-ghost rounded-btn text-[#7c2d12] hover:bg-amber-100/50"
              >
                ビール図鑑
              </Link>
            </li>
            <li>
              <Link
                href="/styles"
                className="btn btn-ghost rounded-btn text-[#7c2d12] hover:bg-amber-100/50"
              >
                スタイル図鑑
              </Link>
            </li>
            <li>
              <Link
                href="/breweries"
                className="btn btn-ghost rounded-btn text-[#7c2d12] hover:bg-amber-100/50"
              >
                ブルワリー
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {/* PC表示時のログイン状態に応じたUI */}
          <div className="hidden lg:flex gap-2">
            {isLoading ? (
              // ロード中
              <div className="flex items-center">
                <span className="loading loading-spinner loading-sm text-amber-700"></span>
              </div>
            ) : user ? (
              // ログイン済み：ユーザーメニュー
              <div className="relative">
                <button
                  ref={buttonRef}
                  onClick={toggleUserMenu}
                  className="btn btn-sm bg-white border-amber-300 text-amber-900 hover:bg-amber-100 flex items-center gap-2"
                >
                  {user.photoURL ? (
                    <div className="avatar">
                      <div className="w-6 h-6 rounded-full">
                        <Image
                          src={user.photoURL}
                          alt={user.displayName || ''}
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="avatar placeholder">
                      <div className="bg-amber-200 text-amber-800 w-6 h-6 rounded-full">
                        <span>
                          {user.email?.charAt(0) || user.uid.charAt(0) || '?'}
                        </span>
                      </div>
                    </div>
                  )}
                  <span>
                    {user.email?.split('@')[0] || `ID:${user.uid.slice(0, 4)}`}
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {/* ユーザーメニュードロップダウン */}
                {isUserMenuOpen && (
                  <div
                    ref={menuRef}
                    className="fixed top-0 left-0 right-0 bottom-0 z-40 pointer-events-none"
                  >
                    <div className="absolute right-0 top-[72px] w-48 bg-white rounded-lg shadow-xl py-1 z-50 pointer-events-auto mr-4 border border-amber-100">
                      <div className="px-4 py-2 border-b border-amber-100">
                        <p className="text-sm font-medium text-amber-900">
                          {user.email?.split('@')[0] ||
                            `ユーザー${user.uid.slice(0, 4)}`}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email || `ID: ${user.uid}`}
                        </p>
                      </div>

                      <Link
                        href="/mypage"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        マイページ
                      </Link>
                      <Link
                        href="/favorites"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        お気に入り
                      </Link>
                      <Link
                        href="/reviews/my"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        マイレビュー
                      </Link>
                      <div className="border-t border-amber-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-amber-50"
                        >
                          ログアウト
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // 未ログイン：ログイン・会員登録ボタン
              <>
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
              </>
            )}
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
              />
            </svg>
          </label>
        </div>
      </div>
    </>
  );
}
