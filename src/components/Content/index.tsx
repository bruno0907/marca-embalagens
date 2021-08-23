import { ReactNode } from "react"
import { Box } from "@chakra-ui/react"

type ContentProps = {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return (
    <Box as="main" bgColor="gray.100" p="8" borderRadius="8">
      {children}
    </Box>
  )
}

export { Content }
