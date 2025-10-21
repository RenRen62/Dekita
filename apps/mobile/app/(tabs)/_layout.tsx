import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React, { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/bases/Button';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const tabBarHeight = 80 + insets.bottom;
  const currentYear = useMemo(() => {
    return new Date().getFullYear().toString();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f5f5f5',
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60 + insets.top
        },
        tabBarActiveTintColor: '#ff9e9e',
        tabBarStyle: {
          backgroundColor: '#f5f5f5',
          borderTopColor: '#fffafa',
          height: tabBarHeight
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4
        },
        tabBarItemStyle: {
          paddingTop: 8
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'ホーム',
          tabBarIcon: ({ color }) => (
            <AntDesign name='unordered-list' size={24} color={color} />
          ),
          headerTitle: currentYear,
          headerTitleStyle: {
            fontSize: 22,
            color: '#ff9e9e',
            fontWeight: '700'
          },
          headerTitleAllowFontScaling: false,
          headerTitleAlign: 'left',
          headerRight: () => (
            <Button
              onPress={() => {
                // TODO: カレンダー編集機能
              }}
            >
              <MaterialIcons name='edit-calendar' size={24} color='#ff9e9e' />
            </Button>
          ),
          headerRightContainerStyle: {
            paddingRight: 14
          }
        }}
      />
      <Tabs.Screen
        name='setting'
        options={{
          title: '設定',
          tabBarIcon: ({ color }) => (
            <Feather name='settings' size={24} color={color} />
          ),
          headerTitle: '設定',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '700'
          },
          headerTitleAlign: 'left'
        }}
      />
    </Tabs>
  );
}
