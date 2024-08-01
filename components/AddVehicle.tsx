import { Form, type PopoverProps, Separator, YStack } from 'tamagui'
import SelectInput from './Form/SelectInput'
import { Controller, useForm } from 'react-hook-form'
import { client } from '@/lib/axios'
import CustomSettingsButton from './CustomSettingsButton'
import { Plus } from '@tamagui/lucide-icons'
import InputComponent from './Form/Input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useAuthStore from '@/state/authStore'

export type TAddVehicleProps = PopoverProps

const AddVehicleFormSchema = z.object({
  vehicleId: z.coerce.number({
    message: 'Required',
  }),
  year: z.coerce
    .number({
      message: 'Required',
    })
    .int('Year must be an integer')
    .min(1900, 'Year must be greater than 1900')
    .max(new Date().getFullYear(), `Year must be less than ${new Date().getFullYear()}`),
})

export default function AddVehicle({ ...props }: TAddVehicleProps) {
  const token = useAuthStore((state) => state.token)
  const { control, handleSubmit, reset } = useForm<typeof AddVehicleFormSchema._type>({
    resolver: zodResolver(AddVehicleFormSchema),
    reValidateMode: 'onBlur',
  })

  const onSubmit = async (data: typeof AddVehicleFormSchema._type) => {
    try {
      const res = await client.post('/user/vehicle', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.data.error === null) reset()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <YStack>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <YStack gap="$3">
          <SelectInput
            label="Vehicle Name"
            minSearchLength={3}
            fetchOptions={async (query) => {
              const res = await client.get(`/vehicle/autocomplete?q=${query}`)

              return res.data.data.map((vehicle: any) => ({
                label: `${vehicle.make} ${vehicle.model}`,
                value: vehicle.id,
              }))
            }}
            control={control}
            inputProps={{
              id: 'vehicleId',
              required: true,
            }}
            name="vehicleId"
          />
          <Separator />

          <Controller
            name="year"
            control={control}
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
              <InputComponent
                id="year"
                label="Make Year"
                variant="inline"
                required
                inputProps={{
                  placeholder: '2014',
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
          <Form.Trigger asChild>
            <CustomSettingsButton icon={Plus} backgroundColor="$gray4">
              Add Vehicle
            </CustomSettingsButton>
          </Form.Trigger>
        </YStack>
      </Form>
    </YStack>
  )
}
