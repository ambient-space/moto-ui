import '../tamagui-web.css'

import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from './Provider'

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
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="trips"
            options={{
              headerBackTitleVisible: false,
              headerTitle: 'Explore Trips',
            }}
          />
          <Stack.Screen
            name="communities"
            options={{
              headerBackTitleVisible: false,
              headerTitle: 'Explore Communities',
            }}
          />
          <Stack.Screen
            name="profile"
            options={{
              headerBackTitleVisible: false,
              headerTransparent: true,
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name="join-community"
            options={{
              headerBackTitleVisible: false,
              headerTransparent: true,
              headerTitle: '',
            }}
          />
          <Stack.Screen name="navigation" />
          <Stack.Screen
            name="community-info"
            options={{
              headerBackTitleVisible: false,
              headerTransparent: true,
              headerTitle: '',
            }}
          />
        </Stack>
      </ThemeProvider>
    </Provider>
  )
}
