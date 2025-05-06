// Firebase設定
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
  getAnalytics,
  isSupported,
  setAnalyticsCollectionEnabled,
} from 'firebase/analytics';

// ボット検出用のユーザーエージェントパターン
const BOT_UA_PATTERNS = [
  /bot/i,
  /spider/i,
  /crawl/i,
  /API-Services/i,
  /AdsBot/i,
  /Googlebot/i,
  /mediapartners/i,
  /AdsBot-Google/i,
  /bingbot/i,
  /Slurp/i,
  /DuckDuckBot/i,
  /Baiduspider/i,
  /YandexBot/i,
  /Sogou/i,
  /exabot/i,
  /facebot/i,
  /ia_archiver/i,
  /semrush/i,
  /seznambot/i,
  /Bytespider/i,
  /applebot/i,
  /Screaming Frog/i,
  /Pingdom/i,
  /PhantomJS/i,
  /headless/i,
];

// ボットかどうかを判定する関数
const isBot = (userAgent: string): boolean => {
  // User-Agentがない場合はボットとみなす
  if (!userAgent) return true;

  // ボットパターンに一致するかチェック
  return BOT_UA_PATTERNS.some((pattern) => pattern.test(userAgent));
};

// Firebase設定オブジェクト
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

// Firebaseアプリの初期化（既に初期化されている場合は既存のアプリを取得）
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase認証、Firestore、Storageのインスタンスを取得
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics インスタンス
let analytics: any = null;

// クライアントサイドでのみAnalyticsを初期化
if (typeof window !== 'undefined') {
  // Analytics サポートの確認と初期化（ボットでない場合のみ）
  const initAnalytics = async () => {
    try {
      const isAnalyticsSupported = await isSupported();

      if (isAnalyticsSupported) {
        analytics = getAnalytics(app);

        // ボットチェック - クライアントサイドでのみ実行
        const userAgent = window.navigator.userAgent;
        const botDetected = isBot(userAgent);

        // ボットの場合はアナリティクスの収集を無効化
        setAnalyticsCollectionEnabled(analytics, !botDetected);

        if (botDetected) {
          console.log('Bot detected, analytics disabled');
        }
      }
    } catch (error) {
      console.error('Analytics initialization error:', error);
    }
  };

  initAnalytics();
}

export { auth, db, storage, analytics };
