import { ReactNode } from "react"
import { Box, BoxProps } from "@chakra-ui/react"

interface Props extends BoxProps {
  children: ReactNode;
}

const Content = ({ children, ...rest }: Props) => {
  return (
    <Box
      w="100%"
      maxW="5xl"
      m="auto"
      p={[4, 6, 8]}
      bgColor="gray.50"
      borderRadius="md"
      boxShadow="md"
      {...rest}
    >
      {children}
    </Box>
  )
}

export { Content }
