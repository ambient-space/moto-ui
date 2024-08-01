import { CommunityCard } from '@/components/CommunityCard'
import { useCommunityPageHook } from '@/state/communityStore'
import { router } from 'expo-router'
import { FlatList, RefreshControl, SafeAreaView } from 'react-native'
import { Spinner, YStack } from 'tamagui'

export default function CommunitiesScreen() {
  const {
    data: communities,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommunityPageHook()

  const loadMore = () => {
    if (isFetchingNextPage) return null
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const renderFooter = () => {
    if (!isFetchingNextPage) return null
    return <Spinner style={{ marginVertical: 20 }} size="large" />
  }

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <YStack gap="$2">
        <FlatList
          data={communities}
          style={{ width: '100%', height: '100%' }}
          contentContainerStyle={{ gap: 8, paddingLeft: 16, paddingRight: 16 }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          refreshing={isLoading}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                refetch()
              }}
            />
          }
          ListFooterComponent={renderFooter}
          renderItem={({ item: c }) => (
            <CommunityCard
              key={c.id}
              w="100%"
              title={c.name}
              description={c.description}
              memberCount={c.memberCount}
              members={c.members}
              isMember={c.isMember}
              onPress={() => {
                router.push(`community/${c.id}`)
              }}
            />
          )}
        />
      </YStack>
    </SafeAreaView>
  )
}
