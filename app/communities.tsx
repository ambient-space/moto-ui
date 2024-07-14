import { CommunityCard } from '@/components/CommunityCard'
import { useCommunityStore } from '@/state/communityStore'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

export default function CommunitiesScreen() {
  const communities = useCommunityStore((state) => state.communities)
  return (
    <SafeAreaView style={{ height: '100%' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        <YStack gap="$2" mx="$2">
          {communities.length > 0 &&
            communities.map((c) => (
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
            ))}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
