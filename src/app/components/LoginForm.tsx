'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../lib/auth-context';
import { motion } from 'framer-motion';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const { login, loginWithGoogle, sendPasswordReset, error } = useAuth();
  const router = useRouter();

  // メールとパスワードによるログイン
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/'); // ログイン成功したらホームページへリダイレクト
      } else {
        setLoginError(
          error ||
            'ログインに失敗しました。メールアドレスとパスワードを確認してください。'
        );
      }
    } catch (error) {
      setLoginError('ログイン中にエラーが発生しました。');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Googleでログイン
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setLoginError('');

    try {
      const success = await loginWithGoogle();
      if (success) {
        router.push('/'); // ログイン成功したらホームページへリダイレクト
      } else {
        setLoginError(error || 'Googleログインに失敗しました。');
      }
    } catch (error) {
      setLoginError('Googleログイン中にエラーが発生しました。');
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // パスワードリセット
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setLoginError('メールアドレスを入力してください。');
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      const success = await sendPasswordReset(email);
      if (success) {
        setResetSent(true);
      } else {
        setLoginError(
          error || 'パスワードリセットメールの送信に失敗しました。'
        );
      }
    } catch (error) {
      setLoginError('パスワードリセット中にエラーが発生しました。');
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // パスワードリセットモードの切り替え
  const toggleResetMode = () => {
    setIsResetMode(!isResetMode);
    setLoginError('');
    setResetSent(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-8 border border-amber-100"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-amber-800">
          {isResetMode ? 'パスワードをリセット' : 'ログイン'}
        </h2>

        {loginError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
          >
            {loginError}
          </motion.div>
        )}

        {resetSent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4"
          >
            パスワードリセットのリンクを {email}{' '}
            に送信しました。メールを確認してください。
          </motion.div>
        )}

        {isResetMode ? (
          // パスワードリセットフォーム
          <form onSubmit={handlePasswordReset}>
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
                placeholder="登録時のメールアドレスを入力"
              />
            </div>

            <div className="mb-6">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full bg-amber-500 hover:bg-amber-600 text-white border-none"
              >
                {isLoading ? '送信中...' : 'リセットリンクを送信'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={toggleResetMode}
                className="text-amber-600 hover:text-amber-800 text-sm"
              >
                ログイン画面に戻る
              </button>
            </div>
          </form>
        ) : (
          // ログインフォーム
          <>
            <form onSubmit={handleSubmit} className="mb-4">
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
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    パスワード
                  </label>
                  <button
                    type="button"
                    onClick={toggleResetMode}
                    className="text-xs text-amber-600 hover:text-amber-800"
                  >
                    パスワードをお忘れですか？
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full bg-amber-50 focus:bg-white transition-colors"
                  required
                />
              </div>

              <div className="mb-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full bg-amber-500 hover:bg-amber-600 text-white border-none"
                >
                  {isLoading ? 'ログイン中...' : 'ログイン'}
                </button>
              </div>
            </form>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">または</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="btn w-full mb-4 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Googleでログイン
            </button>

            <div className="text-center">
              <p className="text-sm">
                アカウントをお持ちでない方は
                <Link
                  href="/register"
                  className="text-amber-600 hover:text-amber-800 ml-1"
                >
                  新規登録
                </Link>
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
