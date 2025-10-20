// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Text, View } from 'react-native';
import { AddButton, Container } from '@/components/modules';

export default function HomeScreen() {
  return (
    <>
      <Container>
        <View className='flex-1 items-center justify-center'>
          <Text className='text-2xl text-red-500'>Home Screen</Text>
        </View>
      </Container>
      <AddButton onPress={() => null} />
    </>
  );
}
