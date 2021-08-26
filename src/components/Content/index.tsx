import { ReactNode } from "react"
import { Box } from "@chakra-ui/react"

type ContentProps = {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return (
    <Box p="8">
      {children}
    </Box>
  )
}

export { Content }
