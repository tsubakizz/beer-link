'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../../src/app/components/LoginForm';
import { useAuth } from '../../src/app/lib/auth-context';

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // ユーザーが既にログインしている場合はホームページにリダイレクト
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-amber-800">
        ログイン
      </h1>
      <LoginForm />
    </div>
  );
}
