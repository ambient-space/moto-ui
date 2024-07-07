import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'
import useAuthStore from '@/state/authStore'
import { Redirect } from 'expo-router'
import { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { AnimatePresence, View } from 'tamagui'

export default function Auth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [showLogin, setShowLogin] = useState(true)

  if (isAuthenticated) return <Redirect href="/home" />
  return (
    <SafeAreaView>
      <View h="100%" jc="flex-end">
        <AnimatePresence exitBeforeEnter>
          {showLogin ? (
            <LoginForm key="login" handleSignUp={() => setShowLogin(false)} />
          ) : (
            <SignupForm key="signup" handleLogin={() => setShowLogin(true)} />
          )}
        </AnimatePresence>
      </View>
    </SafeAreaView>
  )
}
