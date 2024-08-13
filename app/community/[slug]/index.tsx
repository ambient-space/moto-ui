import CustomHeader from '@/components/community/Header'
import MemberCard from '@/components/MemberCard'
import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import type { TCommunityDetail } from '@/state/communityStore'
import { Users } from '@tamagui/lucide-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Paragraph } from 'tamagui'
import { YStack, XStack, H4, ScrollView, Button, View } from 'tamagui'
import { format } from 'date-fns'
import { communityApiRoutes } from '@/lib/api'

export default function CommunityInfoScreen() {
  const { slug } = useLocalSearchParams()
  const token = useAuthStore((state) => state.token)
  const userId = useAuthStore((state) => state.user?.id)
  const [community, setCommunity] = useState<TCommunityDetail | null>(null)
  const insets = useSafeAreaInsets()

  const handleJoin = async () => {
    try {
      await client.post(
        communityApiRoutes['post/community/:id/join']({ id: slug as string }),
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
    const res = await client.get(
      communityApiRoutes['get/community/:id']({ id: slug as string }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!res.data.error) {
      setCommunity(res.data.data)
      router.setParams({
        isMember: res.data.data.isMember,
        isAdmin: res.data.data.isAdmin,
      })
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
          <YStack gap="$6">
            <YStack gap="$4">
              <CustomHeader
                title={community.name}
                cover={community.coverImage}
                avatar={community.profilePicture}
              />
              <YStack px="$4">
                <XStack theme="gray_alt2" ai="center" gap="$2" overflow="hidden">
                  <Users size="$1" />
                  <Paragraph fontSize="$5" fontWeight="600" wordWrap="break-word">
                    {community.memberCount} members
                  </Paragraph>
                </XStack>
                <Paragraph fontSize="$5">{community.description}</Paragraph>
              </YStack>
            </YStack>

            <YStack gap="$4" px="$4">
              <H4>Trips</H4>
              {community.trips.length > 0 ? (
                <ScrollView showsHorizontalScrollIndicator={false}>
                  <YStack gap="$3">
                    {community.trips.map((t) => (
                      <XStack key={t.id} gap="$2" justifyContent="space-between" w="100%">
                        <YStack flexGrow={1} gap="$2">
                          <Paragraph fontSize="$6" fontWeight="bold">
                            {t.name}
                          </Paragraph>

                          <XStack gap="$2">
                            <Paragraph fontSize="$5" color="$color05">
                              {format(new Date(t.startDate), 'MMMM d, yyyy')} -
                            </Paragraph>
                            <Paragraph fontSize="$5" color="$color05">
                              {t.startLocation}
                            </Paragraph>
                          </XStack>
                        </YStack>
                        <Button
                          variant="outlined"
                          onPress={() => router.push(`/trip/${t.id}`)}
                        >
                          View
                        </Button>
                      </XStack>
                    ))}
                  </YStack>
                </ScrollView>
              ) : (
                <Paragraph fontSize="$5">
                  This community has not organized any trips yet
                </Paragraph>
              )}
            </YStack>

            <YStack gap="$4" px="$4">
              <H4>Members</H4>
              <ScrollView
                showsVerticalScrollIndicator={false}
                maxHeight={300}
                overflow="hidden"
                mt="$2"
              >
                <YStack gap="$3">
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
                </YStack>
              </ScrollView>
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>

      <View p="$4">
        {userId && !community.members.find((t) => t.userId === userId) ? (
          <Button
            backgroundColor="$color"
            color="$background"
            textProps={{
              fontWeight: 'bold',
              fontSize: '$5',
            }}
            mb={insets.bottom}
            onPress={handleJoin}
          >
            Join Community
          </Button>
        ) : (
          <Button
            backgroundColor="$color"
            color="$background"
            textProps={{
              fontWeight: 'bold',
              fontSize: '$5',
            }}
            mb={insets.bottom}
            onPress={() => {
              router.push(`/community/${slug}/chat`)
            }}
          >
            Chat
          </Button>
        )}
      </View>
    </YStack>
  )
}
