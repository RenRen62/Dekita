import {
  ComponentProps,
  forwardRef,
  ForwardRefRenderFunction,
  useCallback
} from 'react';
import {
  GestureResponderEvent,
  Keyboard,
  Platform,
  TouchableOpacity as RNTouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import { Text } from '../Text';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/utils/classNames';

// ボタンの基本props
type BaseButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  disabled?: boolean;
  debounceTime?: number;
  activeOpacity?: number;
};

// テンプレートボタンのprops
type TemplateButtonProps = {
  children?: never;
  text: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  textStyle?: string;
};

// デフォルトボタンのprops
type DefaultButtonProps = {
  children: React.ReactNode;
  text?: never;
  variant?: never;
  size?: never;
  textStyle?: never;
};

type Props = (TemplateButtonProps | DefaultButtonProps) &
  BaseButtonProps &
  ComponentProps<typeof RNTouchableOpacity>;

const variantClass = {
  primary: {
    button: 'rounded-xl bg-primary',
    disabledButton: 'bg-gray-4'
  },
  secondary: {
    button: 'rounded-xl border border-primary bg-white',
    disabledButton: 'border-primary'
  },
  tertiary: {
    button: '',
    disabledButton: ''
  }
} as const;

const sizeClass = {
  small: 'h-8',
  medium: 'h-[38px] px-5 mx-auto ',
  large: 'self-stretch h-14'
};

const ButtonComponent: ForwardRefRenderFunction<View, Props> = (
  {
    children,
    onPress,
    text,
    variant = 'primary',
    size = 'large',
    disabled = false,
    debounceTime = 1000,
    ...props
  },
  ref
) => {
  const textColor =
    variant === 'primary'
      ? 'text-white'
      : disabled
        ? 'text-gray-4'
        : 'text-primary';

  const { debounce } = useDebounce(debounceTime);

  // キーボードを閉じてからボタンを押す
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      Keyboard.dismiss();
      debounce(() => onPress?.(event));
    },
    [debounce, onPress]
  );

  const isTemplateButton = text != null;

  return (
    <RNTouchableOpacity
      ref={ref}
      disabled={disabled}
      onPress={handlePress}
      activeOpacity={0.8}
      style={variant !== 'tertiary' && styles.shadow}
      {...props}
      className={cn(
        isTemplateButton && 'items-center justify-center',
        isTemplateButton && variantClass[variant]['button'],
        isTemplateButton && sizeClass[size],
        isTemplateButton && {
          [variantClass[variant]['disabledButton']]: disabled
        },
        props.className
      )}
    >
      {/* テンプレートボタンの場合はテキストを表示 */}
      {isTemplateButton ? (
        <Text
          className={cn(
            'text-xl font-bold',
            textColor,
            size === 'small' && 'text-sm'
          )}
        >
          {text}
        </Text>
      ) : (
        // 子ボタンの場合は子要素を表示
        children
      )}
    </RNTouchableOpacity>
  );
};

export const Button = forwardRef(ButtonComponent);

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6
        },
        shadowOpacity: 0.2,
        shadowRadius: 4
      },
      android: {
        elevation: 8
      }
    })
  }
});
