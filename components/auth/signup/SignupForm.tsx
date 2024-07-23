import { AnimatePresence, Card, H2, View } from 'tamagui'
import Auth from './Auth'
import Profile from './Profile'
import { useState } from 'react'

export type TSignupFormProps = {
  handleLogin: () => void
}

export default function SignupForm({ handleLogin }: TSignupFormProps) {
  const [step, setStep] = useState(0)
  const [token, setToken] = useState('')
  return (
    <View
      gap="$2"
      p="$4"
      animation="200ms"
      enterStyle={{
        x: 20,
        opacity: 0,
      }}
      exitStyle={{
        x: 20,
        opacity: 0,
      }}
    >
      <H2>Sign up for an account</H2>
      <Card p="$4" h="max-content">
        <AnimatePresence exitBeforeEnter initial={false}>
          {step === 0 ? (
            <Auth
              handleLogin={handleLogin}
              onSuccess={(token: string) => {
                setStep(1)
                setToken(token)
              }}
            />
          ) : (
            <Profile token={token} />
          )}
        </AnimatePresence>
      </Card>
    </View>
  )
}
