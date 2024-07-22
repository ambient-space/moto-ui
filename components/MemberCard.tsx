import { router } from 'expo-router'
import { Avatar, Text, XStack, YStack } from 'tamagui'

type TMemberCardProps = {
  member: {
    id: string
    profile: {
      profilePicture: string
      fullName: string
    }
    role: string
  }
  onPress?: () => void
}
const MemberCard = ({ member, onPress }: TMemberCardProps) => {
  const handleOnPress = () => {
    if (onPress) return onPress()

    router.push(`/profile/${member.id}`)
  }

  return (
    <XStack gap="$2" ai="center" onPress={handleOnPress}>
      <Avatar circular size="$4" zIndex={2} borderColor="white" borderWidth="$0.5">
        <Avatar.Image
          source={{
            uri:
              member.profile.profilePicture ||
              'https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg',
            height: 140,
          }}
        />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      <YStack>
        <Text fontSize={16}>{member.profile.fullName || 'New User'}</Text>
        <Text fontSize={12}>{member.role}</Text>
      </YStack>
    </XStack>
  )
}

export default MemberCard
