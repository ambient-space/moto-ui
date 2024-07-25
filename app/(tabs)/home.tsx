import { CommunityCard } from '@/components/CommunityCard'
import { useCommunityStore } from '@/state/communityStore'
import { useTripStore } from '@/state/tripStore'
import { router } from 'expo-router'
import { Button, H1, H3, Paragraph, ScrollView, Text, XStack, YStack } from 'tamagui'
import { useEffect } from 'react'
import { TripCard } from '@/components/TripCard'
import { FlatList } from 'react-native'

export default function HomeScreen() {
  const { communities, fetchCommunities } = useCommunityStore((state) => state)
  const { trips, fetchTrips } = useTripStore((state) => state)

  useEffect(() => {
    fetchTrips()
    fetchCommunities()
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack f={1} gap="$4" pb="$5">
        <YStack backgroundColor="$background" py="$6">
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
          <H3 textAlign="left">Upcoming Trips</H3>
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
        {/* {trips.length > 0 ? (
          <ScrollView
            contentContainerStyle={{
              backgroundColor: '$colorTransparent',
            }}
            horizontal
            style={{ flexGrow: 0 }}
            px="$4"
            showsHorizontalScrollIndicator={false}
          >
            <XStack gap="$4">
              {trips.map((t) => (
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
        )} */}

        {trips.length > 0 ? (
          <FlatList
            data={trips}
            renderItem={({ item }) => (
              <TripCard
                key={item.id}
                title={item.name}
                startDate={new Date(item.startDate).toLocaleString()}
                startLocation={item.startLocation}
                description={item.description}
                participants={item.participants}
                participantCount={item.participantCount}
                onPress={() => {
                  router.push(`trip/${item.id}`)
                }}
                w={320}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: '$colorTransparent',
              paddingLeft: 16,
              paddingRight: 16,
              gap: 16,
            }}
            style={{ flexGrow: 0 }}
          />
        ) : (
          <Text px="$4">No trips found</Text>
        )}
        <XStack gap="$4" ai="center" jc="space-between" px="$4">
          <H3 textAlign="left">Featured Communities</H3>
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
          <FlatList
            data={communities}
            renderItem={({ item }) => (
              <CommunityCard
                memberCount={item.memberCount}
                members={item.members}
                key={item.id}
                title={item.name}
                description={item.description}
                onPress={() => {
                  router.push(`community/${item.id}`)
                }}
                w={320}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: '$colorTransparent',
              paddingLeft: 16,
              paddingRight: 16,
              gap: 16,
            }}
            style={{ flexGrow: 0 }}
          />
        ) : (
          <Text px="$4">No communities found</Text>
        )}
      </YStack>
    </ScrollView>
  )
}
