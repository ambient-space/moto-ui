import type { TCommunityMember } from '@/state/communityStore'
import { type YStackProps, Paragraph, YStack, Button } from 'tamagui'

export type TCommunityCardProps = YStackProps & {
  title: string
  description: string
  members: TCommunityMember[]
  memberCount: number
}

export function CommunityCard(props: TCommunityCardProps) {
  return (
    <YStack
      key={props.id}
      borderRadius="$3"
      p="$4"
      gap="$4"
      backgroundColor="$gray1"
      w={320}
      jc="space-between"
      elevation={5}
      {...props}
    >
      <YStack gap="$2">
        <Paragraph theme="gray_alt2" fontSize="$5" fontWeight="600">
          {props.memberCount} members
        </Paragraph>
        <Paragraph
          fontWeight="bold"
          fontSize="$8"
          textOverflow="ellipsis"
          numberOfLines={1}
        >
          {props.title}
        </Paragraph>
        <Paragraph
          theme="alt1"
          fontSize="$5"
          fontWeight="600"
          textOverflow="ellipsis"
          numberOfLines={2}
        >
          {props.description}
        </Paragraph>
      </YStack>
      <YStack gap="$2">
        <Button
          backgroundColor="$color"
          color="$background"
          textProps={{
            fontWeight: 'bold',
            fontSize: '$5',
          }}
        >
          Join Community
        </Button>
      </YStack>
    </YStack>
  )
}
