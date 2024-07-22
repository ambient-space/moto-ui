import { useState } from 'react'
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form'
import DateTimePicker, {
  type DateTimePickerEvent,
  type DatePickerOptions,
} from '@react-native-community/datetimepicker'
import { Input, View, Text } from 'tamagui'

type TDatePickerInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label: string
  datePickerProps?: Omit<DatePickerOptions, 'value' | 'mode' | 'onChange'>
}

const DatePickerInput = <T extends FieldValues>({
  name,
  control,
  label,
  datePickerProps,
}: TDatePickerInputProps<T>) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // hideDatePicker()
    if (selectedDate) {
      onChange(selectedDate.toISOString())
    }
  }

  const handleBlur = () => {
    onBlur()
    hideDatePicker()
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <Text>{label}</Text>
        <Input
          value={value ? new Date(value).toLocaleString() : ''}
          onPressIn={isDatePickerVisible ? hideDatePicker : showDatePicker}
          placeholder="Select a date"
          editable={false}
          onBlur={handleBlur}
        />
        {error && <Text color="red">{error.message}</Text>}

        {isDatePickerVisible && (
          <DateTimePicker
            value={value ? new Date(value) : new Date()}
            mode="datetime"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleConfirm}
            {...datePickerProps}
            // For iOS, we need to add a button to close the picker
            {...(Platform.OS === 'ios' && {
              onCancel: hideDatePicker,
            })}
          />
        )}

        {/* {Platform.OS === 'ios' && isDatePickerVisible && (
          <Button onPress={hideDatePicker}>Confirm</Button>
        )} */}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default DatePickerInput
