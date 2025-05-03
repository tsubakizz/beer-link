'use client';

import Link from 'next/link';
import { useAuth } from '../lib/auth-context';

interface ClientSideNavProps {
  closeDrawer?: () => void;
}

// クライアント側のナビゲーションコンポーネント
export default function ClientSideNav({ closeDrawer }: ClientSideNavProps) {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col gap-3">
      {user ? (
        <>
          <div className="flex items-center mb-2">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="ユーザーアイコン"
                className="w-10 h-10 rounded-full mr-3"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center mr-3 text-white">
                {user.email?.charAt(0) || user.uid.charAt(0) || 'ユ'}
              </div>
            )}
            <div>
              <span className="font-medium text-amber-900">
                {user.email?.split('@')[0] || `ユーザー${user.uid.slice(0, 4)}`}
              </span>
              <p className="text-xs text-amber-700">ログイン中</p>
            </div>
          </div>
          <div className="space-y-2">
            <Link
              href="/mypage"
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
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              マイページ
            </Link>
            <Link
              href="/favorites"
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
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L14 11.586V7z"
                  clipRule="evenodd"
                />
              </svg>
              お気に入り
            </Link>
          </div>
          <button
            onClick={logout}
            className="btn btn-sm w-full btn-outline btn-warning justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L14 11.586V7z"
                clipRule="evenodd"
              />
            </svg>
            ログアウト
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="btn btn-sm w-full btn-outline btn-warning justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L14 11.586V7z"
                clipRule="evenodd"
              />
            </svg>
            ログイン
          </Link>
          <Link
            href="/register"
            className="btn btn-sm w-full btn-warning justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            新規登録
          </Link>
        </>
      )}
    </div>
  );
}
