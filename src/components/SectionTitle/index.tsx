import { Heading, HStack } from "@chakra-ui/react"
import { ReactNode } from "react"

type Props = {
  title?: string;
  children?: ReactNode;
}

const SectionTitle = ({ title , children}: Props) => {
  return (
    <HStack spacing={3} align="center" justify="space-between">
      <Heading size="md">{title}</Heading>
      {children}
    </HStack>
  )
}

export {
  SectionTitle
}