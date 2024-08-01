import { CardSkeleton } from '@/components/CardSkeleton'
import { useGetMyCommunities, useGetMyTrips } from '@/state/authStore'
import { format } from 'date-fns'
import { router } from 'expo-router'
import { Dimensions, FlatList } from 'react-native'
import { Accordion, Button, Paragraph, ScrollView, Text, XStack, YStack } from 'tamagui'

export default function TabTwoScreen() {
  const {
    data: trips,
    isLoading: areTripsLoading,
    refetch: refetchTrips,
  } = useGetMyTrips()
  const {
    data: communities,
    isLoading: areCommunitiesLoading,
    refetch: refetchCommunities,
  } = useGetMyCommunities()

  const windowWidth = Dimensions.get('window').width
  return (
    <ScrollView flex={1}>
      <Accordion overflow="hidden" type="multiple">
        <Accordion.Item value="a1">
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({
              open,
            }: {
              open: boolean
            }) => <Paragraph fontWeight="bold">My Trips</Paragraph>}
          </Accordion.Trigger>
          <Accordion.HeightAnimator animation="quickest">
            <Accordion.Content
              animation="quickest"
              w={windowWidth}
              exitStyle={{ opacity: 0 }}
            >
              {!areTripsLoading ? (
                trips && trips.length > 0 ? (
                  <YStack>
                    <FlatList
                      data={trips}
                      renderItem={({ item }) => (
                        <XStack
                          key={item.id}
                          gap="$2"
                          justifyContent="space-between"
                          w="100%"
                        >
                          <YStack gap="$2" flexShrink={1} overflow="hidden">
                            <Paragraph
                              fontSize="$6"
                              fontWeight="bold"
                              overflow="hidden"
                              textOverflow="ellipsis"
                            >
                              {item.name}
                            </Paragraph>

                            <XStack gap="$2" overflow="hidden">
                              <Paragraph
                                fontSize="$5"
                                color="$color05"
                                overflow="hidden"
                                textOverflow="ellipsis"
                              >
                                {format(new Date(item.startDate), 'MMMM d, yyyy')} -
                              </Paragraph>
                              <Paragraph
                                fontSize="$5"
                                color="$color05"
                                overflow="hidden"
                                textOverflow="ellipsis"
                              >
                                {item.startLocation}
                              </Paragraph>
                            </XStack>
                          </YStack>
                          <Button
                            variant="outlined"
                            onPress={() => router.push(`/trip/${item.id}`)}
                          >
                            View
                          </Button>
                        </XStack>
                      )}
                      maxToRenderPerBatch={2}
                      keyExtractor={(item) => item.id.toString()}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                        backgroundColor: '$colorTransparent',
                        gap: 16,
                      }}
                      style={{ flexGrow: 0 }}
                    />
                  </YStack>
                ) : (
                  <Text px="$4">No trips found</Text>
                )
              ) : (
                <YStack gap="$4" px="$4">
                  <CardSkeleton />
                  <CardSkeleton />
                </YStack>
              )}
            </Accordion.Content>
          </Accordion.HeightAnimator>
        </Accordion.Item>
        <Accordion.Item value="a2">
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({
              open,
            }: {
              open: boolean
            }) => <Paragraph fontWeight="bold">My Communities</Paragraph>}
          </Accordion.Trigger>
          <Accordion.HeightAnimator animation="quickest">
            <Accordion.Content
              animation="quickest"
              w={windowWidth}
              exitStyle={{ opacity: 0 }}
            >
              {!areCommunitiesLoading ? (
                communities && communities.length > 0 ? (
                  <FlatList
                    data={communities}
                    renderItem={({ item }) => (
                      <XStack
                        key={item.id}
                        gap="$2"
                        justifyContent="space-between"
                        w="100%"
                      >
                        <YStack gap="$2" overflow="hidden">
                          <Paragraph
                            fontSize="$6"
                            fontWeight="bold"
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {item.name}
                          </Paragraph>

                          <XStack gap="$2">
                            <Paragraph
                              fontSize="$5"
                              color="$color05"
                              overflow="hidden"
                              textOverflow="ellipsis"
                            >
                              {item.description}
                            </Paragraph>
                          </XStack>
                        </YStack>
                        <Button
                          variant="outlined"
                          onPress={() => router.push(`/community/${item.id}`)}
                        >
                          View
                        </Button>
                      </XStack>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      backgroundColor: '$colorTransparent',
                      gap: 16,
                    }}
                    style={{ flexGrow: 0 }}
                  />
                ) : (
                  <Text px="$4">No communities found</Text>
                )
              ) : (
                <YStack gap="$4" px="$4">
                  <CardSkeleton />
                  <CardSkeleton />
                </YStack>
              )}
            </Accordion.Content>
          </Accordion.HeightAnimator>
        </Accordion.Item>
      </Accordion>
    </ScrollView>
  )
}
