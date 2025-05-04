'use client';

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
  linkWithCredential,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { auth, db } from './firebase';
import { users, type User } from './users-data';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

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
  lastLoggedIn: Timestamp; // serverTimestamp()を使用するため
  createdAt: Timestamp;
  updatedAt: Timestamp;
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
  deleteAccount: () => Promise<boolean>;
  toggleFavoriteBeer: (beerId: string) => Promise<boolean>; // お気に入りビール切り替え
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
    } catch (e) {
      const firebaseError = e as FirebaseError;
      let errorMessage = 'ログイン中にエラーが発生しました';

      // Firebase Auth エラーコードに基づくメッセージ
      if (
        firebaseError.code === 'auth/user-not-found' ||
        firebaseError.code === 'auth/wrong-password'
      ) {
        errorMessage = 'メールアドレスまたはパスワードが正しくありません';
      } else if (firebaseError.code === 'auth/invalid-email') {
        errorMessage = 'メールアドレスの形式が正しくありません';
      } else if (firebaseError.code === 'auth/user-disabled') {
        errorMessage = 'このアカウントは無効になっています';
      } else if (firebaseError.code === 'auth/too-many-requests') {
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
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (!credential) {
        throw new Error('認証情報の取得に失敗しました');
      }

      // 現在のユーザーがログインしている場合は、アカウントをリンク
      if (auth.currentUser && credential) {
        try {
          await linkWithCredential(auth.currentUser, credential);
          // プロバイダー情報を更新
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            providers: arrayUnion('google'),
            updatedAt: serverTimestamp(),
          });
          return true;
        } catch (e) {
          const firebaseError = e as FirebaseError;
          if (firebaseError.code === 'auth/provider-already-linked') {
            setError('このGoogleアカウントは既に連携されています');
          } else if (firebaseError.code === 'auth/credential-already-in-use') {
            setError(
              'このGoogleアカウントは既に別のアカウントで使用されています'
            );
          } else {
            setError('アカウントの連携中にエラーが発生しました');
          }
          return false;
        }
      }

      // 新規ユーザーの場合は通常のログインフロー
      const userDoc = await getDoc(doc(db, 'users', user.uid));

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
          providers: ['google'],
        });
      } else {
        await updateLoginTimestamp(user.uid);
        await updateDoc(doc(db, 'users', user.uid), {
          providers: arrayUnion('google'),
          updatedAt: serverTimestamp(),
        });
      }

      return true;
    } catch (e) {
      const firebaseError = e as FirebaseError;
      let errorMessage = 'Googleログイン中にエラーが発生しました';

      if (firebaseError.code === 'auth/popup-closed-by-user') {
        errorMessage = 'ログインがキャンセルされました';
      } else if (firebaseError.code === 'auth/popup-blocked') {
        errorMessage =
          'ポップアップがブロックされました。ポップアップを許可してください';
      } else if (
        firebaseError.code === 'auth/account-exists-with-different-credential'
      ) {
        errorMessage = 'このメールアドレスは既に別の方法で登録されています';
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
    } catch (e) {
      const firebaseError = e as FirebaseError;
      let errorMessage = '登録中にエラーが発生しました';

      if (firebaseError.code === 'auth/email-already-in-use') {
        errorMessage = 'このメールアドレスは既に使用されています';
      } else if (firebaseError.code === 'auth/invalid-email') {
        errorMessage = 'メールアドレスの形式が正しくありません';
      } else if (firebaseError.code === 'auth/weak-password') {
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
    } catch (e) {
      const firebaseError = e as FirebaseError;
      let errorMessage = 'パスワードリセットメール送信中にエラーが発生しました';

      if (firebaseError.code === 'auth/user-not-found') {
        errorMessage = 'このメールアドレスのユーザーは見つかりませんでした';
      } else if (firebaseError.code === 'auth/invalid-email') {
        errorMessage = 'メールアドレスの形式が正しくありません';
      }

      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ユーザーアカウントの削除（退会）
  const deleteAccount = async (): Promise<boolean> => {
    if (!auth || !auth.currentUser || !db) return false;

    setError(null);
    setIsLoading(true);

    try {
      const user = auth.currentUser;

      // Firestoreからユーザーデータを削除
      await deleteDoc(doc(db, 'users', user.uid));

      // Firebaseユーザーを削除
      await user.delete();

      return true;
    } catch (e) {
      const firebaseError = e as FirebaseError;
      let errorMessage = '退会処理中にエラーが発生しました';

      if (firebaseError.code === 'auth/requires-recent-login') {
        errorMessage =
          '安全のため、再度ログインしてから退会手続きを行ってください';
      }

      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // お気に入りビールの切り替え
  const toggleFavoriteBeer = async (beerId: string): Promise<boolean> => {
    if (!auth || !auth.currentUser || !db || !user) return false;

    setError(null);
    setIsLoading(true);

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const currentFavorites = user.favoriteBeers || [];

      let updatedFavorites;
      if (currentFavorites.includes(beerId)) {
        updatedFavorites = currentFavorites.filter((id) => id !== beerId);
      } else {
        updatedFavorites = [...currentFavorites, beerId];
      }

      await updateDoc(userRef, {
        favoriteBeers: updatedFavorites,
        updatedAt: serverTimestamp(),
      });

      setUser({ ...user, favoriteBeers: updatedFavorites });
      return true;
    } catch (e) {
      const firebaseError = e as FirebaseError;
      console.error(
        'お気に入りビールの切り替え中にエラーが発生しました',
        firebaseError
      );
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
    deleteAccount,
    toggleFavoriteBeer,
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
