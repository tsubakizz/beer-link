'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../src/app/lib/auth-context';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const {
    user,
    register,
    loginWithGoogle,
    error,
    isLoading: authLoading,
  } = useAuth();
  const router = useRouter();

  // ユーザーが既にログインしている場合はホームページにリダイレクト
  useEffect(() => {
    if (user && !authLoading) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    // バリデーション
    if (password !== confirmPassword) {
      setRegisterError('パスワードが一致しません');
      return;
    }

    if (password.length < 6) {
      setRegisterError('パスワードは6文字以上で入力してください');
      return;
    }

    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  // Googleで登録
  const handleGoogleRegister = async () => {
    setIsLoading(true);
    setRegisterError('');

    try {
      const success = await loginWithGoogle();
      if (success) {
        router.push('/'); // ログイン成功したらホームページへリダイレクト
      } else {
        setRegisterError(error || 'Googleアカウントでの登録に失敗しました。');
      }
    } catch (error) {
      setRegisterError('Googleアカウントでの登録中にエラーが発生しました。');
      console.error('Google register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-amber-800">
        新規会員登録
      </h1>

      <div className="w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-8 border border-amber-100"
        >
          {registerError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
            >
              {registerError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
              <label
                htmlFor="displayName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                ニックネーム
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

            <div className="mb-4">
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
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                パスワード（確認）
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full bg-amber-50 focus:bg-white transition-colors"
                required
                placeholder="同じパスワードをもう一度入力"
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
            onClick={handleGoogleRegister}
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
            Googleアカウントで登録
          </button>

          <div className="text-center">
            <p className="text-sm">
              すでにアカウントをお持ちですか？
              <Link
                href="/login"
                className="text-amber-600 hover:text-amber-800 ml-1"
              >
                ログイン
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
