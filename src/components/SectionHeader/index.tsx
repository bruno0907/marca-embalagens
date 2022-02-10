import { HStack, StackProps } from "@chakra-ui/react";
import { ReactNode } from "react"

type Props = StackProps & {
  children: ReactNode;
}

const SectionHeader = ({ children, ...rest }: Props) => {
  return (
    <HStack spacing={3} align="center" {...rest}>
      {children}
    </HStack>
  )
}

export {
  SectionHeader
}
