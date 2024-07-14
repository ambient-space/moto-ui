import { Button, Card, Form, H2, Paragraph, ScrollView, View } from 'tamagui'
import InputComponent from '../Form/Input'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { client } from '@/lib/axios'
import { AxiosError } from 'axios'
import useAuthStore from '@/state/authStore'
import { router } from 'expo-router'

export type TSignupFormProps = {
  handleLogin: () => void
}

const SignupFormSchema = z.object({
  username: z
    .string({ message: 'Required' })
    .min(3, 'Username must be at least 3 characters'),
  email: z.string({ message: 'Required' }).email('Invalid email address'),
  password: z.string({ message: 'Required' }),
  confirmPassword: z.string({ message: 'Required' }),
})

export default function SignupForm({ handleLogin }: TSignupFormProps) {
  const login = useAuthStore((state) => state.login)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupFormSchema),
    reValidateMode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleSignup = async (data: typeof SignupFormSchema._type) => {
    try {
      const res = await client.post('/auth/register', data)
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
      if (err instanceof AxiosError && err.response) {
        if ('fields' in err.response.data.error) {
          for (const field in err.response.data.error.fields) {
            setError(field as keyof typeof SignupFormSchema._type, {
              message: err.response.data.error.fields[field],
            })
          }
        }

        setError('root', {
          message: err.response.data.error.message,
        })
      }
      console.debug(err)
    }
  }

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
          keyboardDismissMode="on-drag"
        >
          <Form onSubmit={handleSubmit(handleSignup)}>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <InputComponent
                  id="username_signup"
                  label="Username"
                  inputProps={{
                    placeholder: 'johndoe',
                    value,
                    onBlur,
                    onChangeText: onChange,
                    autoCapitalize: 'none',
                    borderColor: error ? 'red' : undefined,
                  }}
                  message={error?.message}
                  messageProps={{
                    color: 'red',
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <InputComponent
                  id="email_signup"
                  label="Email"
                  inputProps={{
                    placeholder: 'johndoe@doemail.com',
                    value,
                    onBlur,
                    onChangeText: onChange,
                    autoCapitalize: 'none',
                    keyboardType: 'email-address',
                    borderColor: error ? 'red' : undefined,
                  }}
                  message={error?.message}
                  messageProps={{
                    color: 'red',
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <InputComponent
                  id="password_signup"
                  label="Password"
                  inputProps={{
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
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <InputComponent
                  id="confirmPassword_signup"
                  label="Confirm Password"
                  inputProps={{
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
            {errors.root && <Paragraph color="red">{errors.root.message}</Paragraph>}

            <Form.Trigger asChild>
              <Button w="100%" mt="$2">
                Sign up
              </Button>
            </Form.Trigger>
            <Button unstyled w="100%" textAlign="center" mt="$4" onPress={handleLogin}>
              Already have an account? Sign In
            </Button>
          </Form>
        </ScrollView>
      </Card>
    </View>
  )
}
