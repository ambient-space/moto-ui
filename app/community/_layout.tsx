import { Stack } from 'expo-router'

export default function CommunityLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[slug]/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[slug]/chat"
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Chat',
        }}
      />
    </Stack>
  )
}
