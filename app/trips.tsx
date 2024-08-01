import { TripCard } from '@/components/TripCard'
import { useTripPageHook } from '@/state/tripStore'
import { router } from 'expo-router'
import { FlatList, RefreshControl, SafeAreaView } from 'react-native'
import { Spinner, YStack } from 'tamagui'

export default function TripsScreen() {
  const {
    data: trips,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTripPageHook()

  const loadMore = () => {
    if (isFetchingNextPage) return null
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const renderFooter = () => {
    if (!isFetchingNextPage) return null
    return <Spinner style={{ marginVertical: 20 }} size="large" />
  }

  return (
    <SafeAreaView>
      <YStack gap="$2">
        <FlatList
          style={{ width: '100%', height: '100%' }}
          data={trips}
          fadingEdgeLength={100}
          contentContainerStyle={{ gap: 8, paddingLeft: 16, paddingRight: 16 }}
          refreshing={isLoading}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                refetch()
              }}
            />
          }
          renderItem={({ item: t }) => (
            <TripCard
              key={t.id}
              title={t.name}
              startDate={new Date(t.startDate).toLocaleString()}
              startLocation={t.startLocation}
              description={t.description}
              participants={t.participants}
              participantCount={t.participantCount}
              isParticipant={t.isParticipant}
              onPress={() => {
                router.push(`trip/${t.id}`)
              }}
              width="100%"
            />
          )}
        />
      </YStack>
    </SafeAreaView>
  )
}
