import { CommunityCard } from '@/components/CommunityCard'
import { useCommunityStore } from '@/state/communityStore'
import { useTripStore } from '@/state/tripStore'
import { router } from 'expo-router'
import { Button, H1, H3, Paragraph, ScrollView, Text, XStack, YStack } from 'tamagui'
import { TripCard } from '@/components/TripCard'
import { useEffect } from 'react'

export default function HomeScreen() {
  const { communities, fetchCommunities } = useCommunityStore((state) => state)
  const { trips, fetchTrips } = useTripStore((state) => state)

  useEffect(() => {
    fetchTrips()
    fetchCommunities()
  }, [])

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
        {trips.length > 0 ? (
          <ScrollView
            contentContainerStyle={{
              backgroundColor: '$colorTransparent',
            }}
            horizontal
            style={{ flexGrow: 0 }}
            px="$4"
            showsHorizontalScrollIndicator={false}
          >
            <XStack gap="$4" pr="$4">
              {trips.length > 0 &&
                trips.map((t) => (
                  <TripCard
                    key={t.id}
                    title={t.name}
                    startDate={new Date(t.startDate).toLocaleString()}
                    startLocation={t.startLocation}
                    description={t.description}
                    participants={t.participants}
                    participantCount={t.participantCount}
                    onPress={() => {
                      router.push(`trip/${t.id}`)
                    }}
                  />
                ))}
            </XStack>
          </ScrollView>
        ) : (
          <Text px="$4">No trips found</Text>
        )}
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
        {communities.length > 0 ? (
          <ScrollView
            contentContainerStyle={{
              backgroundColor: '$colorTransparent',
            }}
            horizontal
            style={{ flexGrow: 0 }}
            px="$4"
            showsHorizontalScrollIndicator={false}
          >
            <XStack gap="$4" pr="$4">
              {communities.map((c) => (
                <CommunityCard
                  key={c.id}
                  title={c.name}
                  description={c.description}
                  memberCount={c.memberCount}
                  members={c.members}
                  w="$18"
                  onPress={() => {
                    router.push(`community/${c.id}`)
                  }}
                />
              ))}
            </XStack>
          </ScrollView>
        ) : (
          <Text px="$4">No communities found</Text>
        )}
      </YStack>
    </ScrollView>
  )
}
