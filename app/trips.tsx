import { DemoCard } from '@/components/Card'
import { Input, ScrollView, View, YStack } from 'tamagui'

export default function TripsScreen() {
  return (
    <View>
      <Input mx="$2" my="$5" placeholder="Search for trips" />

      <ScrollView>
        <YStack gap="$2" mx="$2">
          <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
          <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
          <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
          <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
          <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
        </YStack>
      </ScrollView>
    </View>
  )
}
