import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import type { TCommunityMember } from '@/state/communityStore'
import { CircleEllipsis } from '@tamagui/lucide-icons'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Adapt, Button, Popover, YStack } from 'tamagui'

export default function Actions() {
  const { user, token } = useAuthStore((state) => state)
  const { slug } = useLocalSearchParams()
  const [communityMember, setCommunityMember] = useState<TCommunityMember | null>(null)
  const getCommunityMemberDetails = async () => {
    try {
      const res = await client.get(`/user/community/${slug}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.data.error) {
        setCommunityMember(res.data.data)
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    getCommunityMemberDetails()
  }, [token])
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
          {communityMember?.role === 'admin' ? (
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
