import { Button, Card, Form, H2, Paragraph, Separator, View, YStack } from 'tamagui'
import InputComponent from '../Form/Input'
import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'

export type TLoginFormProps = {
  handleSignUp: () => void
}

const LoginFormSchema = z.object({
  email: z.string({ message: 'required' }).email('Invalid email address'),
  password: z.string({ message: 'required' }).min(1, "Password can't be empty"),
})

export default function LoginForm({ handleSignUp }: TLoginFormProps) {
  const login = useAuthStore((state) => state.login)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<typeof LoginFormSchema._type>({
    resolver: zodResolver(LoginFormSchema),
    reValidateMode: 'onChange',
  })

  const handleLogin = async (data: typeof LoginFormSchema._type) => {
    try {
      const res = await client.post('/auth/login', data)

      if (res.data.error !== null) {
        // handle errors
        console.error(res.data.error)
        return
      }

      const user = await client.get('/user', {
        headers: {
          Authorization: `Bearer ${res.data.data.session}`,
        },
      })

      if (user.data.error !== null) {
        // handle errors
      }
      login(res.data.data.session, user.data.data)
      router.push('/home')
    } catch (err: any) {
      console.error(err)
      if (err instanceof AxiosError && err.response) {
        setError('root', {
          message: err.response.data.error.message,
        })

        console.debug(err.response.data.error.message)
      }
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
      <Card p="$4" h="max-content">
        <Form onSubmit={handleSubmit(handleLogin)}>
          <YStack gap="$2">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <InputComponent
                  id="email_login"
                  required
                  label="Email"
                  variant="inline"
                  inputProps={{
                    placeholder: 'johndoe@doemail.com',
                    value,
                    onBlur,
                    onChangeText: onChange,
                    autoCapitalize: 'none',
                    keyboardType: 'email-address',
                    // add red border if error
                    borderColor: error ? 'red' : undefined,
                  }}
                  message={error?.message}
                  messageProps={{
                    color: 'red',
                  }}
                />
              )}
            />
            <Separator />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <InputComponent
                  id="password_login"
                  label="Password"
                  required
                  variant="inline"
                  inputProps={{
                    width: '100%',
                    placeholder: 'Password123',
                    secureTextEntry: true,
                    value,
                    onBlur,
                    onChangeText: onChange,
                    borderColor: error ? 'red' : undefined,
                  }}
                  message={error?.message}
                  messageProps={{
                    color: 'red',
                  }}
                />
              )}
            />
          </YStack>
          {errors.root && <Paragraph color="red">{errors.root.message}</Paragraph>}
          <Form.Trigger asChild mt="$4">
            <Button w="100%">Log in</Button>
          </Form.Trigger>
          <Button unstyled w="100%" textAlign="center" mt="$2" onPress={handleSignUp}>
            Don't have an account? Sign Up
          </Button>
        </Form>
      </Card>
    </View>
  )
}
