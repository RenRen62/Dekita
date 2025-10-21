import { useRef, useCallback } from 'react';

/**
 * 連打防止用のdebounceフック
 * @param duration デフォルトの無効化時間（ミリ秒）
 * @returns debounce関数
 */
export const useDebounce = (duration = 1000) => {
  const canPress = useRef<boolean>(true);

  // 指定時間内の連打を防止する関数
  const debounce = useCallback(
    (onPress: () => void) => {
      // ボタン押下可能状態ならonPressを実行し、指定時間だけボタン押下不可にする
      if (canPress.current === true) {
        canPress.current = false;
        onPress();
        setTimeout(() => {
          canPress.current = true;
        }, duration);
      }
    },
    [duration]
  );

  return { debounce };
};
