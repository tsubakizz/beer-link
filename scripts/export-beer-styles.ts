/**
 * ビールスタイルデータをFirestoreから取得してCSVファイルを作成するスクリプト
 *
 * 使用方法:
 * 1. npm run tsc -- -p scripts
 * 2. node dist/scripts/export-beer-styles.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Firebaseの設定
// 注: 本番環境の認証情報は含めないでください
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ビールスタイルの型定義
interface BeerStyle {
  id: number; // 連番のID（主キー）
  slug: string; // FirestoreのIDをslugとして扱う
  name: string;
  description: string;
  bitterness?: number;
  sweetness?: number;
  body?: number;
  aroma?: number;
  sourness?: number;
  history?: string;
  origin?: string;
  abvMin?: number;
  abvMax?: number;
  ibuMin?: number;
  ibuMax?: number;
  srmMin?: number;
  srmMax?: number;
  servingTempMin?: number;
  servingTempMax?: number;
}

async function exportBeerStyles() {
  try {
    console.log('ビールスタイルデータの取得を開始します...');

    // ビールスタイルの取得
    const stylesCollection = collection(db, 'beer-styles');
    const stylesSnapshot = await getDocs(stylesCollection);

    const styles: BeerStyle[] = [];

    stylesSnapshot.forEach((doc) => {
      const data = doc.data();
      const style: BeerStyle = {
        id: styles.length + 1, // 連番のIDを生成
        slug: doc.id, // Firestoreのドキュメントidをslugとして扱う
        name: data.name,
        description: data.description,
        bitterness: data.characteristics.bitterness,
        sweetness: data.characteristics.sweetness,
        body: data.characteristics.body,
        aroma: data.characteristics.aroma,
        sourness: data.characteristics.sourness,
        history: data.history,
        origin: data.origin,
        abvMin: data.abv[0],
        abvMax: data.abv[1],
        ibuMin: data.ibu[0],
        ibuMax: data.ibu[1],
        srmMin: data.srm[0],
        srmMax: data.srm[1],
        servingTempMin: data.servingTemperature[0],
        servingTempMax: data.servingTemperature[1],
      };
      styles.push(style);
    });

    console.log(`${styles.length} 件のビールスタイルデータを取得しました。`);

    // CSVファイルの出力先ディレクトリを作成
    const csvDir = path.join(__dirname, '..', 'csv');
    if (!fs.existsSync(csvDir)) {
      fs.mkdirSync(csvDir, { recursive: true });
    }

    // ビールスタイルデータをCSVに変換
    const stylesCsv = convertToCSV(styles, [
      'id',
      'slug',
      'name',
      'description',
      'bitterness',
      'sweetness',
      'body',
      'aroma',
      'sourness',
      'history',
      'origin',
      'abvMin',
      'abvMax',
      'ibuMin',
      'ibuMax',
      'srmMin',
      'srmMax',
      'servingTempMin',
      'servingTempMax',
    ]);
    fs.writeFileSync(path.join(csvDir, 'beer-styles.csv'), stylesCsv);

    console.log('CSVファイルの出力が完了しました:');
    console.log(`- ${path.join(csvDir, 'beer-styles.csv')}`);
  } catch (error) {
    console.error('エラーが発生しました:', error);
    process.exit(1);
  }
}

// オブジェクトの配列をCSV形式の文字列に変換する関数
function convertToCSV(items: any[], headers: string[]): string {
  // ヘッダー行を作成
  const headerRow = headers.join(',');

  // データ行を作成
  const dataRows = items.map((item) => {
    return headers
      .map((header) => {
        const value = item[header];

        // 値がオブジェクトや配列の場合はJSON文字列に変換
        if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }

        // 文字列の場合はダブルクォートでエスケープ
        if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        }

        // null または undefined の場合は空文字列
        if (value === null || value === undefined) {
          return '';
        }

        // その他の場合はそのまま出力
        return value;
      })
      .join(',');
  });

  // ヘッダーとデータ行を結合して返す
  return [headerRow, ...dataRows].join('\n');
}

// スクリプトの実行
exportBeerStyles();
