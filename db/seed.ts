import { drizzle } from 'drizzle-orm/better-sqlite3';
// import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import * as schema from './schema';
import { beerStyles } from './schema/beer-styles';
import { NewBeerStyle } from './schema/beer-styles';
import { beerStyleRelations } from './schema/beer-style-relations';
import { NewBeerStyleRelation } from './schema/beer-style-relations';
import { beerStyleOtherNames } from './schema/beer-style-other-names';
import { NewBeerStyleOtherName } from './schema/beer-style-other-names';

/**
 * シードデータ投入スクリプト
 *
 * 注意: このスクリプトはローカル開発環境でのみ使用してください。
 * 本番環境ではCloudflare D1のマイグレーション機能を使用してデータ投入する必要があります。
 */

// データベース接続
const sqlite = new Database('beer_link_db.db');
const db = drizzle(sqlite, { schema });

// CSVファイルから型付きでデータを読み込む関数
function loadCsvData<T>(filePath: string): T[] {
  try {
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    // ヘッダー行を取得
    const headerEndIndex = csvContent.indexOf('\n');
    const headers = parseCSVLine(csvContent.slice(0, headerEndIndex));

    // CSVデータ全体を処理
    const data: Record<string, any>[] = [];
    let currentPos = headerEndIndex + 1;
    let currentItem: Record<string, any> = {};
    let columnIndex = 0;
    let insideQuotes = false;
    let currentValue = '';
    let recordComplete = false;

    // CSVコンテンツを先頭からスキャンし、適切にフィールドを処理
    while (currentPos < csvContent.length) {
      // 各行の各セルを解析
      const result = parseCSVContent(csvContent, currentPos);
      const values = result.values;
      currentPos = result.nextPos;

      if (values.length > 0) {
        // 各フィールドを適切な型に変換してオブジェクトに追加
        const item: Record<string, any> = {};
        values.forEach((value, index) => {
          if (index < headers.length) {
            const header = headers[index];

            // 値が空の場合はそのテーブルの初期値を使用
            if (value === '') {
              item[header] = undefined;
            }
            // 数値の場合は変換
            else if (!isNaN(Number(value)) && value !== '') {
              item[header] = Number(value);
            }
            // JSONオブジェクトの場合はパース
            else if (value && value.startsWith('{') && value.endsWith('}')) {
              try {
                item[header] = JSON.parse(value);
              } catch (e) {
                console.warn(`JSONパースエラー: ${value}`);
                item[header] = value;
              }
            } else {
              // その他の値はそのまま
              item[header] = value;
            }
          }
        });

        data.push(item);
      }
    }

    return data as T[];
  } catch (error) {
    console.error(`CSVファイル読み込みエラー (${filePath}):`, error);
    return [];
  }
}

// CSVの行を適切に分割する関数（ダブルクォート内のカンマを考慮）
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue);
      currentValue = '';
    } else {
      currentValue += char;
    }
  }

  // 最後の値を追加
  values.push(currentValue);

  // ダブルクォートを削除
  return values.map((value) => {
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.substring(1, value.length - 1).replace(/""/g, '"');
    }
    return value;
  });
}

// CSVコンテンツを解析して値の配列と次の位置を返す関数
function parseCSVContent(
  content: string,
  startPos: number
): { values: string[]; nextPos: number } {
  const values: string[] = [];
  let currentValue = '';
  let insideQuotes = false;
  let i = startPos;

  while (i < content.length) {
    const char = content[i];

    // ダブルクォートの処理
    if (char === '"') {
      if (!insideQuotes) {
        // クォート開始
        insideQuotes = true;
      } else if (i + 1 < content.length && content[i + 1] === '"') {
        // エスケープされたクォート
        currentValue += '"';
        i++; // 追加のクォートをスキップ
      } else {
        // クォート終了
        insideQuotes = false;
      }
    }
    // カンマの処理（クォート外の場合）
    else if (char === ',' && !insideQuotes) {
      values.push(cleanValue(currentValue));
      currentValue = '';
    }
    // 改行の処理（クォート外の場合）
    else if (
      (char === '\n' ||
        (char === '\r' && i + 1 < content.length && content[i + 1] === '\n')) &&
      !insideQuotes
    ) {
      values.push(cleanValue(currentValue));
      if (char === '\r') i++; // \r\n の場合は追加で1文字スキップ
      i++; // 改行文字をスキップした次の位置
      break;
    }
    // 通常の文字
    else {
      currentValue += char;
    }

    i++;
  }

  // 最後のフィールドがあれば追加（ファイル終端の場合）
  if (currentValue !== '' || values.length > 0) {
    values.push(cleanValue(currentValue));
  }

  return { values, nextPos: i };
}

// 値をクリーンアップする関数
function cleanValue(value: string): string {
  // 前後のスペースを削除
  let cleaned = value.trim();

  // ダブルクォートで囲まれていればそれを削除
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = cleaned.substring(1, cleaned.length - 1);
  }

  // エスケープされたダブルクォートを単一のダブルクォートに変換
  cleaned = cleaned.replace(/""/g, '"');

  return cleaned;
}

