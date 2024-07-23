import {
  TextArea,
  Paragraph,
  type ParagraphProps,
  View,
  type TextAreaProps,
  Label,
  type ViewProps,
  YStack,
  XStack,
} from 'tamagui'

export type TTextAreaComponentProps = {
  id: string
  textAreaProps?: TextAreaProps
  messageProps?: ParagraphProps
  containerProps?: ViewProps
  label?: string
  message?: string
  variant?: 'default' | 'inline'
  required?: boolean
}

export default function TextAreaComponent({
  id,
  label,
  textAreaProps,
  message,
  messageProps,
  containerProps,
  variant = 'default',
  required = false,
}: TTextAreaComponentProps) {
  return variant === 'default' ? (
    <View {...containerProps} py="$1" htmlFor={id}>
      {label && (
        <Label unstyled color="$color">
          {label}
          {required ? '*' : ''}
        </Label>
      )}
      <TextArea {...textAreaProps} id={id} />
      {message && <Paragraph {...messageProps}>{message}</Paragraph>}
    </View>
  ) : (
    <YStack {...containerProps} py="$1">
      <XStack jc="space-between" gap="4" ai="flex-start">
        {label && (
          <Label unstyled color="$color05" fontSize="$4" htmlFor={id}>
            {label}
            {required ? '*' : ''}
          </Label>
        )}
        <TextArea
          {...textAreaProps}
          id={id}
          unstyled
          color="$color"
          fontSize="$6"
          display="flex"
          flexShrink={1}
          overflow="scroll"
        />
      </XStack>
      {message && <Paragraph {...messageProps}>{message}</Paragraph>}
    </YStack>
  )
}
