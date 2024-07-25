import { SafeAreaView } from 'react-native'
import { H3, Image, YStack } from 'tamagui'

type THeaderProps = {
  title: string
  avatar: string
  cover: string
}

const CustomHeader = ({ title, cover }: THeaderProps) => {
  return (
    <SafeAreaView>
      <YStack>
        {cover && (
          <Image
            source={{
              uri: cover,
              height: 140,
            }}
          />
        )}
        <YStack gap="$2" px="$4" pt="$4">
          <H3>{title}</H3>
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}

export default CustomHeader
