import InputComponent from '@/components/Form/Input'
import TextAreaComponent from '@/components/Form/TextArea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native'
import { Button, Form, ScrollView, Separator, View, YStack } from 'tamagui'
import { z } from 'zod'
import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import { router } from 'expo-router'
import DatePickerInput from '@/components/Form/DatePicker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: handle location input with map support
const CreateTripFormSchema = z.object({
  name: z.string({ message: 'required' }).min(3, 'Name must be at least 3 characters'),
  description: z
    .string({ message: 'required' })
    .min(3, 'Description must be at least 3 characters'),
  startDate: z.string({ message: 'required' }),
  endDate: z.string({ message: 'required' }).optional(),
  maxParticipants: z.coerce.number().min(2, 'atleast 2 participants required').optional(),
  // startLocation: z.object({
  //   lat: z.string(),
  //   lng: z.string(),
  // }),
  // endLocation: z
  //   .object({
  //     lat: z.string(),
  //     lng: z.string(),
  //   })
  //   .optional(),
  startLocation: z.string({ message: 'required' }),
  endLocation: z.string().optional(),
})

export default function CreateTrips() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<typeof CreateTripFormSchema._type>({
    resolver: zodResolver(CreateTripFormSchema),
    reValidateMode: 'onBlur',
  })
  const watchStartDate = watch('startDate')
  const token = useAuthStore((state) => state.token)
  const insets = useSafeAreaInsets()

  // const [startLocation, setStartLocation] = useState("")

  // const searchLocations = async (searchText: string) => {
  //   const params = new URLSearchParams({
  //     q: searchText,
  //     format: 'json',
  //     limit: '5',
  //   })
  //   const response = await fetch(
  //     `https://nominatim.openstreetmap.org/search.php?${params}`,
  //   )
  //   const data = await response.json()
  //   return data.map(
  //     (item: {
  //       lat: string
  //       lon: string
  //       display_name: string
  //     }) => ({
  //       value: `${item.lat},${item.lon}`,
  //       label: item.display_name,
  //     }),
  //   )
  // }

  const onSubmit = async (data: typeof CreateTripFormSchema._type) => {
    try {
      const res = await client.post('/trip', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const d = res.data.data
      router.push(`/trip/${d.id}`)
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
            py="$2"
            px="$3"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              display: 'flex',
              gap: 12,
            }}
          >
            <YStack gap="$2" backgroundColor="$gray2" p="$2" borderRadius="$4">
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
                    required
                    inputProps={{
                      placeholder: 'Trip to Shimla',
                      value,
                      onBlur,
                      onChangeText: onChange,
                      // add red border if error
                      borderColor: error ? 'red' : undefined,
                    }}
                    variant="inline"
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
                      width: '100%',
                      textAlign: 'right',
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
                name="maxParticipants"
                control={control}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <InputComponent
                    id="maxParticipants"
                    label="Max Participants"
                    variant="inline"
                    required
                    inputProps={{
                      placeholder: '4',
                      value: value?.toString(),
                      minWidth: '20%',
                      textAlign: 'right',
                      onBlur,
                      onChangeText: onChange,
                      inputMode: 'numeric',
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

            <YStack gap="$2" backgroundColor="$gray2" p="$2" borderRadius="$4">
              <DatePickerInput
                id="startDate"
                name="startDate"
                required
                control={control}
                label="Start Date"
                datePickerProps={{
                  minimumDate: new Date(),
                }}
                variant="inline"
              />
              <Separator />
              <DatePickerInput
                id="endDate"
                name="endDate"
                control={control}
                label="End Date"
                datePickerProps={{
                  minimumDate: watchStartDate ? new Date(watchStartDate) : new Date(),
                }}
                variant="inline"
              />
            </YStack>

            {/* <SelectInput
            name="startLocation"
            control={control}
            debounceTime={1000}
            label="Start Location"
            fetchOptions={searchLocations}
          /> */}
            <YStack gap="$2" backgroundColor="$gray2" p="$2" borderRadius="$4">
              <Controller
                name="startLocation"
                control={control}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <InputComponent
                    id="startLocation"
                    label="Start Location"
                    variant="inline"
                    required
                    inputProps={{
                      placeholder: 'Cannaught Place, New Delhi',
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
                name="endLocation"
                control={control}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <InputComponent
                    id="endLocation"
                    label="End Location"
                    variant="inline"
                    inputProps={{
                      placeholder: 'Ambience Mall, Gurugram',
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
          </ScrollView>
        </SafeAreaView>
        <Form.Trigger asChild>
          <View bg="$color5" p="$4">
            <Button backgroundColor="$blue8" mb={insets.bottom}>
              Save Changes
            </Button>
          </View>
        </Form.Trigger>
      </YStack>
    </Form>
  )
}
