import MemberCard from '@/components/MemberCard'
import { TripCard } from '@/components/TripCard'
import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import type { TCommunityDetail } from '@/state/communityStore'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Avatar,
  Image,
  Text,
  YStack,
  XStack,
  H3,
  H4,
  ScrollView,
  Button,
  View,
} from 'tamagui'

export default function CommunityInfoScreen() {
  const { slug } = useLocalSearchParams()
  const token = useAuthStore((state) => state.token)
  const userId = useAuthStore((state) => state.user?.id)
  const [community, setCommunity] = useState<TCommunityDetail | null>(null)
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const handleJoin = async () => {
    try {
      await client.post(
        `/community/join/${slug}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      getCommunityDetails()
    } catch (error) {
      console.error(error)
    }
  }

  const getCommunityDetails = async () => {
    const res = await client.get(`/community/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.data.error) {
      setCommunity(res.data.data)
    }
  }

  useEffect(() => {
    getCommunityDetails()
  }, [slug])

  if (!community) return null

  return (
    <YStack jc="space-between" h="100%">
      <SafeAreaView style={{ flexGrow: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack>
            <Image
              source={{
                uri:
                  community.coverImage ||
                  'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
                height: 140,
              }}
            />
            <YStack gap="$2" p="$4">
              <Avatar
                size="$8"
                mt="$-10"
                borderRadius="$2"
                borderColor="white"
                borderWidth="$1"
                backgroundColor="$blue10"
              >
                <Avatar.Image
                  source={{
                    uri: community.profilePicture,
                    height: 140,
                  }}
                />
                <Avatar.Fallback />
              </Avatar>
              <H3>{community.name}</H3>
              <Text>{community.description}</Text>
              <Button
                size="$3"
                mt="$4"
                backgroundColor="$blue8"
                onPress={() => {
                  // set the title of the chat
                  // @ts-ignore
                  navigation.navigate('community/[slug]/chat', {
                    slug,
                    title: community.name,
                  })
                }}
              >
                Chat
              </Button>

              <H4>Trips</H4>
              {community.trips.length > 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <XStack gap="$2">
                    {community.trips.map((t) => (
                      <TripCard
                        key={t.id}
                        title={t.name}
                        description={t.description}
                        participants={t.participants}
                        participantCount={t.participantCount}
                        startDate={new Date(t.startDate).toLocaleString()}
                        startLocation={t.startLocation}
                      />
                    ))}
                  </XStack>
                </ScrollView>
              ) : (
                <Text>This community has not organized any trips yet</Text>
              )}

              <H4>Members</H4>
              <ScrollView
                showsVerticalScrollIndicator={false}
                maxHeight={300}
                overflow="hidden"
                mt="$2"
                backgroundColor="$gray2"
                p="$2"
                borderRadius="$2"
              >
                {community.members.map((member) => (
                  <MemberCard
                    key={member.userId}
                    member={{
                      id: member.userId,
                      profile: {
                        profilePicture: member.profile.profilePicture,
                        fullName: member.profile.fullName,
                      },
                      role: member.role,
                    }}
                  />
                ))}
              </ScrollView>
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>

      {userId && !community.members.find((t) => t.userId === userId) && (
        <View bg="$color5" p="$4">
          <Button bg="$accentBackground" mb={insets.bottom} onPress={handleJoin}>
            <Text>Join Community</Text>
          </Button>
        </View>
      )}
    </YStack>
  )
}
