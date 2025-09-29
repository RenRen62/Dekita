import dayjs from 'dayjs';

export function testUtilFunction() {
  console.log('Called testUtilFunction!!');

  // 現在時刻を YYYY-MM-DD HH:mm:ss 形式で取得
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');

  console.log('Current time:', now);

  return true;
}
