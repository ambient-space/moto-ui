import { DemoCard } from '@/components/Card'
import { useCommunityStore } from '@/state/communityStore'
import { useTripStore } from '@/state/tripStore'
import { router } from 'expo-router'
import {
  Button,
  H1,
  H3,
  Paragraph,
  ScrollView,
  Separator,
  Text,
  useTheme,
  XStack,
  YStack,
} from 'tamagui'

export default function HomeScreen() {
  const theme = useTheme()
  const communities = useCommunityStore((state) => state.communities)
  const trips = useTripStore((state) => state.trips)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack f={1} gap="$4" pt="$5" pb="$5">
        <YStack>
          <H1 textAlign="left" width="100%" px="$4" fontWeight="$2">
            Welcome to{' '}
            <Text fontWeight="$16" color="$green10Light">
              Moto
            </Text>
          </H1>
          <Paragraph textAlign="left" width="100%" px="$4" mb="$2">
            Find the best communities for you
          </Paragraph>
        </YStack>
        <XStack gap="$4" ai="center" jc="space-between" px="$4">
          <H3 textAlign="left">Trips near you</H3>
          <Button
            unstyled
            color="$blue10"
            onPress={() => {
              router.push('trips')
            }}
          >
            View more
          </Button>
        </XStack>
        <ScrollView
          horizontal
          style={{ flexGrow: 0 }}
          px="$4"
          showsHorizontalScrollIndicator={false}
        >
          <XStack gap="$4" pr="$4" py="$2" backgroundColor="$colorTransparent">
            {/* {trips.length > 0 &&
              trips.map((c) => (
                <DemoCard key={c.id} title={c.name} description={c.description} />
              ))} */}
          </XStack>
        </ScrollView>
        <Separator marginVertical={15} width="100%" px="$4" />
        <XStack gap="$4" ai="center" jc="space-between" px="$4">
          <H3 textAlign="left">Communities for you</H3>
          <Button
            unstyled
            color="$blue10"
            onPress={() => {
              router.push('communities')
            }}
          >
            View more
          </Button>
        </XStack>
        <ScrollView
          backgroundColor={theme.background05}
          horizontal
          style={{ flexGrow: 0 }}
          px="$4"
          showsHorizontalScrollIndicator={false}
        >
          <XStack gap="$4" pr="$4">
            {communities.length > 0 &&
              communities.map((c) => (
                <DemoCard
                  key={c.id}
                  title={c.name}
                  description={c.description}
                  memberCount={c.memberCount}
                  members={c.members}
                />
              ))}
          </XStack>
        </ScrollView>
      </YStack>
    </ScrollView>
  )
}
