import AddVehicle from '@/components/AddVehicle'
import CustomSettingsButton from '@/components/CustomSettingsButton'
import useAuthStore from '@/state/authStore'
import { LogOut } from '@tamagui/lucide-icons'
import { ScrollView, YStack } from 'tamagui'

export default function Settings() {
  const logout = useAuthStore((state) => state.logout)
  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
    >
      <YStack gap="$4" p="$4">
        <YStack gap="$2" backgroundColor="$background" p="$4" borderRadius="$4">
          <AddVehicle />
        </YStack>

        <CustomSettingsButton
          onPress={logout}
          backgroundColor="$red10"
          color="$white1"
          icon={LogOut}
        >
          Logout
        </CustomSettingsButton>
      </YStack>
    </ScrollView>
  )
}
