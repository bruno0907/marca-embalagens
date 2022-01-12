import { ReactNode } from "react"
import { Flex, FlexProps } from "@chakra-ui/react"

interface Props extends FlexProps {
  children: ReactNode;
}

const Content = ({ children, ...rest }: Props) => {
  return (
    <Flex
      flexDir="column"
      w="100%"
      p="8"
      bgColor="gray.50"
      borderRadius="md"
      boxShadow="sm"
      {...rest}
    >
      {children}
    </Flex>
  )
}

export { Content }
