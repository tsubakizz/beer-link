'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { users, type User } from './users-data';

// 認証ユーザーの型定義（Firebaseと内部ユーザー情報を統合）
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  username?: string;
  photoURL?: string | null;
  favoriteBeers?: string[];
  favoriteBreweries?: string[];
  ratings?: Array<{ beerId: string; rating: number }>;
  reviews?: Array<{ beerId: string; content: string; date: string }>;
  role?: 'user' | 'admin';
  createdAt?: string;
  lastLogin?: string;
}

// Firestoreに保存するユーザーデータの型定義
interface FirestoreUser {
  uid: string;
  username: string;
  email: string;
  displayName: string | null;
  photoURL?: string | null;
  favoriteBeers: string[];
  favoriteBreweries: string[];
  role: 'user' | 'admin';
  lastLoggedIn: any; // serverTimestamp()を使用するため
  createdAt: any;
  updatedAt: any;
}

// 認証コンテキストの型定義
interface AuthContextType {
  user: AuthUser | null;
  firebaseUser: FirebaseUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<boolean>;
  sendPasswordReset: (email: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

// 認証コンテキストの作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 認証プロバイダーコンポーネント
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Firestoreからユーザーデータを取得する関数
  const fetchUserData = async (uid: string): Promise<FirestoreUser | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as FirestoreUser;
      }
      return null;
    } catch (e) {
      console.error('ユーザーデータの取得に失敗しました', e);
      return null;
    }
  };

  // ログイン時刻を更新する関数
  const updateLoginTimestamp = async (uid: string): Promise<void> => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        lastLoggedIn: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.error('ログイン時刻の更新に失敗しました', e);
    }
  };

  // Firebase認証状態の監視
  useEffect(() => {
    if (!auth || !db) return;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);

      if (firebaseUser) {
        setFirebaseUser(firebaseUser);

        // Firebase認証情報をAuthUserに変換
        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };

        // Firestoreからユーザーデータを取得
        const firestoreUser = await fetchUserData(firebaseUser.uid);

        if (firestoreUser) {
          // Firestoreデータで情報を補完
          authUser.username = firestoreUser.username;
          authUser.favoriteBeers = firestoreUser.favoriteBeers;
          authUser.favoriteBreweries = firestoreUser.favoriteBreweries;
          authUser.role = firestoreUser.role;
          authUser.createdAt = firestoreUser.createdAt
            ?.toDate?.()
            ?.toISOString();
          authUser.lastLogin = firestoreUser.lastLoggedIn
            ?.toDate?.()
            ?.toISOString();

          // ログイン時刻を更新
          await updateLoginTimestamp(firebaseUser.uid);
        } else {
          // Firestoreにデータがない場合は内部メモリから探す（移行期間用）
          const internalUser = users.find(
            (u) => u.email === firebaseUser.email
          );
          if (internalUser) {
            authUser.favoriteBeers = internalUser.favoriteBeers;
            authUser.favoriteBreweries = internalUser.favoriteBreweries;
            authUser.ratings = internalUser.ratings;
            authUser.reviews = internalUser.reviews;
            authUser.role = internalUser.role;
            authUser.createdAt = internalUser.createdAt;
          }
        }

        setUser(authUser);
      } else {
        setFirebaseUser(null);
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // メールとパスワードでのログイン
  const login = async (email: string, password: string): Promise<boolean> => {
    if (!auth || !db) return false;

    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ログイン時刻を更新
      await updateLoginTimestamp(userCredential.user.uid);

      return true;
    } catch (e: any) {
      let errorMessage = 'ログイン中にエラーが発生しました';

      // Firebase Auth エラーコードに基づくメッセージ
      if (
        e.code === 'auth/user-not-found' ||
        e.code === 'auth/wrong-password'
      ) {
        errorMessage = 'メールアドレスまたはパスワードが正しくありません';
      } else if (e.code === 'auth/invalid-email') {
        errorMessage = 'メールアドレスの形式が正しくありません';
      } else if (e.code === 'auth/user-disabled') {
        errorMessage = 'このアカウントは無効になっています';
      } else if (e.code === 'auth/too-many-requests') {
        errorMessage =
          'ログイン試行回数が多すぎます。しばらくしてからもう一度お試しください';
      }

      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Googleでのログイン
  const loginWithGoogle = async (): Promise<boolean> => {
    if (!auth || !db) return false;

    setError(null);
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Firestoreにユーザーが存在するか確認
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      // ユーザーが存在しない場合は新規作成
      if (!userDoc.exists()) {
        const username = user.email
          ? user.email.split('@')[0]
          : `user_${user.uid.substring(0, 5)}`;

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          username: username,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          favoriteBeers: [],
          favoriteBreweries: [],
          role: 'user',
          lastLoggedIn: serverTimestamp(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        // 存在する場合はログイン時刻を更新
        await updateLoginTimestamp(user.uid);
      }

      return true;
    } catch (e: any) {
      let errorMessage = 'Googleログイン中にエラーが発生しました';

      if (e.code === 'auth/popup-closed-by-user') {
        errorMessage = 'ログインがキャンセルされました';
      } else if (e.code === 'auth/popup-blocked') {
        errorMessage =
          'ポップアップがブロックされました。ポップアップを許可してください';
      }

      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ログアウト処理
  const logout = async (): Promise<void> => {
    if (!auth) return;

    setError(null);
    setIsLoading(true);

    try {
      await signOut(auth);
    } catch (e) {
      console.error('ログアウト中にエラーが発生しました', e);
    } finally {
      setIsLoading(false);
    }
  };

  // 新規ユーザー登録
  const register = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<boolean> => {
    if (!auth || !db) return false;

    setError(null);
    setIsLoading(true);

    try {
      // Firebase Authでユーザーを作成
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // プロフィール情報を更新
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName,
        });

        const uid = userCredential.user.uid;
        const username = email.split('@')[0]; // メールアドレスのローカル部分をユーザー名として使用

        // Firestoreにユーザーデータを保存
        await setDoc(doc(db, 'users', uid), {
          uid: uid,
          username: username,
          email: email,
          displayName: displayName,
          photoURL: null,
          favoriteBeers: [],
          favoriteBreweries: [],
          role: 'user',
          lastLoggedIn: serverTimestamp(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        // 将来的に削除予定のローカルデータ保存
        const newUser: User = {
          id: uid,
          username: username,
          email,
          password: '[FIREBASE_MANAGED]',
          displayName,
          favoriteBeers: [],
          favoriteBreweries: [],
          ratings: [],
          reviews: [],
          role: 'user',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        users.push(newUser);
      }

      return true;
    } catch (e: any) {
      let errorMessage = '登録中にエラーが発生しました';

      if (e.code === 'auth/email-already-in-use') {
        errorMessage = 'このメールアドレスは既に使用されています';
      } else if (e.code === 'auth/invalid-email') {
        errorMessage = 'メールアドレスの形式が正しくありません';
      } else if (e.code === 'auth/weak-password') {
        errorMessage = 'パスワードは6文字以上である必要があります';
      }

      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // パスワードリセット
  const sendPasswordReset = async (email: string): Promise<boolean> => {
    if (!auth) return false;

    setError(null);
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (e: any) {
      let errorMessage = 'パスワードリセットメール送信中にエラーが発生しました';

      if (e.code === 'auth/user-not-found') {
        errorMessage = 'このメールアドレスのユーザーは見つかりませんでした';
      } else if (e.code === 'auth/invalid-email') {
        errorMessage = 'メールアドレスの形式が正しくありません';
      }

      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // コンテキスト値
  const value = {
    user,
    firebaseUser,
    login,
    loginWithGoogle,
    logout,
    register,
    sendPasswordReset,
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
