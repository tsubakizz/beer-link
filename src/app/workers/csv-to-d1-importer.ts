/// <reference types="@cloudflare/workers-types" />

/**
 * Cloudflare WorkerでR2ストレージからCSVを読み込み、D1データベースにインポートするスクリプト
 */

// CSVの行を解析する関数
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

// CSVを解析してオブジェクトの配列に変換する関数（カラム名のマッピングを追加）
async function parseCSV(
  csvContent: string,
  columnMappings?: Record<string, string>
): Promise<Record<string, any>[]> {
  // 改行でCSVを分割
  const lines = csvContent.split(/\r?\n/);

  if (lines.length === 0) {
    return [];
  }

  // ヘッダー行を取得
  const originalHeaders = parseCSVLine(lines[0]);

  // カラム名のマッピング処理
  const headers = columnMappings
    ? originalHeaders.map((header) => columnMappings[header] || header)
    : originalHeaders;

  console.log('Original headers:', originalHeaders);
  console.log('Mapped headers:', headers);

  const results: Record<string, any>[] = [];

  // 各データ行を処理
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // 空行をスキップ

    const values = parseCSVLine(line);

    // 空の行や空の値だけの行をスキップ（データとして有効でない行を防ぐ）
    if (
      values.length === 0 ||
      values.every((val) => val === null || val === '' || val === undefined)
    ) {
      console.warn(`スキップ: 行 ${i + 1} には有効なデータがありません`);
      continue;
    }

    const obj: Record<string, any> = {};

    // 各フィールドを適切な型に変換
    headers.forEach((header, index) => {
      if (index < values.length) {
        const value = values[index];

        if (value === '') {
          obj[header] = null;
        }
        // 数値の場合は変換
        else if (!isNaN(Number(value)) && value !== '') {
          obj[header] = Number(value);
        }
        // JSONオブジェクトの場合はパース
        else if (value && value.startsWith('{') && value.endsWith('}')) {
          try {
            obj[header] = JSON.parse(value);
          } catch (e) {
            console.warn(`JSONパースエラー: ${value}`);
            obj[header] = value;
          }
        } else {
          // その他の値はそのまま
          obj[header] = value;
        }
      }
    });

    results.push(obj);
  }

  return results;
}

// R2からファイルを取得する関数
async function getFileFromR2(
  r2: R2Bucket,
  key: string
): Promise<string | null> {
  const object = await r2.get(key);

  if (!object) {
    return null;
  }

  return await object.text();
}

