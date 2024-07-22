import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import type { TTripDetails } from '@/state/tripStore'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Avatar,
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
                  Start Location
                </Paragraph>
                <Paragraph fontWeight="bold">{trip.startLocation}</Paragraph>
              </YStack>

              {trip.endLocation && (
                <YStack gap="$1" bg="$color5" p="$2" borderRadius="$2">
                  <Paragraph>End Location</Paragraph>
                  <Paragraph fontWeight="bold">{trip.endLocation}</Paragraph>
                </YStack>
              )}

              <YStack gap="$1" bg="$color5" p="$2" borderRadius="$2">
                <Paragraph fontSize="$3" color="$color05">
                  Starts At
                </Paragraph>
                <Paragraph fontWeight="bold">
                  {new Date(trip.startDate).toLocaleString()}
                </Paragraph>
              </YStack>
              {trip.endDate && (
                <YStack gap="$1" bg="$color5" p="$2" borderRadius="$2">
                  <Paragraph fontSize="$3" color="$color05">
                    Ends At
                  </Paragraph>
                  <Paragraph fontWeight="bold">
                    {new Date(trip.endDate).toLocaleString()}
                  </Paragraph>
                </YStack>
              )}

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
