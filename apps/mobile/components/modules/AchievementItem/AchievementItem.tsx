import Octicons from '@expo/vector-icons/Octicons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/bases';
import { Button } from '@/components/bases/Button';
import { cn } from '@/utils';

type AchievementItemProps = {
  onPress: () => void;
  title: string;
  achievedAt: string;
  children?: React.ReactNode;
  mainColor?: keyof typeof colorStyle;
  subColor?: keyof typeof colorStyle;
  hasUnderLine: boolean;
};

const colorStyle = {
  pink: {
    bg: 'bg-primary',
    border: 'border-primary',
    hex: '#ff9e9e'
  },
  yellow: {
    bg: 'bg-yellow-400',
    border: 'border-yellow-400',
    hex: '#facc15'
  },
  blue: {
    bg: 'bg-sky-400',
    border: 'border-sky-400',
    hex: '#60a5fa'
  },
  green: {
    bg: 'bg-emerald-400',
    border: 'border-emerald-400',
    hex: '#34d399'
  },
  purple: {
    bg: 'bg-purple-400',
    border: 'border-purple-400',
    hex: '#a78bfa'
  }
};

const AchievementItem = ({
  onPress,
  title,
  achievedAt,
  children,
  mainColor = 'pink',
  subColor = 'pink',
  hasUnderLine
}: AchievementItemProps) => {
  return (
    <>
      <View className='w-full flex-row'>
        {/* アイコン */}
        <View className='ml-1 flex items-center justify-center'>
          <View
            className={cn(
              'h-[68px] w-[68px] items-center justify-center rounded-full',
              colorStyle[mainColor].bg
            )}
          >
            {children != null ? (
              children
            ) : (
              <Octicons name='trophy' size={24} color='white' />
            )}
          </View>
          {hasUnderLine && (
            <LinearGradient
              colors={[colorStyle[mainColor].hex, colorStyle[subColor].hex]}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ height: 64, width: 4 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            // <View className={cn('  h-16 w-1', colorStyle[mainColor].bg)} />
          )}
        </View>
        {/* テキスト */}
        <View className='ml-4 flex-1'>
          <Button onPress={onPress}>
            <Text className='text-gray-6 mt-[2px]'>{achievedAt}</Text>
            <Text
              className='mt-1 text-xl'
              numberOfLines={2}
              ellipsizeMode='tail'
            >
              {title}
            </Text>
          </Button>
        </View>
        {/* まる */}
        <View
          className={cn(
            'ml-2 mt-6 h-8 w-8 items-center justify-center rounded-full border-2 bg-white',
            colorStyle[mainColor].border
          )}
        />
      </View>
    </>
  );
};

export default memo(AchievementItem);
