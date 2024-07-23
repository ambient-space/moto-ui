import { useState } from 'react'
import { Keyboard, Platform } from 'react-native'
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form'
import DateTimePicker, {
  type DateTimePickerEvent,
  type DatePickerOptions,
} from '@react-native-community/datetimepicker'
import { Input, View, Text, Sheet, Button, YStack, XStack } from 'tamagui'

type TDatePickerInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label: string
  datePickerProps?: Omit<DatePickerOptions, 'value' | 'mode' | 'onChange'>
  variant?: 'default' | 'inline'
  required?: boolean
}

const DatePickerInput = <T extends FieldValues>({
  name,
  control,
  label,
  datePickerProps,
  variant = 'default',
  required = false,
}: TDatePickerInputProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const handleConfirm = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      onChange(selectedDate.toISOString())
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    onBlur()
  }

  return (
    <View>
      <YStack py="$1">
        {variant === 'default' ? (
          <>
            <Text>
              {label}
              {required ? '*' : ''}
            </Text>
            <Input
              value={value ? new Date(value).toLocaleString() : ''}
              onPressIn={() => {
                Keyboard.dismiss()
                setIsOpen(true)
              }}
              placeholder="Select a date"
              editable={false}
            />
          </>
        ) : (
          <XStack gap="$4" jc="space-between" ai="baseline">
            <Text color="$color05" fontSize="$4">
              {label}
              {required ? '*' : ''}
            </Text>
            <Input
              value={value ? new Date(value).toLocaleString() : ''}
              onPressIn={() => {
                Keyboard.dismiss()
                setIsOpen(true)
              }}
              placeholder="Select a date"
              editable={false}
              unstyled
              color="$color"
              fontSize="$6"
              display="flex"
              flexShrink={1}
              overflow="scroll"
            />
          </XStack>
        )}
        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
      </YStack>

      <Sheet
        modal
        open={isOpen}
        onOpenChange={setIsOpen}
        snapPoints={[40]}
        position={0}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame alignItems="center" justifyContent="center">
          <Sheet.Handle />
          <DateTimePicker
            value={value ? new Date(value) : new Date()}
            mode="datetime"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleConfirm}
            {...datePickerProps}
          />
          <Button onPress={handleClose} disabled={!value} marginTop="$4">
            Confirm
          </Button>
        </Sheet.Frame>
      </Sheet>
    </View>
  )
}

export default DatePickerInput
