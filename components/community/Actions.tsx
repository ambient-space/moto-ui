import { CircleEllipsis } from '@tamagui/lucide-icons'
import { useLocalSearchParams } from 'expo-router'
import { Adapt, Button, Popover, YStack } from 'tamagui'

export default function Actions() {
  const { isAdmin, isMember } = useLocalSearchParams()

  if (isMember === 'false') return null

  return (
    <Popover>
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
              <Button>Add Trip</Button>
              <Button>Edit Community</Button>
              <Button backgroundColor="$red9" color="$white1">
                Delete Community
              </Button>
            </>
          ) : (
            <Button color="$red10">Leave Community</Button>
          )}
        </YStack>
      </Popover.Content>
    </Popover>
  )
}
