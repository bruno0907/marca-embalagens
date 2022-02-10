import { ReactNode } from "react"
import { Stack, StackProps } from "@chakra-ui/react"

type Props = StackProps & {  
  onSubmit: () => any;
  children: ReactNode;
}

export const Form = ({ onSubmit, children, ...rest }: Props) => {
  return (
    <Stack
      as="form" 
      onSubmit={onSubmit} 
      spacing={[6, 6, 12]}
      maxW="1140px"
      m="auto"
      {...rest}
    >
      {children}
    </Stack>
  )
}
