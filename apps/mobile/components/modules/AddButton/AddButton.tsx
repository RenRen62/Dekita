import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { memo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Button } from '@/components/bases/Button';

type AddButtonProps = {
  onPress: () => void;
};

const AddButton = ({ onPress }: AddButtonProps) => {
  return (
    <Button
      className='absolute bottom-6 right-6 h-16 w-16 items-center justify-center rounded-full bg-[#ff9e9e]'
      style={styles.shadow}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <FontAwesome6 name='add' size={20} color='white' />
    </Button>
  );
};

const styles = StyleSheet.create({
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

export default memo(AddButton);
