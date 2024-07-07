import { SafeAreaView } from 'react-native'
import { Avatar, Image, Text, View, YStack, Button, Paragraph, H3 } from 'tamagui'

export default function ProfileScreen() {
  return (
    <View>
      <SafeAreaView>
        <YStack>
          <Image
            source={{
              uri: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
              height: 140,
            }}
          />
          <YStack gap="$2" p="$4" ai="center">
            <Avatar
              size="$8"
              mt="$-10"
              circular
              borderColor="white"
              borderWidth="$1"
              backgroundColor="$blue10"
            >
              <Avatar.Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/women/12.jpg',
                  height: 140,
                }}
              />
              <Avatar.Fallback />
            </Avatar>
            <YStack ai="center" gap="$2">
              <H3>User name</H3>
              <Paragraph color="$color05" mt="$-3">
                @username
              </Paragraph>
              <Text>This is the user's bio</Text>
            </YStack>
            <Button size="$3" mt="$4" w="100%">
              Chat
            </Button>
          </YStack>
        </YStack>
      </SafeAreaView>
    </View>
  )
}