// D1にデータを挿入する関数（型変換を強化）
async function insertDataToD1(
  d1: D1Database,
  tableName: string,
  data: Record<string, any>[]
): Promise<void> {
  // テーブルスキーマの取得
  let columnInfo: Record<
    string,
    { name: string; type: string; notnull?: number }
  > = {};
  let primaryKeyColumn = 'id'; // デフォルトのプライマリキー

  try {
    // PRAGMA table_info はメタデータクエリなので D1Result ではなく通常の結果を返します
    const schemaStmt = d1.prepare(`PRAGMA table_info(${tableName})`);
    const schemaResult = await schemaStmt.all();

    if (schemaResult && schemaResult.results) {
      columnInfo = schemaResult.results.reduce(
        (
          acc: Record<string, { name: string; type: string; notnull?: number }>,
          col: any
        ) => {
          acc[col.name] = {
            name: col.name,
            type: (col.type || 'text').toLowerCase(),
            notnull: col.notnull,
          };
          // プライマリキーを検出
          if (col.pk === 1) {
            primaryKeyColumn = col.name;
          }
          return acc;
        },
        {}
      );
      console.log(`テーブル ${tableName} のスキーマ情報:`, columnInfo);
      console.log(`テーブル ${tableName} のプライマリキー:`, primaryKeyColumn);
    } else {
      console.warn(
        `テーブル ${tableName} のスキーマ情報を取得できませんでした。デフォルト型を使用します。`
      );
    }
  } catch (error) {
    console.error(
      `スキーマ情報の取得中にエラーが発生しました: ${getErrorMessage(error)}`
    );
    // エラーが発生してもインポートを続行します - すべてテキストとして扱います
  }

  // トランザクション開始
  const statements = [];

  for (const item of data) {
    // NOT NULL制約のあるフィールドに値がない場合、デフォルト値を設定
    Object.keys(columnInfo).forEach((key) => {
      if (
        columnInfo[key].notnull === 1 &&
        (item[key] === null || item[key] === undefined)
      ) {
        if (key === 'slug' && item.name) {
          // slugがないが名前がある場合、名前からslugを生成
          item[key] = item.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .substring(0, 50);
        } else {
          // その他のNOT NULL制約のあるフィールドのデフォルト値
          switch (columnInfo[key].type) {
            case 'integer':
            case 'int':
              item[key] = 0;
              break;
            case 'real':
            case 'float':
            case 'double':
              item[key] = 0.0;
              break;
            case 'boolean':
            case 'bool':
              item[key] = 0;
              break;
            default:
              item[key] = '';
          }
        }
        console.warn(
          `${tableName}.${key}にNOT NULL制約があるため、デフォルト値を設定しました:`,
          item[key]
        );
      }
    });

    // オブジェクトからキーと値を抽出
    const keys = Object.keys(item).filter(
      (key) => item[key] !== null && item[key] !== undefined
    );

    if (keys.length === 0) {
      console.warn('スキップ: 有効なフィールドがありません', item);
      continue;
    }

    const placeholders = keys.map(() => '?').join(', ');
    const values = keys.map((key) => {
      const val = item[key];
      const columnType = columnInfo[key]?.type || 'text';

      if (val === null || val === undefined) {
        return null;
      }

      // データ型に基づいて適切に変換
      if (columnType.includes('int')) {
        // 整数型
        return Number.isNaN(Number(val)) ? 0 : parseInt(String(val), 10);
      } else if (
        columnType.includes('real') ||
        columnType.includes('float') ||
        columnType.includes('double')
      ) {
        // 浮動小数点型
        return Number.isNaN(Number(val)) ? 0.0 : parseFloat(String(val));
      } else if (columnType.includes('bool')) {
        // 真偽値型
        return val === true || val === 1 || val === '1' || val === 'true'
          ? 1
          : 0;
      } else if (typeof val === 'object') {
        // オブジェクトや配列はJSON文字列に変換
        return JSON.stringify(val);
      }

      // その他の型（text など）はそのまま文字列として返す
      return String(val);
    });

    try {
      // プライマリキーがデータに含まれているかチェック
      if (keys.includes(primaryKeyColumn)) {
        // ON CONFLICT DO UPDATE 構文を使用したUPSERTクエリ作成
        const updateParts = keys
          .filter((key) => key !== primaryKeyColumn)
          .map((key) => `${key} = excluded.${key}`);

        if (updateParts.length === 0) {
          // 更新するフィールドがない場合は単純なINSERT OR IGNOREに
          const stmt = d1.prepare(
            `INSERT OR IGNORE INTO ${tableName} (${keys.join(
              ', '
            )}) VALUES (${placeholders})`
          );
          statements.push(stmt.bind(...values));
        } else {
          // UPSERT構文 (INSERT ... ON CONFLICT DO UPDATE)
          const stmt = d1.prepare(
            `INSERT INTO ${tableName} (${keys.join(
              ', '
            )}) VALUES (${placeholders})
             ON CONFLICT(${primaryKeyColumn}) DO UPDATE SET ${updateParts.join(
              ', '
            )}`
          );
          statements.push(stmt.bind(...values));
        }
      } else {
        // プライマリキーがない場合は単純なINSERTを実行
        const stmt = d1.prepare(
          `INSERT INTO ${tableName} (${keys.join(
            ', '
          )}) VALUES (${placeholders})`
        );
        statements.push(stmt.bind(...values));
      }
    } catch (error) {
      console.error(
        `${tableName} テーブルへのデータ準備中にエラー: ${getErrorMessage(
          error
        )}`
      );
      console.error('問題のデータ:', item);
      throw error;
    }
  }

  // バッチ実行
  if (statements.length > 0) {
    try {
      await d1.batch(statements);
      console.log(
        `${tableName} テーブルに ${statements.length} 件のデータを挿入しました`
      );
    } catch (error) {
      console.error(
        `${tableName} テーブルへのデータ挿入中にエラー: ${getErrorMessage(
          error
        )}`
      );
      // エラーが発生した場合は最初の数件のデータを個別に挿入してエラー箇所を特定
      for (let i = 0; i < Math.min(statements.length, 5); i++) {
        try {
          await statements[i].run();
        } catch (err) {
          console.error(
            `データ ${i + 1} の挿入でエラー: ${getErrorMessage(err)}`
          );
        }
      }
      throw error;
    }
  }
}

// エラーオブジェクトからメッセージを安全に取得する関数
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }
  return String(error);
}

