'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AuthUser } from '../../lib/auth-context';
import { useAuth } from '../../lib/auth-context';
import ProfileEditModal from '@/src/app/components/mypage/ProfileEditModal';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileSectionProps {
  user: AuthUser;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { logout, loginWithGoogle, deleteAccount } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleGoogleLink = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-amber-900 mb-6">
        プロフィール
      </h2>
      <div className="flex items-start space-x-4">
        <div className="w-24 h-24 relative rounded-full overflow-hidden bg-gray-100">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName || 'プロフィール画像'}
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {user.displayName || 'お名前未設定'}
          </h3>
          <p className="text-gray-600 mb-2">
            @{user.username || user.email?.split('@')[0]}
          </p>
          <p className="text-sm text-gray-500">
            登録日: {new Date(user.createdAt || '').toLocaleDateString('ja-JP')}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="btn bg-amber-500 hover:bg-amber-600 text-white border-none flex-1 min-w-[120px]"
        >
          プロフィール編集
        </button>
        <button
          onClick={handleLogout}
          className="btn bg-gray-500 hover:bg-gray-600 text-white border-none flex-1 min-w-[120px]"
        >
          ログアウト
        </button>
        <button
          onClick={handleGoogleLink}
          className="btn bg-blue-500 hover:bg-blue-600 text-white border-none flex-1 min-w-[120px]"
        >
          Google連携
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="btn bg-red-500 hover:bg-red-600 text-white border-none flex-1 min-w-[120px]"
        >
          退会する
        </button>
      </div>

      {isEditModalOpen && (
        <ProfileEditModal
          user={user}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsDeleteModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4"
            >
              <h2 className="text-2xl font-semibold text-red-600 mb-6">
                退会の確認
              </h2>
              <p className="text-gray-600 mb-6">
                本当に退会しますか？この操作は取り消せません。全てのデータが削除され、復元することはできません。
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="btn btn-ghost"
                >
                  キャンセル
                </button>
                <button
                  onClick={async () => {
                    const success = await deleteAccount();
                    if (success) {
                      router.push('/');
                    }
                  }}
                  className="btn bg-red-500 hover:bg-red-600 text-white border-none"
                >
                  退会する
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
