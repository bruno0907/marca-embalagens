import { ButtonProps, Button } from "@chakra-ui/react"

type Props = ButtonProps & {
  type?: string;
}

export const ButtonLink = ({ type, ...rest }: Props) => {
  return (
    <Button
      type={type ?? 'button'}
      colorScheme="blue"
      variant="link"            
      flexShrink={0}
      fontSize={['sm', 'sm', 'initial']}
      {...rest}
    />
  )
}