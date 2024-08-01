import { useState, useCallback } from 'react'
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form'
import { Sheet, View, YStack, ScrollView, Paragraph } from 'tamagui'
import { debounce } from 'lodash'
import InputComponent, { type TInputComponentProps } from './Input'

type TSelectInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label: string
  fetchOptions: (inputText: string) => Promise<{ label: string; value: string }[]>
  debounceTime?: number
  minSearchLength?: number
  onSelect?: (option: { label: string; value: string }) => void
  inputProps?: TInputComponentProps
}
const SelectInput = <T extends FieldValues>({
  name,
  control,
  label,
  fetchOptions,
  minSearchLength = 5,
  debounceTime = 300,
  inputProps,
}: TSelectInputProps<T>) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [options, setOptions] = useState<
    {
      label: string
      value: string
    }[]
  >([])

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const debouncedSearch = useCallback(
    debounce(async (searchText) => {
      if (searchText.length > minSearchLength) {
        const results = await fetchOptions(searchText)
        setOptions(results)
        setIsSelectOpen(true)
      } else {
        setOptions([])
        setIsSelectOpen(false)
      }
    }, debounceTime),
    [],
  )

  const handleInputChange = (text: string) => {
    onChange(text)
    debouncedSearch(text)
  }

  const handleSelectOption = (option: {
    label: string
    value: string
  }) => {
    onChange(option.value)
    setIsSelectOpen(false)
  }

  return (
    <View>
      <InputComponent
        id="vehicle"
        variant="inline"
        label="Vehicle"
        inputProps={{
          placeholder: 'Type to search...',
          value: options.find((option) => option.value === value)?.label,
          onChangeText: handleInputChange,
          minWidth: '20%',
          textAlign: 'right',
          // add red border if error
          borderColor: error ? 'red' : undefined,
        }}
        message={error?.message}
        messageProps={{
          color: 'red',
        }}
        {...inputProps}
      />

      <Sheet
        modal
        open={isSelectOpen}
        onOpenChange={setIsSelectOpen}
        native
        snapPoints={[50]}
      >
        <Sheet.Overlay />
        <Sheet.Frame>
          <Sheet.Handle />
          <ScrollView>
            <YStack padding="$4" space="$4">
              {options.length > 0 ? (
                options.map((option) => (
                  <Paragraph
                    key={option.value}
                    onPress={() => handleSelectOption(option)}
                  >
                    {option.label}
                  </Paragraph>
                ))
              ) : (
                <Paragraph>No results found</Paragraph>
              )}
            </YStack>
          </ScrollView>
        </Sheet.Frame>
      </Sheet>
    </View>
  )
}

export default SelectInput
