import { router, Tabs } from 'expo-router'
import { Avatar, Button, XStack } from 'tamagui'
import { Bell, Cog, Home, UserCircle } from '@tamagui/lucide-icons'

export default function MainLayout() {
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
