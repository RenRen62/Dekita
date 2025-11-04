import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  Image,
  ImageSourcePropType
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/bases';
import { Button } from '@/components/bases/Button';
import { Gender, Role } from '@/types/person';

type SideMenuProps = {
  visible: boolean;
  onClose: () => void;
};

type ProfileItem = {
  role: Role;
  gender: Gender;
  age: number;
  label: string;
};

const profileList: ProfileItem[] = [
  { role: 'father', gender: 'male', age: 30, label: 'ますお' },
  { role: 'mother', gender: 'female', age: 30, label: 'さざえ' },
  { role: 'child', gender: 'male', age: 8, label: 'かつお' },
  { role: 'child', gender: 'female', age: 6, label: 'わかめ' },
  { role: 'child', gender: 'female', age: 2, label: 'たら' }
];

// 画像マップ
const profileImages = {
  father: require('@/images/profile/father.png'),
  mother: require('@/images/profile/mother.png'),
  son: require('@/images/profile/son.png'),
  daughter: require('@/images/profile/daughter.png'),
  baby: require('@/images/profile/baby.png')
};

// role、gender、ageに基づいて画像を取得する関数
const getProfileImage = (
  role: Role,
  gender: Gender,
  age: number
): ImageSourcePropType => {
  if (role === 'father') {
    return profileImages.father;
  }
  if (role === 'mother') {
    return profileImages.mother;
  }
  // roleがchildの場合
  const key = age < 3 ? 'baby' : gender === 'male' ? 'son' : 'daughter';
  return profileImages[key];
};

const SideMenu = ({ visible, onClose }: SideMenuProps) => {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsModalVisible(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -300,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => {
        setIsModalVisible(false);
      });
    }
  }, [visible, slideAnim, fadeAnim]);

  if (!isModalVisible) return null;

  return (
    <Modal
      animationType='none'
      transparent
      visible={true}
      onRequestClose={onClose}
    >
      <View className='flex-1 flex-row overflow-hidden'>
        <Animated.View
          className='absolute bottom-0 left-0 top-0 z-10 w-72 bg-white shadow-xl'
          style={{
            paddingTop: insets.top,
            transform: [{ translateX: slideAnim }]
          }}
        >
          <View className='border-b border-gray-200 px-4 py-4'>
            <Text className='text-xl font-bold text-primary'>プロフィール</Text>
          </View>
          <ScrollView className='flex-1'>
            {profileList.map((item, index) => (
              <Button
                key={index}
                onPress={() => {
                  // ToDo: 遷移処理
                  onClose();
                }}
                className='flex-row items-center px-4 py-4 active:bg-gray-100'
              >
                <View className='h-14 w-14 rounded-full'>
                  <Image
                    source={getProfileImage(item.role, item.gender, item.age)}
                    className='h-full w-full rounded-full'
                    fadeDuration={0}
                  />
                </View>
                <Text className='ml-4 text-lg font-semibold  text-gray-600'>
                  {item.label.length > 10
                    ? item.label.slice(0, 10) + '...'
                    : item.label}
                </Text>
              </Button>
            ))}
            <Button
              onPress={() => {
                // ToDo: プロフィール追加画面へ遷移
                null;
              }}
              text='+ 追加'
              variant='tertiary'
              className='mx-3 mb-20'
            />
          </ScrollView>
        </Animated.View>

        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            className='absolute inset-0 bg-black/50'
            style={{
              opacity: fadeAnim
            }}
          />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default SideMenu;
