import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import { CircleEllipsis } from '@tamagui/lucide-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Adapt, Button, Popover, View, YStack } from 'tamagui'

export default function Actions() {
  const { isAdmin, isParticipant, slug } = useLocalSearchParams()
  const token = useAuthStore((state) => state.token)
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async () => {
    try {
      await client.delete(`/trip/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      router.back()
    } catch (error) {
      console.error(error)
    }
  }

  const handleLeave = async () => {
    try {
      await client.post(
        `/trip/leave/${slug}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      router.back()
    } catch (error) {
      console.error(error)
    }
  }

  if (!isParticipant || !isAdmin || isParticipant === 'false') return null

  return (
    <View>
      <Popover open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <Popover.Trigger asChild>
          <Button unstyled>
            <CircleEllipsis
              col="$color10"
              style={{
                transform: [{ rotate: '90deg' }],
              }}
            />
          </Button>
        </Popover.Trigger>
        <Adapt when="sm" platform="touch">
          <Popover.Sheet modal dismissOnSnapToBottom>
            <Popover.Sheet.Frame padding="$4">
              <Adapt.Contents />
            </Popover.Sheet.Frame>
            <Popover.Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Popover.Sheet>
        </Adapt>
        <Popover.Content
          borderWidth={1}
          borderColor="$borderColor"
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
          elevate
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

          <YStack gap="$2">
            {isAdmin !== 'false' ? (
              <>
                <Button
                  textProps={{
                    fontWeight: 'bold',
                    fontSize: '$5',
                  }}
                >
                  Edit Trip
                </Button>
                <Button
                  backgroundColor="$red9"
                  textProps={{
                    fontWeight: 'bold',
                    fontSize: '$5',
                  }}
                  color="$white1"
                  onPress={handleDelete}
                >
                  Delete Trip
                </Button>
              </>
            ) : (
              <Button color="$red10" onPress={handleLeave}>
                Leave Trip
              </Button>
            )}
          </YStack>
        </Popover.Content>
      </Popover>
    </View>
  )
}
