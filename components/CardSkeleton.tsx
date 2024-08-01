import { type YStackProps, YStack, Square } from 'tamagui'

export type TCardSkeletonProps = YStackProps

export function CardSkeleton(props: TCardSkeletonProps) {
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
        <Square w="$10" h="$1" borderRadius="$2" backgroundColor="$gray3" />
        <Square w="$14" h="$1.5" borderRadius="$2" backgroundColor="$gray6" />

        <Square w="100%" h="$4" borderRadius="$2" backgroundColor="$gray3" mt="$2" />
      </YStack>
      <YStack gap="$2">
        <Square w="100%" h="$4" borderRadius="$2" backgroundColor="$gray10" />
      </YStack>
    </YStack>
  )
}
