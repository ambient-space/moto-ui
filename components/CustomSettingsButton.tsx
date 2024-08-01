import { useMemo } from 'react'
import { Button, type ButtonProps } from 'tamagui'

export default function CustomSettingsButton({ children, ...props }: ButtonProps) {
  const a = useMemo(() => {
    // split when encounter a digit
    const bgSplit = String(props.backgroundColor).split(/(\d+)/)
    const newBg = bgSplit[0] + (Number.parseInt(bgSplit[1]) + 1)
    return {
      backgroundColor: props.backgroundColor ? newBg : '$background',
    }
  }, [props.backgroundColor])

  return (
    <Button
      unstyled
      py="$2"
      px="$3"
      borderRadius="$2"
      pressStyle={a}
      display="flex"
      gap="$1"
      flexDirection="row"
      alignItems="center"
      fontWeight="600"
      scaleIcon={1.3}
      {...props}
    >
      {children}
    </Button>
  )
}
