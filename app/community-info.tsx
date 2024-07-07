import { DemoCard } from '@/components/Card'
import { SafeAreaView } from 'react-native'
import { Avatar, Image, Text, YStack, XStack, H3, H4, ScrollView, Button } from 'tamagui'

export default function CommunityInfoScreen() {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack>
          <Image
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
            <Button size="$3" mt="$4" backgroundColor="$blue8">
              Chat
            </Button>

            <H4>Trips</H4>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <XStack gap="$2">
                <DemoCard
                  title="DBBR Delhi"
                  description="Delhi's best riding motorcade"
                />
                <DemoCard
                  title="DBBR Delhi"
                  description="Delhi's best riding motorcade"
                />
                <DemoCard
                  title="DBBR Delhi"
                  description="Delhi's best riding motorcade"
                />
                <DemoCard
                  title="DBBR Delhi"
                  description="Delhi's best riding motorcade"
                />
                <DemoCard
                  title="DBBR Delhi"
                  description="Delhi's best riding motorcade"
                />
              </XStack>
            </ScrollView>

            <H4>Members</H4>
            <ScrollView
              showsVerticalScrollIndicator={false}
              maxHeight={300}
              overflow="hidden"
              mt="$2"
              backgroundColor="$gray2"
              p="$4"
              borderRadius="$2"
            >
              <YStack gap="$2" mb="$8">
                <XStack gap="$2" ai="center">
                  <Avatar
                    circular
                    size="$4"
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
                  <YStack>
                    <Text fontSize={16}>Member Name</Text>
                    <Text fontSize={12}>Member</Text>
                  </YStack>
                </XStack>
                <XStack gap="$2" ai="center">
                  <Avatar
                    circular
                    size="$4"
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
                  <YStack>
                    <Text fontSize={16}>Member Name</Text>
                    <Text fontSize={12}>Member</Text>
                  </YStack>
                </XStack>
                <XStack gap="$2" ai="center">
                  <Avatar
                    circular
                    size="$4"
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
                  <YStack>
                    <Text fontSize={16}>Member Name</Text>
                    <Text fontSize={12}>Member</Text>
                  </YStack>
                </XStack>
                <XStack gap="$2" ai="center">
                  <Avatar
                    circular
                    size="$4"
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
                  <YStack>
                    <Text fontSize={16}>Member Name</Text>
                    <Text fontSize={12}>Member</Text>
                  </YStack>
                </XStack>
                <XStack gap="$2" ai="center">
                  <Avatar
                    circular
                    size="$4"
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
                  <YStack>
                    <Text fontSize={16}>Member Name</Text>
                    <Text fontSize={12}>Member</Text>
                  </YStack>
                </XStack>
                <XStack gap="$2" ai="center">
                  <Avatar
                    circular
                    size="$4"
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
                  <YStack>
                    <Text fontSize={16}>Member Name</Text>
                    <Text fontSize={12}>Member</Text>
                  </YStack>
                </XStack>
                <XStack gap="$2" ai="center">
                  <Avatar
                    circular
                    size="$4"
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
                  <YStack>
                    <Text fontSize={16}>Member Name</Text>
                    <Text fontSize={12}>Member</Text>
                  </YStack>
                </XStack>
                <XStack gap="$2" ai="center">
                  <Avatar
                    circular
                    size="$4"
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
                  <YStack>
                    <Text fontSize={16}>Member Name</Text>
                    <Text fontSize={12}>Member</Text>
                  </YStack>
                </XStack>
                <XStack gap="$2" ai="center">
                  <Avatar
                    circular
                    size="$4"
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
                  <YStack>
                    <Text fontSize={16}>Member Name</Text>
                    <Text fontSize={12}>Member</Text>
                  </YStack>
                </XStack>
                <XStack gap="$2" ai="center">
                  <Avatar
                    circular
                    size="$4"
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
                  <YStack>
                    <Text fontSize={16}>Member Name</Text>
                    <Text fontSize={12}>Member</Text>
                  </YStack>
                </XStack>
                <XStack gap="$2" ai="center">
                  <Avatar
                    circular
                    size="$4"
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
                  <YStack>
                    <Text fontSize={16}>Member Name</Text>
                    <Text fontSize={12}>Member</Text>
                  </YStack>
                </XStack>
                <XStack gap="$2" ai="center">
                  <Avatar
                    circular
                    size="$4"
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
                  <YStack>
                    <Text fontSize={16}>Member Name</Text>
                    <Text fontSize={12}>Member</Text>
                  </YStack>
                </XStack>
              </YStack>
            </ScrollView>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
