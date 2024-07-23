import { Button, Form, Paragraph, Separator, View, YStack } from 'tamagui'
import InputComponent from '../../Form/Input'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { client } from '@/lib/axios'
import { AxiosError } from 'axios'
import useAuthStore from '@/state/authStore'

const SignupFormSchema = z.object({
  username: z
    .string({ message: 'Required' })
    .min(3, 'Username must be at least 3 characters'),
  email: z.string({ message: 'Required' }).email('Invalid email address'),
  password: z.string({ message: 'Required' }),
  confirmPassword: z.string({ message: 'Required' }),
})

export default function Auth({
  handleLogin,
  onSuccess,
}: { handleLogin: () => void; onSuccess: (token: string) => void }) {
  const login = useAuthStore((state) => state.login)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<typeof SignupFormSchema._type>({
    resolver: zodResolver(SignupFormSchema),
    reValidateMode: 'onBlur',
  })

  const handleSignup = async (data: typeof SignupFormSchema._type) => {
    try {
      const res = await client.post('/auth/register', data)
      if (res.data.error !== null) {
        // handle errors
        console.error(res.data.error)
        return
      }

      // login(res.data.data.session, user.data.data)
      onSuccess(res.data.data.session)
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
      console.debug(err.response.data)
    }
  }

  return (
    <View
      key="signup_auth"
      animation="200ms"
      enterStyle={{
        x: -40,
        opacity: 0,
      }}
      exitStyle={{
        x: -40,
        opacity: 0,
      }}
    >
      <Form onSubmit={handleSubmit(handleSignup)}>
        <YStack gap="$2">
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputComponent
                id="username_signup"
                variant="inline"
                required
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
          <Separator />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputComponent
                id="email_signup"
                variant="inline"
                required
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
          <Separator />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputComponent
                id="password_signup"
                label="Password"
                required
                variant="inline"
                inputProps={{
                  placeholder: 'Password123',
                  textContentType: 'oneTimeCode',
                  secureTextEntry: true,
                  value,
                  width: '100%',
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
          <Separator />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputComponent
                id="confirmPassword_signup"
                label="Confirm Password"
                variant="inline"
                required
                inputProps={{
                  placeholder: 'Password123',
                  secureTextEntry: true,
                  textContentType: 'oneTimeCode',
                  value,
                  width: '100%',
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
          <Button w="100%">Continue</Button>
        </Form.Trigger>
        <Button unstyled w="100%" textAlign="center" mt="$2" onPress={handleLogin}>
          Already have an account? Sign In
        </Button>
      </Form>
    </View>
  )
}
