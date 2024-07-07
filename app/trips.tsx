import { DemoCard } from '@/components/Card'
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
            trips.map((c) => (
              <DemoCard key={c.id} title={c.name} description={c.description} />
            ))}
          {trips.length > 0 &&
            trips.map((c) => (
              <DemoCard key={c.id} title={c.name} description={c.description} />
            ))}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
