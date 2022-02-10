import { ReactNode } from "react"
import { Stack, StackProps } from "@chakra-ui/react"

type Props = StackProps & {  
  children: ReactNode;
}

const Section = ({ children, ...rest}: Props) => {
  return (
    <Stack spacing={[4, 6, 6]} {...rest}>
      {children}
    </Stack>
  )
}

export { Section }
