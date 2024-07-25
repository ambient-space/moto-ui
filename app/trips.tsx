import { TripCard } from '@/components/TripCard'
import { useTripStore } from '@/state/tripStore'
import { router } from 'expo-router'
import { FlatList, SafeAreaView } from 'react-native'
import { YStack } from 'tamagui'

export default function TripsScreen() {
  const trips = useTripStore((state) => state.trips)
  return (
    <SafeAreaView>
      <YStack gap="$2">
        <FlatList
          style={{ width: '100%', height: '100%' }}
          data={trips}
          fadingEdgeLength={100}
          contentContainerStyle={{ gap: 8, paddingLeft: 16, paddingRight: 16 }}
          renderItem={({ item: t }) => (
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
              width="100%"
            />
          )}
        />
      </YStack>
    </SafeAreaView>
  )
}
