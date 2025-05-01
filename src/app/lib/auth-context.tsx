'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { users, type User } from './users-data';

// ユーザー情報から機密情報を取り除いたタイプ
export type AuthUser = Omit<User, 'password'>;

// 認証コンテキストの型定義
interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string,
    displayName: string
  ) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

// 認証コンテキストの作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 認証プロバイダーコンポーネント
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 初期化時にローカルストレージからユーザー情報を復元
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('認証情報の復元に失敗しました', e);
        localStorage.removeItem('authUser');
      }
    }
    setIsLoading(false);
  }, []);

  // ログイン処理
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setError(null);
    setIsLoading(true);

    try {
      // 実際のアプリではAPIリクエストになります
      // ここではモックデータを使用
      const foundUser = users.find(
        (u) =>
          (u.username === username || u.email === username) &&
          u.password === password
      );

      if (!foundUser) {
        throw new Error('ユーザー名またはパスワードが正しくありません');
      }

      // パスワードを除外したユーザー情報を保存
      const { password: _, ...authUser } = foundUser;

      // 最終ログイン時間を更新
      const userWithUpdatedLogin = {
        ...authUser,
        lastLogin: new Date().toISOString(),
      };

      // ユーザー情報をステートとローカルストレージに保存
      setUser(userWithUpdatedLogin);
      localStorage.setItem('authUser', JSON.stringify(userWithUpdatedLogin));
      return true;
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('ログイン中にエラーが発生しました');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ログアウト処理
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  // 新規ユーザー登録
  const register = async (
    username: string,
    email: string,
    password: string,
    displayName: string
  ): Promise<boolean> => {
    setError(null);
    setIsLoading(true);

    try {
      // 実際のアプリではAPIリクエストになります
      // ここではモックデータを使用

      // ユーザー名とメールアドレスの重複チェック
      const usernameExists = users.some((u) => u.username === username);
      if (usernameExists) {
        throw new Error('このユーザー名は既に使用されています');
      }

      const emailExists = users.some((u) => u.email === email);
      if (emailExists) {
        throw new Error('このメールアドレスは既に登録されています');
      }

      // 新しいユーザーを作成
      const newUser: User = {
        id: `${users.length + 1}`,
        username,
        email,
        password, // 実際のアプリではハッシュ化して保存
        displayName,
        favoriteBeers: [],
        favoriteBreweries: [],
        ratings: [],
        reviews: [],
        role: 'user',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      // モックデータに追加（実際のアプリではDBに保存）
      // 注意: このコードはクライアント側で実行されるため、実際には意味がありません
      // 実際のアプリではバックエンドAPIを使用します
      users.push(newUser);

      // パスワードを除外したユーザー情報を保存
      const { password: _, ...authUser } = newUser;

      // ユーザー情報をステートとローカルストレージに保存
      setUser(authUser);
      localStorage.setItem('authUser', JSON.stringify(authUser));
      return true;
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('登録中にエラーが発生しました');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // コンテキスト値
  const value = {
    user,
    login,
    logout,
    register,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// カスタムフック
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthはAuthProviderの中で使用する必要があります');
  }
  return context;
}
