import { HStack, StackProps } from "@chakra-ui/react";
import { ReactNode } from "react"

type Props = StackProps & {
  children: ReactNode;
}

const SectionHeader = ({ children }: Props) => {
  return (
    <HStack spacing={3} justify="space-between">{children}</HStack>
  )
}

export {
  SectionHeader
}
