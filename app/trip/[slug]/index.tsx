import MemberCard from '@/components/MemberCard'
import Actions from '@/components/trip/Actions'
import { tripApiRoutes } from '@/lib/api'
import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import type { TTripDetails } from '@/state/tripStore'
import { Calendar, MapPin, Users } from '@tamagui/lucide-icons'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { YStack, H4, ScrollView, Paragraph, Button, View, XStack } from 'tamagui'

export default function TripInfoScreen() {
  const { slug } = useLocalSearchParams()
  const token = useAuthStore((state) => state.token)
  const userId = useAuthStore((state) => state.user?.id)
  const [trip, setTrip] = useState<TTripDetails | null>(null)
  const navigation = useNavigation()

  const insets = useSafeAreaInsets()

  const handleJoin = async () => {
    try {
      await client.post(
        tripApiRoutes['post/trip/:id/join']({ id: slug as string }),
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      getTripDetails()
    } catch (error) {
      console.error(error)
    }
  }

  const getTripDetails = async () => {
    const res = await client.get(tripApiRoutes['get/trip/:id']({ id: slug as string }), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.data.error) {
      router.setParams({ slug: slug as string, title: res.data.data.name })
      setTrip(res.data.data)
      router.setParams({
        isParticipant: res.data.data.isParticipant,
        isAdmin: res.data.data.isAdmin,
      })
    }
  }

  useEffect(() => {
    getTripDetails()
  }, [slug])

  /**
   * Set the header actions after the trip has been fetched
   * This is due to an issue which causes the header actions to be mispositioned when placed
   * https://github.com/software-mansion/react-native-screens/issues/432#issuecomment-1783867314
   */
  useEffect(() => {
    setTimeout(
      () =>
        navigation.setOptions({
          title: trip?.name,
          headerRight: () => <Actions />,
        }),
      100,
    )
  }, [trip])

  if (!trip) return null

  return (
    <YStack jc="space-between" h="100%">
      <SafeAreaView style={{ flexGrow: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap="$6" px="$4">
            <YStack gap="$4">
              <XStack theme="gray_alt2" ai="center" gap="$2" overflow="hidden">
                <MapPin size="$1" />
                <Paragraph fontSize="$5" fontWeight="600" wordWrap="break-word">
                  {trip.startLocation}
                  {trip.endLocation && ` - ${trip.endLocation}`}
                </Paragraph>
              </XStack>

              <XStack theme="gray_alt2" ai="center" gap="$2">
                <Calendar size="$1" />
                <Paragraph fontSize="$5" fontWeight="600">
                  {new Date(trip.startDate).toLocaleString()}
                  {trip.endDate && ` - ${new Date(trip.endDate).toLocaleString()}`}
                </Paragraph>
              </XStack>

              <XStack theme="gray_alt2" ai="center" gap="$2">
                <Users size="$1" />
                <Paragraph theme="gray_alt2" fontSize="$5" fontWeight="600">
                  {trip.participantCount} participants
                </Paragraph>
              </XStack>
            </YStack>
            <Paragraph fontSize="$5">{trip.description}</Paragraph>

            {trip.community !== null && (
              <YStack gap="$4">
                <H4>Organized By</H4>

                <XStack
                  key={trip.community.id}
                  gap="$2"
                  justifyContent="space-between"
                  w="100%"
                >
                  <YStack flexGrow={1} gap="$2">
                    <Paragraph fontSize="$6" fontWeight="bold">
                      {trip.community.name}
                    </Paragraph>

                    <XStack gap="$2">
                      <Paragraph fontSize="$5" color="$color05">
                        {trip.community.description}
                      </Paragraph>
                    </XStack>
                  </YStack>
                  <Button
                    variant="outlined"
                    onPress={() => router.push(`/community/${trip.community!.id}`)}
                  >
                    View
                  </Button>
                </XStack>
              </YStack>
            )}

            {trip.isParticipant ? (
              <YStack gap="$4">
                <H4>Meet The Other Participants</H4>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  maxHeight={300}
                  overflow="hidden"
                  mt="$2"
                >
                  <YStack gap="$3">
                    {trip.participants.map((member) => (
                      <MemberCard
                        key={member.userId}
                        member={{
                          id: member.userId,
                          profile: {
                            profilePicture: member.profile.profilePicture,
                            fullName: member.profile.fullName,
                          },
                          isCurrentUser: member.userId === userId,
                          role: member.role,
                        }}
                      />
                    ))}
                  </YStack>
                </ScrollView>
              </YStack>
            ) : null}

            {trip.isAdmin ? (
              <YStack gap="$4">
                <H4>Meet The Other Participants</H4>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  maxHeight={300}
                  overflow="hidden"
                  mt="$2"
                >
                  <YStack gap="$3">
                    {trip.joinRequests.map((member) => (
                      <MemberCard
                        key={member.userId}
                        member={{
                          id: member.userId,
                          profile: {
                            profilePicture: member.profile.profilePicture,
                            fullName: member.profile.fullName,
                          },
                          isCurrentUser: member.userId === userId,
                          role: member.status,
                        }}
                      />
                    ))}
                  </YStack>
                </ScrollView>
              </YStack>
            ) : null}
          </YStack>
        </ScrollView>
      </SafeAreaView>
      {userId && !trip.isParticipant && (
        <View p="$4">
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
            Join Trip
          </Button>
        </View>
      )}
    </YStack>
  )
}
