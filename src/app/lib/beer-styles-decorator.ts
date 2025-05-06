/**
* アルコール度数を表示用の文字列に変換する
* @param abv アルコール度数の範囲 [最小値, 最大値]
* @returns 「5.0～6.5%」のような表示用の文字列
*/
export function formatAbv(abv: number[]): string {
 if (abv[0] === abv[1]) {
   return `${abv[0].toFixed(1)}%`;
 }
 return `${abv[0].toFixed(1)}～${abv[1].toFixed(1)}%`;
}

/**
* 国際苦味単位(IBU)を表示用の文字列に変換する
* @param ibu IBUの範囲 [最小値, 最大値]
* @returns 「20～40」のような表示用の文字列
*/
export function formatIbu(ibu: number[]): string {
 // IBUが0-0の場合（該当なし）
 if (ibu[0] === 0 && ibu[1] === 0) {
   return '-';
 }
 // 最小値と最大値が同じ場合
 if (ibu[0] === ibu[1]) {
   return `${ibu[0]}`;
 }
 // 範囲で表示
 return `${ibu[0]}～${ibu[1]}`;
}

/**
* 色度(SRM)を表示用の文字列に変換する
* @param srm SRMの範囲 [最小値, 最大値]
* @returns 「5～10」のような表示用の文字列
*/
export function formatSrm(srm: number[]): string {
 if (srm[0] === srm[1]) {
   return `${srm[0]}`;
 }
 return `${srm[0]}～${srm[1]}`;
}

/**
* 推奨飲用温度を表示用の文字列に変換する
* @param temp 温度の範囲 [最小値, 最大値]（摂氏）
* @returns 「4～8℃」のような表示用の文字列
*/
export function formatServingTemperature(temp: number[]): string {
 if (temp[0] === temp[1]) {
   return `${temp[0]}℃`;
 }
 return `${temp[0]}～${temp[1]}℃`;
}

// 短い説明を生成するヘルパー関数
export function createShortDescription(description: string): string {
  const endOfFirstSentence = description.indexOf('。');
  return endOfFirstSentence > 0 && endOfFirstSentence < 100
    ? description.substring(0, endOfFirstSentence + 1)
    : description.substring(0, 100) + '...';
}
