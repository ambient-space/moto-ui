import {
  Input,
  Paragraph,
  type ParagraphProps,
  View,
  type InputProps,
  Label,
  type ViewProps,
} from 'tamagui'

export type TInputComponentProps = {
  id: string
  inputProps?: InputProps
  messageProps?: ParagraphProps
  containerProps?: ViewProps
  label?: string
  message?: string
}

export default function InputComponent({
  id,
  label,
  inputProps,
  message,
  messageProps,
  containerProps,
}: TInputComponentProps) {
  return (
    <View {...containerProps} py="$1" htmlFor={id}>
      {label && (
        <Label unstyled color="$color">
          {label}
        </Label>
      )}
      <Input {...inputProps} id={id} />
      {message && <Paragraph {...messageProps}>{message}</Paragraph>}
    </View>
  )
}
