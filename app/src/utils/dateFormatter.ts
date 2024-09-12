export function formatToJST(utcDateString: string): string {
  // UTCの日付文字列をDateオブジェクトに変換
  const date = new Date(utcDateString);

  // 日本標準時（JST）のオフセットを考慮した日時に変換
  const jstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9時間

  // 年、月、日を取得
  const year = jstDate.getFullYear();
  const month = String(jstDate.getMonth() + 1).padStart(2, "0"); // 月は0から始まるので+1
  const day = String(jstDate.getDate()).padStart(2, "0");

  // フォーマットした文字列を返す
  return `${year}.${month}.${day}`;
}
