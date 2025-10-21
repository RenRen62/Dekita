import { View } from 'react-native';
import { Text } from '@/components/bases';
import { Button } from '@/components/bases/Button';
import { AddButton, Container } from '@/components/modules';

export default function HomeScreen() {
  return (
    <>
      <Container>
        <View className='flex-1 items-center justify-center'>
          <Text className='text-2xl'>Home Screen</Text>
          <Button
            onPress={() => console.log('aaa')}
            text='次へ'
            variant='primary'
          />
        </View>
      </Container>
      <AddButton onPress={() => null} />
    </>
  );
}
