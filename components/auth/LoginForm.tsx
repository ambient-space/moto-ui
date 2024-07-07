import { Button, Card, H2, ScrollView, View } from 'tamagui'
import InputComponent from '../Form/Input'
import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import { router } from 'expo-router'

export type TLoginFormProps = {
  handleSignUp: () => void
}

export default function LoginForm({ handleSignUp }: TLoginFormProps) {
  const login = useAuthStore((state) => state.login)

  const handleLogin = async () => {
    try {
      const res = await client.post('/auth/login', {
        email: 'test@test.com',
        password: 'password',
      })

      if (res.data.error !== null) {
        // handle errors
        return
      }
      login(res.data.data.session)
      router.push('/home')
    } catch (err) {
      router.push('/home')
      console.error(err)
    }
  }

  return (
    <View
      gap="$2"
      p="$4"
      key="login"
      animation="200ms"
      enterStyle={{
        x: -20,
        opacity: 0,
      }}
      exitStyle={{
        x: -20,
        opacity: 0,
      }}
    >
      <H2>Login to your account</H2>
      <Card p="$4" h="max-content" mb="$8" pb="$10">
        <ScrollView
          w="100%"
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
        >
          <InputComponent
            id="email_login"
            label="Email"
            inputProps={{ placeholder: 'johndoe@doemail.com' }}
          />
          <InputComponent
            id="password_login"
            label="Password"
            inputProps={{ placeholder: 'Password123', secureTextEntry: true }}
          />
          <Button w="100%" mt="$2" onPress={handleLogin}>
            Log in
          </Button>
          <Button unstyled w="100%" textAlign="center" mt="$4" onPress={handleSignUp}>
            Don't have an account? Sign Up
          </Button>
        </ScrollView>
      </Card>
    </View>
  )
}
