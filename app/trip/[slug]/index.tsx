import MemberCard from '@/components/MemberCard'
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
        `/trip/join/${slug}`,
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
    const res = await client.get(`/trip/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.data.error) {
      router.setParams({ slug: slug as string })
      setTrip(res.data.data)
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
          <YStack gap="$4" px="$4">
            <YStack gap="$2">
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
                  {trip.participants.length} participants
                </Paragraph>
              </XStack>
              <Paragraph fontSize="$5">{trip.description}</Paragraph>
            </YStack>
            <YStack gap="$2">
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
          </YStack>
        </ScrollView>
      </SafeAreaView>
      {userId && !trip.participants.find((t) => t.userId === userId) && (
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
