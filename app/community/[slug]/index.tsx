import CustomHeader from '@/components/community/Header'
import MemberCard from '@/components/MemberCard'
import { TripCard } from '@/components/TripCard'
import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import type { TCommunityDetail } from '@/state/communityStore'
import { Users } from '@tamagui/lucide-icons'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Paragraph } from 'tamagui'
import { YStack, XStack, H4, ScrollView, Button, View } from 'tamagui'

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
          <CustomHeader
            title={community.name}
            cover={community.coverImage}
            avatar={community.profilePicture}
          />
          <YStack>
            <YStack gap="$2" px="$4">
              <XStack theme="gray_alt2" ai="center" gap="$2" overflow="hidden">
                <Users size="$1" />
                <Paragraph fontSize="$5" fontWeight="600" wordWrap="break-word">
                  {community.memberCount} members
                </Paragraph>
              </XStack>
              <Paragraph fontSize="$5">{community.description}</Paragraph>

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
                <Paragraph fontSize="$5">
                  This community has not organized any trips yet
                </Paragraph>
              )}

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
            onPress={handleJoin}
          >
            Chat
          </Button>
        )}
      </View>
    </YStack>
  )
}
