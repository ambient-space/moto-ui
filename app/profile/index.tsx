import { client } from '@/lib/axios'
import useAuthStore, { type TUserProfileWithUsername } from '@/state/authStore'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Avatar, Image, Text, View, YStack, Paragraph, H3 } from 'tamagui'

export default function ProfileScreen() {
  const token = useAuthStore((state) => state.token)
  const [user, setUser] = useState<TUserProfileWithUsername | null>(null)

  const getProfileDetails = async () => {
    try {
      const res = await client.get(`/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUser(res.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getProfileDetails()
  }, [])

  if (!user) return null

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
              <Paragraph color="$color05">@{user.authUser.username}</Paragraph>
              <Text textAlign="center">
                {user.bio.length > 0 ? user.bio : 'You have not added a bio.'}
              </Text>
            </YStack>
          </YStack>
        </YStack>
      </SafeAreaView>
    </View>
  )
}
