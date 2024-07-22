import '../tamagui-web.css'

import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { router, SplashScreen, Stack } from 'expo-router'
import { Provider } from './Provider'
import { Plus } from '@tamagui/lucide-icons'
import { Button } from 'tamagui'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <Provider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="trips"
            options={{
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTitle: 'Explore Trips',
              headerRight: () => (
                <Button
                  unstyled
                  onPress={() => {
                    router.push('/create-trip')
                  }}
                >
                  <Plus />
                </Button>
              ),
              headerSearchBarOptions: {
                placeholder: 'Search for trips',
              },
            }}
          />
          <Stack.Screen
            name="communities"
            options={{
              headerBackTitleVisible: false,
              headerTitle: 'Explore Communities',
              headerRight: () => (
                <Button
                  unstyled
                  onPress={() => {
                    router.push('/create-community')
                  }}
                >
                  <Plus />
                </Button>
              ),
              headerSearchBarOptions: {
                placeholder: 'Search for communities',
                onSearchButtonPress: () => {
                  console.debug('Search button pressed')
                },
              },
            }}
          />
          <Stack.Screen
            name="profile"
            options={{
              headerBackTitleVisible: false,
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name="join-community"
            options={{
              headerBackTitleVisible: false,
              headerTitle: '',
            }}
          />
          <Stack.Screen name="navigation" />
          <Stack.Screen
            name="community"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="trip"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="create-community"
            options={{
              headerBackTitleVisible: false,
              headerTitle: 'Create Community',
              headerTransparent: true,
            }}
          />
        </Stack>
      </ThemeProvider>
    </Provider>
  )
}
