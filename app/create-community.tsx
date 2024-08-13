import InputComponent from '@/components/Form/Input'
import TextAreaComponent from '@/components/Form/TextArea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native'
import {
  Button,
  Form,
  Image,
  Label,
  Paragraph,
  ScrollView,
  Separator,
  Switch,
  View,
  VisuallyHidden,
  XStack,
  YStack,
} from 'tamagui'
import { z } from 'zod'
import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { pickImage } from '@/lib/helpers'
import { communityApiRoutes } from '@/lib/api'

const CreateCommunityFormSchema = z.object({
  name: z.string({ message: 'required' }).min(3, 'Name must be at least 3 characters'),
  description: z
    .string({ message: 'required' })
    .min(3, 'Description must be at least 3 characters'),
  coverImage: z.string().optional(),
  isPrivate: z.boolean({ message: 'required' }),
})

export default function CreateCommunity() {
  const { control, handleSubmit, setValue, watch } = useForm<
    typeof CreateCommunityFormSchema._type
  >({
    resolver: zodResolver(CreateCommunityFormSchema),
    reValidateMode: 'onBlur',
    defaultValues: {
      isPrivate: false,
    },
  })
  const token = useAuthStore((state) => state.token)
  const watchCover = watch('coverImage')
  const insets = useSafeAreaInsets()

  const onSubmit = async (data: typeof CreateCommunityFormSchema._type) => {
    try {
      const res = await client.post(communityApiRoutes['post/community/index'](), data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const d = res.data.data
      router.replace(`/community/${d.id}`)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <YStack jc="space-between" h="100%">
        <SafeAreaView style={{ flexGrow: 1 }}>
          <ScrollView
            keyboardDismissMode="on-drag"
            p="$2"
            contentContainerStyle={{
              display: 'flex',
              gap: 12,
            }}
          >
            <Image
              source={{
                uri:
                  watchCover ||
                  'https://coltonconcrete.co.uk/wp-content/uploads/2021/10/placeholder1.jpg',
                height: 140,
              }}
              borderRadius="$2"
            />
            <Controller
              name="coverImage"
              control={control}
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <>
                  <VisuallyHidden>
                    <InputComponent
                      id="coverImage"
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
                  <Paragraph>{error?.message}</Paragraph>
                </>
              )}
            />

            <XStack gap="$2" p="$3" backgroundColor="$gray2" borderRadius="$4">
              <Button size="$3" onPress={() => pickImage(setValue, 'coverImage', token)}>
                Change Cover Photo
              </Button>
            </XStack>

            <YStack gap="$2" p="$3" backgroundColor="$gray2" borderRadius="$4">
              <Controller
                name="name"
                control={control}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <InputComponent
                    id="name"
                    label="Name"
                    variant="inline"
                    required
                    inputProps={{
                      placeholder: 'Riding Community',
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
                )}
              />
              <Separator />
              <Controller
                name="description"
                control={control}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <TextAreaComponent
                    id="description"
                    label="Description"
                    variant="inline"
                    required
                    textAreaProps={{
                      placeholder: 'Description',
                      maxHeight: 200,
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
                )}
              />
            </YStack>
            <YStack gap="$2" p="$3" backgroundColor="$gray2" borderRadius="$4">
              <Controller
                name="isPrivate"
                control={control}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <XStack alignItems="center" jc="space-between" gap="$4">
                    <Label
                      color="$color05"
                      unstyled
                      fontSize="$4"
                      onPress={() => onChange(!value)}
                    >
                      Make Community Private
                    </Label>
                    <Switch checked={value} onCheckedChange={onChange} onBlur={onBlur}>
                      <Switch.Thumb animation="quicker" />
                    </Switch>
                  </XStack>
                )}
              />
            </YStack>
          </ScrollView>
        </SafeAreaView>
        <View p="$4">
          <Form.Trigger asChild>
            <Button
              backgroundColor="$color"
              color="$background"
              mb={insets.bottom}
              textProps={{
                fontWeight: 'bold',
                fontSize: '$5',
              }}
            >
              Save Changes
            </Button>
          </Form.Trigger>
        </View>
      </YStack>
    </Form>
  )
}
