import useAuthStore from '@/state/authStore'
import { Button, Text, View } from 'tamagui'

export default function Settings() {
  const logout = useAuthStore((state) => state.logout)
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Text fontSize={20} color="$blue10">
        Settings
      </Text>
      <Button
        onPress={() => {
          logout()
        }}
        color="$red10"
      >
        Logout
      </Button>
    </View>
  )
}
