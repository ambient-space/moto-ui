import { router, Tabs } from 'expo-router'
import { Avatar, Button, XStack } from 'tamagui'
import { Bell, Cog, Home, UserCircle } from '@tamagui/lucide-icons'
import { useEffect } from 'react'
import { useCommunityStore } from '@/state/communityStore'
import { useTripStore } from '@/state/tripStore'

export default function MainLayout() {
  const fetchCommunities = useCommunityStore((state) => state.fetchCommunities)
  const fetchTrips = useTripStore((state) => state.fetchTrips)

  useEffect(() => {
    ;(async () => {
      try {
        fetchCommunities()
        fetchTrips()
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerLeft: () => (
          <Button
            unstyled
            px="$4"
            onPress={() => {
              // open profile page
              router.push('profile')
            }}
          >
            <Avatar circular size="$2">
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
          </Button>
        ),
        headerRight: () => (
          <XStack jc="center" ai="center" px="$4">
            <Button
              unstyled
              onPress={() => {
                // open profile page
              }}
            >
              <Bell size="$1" />
            </Button>
          </XStack>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />

      <Tabs.Screen
        name="personal"
        options={{
          title: 'My Rides',
          tabBarIcon: ({ color }) => <UserCircle color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Cog color={color} />,
        }}
      />
    </Tabs>
  )
}
