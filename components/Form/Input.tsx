import {
  Input,
  Paragraph,
  type ParagraphProps,
  View,
  type InputProps,
  Label,
  type ViewProps,
  YStack,
  XStack,
} from 'tamagui'

export type TInputComponentProps = {
  id: string
  inputProps?: InputProps
  messageProps?: ParagraphProps
  containerProps?: ViewProps
  label?: string
  message?: string
  variant?: 'default' | 'inline'
  required?: boolean
}

export default function InputComponent({
  id,
  label,
  inputProps,
  message,
  messageProps,
  containerProps,
  variant = 'default',
  required = false,
}: TInputComponentProps) {
  return variant === 'default' ? (
    <View {...containerProps} py="$1">
      {label && (
        <Label unstyled color="$color" htmlFor={id}>
          {label}
          {required ? '*' : ''}
        </Label>
      )}
      <Input {...inputProps} id={id} />
      {message && <Paragraph {...messageProps}>{message}</Paragraph>}
    </View>
  ) : (
    <YStack {...containerProps} py="$1">
      <XStack jc="space-between" gap="4" ai="baseline">
        {label && (
          <Label unstyled color="$color05" fontSize="$4" htmlFor={id}>
            {label}
            {required ? '*' : ''}
          </Label>
        )}
        <Input
          {...inputProps}
          id={id}
          unstyled
          color="$color"
          fontSize="$6"
          display="flex"
          flexShrink={1}
          width={inputProps?.width || '100%'}
          textAlign="right"
          overflow="scroll"
        />
      </XStack>
      {message && <Paragraph {...messageProps}>{message}</Paragraph>}
    </YStack>
  )
}
