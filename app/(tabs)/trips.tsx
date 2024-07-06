import { DemoCard } from 'components/Card'
import { Input, ScrollView, View, XStack } from 'tamagui'

export default function TabTwoScreen() {
  return (
    <View>
      <ScrollView>
        <Input mx="$4" my="$5" placeholder="Search for trips" />

        <XStack fw="wrap" jc="center" gap="$4">
          <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
          <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
          <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
          <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
          <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
        </XStack>
      </ScrollView>
    </View>
  )
}
