import InputComponent from '@/components/Form/Input'
import TextAreaComponent from '@/components/Form/TextArea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native'
import { Button, Form, ScrollView } from 'tamagui'
import { z } from 'zod'
import { client } from '@/lib/axios'
import useAuthStore from '@/state/authStore'
import { router } from 'expo-router'
import DatePickerInput from '@/components/Form/DatePicker'

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
    <SafeAreaView>
      <ScrollView
        keyboardDismissMode="on-drag"
        p="$2"
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <Form onSubmit={handleSubmit(onSubmit)} gap="$2" px="$2">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputComponent
                id="name"
                label="Name"
                inputProps={{
                  placeholder: 'Trip to Shimla',
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
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <TextAreaComponent
                id="description"
                label="Description"
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
          <Controller
            name="maxParticipants"
            control={control}
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputComponent
                id="maxParticipants"
                label="Max Participants"
                inputProps={{
                  placeholder: 'Max Participants',
                  maxHeight: 200,
                  value: value?.toString(),
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
          <DatePickerInput
            name="startDate"
            control={control}
            label="Start Date"
            datePickerProps={{
              minimumDate: new Date(),
            }}
          />
          <DatePickerInput
            name="endDate"
            control={control}
            label="End Date"
            datePickerProps={{
              minimumDate: watchStartDate ? new Date(watchStartDate) : new Date(),
            }}
          />

          {/* <SelectInput
            name="startLocation"
            control={control}
            debounceTime={1000}
            label="Start Location"
            fetchOptions={searchLocations}
          /> */}
          <Controller
            name="startLocation"
            control={control}
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputComponent
                id="startLocation"
                label="Start Location"
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
          <Controller
            name="endLocation"
            control={control}
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputComponent
                id="endLocation"
                label="End Location"
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
          <Form.Trigger asChild>
            <Button backgroundColor="$blue8">Save Changes</Button>
          </Form.Trigger>
        </Form>
      </ScrollView>
    </SafeAreaView>
  )
}