// SQLステートメントを適切に分割する関数
function splitSqlStatements(sql: string): string[] {
  // コメント行を削除
  const sqlWithoutComments = sql.replace(/\/\/.*$/gm, '');

  // statement-breakpointをセミコロンに置き換え
  const normalizedSql = sqlWithoutComments.replace(
    /-->\s*statement-breakpoint/g,
    ';'
  );

  // セミコロンで分割し、空白を除去して、空の文を除外
  return normalizedSql
    .split(';')
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);
}

// SQL文を実行する関数（エラー処理を強化）
async function executeSql(db: D1Database, sql: string): Promise<void> {
  try {
    // SQLが複数行にまたがる場合、改行を空白に置き換えて整形
    const formattedSql = sql.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    await db.exec(formattedSql);
  } catch (err) {
    console.error(`SQL実行エラー: ${getErrorMessage(err)}`);
    console.error(`問題のSQL: ${sql}`);
    throw err;
  }
}

// メインハンドラー
export default {
  async fetch(request: Request, env: any): Promise<Response> {
    try {
      const url = new URL(request.url);
      const action = url.searchParams.get('action');

      // 認証キーを確認（簡易的なセキュリティ、本番環境ではより堅牢な認証が必要）
      const authKey = url.searchParams.get('key');
      if (authKey !== env.AUTH_KEY) {
        return new Response('認証エラー', { status: 401 });
      }

      // データベース初期化アクション
      if (action === 'init') {
        // マイグレーションSQLファイルをR2から取得
        const migrationSQL = await getFileFromR2(
          env.DATA_BUCKET,
          'migrations/0000_clean_chat.sql'
        );

        if (!migrationSQL) {
          return new Response('マイグレーションファイルが見つかりません', {
            status: 404,
          });
        }

        // SQLを適切に分割して実行
        const statements = splitSqlStatements(migrationSQL);
        console.log(`${statements.length}個のSQLステートメントを実行します`);

        for (let i = 0; i < statements.length; i++) {
          const sql = statements[i];
          if (sql.trim()) {
            try {
              console.log(
                `実行中 (${i + 1}/${statements.length}): ${sql.substring(
                  0,
                  50
                )}...`
              );
              // 修正: executeSql関数を使用
              await executeSql(env.DB, sql);
            } catch (err) {
              return new Response(
                `SQLエラー (ステートメント ${i + 1}): ${getErrorMessage(
                  err
                )}\n\nSQL: ${sql}`,
                {
                  status: 500,
                }
              );
            }
          }
        }

        return new Response(
          `データベース構造の初期化が完了しました。${statements.length}個のステートメントを実行しました。`,
          {
            status: 200,
          }
        );
      }

      // テーブルクリアアクション
      if (action === 'clear') {
        await env.DB.exec('DELETE FROM beer_style_other_names');
        await env.DB.exec('DELETE FROM beer_style_relations');
        await env.DB.exec('DELETE FROM beer_styles');

        return new Response('テーブルのクリアが完了しました', { status: 200 });
      }

      // データインポートアクション
      if (action === 'import') {
        try {
          // ビールスタイルCSVをインポート
          const beerStylesCSV = await getFileFromR2(
            env.DATA_BUCKET,
            'beer-styles.csv'
          );
          if (beerStylesCSV) {
            const beerStylesData = await parseCSV(beerStylesCSV);
            await insertDataToD1(env.DB, 'beer_styles', beerStylesData);
          }

          // ビールスタイル関係CSVをインポート
          const relationsCSV = await getFileFromR2(
            env.DATA_BUCKET,
            'beer-style-relations.csv'
          );
          if (relationsCSV) {
            const relationsData = await parseCSV(relationsCSV);
            await insertDataToD1(env.DB, 'beer_style_relations', relationsData);
          }

          // ビールスタイル別名CSVをインポート
          const otherNamesCSV = await getFileFromR2(
            env.DATA_BUCKET,
            'beer-style-other-names.csv'
          );
          if (otherNamesCSV) {
            const otherNamesData = await parseCSV(otherNamesCSV);
            await insertDataToD1(
              env.DB,
              'beer_style_other_names',
              otherNamesData
            );
          }

          return new Response('データのインポートが完了しました', {
            status: 200,
          });
        } catch (error) {
          return new Response(
            `データのインポート中にエラーが発生しました: ${getErrorMessage(
              error
            )}`,
            {
              status: 500,
            }
          );
        }
      }

      // アクションが指定されていない場合
      return new Response(
        '使用方法: ?action=[init|clear|import]&key=YOUR_AUTH_KEY',
        { status: 400 }
      );
    } catch (error) {
      console.error('エラーが発生しました:', getErrorMessage(error));
      return new Response(`エラー: ${getErrorMessage(error)}`, { status: 500 });
    }
  },
};
