import { DemoCard } from '@/components/Card'
import { router } from 'expo-router'
import {
  Button,
  Circle,
  H1,
  H3,
  Paragraph,
  ScrollView,
  Separator,
  Square,
  Text,
  useTheme,
  XStack,
  YStack,
} from 'tamagui'

export default function HomeScreen() {
  const theme = useTheme()
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
          backgroundColor="$background"
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
        >
          <XStack>
            <Square mx="$4" size={120} backgroundColor="$red9" />
            <Circle mx="$4" size={120} backgroundColor="$orange9" />
            <Square mx="$4" size={120} backgroundColor="$yellow9" />
            <Circle mx="$4" size={120} backgroundColor="$green9" />
            <Square mx="$4" size={120} backgroundColor="$blue9" />
            <Circle mx="$4" size={120} backgroundColor="$purple9" />
            <Square mx="$4" size={120} backgroundColor="$pink9" />
            <Circle mx="$4" size={120} backgroundColor="$red9" />
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
            <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
            <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
            <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
            <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
            <DemoCard title="DBBR Delhi" description="Delhi's best riding motorcade" />
          </XStack>
        </ScrollView>
      </YStack>
    </ScrollView>
  )
}