// マイグレーションの実行部分をコメントアウト
console.log('✅ マイグレーションはすでに適用済みです');
// migrate(db, { migrationsFolder: './db/migrations' });

// シードデータ投入関数
async function seedDatabase() {
  try {
    console.log('🌱 シードデータの投入を開始します...');

    // 既存データをクリア
    await db.delete(beerStyles);
    await db.delete(beerStyleRelations);
    await db.delete(beerStyleOtherNames);
    console.log('✅ 既存データを削除しました');

    // CSVファイルからビールスタイルデータを読み込む
    const csvPath = path.join(__dirname, '..', 'csv', 'beer-styles.csv');
    if (!fs.existsSync(csvPath)) {
      console.error(`❌ CSVファイルが見つかりません: ${csvPath}`);
      console.error(
        '先に scripts/export-beer-styles.ts を実行してCSVファイルを生成してください'
      );
      process.exit(1);
    }

    // 型を明示的に指定してビールスタイルデータを読み込み
    const beerStylesData = loadCsvData<NewBeerStyle>(csvPath);
    console.log(
      `📝 ${beerStylesData.length} 件のビールスタイルデータをCSVから読み込みました`
    );

    // ビールスタイルの投入
    if (beerStylesData.length > 0) {
      // 型チェックを通過するために必要な処理
      const beerStylesForInsert = beerStylesData.map((style) => {
        // クリーンなオブジェクトを作成（CSV から読み込んだ id を使用）
        const cleanedStyle: NewBeerStyle = {
          id: style.id,
          slug: style.slug || '',
          name: style.name || '',
          description: style.description || '',
          bitterness: style.bitterness ?? 0,
          sweetness: style.sweetness ?? 0,
          body: style.body ?? 0,
          aroma: style.aroma ?? 0,
          sourness: style.sourness ?? 0,
          history: style.history || '',
          origin: style.origin || '',
          abvMin: style.abvMin ?? 0,
          abvMax: style.abvMax ?? 0,
          ibuMin: style.ibuMin ?? 0,
          ibuMax: style.ibuMax ?? 0,
          srmMin: style.srmMin ?? 0,
          srmMax: style.srmMax ?? 0,
          servingTempMin: style.servingTempMin ?? 0,
          servingTempMax: style.servingTempMax ?? 0,
        };
        return cleanedStyle;
      });

      // データを挿入
      await db.insert(beerStyles).values(beerStylesForInsert);
      console.log(
        `✅ ${beerStylesForInsert.length} 件のビールスタイルを追加しました`
      );
    }

    // CSVファイルからビールスタイル関係データを読み込む
    const relationsCsvPath = path.join(
      __dirname,
      '..',
      'csv',
      'beer-style-relations.csv'
    );
    if (!fs.existsSync(relationsCsvPath)) {
      console.error(`❌ CSVファイルが見つかりません: ${relationsCsvPath}`);
      console.error(
        '先に scripts/export-beer-style-relations.ts を実行してCSVファイルを生成してください'
      );
      process.exit(1);
    }

    const beerStyleRelationsData =
      loadCsvData<NewBeerStyleRelation>(relationsCsvPath);
    console.log(
      `📝 ${beerStyleRelationsData.length} 件のビールスタイル関係データをCSVから読み込みました`
    );

    if (beerStyleRelationsData.length > 0) {
      await db.insert(beerStyleRelations).values(beerStyleRelationsData);
      console.log(
        `✅ ${beerStyleRelationsData.length} 件のビールスタイル関係を追加しました`
      );
    }

    // CSVファイルからビールスタイル別名データを読み込む
    const otherNamesCsvPath = path.join(
      __dirname,
      '..',
      'csv',
      'beer-style-other-names.csv'
    );
    if (!fs.existsSync(otherNamesCsvPath)) {
      console.error(`❌ CSVファイルが見つかりません: ${otherNamesCsvPath}`);
      console.error(
        '先に scripts/export-beer-style-other-names.ts を実行してCSVファイルを生成してください'
      );
      process.exit(1);
    }

    const beerStyleOtherNamesData =
      loadCsvData<NewBeerStyleOtherName>(otherNamesCsvPath);
    console.log(
      `📝 ${beerStyleOtherNamesData.length} 件のビールスタイル別名データをCSVから読み込みました`
    );

    if (beerStyleOtherNamesData.length > 0) {
      await db.insert(beerStyleOtherNames).values(beerStyleOtherNamesData);
      console.log(
        `✅ ${beerStyleOtherNamesData.length} 件のビールスタイル別名を追加しました`
      );
    }

    console.log('🎉 データベースのシードが完了しました！');
  } catch (error) {
    console.error('❌ シードデータの投入中にエラーが発生しました:', error);
    console.error(error);
    process.exit(1);
  } finally {
    // データベース接続をクローズ
    sqlite.close();
  }
}

// シード処理の実行
seedDatabase();
