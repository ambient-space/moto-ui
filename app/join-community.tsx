import { router } from 'expo-router'
import { SafeAreaView } from 'react-native'
import { Avatar, Button, Card, H2, H3, Image, Text, View, XStack, YStack } from 'tamagui'

export default function JoinCommunityScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }} mb="$8">
      <SafeAreaView>
        <YStack gap="$2" p="$4">
          <H2>Do you want to join this community?</H2>
          <Card>
            <Image
              borderTopEndRadius="$2"
              borderTopStartRadius="$2"
              // use a random image not from unsplash
              source={{
                uri: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
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
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlDYh6ZPaTadbN_c8N396SadSnA9iSIwsgzo3gfwUQBLviTQ4Mx-qW5-6sTqVXMXC4pOs&usqp=CAU',
                    height: 140,
                  }}
                />
                <Avatar.Fallback />
              </Avatar>
              <H3>Community Name</H3>
              <Text>This is the description about the community</Text>
              <XStack gap="$2" ai="center" mt="$4">
                <XStack>
                  <Avatar
                    circular
                    size="$1.5"
                    zIndex={2}
                    borderColor="white"
                    borderWidth="$0.5"
                  >
                    <Avatar.Image
                      source={{
                        uri: 'https://randomuser.me/api/portraits/women/27.jpg',
                        height: 140,
                      }}
                    />
                    <Avatar.Fallback backgroundColor="$blue10" />
                  </Avatar>
                  <Avatar
                    circular
                    size="$1.5"
                    ml="$-2.5"
                    zIndex={1}
                    borderColor="white"
                    borderWidth="$0.5"
                  >
                    <Avatar.Image
                      source={{
                        uri: 'https://randomuser.me/api/portraits/women/21.jpg',
                        height: 140,
                      }}
                    />
                    <Avatar.Fallback backgroundColor="$pink10" />
                  </Avatar>
                  <Avatar
                    circular
                    size="$1.5"
                    ml="$-2.5"
                    borderColor="white"
                    borderWidth="$0.5"
                  >
                    <Avatar.Image
                      source={{
                        uri: 'https://randomuser.me/api/portraits/men/27.jpg',
                        height: 140,
                      }}
                    />
                    <Avatar.Fallback backgroundColor="$blue11" />
                  </Avatar>
                </XStack>
                <Text>200 members have already joined</Text>
              </XStack>
            </YStack>
          </Card>
          <Button
            backgroundColor="$blue8"
            onPress={() => {
              router.push('community-info')
            }}
          >
            Join Community Name
          </Button>
        </YStack>
      </SafeAreaView>
    </View>
  )
}
