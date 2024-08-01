import { client } from '@/lib/axios'
import useAuthStore, { type TUserProfileWithUsername } from '@/state/authStore'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import { Avatar, Image, View, YStack, Button, Paragraph, H3, H4 } from 'tamagui'

export default function ProfileScreen() {
  const { slug } = useLocalSearchParams()
  const token = useAuthStore((state) => state.token)
  const [user, setUser] = useState<TUserProfileWithUsername | null>(null)

  const getProfileDetails = async () => {
    try {
      const res = await client.get(`/user/profile/${slug}`, {
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

          <YStack gap="$6" p="$4">
            <YStack ai="center">
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
                <Paragraph fontSize="$5" textAlign="center">
                  {user.bio && user.bio.length > 0
                    ? user.bio
                    : 'This user has not added a bio.'}
                </Paragraph>
              </YStack>
            </YStack>

            <Button
              size="$3"
              mt="$4"
              w="100%"
              backgroundColor="$color"
              color="$background"
              textProps={{
                fontWeight: 'bold',
                fontSize: '$5',
              }}
            >
              Chat
            </Button>

            <YStack gap="$4">
              <H3 textAlign="center">My Vehicles</H3>
              {user.userVehicles && user.userVehicles.length > 0 ? (
                <FlatList
                  data={user.userVehicles}
                  renderItem={({ item }) => (
                    <YStack
                      key={item.vehicle.id}
                      backgroundColor="$background"
                      py="$4"
                      px="$5"
                      borderRadius="$4"
                      elevation="$0.25"
                    >
                      <Paragraph color="$gray11">{item.vehicle.vehicleType}</Paragraph>
                      <H4>{`${item.vehicle.make} ${item.vehicle.model}`}</H4>
                      <Paragraph color="$gray11" mt="$4">
                        {item.year}
                      </Paragraph>
                    </YStack>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    backgroundColor: '$colorTransparent',
                    padding: 4,
                    gap: 16,
                  }}
                  style={{ flexGrow: 0 }}
                />
              ) : (
                <Paragraph fontSize="$5" textAlign="center">
                  This user has not added any vehicles yet.
                </Paragraph>
              )}
            </YStack>
          </YStack>
        </YStack>
      </SafeAreaView>
    </View>
  )
}
