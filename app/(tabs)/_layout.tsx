import { router, Tabs } from 'expo-router'
import { Avatar, Button, useTheme, XStack } from 'tamagui'
import { Bell, Bike, Cog, Home, UserCircle, Users } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const theme = useTheme()

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
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: 'Trips',
          tabBarIcon: ({ color }) => <Bike color={color} />,
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: 'Communities',
          tabBarIcon: ({ color }) => <Users color={color} />,
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
