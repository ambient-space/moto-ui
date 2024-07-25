import * as ImagePicker from 'expo-image-picker'
import { client } from './axios'
import type { FieldValues, Path, UseFormSetValue } from 'react-hook-form'

export const pickImage = async <T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  field: Path<T>,
  token: string | null,
) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [16, 9],
    quality: 0.3,
    allowsMultipleSelection: false,
  })

  if (!result.canceled) {
    const formData = new FormData()
    formData.append('image', {
      uri: result.assets[0].uri,
      name: result.assets[0].uri.split('/').pop(),
      type: result.assets[0].mimeType,
    } as any)
    formData.append('field', field)

    try {
      const response = await client.post('/asset/upload-image', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000,
        timeoutErrorMessage: 'Image upload timed out',
      })

      if (response.data.data && response.data.data.url) {
        setValue(field, response.data.data.url)
      } else {
        console.error('Image upload failed')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }
}
