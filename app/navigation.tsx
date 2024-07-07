import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { SafeAreaView } from 'react-native'
import { Avatar, Button, Input, YStack } from 'tamagui'
import MapView, { Marker } from 'react-native-maps'
import { Minus, Plus } from '@tamagui/lucide-icons'

export default function NavigationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })()
  }, [])
  return (
    <SafeAreaView>
      <YStack ai="center">
        <MapView
          region={{
            longitude: location?.coords.longitude || 0,
            latitude: location?.coords.latitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{
            // borderRadius: 12,
            width: '100%',
            height: '100%',
          }}
        >
          <Marker
            coordinate={{
              longitude: location?.coords.longitude || 0,
              latitude: location?.coords.latitude || 0,
            }}
          >
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
          </Marker>
          <Marker
            coordinate={{
              longitude: location ? location.coords.longitude + 0.04 : 0,
              latitude: location ? location.coords.latitude + 0.05 : 0,
            }}
          >
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
          </Marker>
        </MapView>
        <Input
          placeholder="Search"
          style={{ position: 'absolute', bottom: 80 }}
          w="90%"
          mt="$4"
        />
        <YStack style={{ position: 'absolute', right: 10, bottom: 80 }} gap="$2">
          <Button icon={Plus} size="$3" />
          <Button icon={Minus} size="$3" />
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}
