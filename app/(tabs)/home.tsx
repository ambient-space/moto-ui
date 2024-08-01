import { CommunityCard } from '@/components/CommunityCard'
import { useTripHomeHook } from '@/state/tripStore'
import { router } from 'expo-router'
import { Button, H1, H3, Paragraph, ScrollView, Text, XStack, YStack } from 'tamagui'
import { TripCard } from '@/components/TripCard'
import { FlatList, RefreshControl } from 'react-native'
import { CardSkeleton } from '@/components/CardSkeleton'
import { useCommunityHomeHook } from '@/state/communityStore'

export default function HomeScreen() {
  const {
    data: trips,
    isLoading: areTripsLoading,
    refetch: refetchTrips,
  } = useTripHomeHook()
  const {
    data: communities,
    isLoading: areCommunitiesLoading,
    refetch: refetchCommunities,
  } = useCommunityHomeHook()

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={areTripsLoading || areCommunitiesLoading}
          onRefresh={() => {
            refetchTrips()
            refetchCommunities()
          }}
        />
      }
    >
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

        {!areTripsLoading ? (
          trips.length > 0 ? (
            <FlatList
              data={trips}
              renderItem={({ item }) => (
                <TripCard
                  isParticipant={item.isParticipant}
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
              maxToRenderPerBatch={2}
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
          )
        ) : (
          <XStack gap="$4" px="$4">
            <CardSkeleton />
            <CardSkeleton />
          </XStack>
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
        {!areCommunitiesLoading ? (
          communities.length > 0 ? (
            <FlatList
              data={communities}
              renderItem={({ item }) => (
                <CommunityCard
                  memberCount={item.memberCount}
                  members={item.members}
                  key={item.id}
                  title={item.name}
                  description={item.description}
                  isMember={item.isMember}
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
          )
        ) : (
          <XStack gap="$4" px="$4">
            <CardSkeleton />
            <CardSkeleton />
          </XStack>
        )}
      </YStack>
    </ScrollView>
  )
}
