import useAuthStore from '@/state/authStore'
import { Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native'
import { Avatar, Image, Text, View, YStack, Button, Paragraph, H3 } from 'tamagui'

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user)

  if (!user) return <Redirect href="/" />

  return (
    <View>
      <SafeAreaView>
        <YStack>
          <Image
            source={{
              uri:
                user.coverImage ||
                'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
              height: 140,
            }}
          />
          <YStack gap="$2" p="$4" ai="center">
            <Avatar
              size="$8"
              mt="$-10"
              circular
              borderColor="white"
              borderWidth="$1"
              backgroundColor="$blue10"
            >
              <Avatar.Image
                source={{
                  uri: user.profilePicture,
                  height: 140,
                }}
              />
              <Avatar.Fallback />
            </Avatar>
            <YStack ai="center" gap="$2">
              {user.fullName.length > 0 && <H3 mb="$-3">{user.fullName}</H3>}
              <Paragraph color="$color05">@{user.username}</Paragraph>
              <Text textAlign="center">
                {user.bio.length > 0 ? user.bio : 'This user has not added a bio.'}
              </Text>
            </YStack>
            <Button size="$3" mt="$4" w="100%" backgroundColor="$blue8">
              Chat
            </Button>
          </YStack>
        </YStack>
      </SafeAreaView>
    </View>
  )
}
