import { useState } from 'react'
import { Platform } from 'react-native'
import { Button, Input, Text, View, VisuallyHidden } from 'tamagui'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

export default function ImagePickerComponent() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null)
  const [base64Image, setBase64Image] = useState<string | undefined>()

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      selectionLimit: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0])
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      })
      setBase64Image(base64)
      console.log(base64)
    }
  }

  return (
    <View>
      <VisuallyHidden>
        <Input value={base64Image} />
      </VisuallyHidden>
      <View display="flex" flexDirection="row" gap="$2" alignItems="center">
        <Text>{image?.fileName}</Text>
        <Button onPress={pickImage} backgroundColor="$blue8">
          Select an Image
        </Button>
      </View>
    </View>
  )
}
