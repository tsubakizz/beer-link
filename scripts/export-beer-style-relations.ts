/**
 * ビールスタイルの別名データとスタイル間の関連データをFirestoreから取得してCSVファイルを作成するスクリプト
 *
 * 使用方法:
 * 1. npm run tsc -- -p scripts
 * 2. node dist/scripts/export-beer-style-relations.js
 */

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Firebaseの設定
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

// ビールスタイルの別名の型定義
interface BeerStyleOtherName {
  id: number; // レコードのID
  styleId: string; // 参照元のスタイルスラッグ
  name: string; // 別名
}

// ビールスタイルの関連性の型定義
interface BeerStyleRelation {
  id: number; // レコードのID
  styleId: string; // 参照元のスタイルスラッグ
  relatedStyleId: string; // 関連先のスタイルスラッグ
  relationType: number; // 関係タイプ（1=兄弟関係、2=親関係、3=子関係）
}

// ビールスタイルIDとスラッグのマッピング用インターフェース
interface BeerStyleMapping {
  id: number;
  slug: string;
  name: string;
}

async function exportBeerStyleData() {
  try {
    console.log(
      'ビールスタイルの別名データと関連性データの取得を開始します...'
    );

    // ビールスタイルのマッピング情報を取得
    const stylesMappings = await getBeerStyleMappings();

    // ビールスタイルの別名データを取得
    const otherNames = await getBeerStyleOtherNames(stylesMappings);

    // ビールスタイルの関連性データを取得
    const relations = await getBeerStyleRelations(stylesMappings);

    // CSVファイルの出力先ディレクトリを作成
    const csvDir = path.join(__dirname, '..', 'csv');
    if (!fs.existsSync(csvDir)) {
      fs.mkdirSync(csvDir, { recursive: true });
    }

    // ビールスタイルの別名データをCSVに変換して保存
    const otherNamesCsv = convertToCSV(otherNames, ['id', 'styleId', 'name']);
    fs.writeFileSync(
      path.join(csvDir, 'beer-style-other-names.csv'),
      otherNamesCsv
    );

    // ビールスタイルの関連性データをCSVに変換して保存
    const relationsCsv = convertToCSV(relations, [
      'id',
      'styleId',
      'relatedStyleId',
      'relationType',
    ]);
    fs.writeFileSync(
      path.join(csvDir, 'beer-style-relations.csv'),
      relationsCsv
    );

    console.log('CSVファイルの出力が完了しました:');
    console.log(`- ${path.join(csvDir, 'beer-style-other-names.csv')}`);
    console.log(`- ${path.join(csvDir, 'beer-style-relations.csv')}`);
  } catch (error) {
    console.error('エラーが発生しました:', error);
    process.exit(1);
  }
}

// ビールスタイルのIDとスラッグのマッピング情報を取得する関数
async function getBeerStyleMappings(): Promise<BeerStyleMapping[]> {
  console.log('ビールスタイルのマッピング情報を取得しています...');

  const stylesCollection = collection(db, 'beer-styles');
  const stylesSnapshot = await getDocs(stylesCollection);

  const styleMappings: BeerStyleMapping[] = [];
  let id = 1;

  stylesSnapshot.forEach((doc) => {
    styleMappings.push({
      id: id++,
      slug: doc.id,
      name: doc.data().name,
    });
  });

  console.log(
    `${styleMappings.length} 件のビールスタイルマッピングを取得しました。`
  );
  return styleMappings;
}

// ビールスタイルの別名データを取得する関数
async function getBeerStyleOtherNames(
  styleMappings: BeerStyleMapping[]
): Promise<BeerStyleOtherName[]> {
  console.log('ビールスタイルの別名データを取得しています...');

  const otherNames: BeerStyleOtherName[] = [];
  let otherId = 1; // IDの初期値

  // Firestoreからビールスタイルごとの別名データを取得
  for (const style of styleMappings) {
    const styleDoc = doc(db, 'beer-styles', style.slug);
    const styleData = await getDoc(styleDoc);

    if (styleData.exists() && styleData.data().other_name) {
      const names = styleData.data().other_name;
      if (Array.isArray(names)) {
        names.forEach((name) => {
          otherNames.push({
            id: otherId++, // 連番IDを割り当て
            styleId: style.slug,
            name: name,
          });
        });
      }
    }
  }

  console.log(
    `${otherNames.length} 件のビールスタイル別名データを取得しました。`
  );
  return otherNames;
}

// ビールスタイルの関連性データを取得する関数
async function getBeerStyleRelations(
  styleMappings: BeerStyleMapping[]
): Promise<BeerStyleRelation[]> {
  console.log('ビールスタイルの関連性データを取得しています...');

  const relations: BeerStyleRelation[] = [];

  // Firestoreからビールスタイルごとの関連データを取得
  for (const style of styleMappings) {
    const styleDoc = doc(db, 'beer-styles', style.slug);
    const styleData = await getDoc(styleDoc);

    if (styleData.exists()) {
      const data = styleData.data();

      // 兄弟関係の処理
      if (data.siblings && Array.isArray(data.siblings)) {
        data.siblings.forEach((siblingSlug) => {
          relations.push({
            id: relations.length + 1, // IDを生成
            styleId: style.slug,
            relatedStyleId: siblingSlug,
            relationType: 1, // 1=兄弟関係
          });
        });
      }

      // 親関係の処理
      if (data.parents && Array.isArray(data.parents)) {
        data.parents.forEach((parentSlug) => {
          relations.push({
            id: relations.length + 1, // IDを生成
            styleId: style.slug,
            relatedStyleId: parentSlug,
            relationType: 2, // 2=親関係
          });
        });
      }

      // 子関係の処理
      if (data.children && Array.isArray(data.children)) {
        data.children.forEach((childSlug) => {
          relations.push({
            id: relations.length + 1, // IDを生成
            styleId: style.slug,
            relatedStyleId: childSlug,
            relationType: 3, // 3=子関係
          });
        });
      }
    }
  }

  console.log(
    `${relations.length} 件のビールスタイル関連性データを取得しました。`
  );
  return relations;
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
exportBeerStyleData();
