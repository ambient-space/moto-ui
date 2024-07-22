import MemberCard from '@/components/MemberCard'
import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import type { TTripDetails } from '@/state/tripStore'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Text,
  YStack,
  XStack,
  H3,
  H4,
  ScrollView,
  Paragraph,
  Button,
  View,
} from 'tamagui'

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

  useEffect(() => {
    if (!trip) return
    // set the title to the title of the trip
    navigation.setOptions({
      title: trip.name,
    })
  }, [trip])

  if (!trip) return null

  return (
    <YStack jc="space-between" h="100%">
      <SafeAreaView style={{ flexGrow: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack>
            <YStack gap="$2" p="$4">
              <H3>{trip.name}</H3>
              <YStack gap="$1" bg="$color5" p="$2" borderRadius="$2">
                <Paragraph fontSize="$3" color="$color05">
                  Details
                </Paragraph>
                <Paragraph>{trip.description}</Paragraph>
              </YStack>

              <YStack gap="$1" bg="$color5" p="$2" borderRadius="$2">
                <Paragraph fontSize="$3" color="$color05">
                  Maximum Participants
                </Paragraph>
                <Paragraph fontWeight="bold">{trip.maxParticipants}</Paragraph>
              </YStack>

              <YStack gap="$1" bg="$color5" p="$2" borderRadius="$2">
                <Paragraph fontSize="$3" color="$color05">
                  Location
                </Paragraph>
                <XStack>
                  <Paragraph fontSize="$2">From </Paragraph>
                  <Paragraph fontWeight="bold">{trip.startLocation}</Paragraph>
                </XStack>
                {trip.endLocation && (
                  <XStack>
                    <Paragraph fontSize="$2">To </Paragraph>
                    <Paragraph fontWeight="bold">{trip.endLocation}</Paragraph>
                  </XStack>
                )}
              </YStack>

              <YStack gap="$1" bg="$color5" p="$2" borderRadius="$2">
                <Paragraph fontSize="$3" color="$color05">
                  Date
                </Paragraph>
                <XStack>
                  <Paragraph fontSize="$2">From </Paragraph>
                  <Paragraph fontWeight="bold">
                    {new Date(trip.startDate).toLocaleString()}
                  </Paragraph>
                </XStack>
                {trip.endDate && (
                  <XStack>
                    <Paragraph fontSize="$2">To </Paragraph>
                    <Paragraph fontWeight="bold">
                      {new Date(trip.endDate).toLocaleString()}
                    </Paragraph>
                  </XStack>
                )}
              </YStack>

              <H4>Participants</H4>
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
                  {trip.participants.map((member) => (
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
      {userId && !trip.participants.find((t) => t.userId === userId) && (
        <View bg="$color5" p="$4">
          <Button bg="$accentBackground" mb={insets.bottom} onPress={handleJoin}>
            <Text>Join Trip</Text>
          </Button>
        </View>
      )}
    </YStack>
  )
}
