import {
  TextArea,
  Paragraph,
  type ParagraphProps,
  View,
  type TextAreaProps,
  Label,
  type ViewProps,
} from 'tamagui'

export type TTextAreaComponentProps = {
  id: string
  textAreaProps?: TextAreaProps
  messageProps?: ParagraphProps
  containerProps?: ViewProps
  label?: string
  message?: string
}

export default function TextAreaComponent({
  id,
  label,
  textAreaProps,
  message,
  messageProps,
  containerProps,
}: TTextAreaComponentProps) {
  return (
    <View {...containerProps} py="$1" htmlFor={id}>
      {label && (
        <Label unstyled color="$color">
          {label}
        </Label>
      )}
      <TextArea {...textAreaProps} id={id} />
      {message && <Paragraph {...messageProps}>{message}</Paragraph>}
    </View>
  )
}
