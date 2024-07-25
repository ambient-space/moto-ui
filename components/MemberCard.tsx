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
    isCurrentUser?: boolean
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
      <Avatar circular size="$4">
        <Avatar.Image
          source={{
            uri:
              member.profile.profilePicture ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFe2l5yrU1Bd9lao2sMQTAFu0XVbDxk0GVQ&s',
          }}
        />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      <YStack gap="$2">
        <Text fontSize={16} fontWeight="600" textTransform="capitalize">
          {member.profile.fullName || 'New User'} {member.isCurrentUser && '(You)'}
        </Text>
        <Text fontSize={14} theme="alt1" textTransform="capitalize">
          {member.role}
        </Text>
      </YStack>
    </XStack>
  )
}

export default MemberCard
