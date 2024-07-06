import { useEffect, useState } from 'react'
import { Text, View } from 'tamagui'
import * as Location from 'expo-location'

export default function JoinCommunityScreen() {
  const [location, setLocation] = useState<Location.LocationGeocodedAddress[] | null>(
    null
  )
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      const geocode = await Location.reverseGeocodeAsync(location.coords)
      setLocation(geocode)
    })()
  }, [])

  let text = 'Waiting..'
  if (errorMsg.length > 0) {
    text = errorMsg
  } else if (location) {
    text = JSON.stringify(location)
  }
  return (
    <View>
      <Text>{text}</Text>
    </View>
  )
}
