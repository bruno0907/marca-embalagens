import { ReactNode } from "react"
import { Box, BoxProps } from "@chakra-ui/react"

interface ContentProps extends BoxProps {
  children: ReactNode;
}

const Content = ({ children, ...rest }: ContentProps) => {
  return (
    <Box p="8" bgColor="gray.50" borderRadius="8" boxShadow="sm" {...rest}>
      {children}
    </Box>
  )
}

export { Content }
