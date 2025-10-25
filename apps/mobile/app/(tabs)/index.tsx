import { View } from 'react-native';
import { AddButton, Container } from '@/components/modules';
import { AchievementItem } from '@/components/modules/AchievementItem';

const achievementList = [
  {
    title:
      '初めてのタッチ初めてのタッチ初めてのタッチ初めてのタッチ初めてのタッチ',
    achievedAt: '12/1',
    color: 'pink' as const
  },
  {
    title: 'お箸デビュー',
    achievedAt: '12/1',
    color: 'yellow' as const
  },
  {
    title: '初めての歯磨き',
    achievedAt: '12/12',
    color: 'pink' as const
  }
];

export default function HomeScreen() {
  return (
    <>
      <Container>
        <View className='mt-8 flex-1 items-center'>
          {achievementList.map((item, index) => (
            <AchievementItem
              key={index}
              title={item.title}
              achievedAt={item.achievedAt}
              onPress={() => console.log('Achievement pressed')}
              hasUnderLine={achievementList.length - 1 !== index}
              mainColor={item.color ?? 'pink'}
              subColor={achievementList[index + 1]?.color ?? 'pink'}
            />
          ))}
        </View>
      </Container>
      <AddButton onPress={() => null} />
    </>
  );
}
