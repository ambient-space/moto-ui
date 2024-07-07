import { DemoCard } from '@/components/Card'
import { useCommunityStore } from '@/state/communityStore'
import { Input, ScrollView, View, YStack } from 'tamagui'

export default function CommunitiesScreen() {
  const communities = useCommunityStore((state) => state.communities)
  return (
    <View>
      <Input mx="$2" my="$5" placeholder="Search for communities" />

      <ScrollView>
        <YStack gap="$2" mx="$2">
          {communities.length > 0 &&
            communities.map((c) => (
              <DemoCard key={c.id} title={c.name} description={c.description} />
            ))}
        </YStack>
      </ScrollView>
    </View>
  )
}
