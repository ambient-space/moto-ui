import { router } from 'expo-router'
import { Avatar, Button, Card, H2, H3, Image, Sheet, Text, YStack } from 'tamagui'

export default function JoinCommunityCard() {
  return (
    <Sheet animation="medium" modal snapPoints={[90]} dismissOnSnapToBottom>
      <Sheet.Overlay
        animation="medium"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle />
      <Sheet.Frame flex={1} justifyContent="center" alignItems="center" space="$5">
        <Sheet.ScrollView>
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
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  )
}
