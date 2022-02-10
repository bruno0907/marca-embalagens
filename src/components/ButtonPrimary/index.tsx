import { Button, ButtonProps } from "@chakra-ui/react"

type Props = ButtonProps & {
  type?: string;
}

export const ButtonPrimary = ({ type, ...rest }: Props) => {
  return (
    <Button
      type={type ?? 'button'}
      colorScheme="blue"      
      fontSize={['sm', 'sm', 'initial']}
      flexShrink={0}
      {...rest}
    />
  )
}