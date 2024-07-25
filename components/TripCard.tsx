import type { TTripParticipant } from '@/state/tripStore'
import { Button, type YStackProps, Paragraph, YStack } from 'tamagui'

export type TTripCardProps = YStackProps & {
  title: string
  description: string
  participants: TTripParticipant[]
  participantCount: number
  startLocation: string
  startDate: string
}

export function TripCard(props: TTripCardProps) {
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
          {props.participantCount} participants
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
          Join Trip
        </Button>
      </YStack>
    </YStack>
  )
}
