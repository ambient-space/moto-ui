import {
  Avatar,
  Button,
  Form,
  Image,
  Paragraph,
  Separator,
  View,
  VisuallyHidden,
  XStack,
  YStack,
} from 'tamagui'
import InputComponent from '../../Form/Input'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { client } from '@/lib/axios'
import { AxiosError } from 'axios'
import useAuthStore from '@/state/authStore'
import { router } from 'expo-router'
import TextAreaComponent from '@/components/Form/TextArea'
import { pickImage } from '@/lib/helpers'

const SignupFormSchema = z.object({
  fullName: z
    .string({ message: 'Required' })
    .min(3, 'Username must be at least 3 characters'),
  bio: z.string().optional(),
  profilePicture: z.string().optional(),
  coverImage: z.string().optional(),
})

type TProfileProps = {
  token: string
  onSuccess?: () => void
}

export default function Profile({ token, onSuccess }: TProfileProps) {
  const login = useAuthStore((state) => state.login)

  const {
    control,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors },
  } = useForm<typeof SignupFormSchema._type>({
    resolver: zodResolver(SignupFormSchema),
    reValidateMode: 'onBlur',
  })
  const watchCover = watch('coverImage')
  const watchAvatar = watch('profilePicture')

  const handleSignup = async (data: typeof SignupFormSchema._type) => {
    try {
      const res = await client.post('/user', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.data.error !== null) {
        // handle errors
        console.error(res.data.error)
        return
      }

      const user = await client.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (user.data.error !== null) {
        // handle errors
      }
      login(token, user.data.data)
      router.navigate('/home')
    } catch (err: any) {
      console.debug(err)

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

  if (!token) return null

  return (
    <View
      key="signup_profile"
      animation="200ms"
      enterStyle={{
        x: 40,
        opacity: 0,
      }}
      exitStyle={{
        x: 40,
        opacity: 0,
      }}
    >
      <Form onSubmit={handleSubmit(handleSignup)}>
        <Image
          source={{
            uri:
              watchCover ||
              'https://coltonconcrete.co.uk/wp-content/uploads/2021/10/placeholder1.jpg',
            height: 140,
          }}
          borderRadius="$2"
        />
        <YStack gap="$2">
          <Avatar
            size="$8"
            mt="$-10"
            borderRadius="$2"
            borderColor="white"
            borderWidth="$1"
            backgroundColor="$blue10"
          >
            <Avatar.Image
              source={{
                uri:
                  watchAvatar ||
                  'https://coltonconcrete.co.uk/wp-content/uploads/2021/10/placeholder1.jpg',
                height: 140,
              }}
            />
            <Avatar.Fallback />
          </Avatar>
          <XStack gap="$2">
            <Controller
              name="coverImage"
              control={control}
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <VisuallyHidden>
                  <InputComponent
                    id="cover"
                    label="Cover"
                    inputProps={{
                      value,
                      onBlur,
                      onChangeText: onChange,
                      // add red border if error
                      borderColor: error ? 'red' : undefined,
                    }}
                    message={error?.message}
                    messageProps={{
                      color: 'red',
                    }}
                  />
                </VisuallyHidden>
              )}
            />
            <Controller
              name="profilePicture"
              control={control}
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <VisuallyHidden>
                  <InputComponent
                    id="avatar"
                    label="Avatar"
                    inputProps={{
                      value,
                      onBlur,
                      onChangeText: onChange,
                      // add red border if error
                      borderColor: error ? 'red' : undefined,
                    }}
                    message={error?.message}
                    messageProps={{
                      color: 'red',
                    }}
                  />
                </VisuallyHidden>
              )}
            />

            <Button
              size="$3"
              onPress={() => pickImage(setValue, 'profilePicture', token)}
            >
              Change Avatar
            </Button>
            <Button size="$3" onPress={() => pickImage(setValue, 'coverImage', token)}>
              Change Cover Photo
            </Button>
          </XStack>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputComponent
                id="fullname_signup"
                variant="inline"
                label="Name"
                required
                inputProps={{
                  placeholder: 'John Doe',
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
            name="bio"
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <TextAreaComponent
                id="bio_signup"
                variant="inline"
                label="Bio"
                textAreaProps={{
                  placeholder: 'Tell us about yourself',
                  value,
                  onBlur,
                  onChangeText: onChange,
                  autoCapitalize: 'none',
                  borderColor: error ? 'red' : undefined,
                  maxHeight: 100,
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
          <Button w="100%">Finish Sign up</Button>
        </Form.Trigger>
      </Form>
    </View>
  )
}
