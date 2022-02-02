import { ReactNode } from "react"
import { Stack, StackProps } from "@chakra-ui/react"

type Props = StackProps & {  
  onSubmit: () => any;
  children: ReactNode;
}

const Form = ({ onSubmit, children, ...rest }: Props) => {


  return (
    <Stack
      as="form" 
      onSubmit={onSubmit} 
      spacing={12}
      maxW="1080px"
      m="auto"
      {...rest}
    >
      {children}
    </Stack>
  )
}

export { Form }
