'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../src/app/lib/auth-context';

// SearchParamsを使用するコンポーネントを分離
function RegisterContent() {
  const { register, loginWithGoogle, user, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [registerError, setRegisterError] = useState('');
  const router = useRouter();

  // searchParamsを専用コンポーネントで取得
  const SearchParamsHandler = () => {
    const searchParams = useSearchParams();
    return (
      <SearchParamsContext.Provider value={searchParams.get('returnUrl')}>
        <></>
      </SearchParamsContext.Provider>
    );
  };

  // コンテキストを作成してsearchParamsの値を保存
  const SearchParamsContext = React.createContext<string | null>(null);
  const useSearchParamsValue = () => React.useContext(SearchParamsContext);

  // 別のコンポーネントで値を利用
  const RegisterFormContent = () => {
    const returnUrl = useSearchParamsValue();

    useEffect(() => {
      if (user && !isLoading) {
        router.push('/');
      }
    }, [user, isLoading]);

    // フォーム送信処理
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setRegisterError('');

      if (password.length < 6) {
        setRegisterError('パスワードは6文字以上で入力してください');
        return;
      }

      try {
        const success = await register(email, password, displayName);
        if (success) {
          router.push('/'); // 登録成功したらホームページへリダイレクト
        } else {
          setRegisterError(
            error || '登録に失敗しました。もう一度お試しください。'
          );
        }
      } catch (error) {
        setRegisterError('登録中にエラーが発生しました。');
        console.error('Register error:', error);
      }
    };

    // Googleで登録
    const handleGoogleRegister = async () => {
      setRegisterError('');
      try {
        const success = await loginWithGoogle();
        if (success) {
          if (returnUrl) {
            router.push(returnUrl);
          } else {
            router.push('/');
          }
        } else {
          setRegisterError('Googleアカウントでの登録に失敗しました。');
        }
      } catch (err) {
        console.error('Google register error:', err);
        setRegisterError('予期せぬエラーが発生しました。');
      }
    };

    return (
      <div className="min-h-screen bg-amber-50/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-amber-900">新規登録</h2>
            <p className="mt-2 text-sm text-amber-700">
              クラフトビールのレビューや記録を始めましょう
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            {registerError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {registerError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-4">
                <label
                  htmlFor="displayName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  表示名
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="input input-bordered w-full bg-amber-50 focus:bg-white transition-colors"
                  required
                  placeholder="表示名を入力"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full bg-amber-50 focus:bg-white transition-colors"
                  required
                  placeholder="example@example.com"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  パスワード
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full bg-amber-50 focus:bg-white transition-colors"
                  required
                  placeholder="6文字以上のパスワード"
                  minLength={6}
                />
              </div>

              <div className="mb-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full bg-amber-500 hover:bg-amber-600 text-white border-none"
                >
                  {isLoading ? '登録中...' : '登録する'}
                </button>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">または</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleRegister}
                disabled={isLoading}
                className="btn w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23.04 12.2614C23.04 11.4459 22.9668 10.6618 22.8309 9.90909H12V14.3575H18.1891C17.9225 15.795 17.1123 17.013 15.8943 17.8284V20.7139H19.6109C21.7855 18.7118 23.04 15.7636 23.04 12.2614Z"
                    fill="#4285F4"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 23.4998C15.105 23.4998 17.7081 22.47 19.6109 20.7137L15.8943 17.8282C14.8645 18.5182 13.5472 18.9259 12 18.9259C9.00474 18.9259 6.46951 16.903 5.56519 14.1848H1.72314V17.1644C3.61542 20.9228 7.50451 23.4998 12 23.4998Z"
                    fill="#34A853"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.56523 14.1851C5.33523 13.4951 5.20455 12.7569 5.20455 12.0001C5.20455 11.2433 5.33523 10.5051 5.56523 9.81506V6.83551H1.72318C0.944318 8.38801 0.5 10.1479 0.5 12.0001C0.5 13.8523 0.944318 15.6122 1.72318 17.1647L5.56523 14.1851Z"
                    fill="#FBBC05"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 5.07386C13.6884 5.07386 15.2043 5.65409 16.3961 6.79364L19.694 3.49568C17.7024 1.63955 15.0993 0.5 12 0.5C7.50451 0.5 3.61542 3.077 1.72314 6.83545L5.56519 9.815C6.46951 7.09682 9.00474 5.07386 12 5.07386Z"
                    fill="#EA4335"
                  />
                </svg>
                Googleで登録
              </button>
            </div>

            <div className="mt-4 text-center text-sm">
              <span className="text-gray-600">アカウントをお持ちの方は</span>
              <Link
                href={
                  returnUrl
                    ? `/login?returnUrl=${encodeURIComponent(returnUrl)}`
                    : '/login'
                }
                className="text-amber-600 hover:text-amber-800 ml-1"
              >
                ログイン
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-amber-50/50">
            <div className="text-center p-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
              <p className="mt-4 text-amber-800">読み込み中...</p>
            </div>
          </div>
        }
      >
        <SearchParamsHandler />
      </Suspense>
      <RegisterFormContent />
    </>
  );
}

// メインコンポーネント - こちらはuseSearchParamsを使用しない
export default function RegisterPage() {
  return <RegisterContent />;
}
