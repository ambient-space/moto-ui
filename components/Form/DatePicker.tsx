import { useState } from 'react'
import { Keyboard, Platform, SafeAreaView } from 'react-native'
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form'
import DateTimePicker, {
  type DateTimePickerEvent,
  type DatePickerOptions,
} from '@react-native-community/datetimepicker'
import { Input, View, Text, Sheet, Button, YStack, XStack, Label } from 'tamagui'
import { X } from '@tamagui/lucide-icons'

type TDatePickerInputProps<T extends FieldValues> = {
  name: Path<T>
  id: string
  control: Control<T>
  label: string
  datePickerProps?: Omit<DatePickerOptions, 'value' | 'mode' | 'onChange'>
  variant?: 'default' | 'inline'
  required?: boolean
}

const DatePickerInput = <T extends FieldValues>({
  name,
  id,
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
            <Label
              htmlFor={id}
              unstyled
              onPress={() => {
                Keyboard.dismiss()
                setIsOpen(true)
              }}
            >
              {label}
              {required ? '*' : ''}
            </Label>
            <Input
              id={id}
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
            <Label
              color="$color05"
              fontSize="$4"
              onPress={() => {
                Keyboard.dismiss()
                setIsOpen(true)
              }}
              unstyled
              htmlFor={id}
            >
              {label}
              {required ? '*' : ''}
            </Label>
            <Input
              id={id}
              value={value ? new Date(value).toLocaleString() : ''}
              onPressIn={() => {
                Keyboard.dismiss()
                setIsOpen(true)
              }}
              width="100%"
              textAlign="right"
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
        <Sheet.Frame alignItems="center" justifyContent="center" p="$4">
          <Sheet.Handle />
          <SafeAreaView>
            <XStack jc="flex-end" w="100%">
              <Button icon={X} h="0" p="$2" borderRadius="$12" onPress={handleClose} />
            </XStack>
            <DateTimePicker
              value={value ? new Date(value) : new Date()}
              mode="datetime"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleConfirm}
              {...datePickerProps}
            />
            <XStack gap="$2" jc="center">
              <Button
                onPress={() => {
                  onChange(null)
                  handleClose()
                }}
                variant="outlined"
                disabled={!value}
                marginTop="$4"
              >
                Clear
              </Button>
              <Button onPress={handleClose} disabled={!value} marginTop="$4">
                Confirm
              </Button>
            </XStack>
          </SafeAreaView>
        </Sheet.Frame>
      </Sheet>
    </View>
  )
}

export default DatePickerInput
