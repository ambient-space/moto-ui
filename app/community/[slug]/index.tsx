import { TripCard } from '@/components/TripCard'
import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import type { TCommunityDetail } from '@/state/communityStore'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Avatar, Image, Text, YStack, XStack, H3, H4, ScrollView, Button } from 'tamagui'

export default function CommunityInfoScreen() {
  const { slug } = useLocalSearchParams()
  const token = useAuthStore((state) => state.token)
  const [community, setCommunity] = useState<TCommunityDetail | null>(null)

  useEffect(() => {
    ;(async () => {
      const res = await client.get(`/community/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.data.error) {
        setCommunity(res.data.data)
      }
    })()
  }, [slug])

  if (!community) return null

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} height="100%">
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
                router.push(`/community/${slug}/chat`)
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
              <YStack gap="$2">
                {community.members.map((member) => (
                  <XStack gap="$2" ai="center" key={member.id}>
                    <Avatar
                      circular
                      size="$4"
                      zIndex={2}
                      borderColor="white"
                      borderWidth="$0.5"
                    >
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
                ))}
              </YStack>
            </ScrollView>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
