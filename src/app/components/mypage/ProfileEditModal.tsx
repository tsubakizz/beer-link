'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AuthUser } from '../../lib/auth-context';
import { auth, db, storage } from '../../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ProfileEditModalProps {
  user: AuthUser;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileEditModal({
  user,
  isOpen,
  onClose,
}: ProfileEditModalProps) {
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!auth.currentUser) throw new Error('認証情報が見つかりません');

      let photoURL = user.photoURL;

      // 画像がアップロードされた場合は処理
      if (selectedImage) {
        const imageRef = ref(storage, `profile-images/${auth.currentUser.uid}`);
        await uploadBytes(imageRef, selectedImage);
        photoURL = await getDownloadURL(imageRef);
      }

      // Firebase Authのプロフィールを更新
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      // Firestoreのユーザーデータを更新
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        displayName,
        photoURL,
        updatedAt: new Date(),
      });

      onClose();
    } catch (err) {
      setError('プロフィールの更新に失敗しました。もう一度お試しください。');
      console.error('プロフィール更新エラー:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4"
      >
        <h2 className="text-2xl font-semibold text-amber-900 mb-6">
          プロフィール編集
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="displayName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              表示名
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="photo"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              プロフィール画像
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              disabled={isLoading}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="btn bg-amber-500 hover:bg-amber-600 text-white border-none"
              disabled={isLoading}
            >
              {isLoading ? '更新中...' : '更新する'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
