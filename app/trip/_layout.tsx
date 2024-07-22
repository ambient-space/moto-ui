import { Stack } from 'expo-router'

export default function TripLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[slug]/index"
        // options={{
        //   headerShown: false,
        // }}
      />
    </Stack>
  )
}
