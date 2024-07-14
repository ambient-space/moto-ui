import { TripCard } from '@/components/TripCard'
import { useTripStore } from '@/state/tripStore'
import { SafeAreaView } from 'react-native'
import { Input, ScrollView, YStack } from 'tamagui'

export default function TripsScreen() {
  const trips = useTripStore((state) => state.trips)
  return (
    <SafeAreaView>
      <ScrollView h="100%">
        <Input mx="$2" my="$5" placeholder="Search for trips" />

        <YStack gap="$2" mx="$2">
          {trips.length > 0 &&
            trips.map((t) => (
              <TripCard
                key={t.id}
                title={t.name}
                description={t.description}
                participants={t.participants}
                participantCount={t.participantCount}
              />
            ))}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
