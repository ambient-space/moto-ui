import { useState, useCallback } from 'react'
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form'
import { Input, Sheet, View, Text, YStack, ScrollView, Paragraph } from 'tamagui'
import { debounce } from 'lodash'

type TSelectInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label: string
  fetchOptions: (inputText: string) => Promise<{ label: string; value: string }[]>
  debounceTime?: number
  onSelect?: (option: { label: string; value: string }) => void
}
const SelectInput = <T extends FieldValues>({
  name,
  control,
  label,
  fetchOptions,
  debounceTime = 300,
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
      if (searchText.length > 5) {
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
      <Text>{label}</Text>
      <Input
        value={value}
        onChangeText={handleInputChange}
        placeholder="Type to search..."
      />
      {error && <Text color="red">{error.message}</Text>}

      <Sheet modal open={isSelectOpen} onOpenChange={setIsSelectOpen} snapPoints={[50]}>
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
