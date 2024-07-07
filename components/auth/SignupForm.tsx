import { Button, Card, H2, ScrollView, View } from 'tamagui'
import InputComponent from '../Form/Input'

export type TSignupFormProps = {
  handleLogin: () => void
}

export default function SignupForm({ handleLogin }: TSignupFormProps) {
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
      <Card p="$4" h="max-content" mb="$8" pb="$10">
        <ScrollView
          w="100%"
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
        >
          <InputComponent
            id="email_signup"
            label="Email"
            inputProps={{ placeholder: 'johndoe@doemail.com' }}
          />
          <InputComponent
            id="password_signup"
            label="Password"
            inputProps={{ placeholder: 'Password123', secureTextEntry: true }}
          />
          <InputComponent
            id="confirmPassword_signup"
            label="Confirm Password"
            inputProps={{ placeholder: 'Password123', secureTextEntry: true }}
          />
          <Button w="100%" mt="$2">
            Sign up
          </Button>
          <Button unstyled w="100%" textAlign="center" mt="$4" onPress={handleLogin}>
            Already have an account? Sign In
          </Button>
        </ScrollView>
      </Card>
    </View>
  )
}
