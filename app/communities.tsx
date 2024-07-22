import { CommunityCard } from '@/components/CommunityCard'
import { useCommunityStore } from '@/state/communityStore'
import { router } from 'expo-router'
import { FlatList, SafeAreaView } from 'react-native'
import { YStack } from 'tamagui'

export default function CommunitiesScreen() {
  const communities = useCommunityStore((state) => state.communities)
  return (
    <SafeAreaView style={{ height: '100%' }}>
      <YStack gap="$2" mx="$2">
        <FlatList
          data={communities}
          style={{ width: '100%', height: '100%' }}
          renderItem={({ item: c }) => (
            <CommunityCard
              key={c.id}
              title={c.name}
              description={c.description}
              memberCount={c.memberCount}
              members={c.members}
              onPress={() => {
                router.push(`community/${c.id}`)
              }}
            />
          )}
        />
      </YStack>
    </SafeAreaView>
  )
}
