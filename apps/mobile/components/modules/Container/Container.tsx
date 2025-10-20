import React, { forwardRef, ForwardedRef, memo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
  RefreshControlProps,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

type ContainerProps = {
  children: React.ReactNode;
  style?: string;
  flexGrow?: number;
  scrollEnabled?: boolean;
  bgColor?: 'white' | 'beige';
  barStyle?: 'dark-content' | 'light-content';
  refreshControl?: React.ReactElement<RefreshControlProps>;
};

const Container = memo(
  forwardRef<ScrollView, ContainerProps>(
    (
      {
        children,
        style,
        flexGrow = 1,
        scrollEnabled = true,
        bgColor = 'white',
        barStyle = 'dark-content',
        refreshControl
      }: ContainerProps,
      ref: ForwardedRef<ScrollView>
    ) => {
      const content = (
        <View className={`mx-4 flex-1 ${style ?? ''}`}>{children}</View>
      );

      return (
        <SafeAreaProvider>
          <SafeAreaView
            className={`flex-1 ${bgColor === 'white' ? 'bg-white' : 'bg-beige'}`}
            edges={['left', 'right']}
          >
            <StatusBar
              barStyle={barStyle}
              translucent
              backgroundColor='transparent'
            />
            <KeyboardAvoidingView
              className={'flex-1'}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
              >
                {scrollEnabled ? (
                  <ScrollView
                    ref={ref}
                    contentContainerStyle={{ flexGrow }}
                    keyboardShouldPersistTaps='handled'
                    refreshControl={refreshControl}
                    showsVerticalScrollIndicator={false}
                  >
                    {content}
                  </ScrollView>
                ) : (
                  content
                )}
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </SafeAreaProvider>
      );
    }
  )
);

Container.displayName = 'Container';

export default Container;
