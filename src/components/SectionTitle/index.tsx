import { Heading, HStack, StackProps } from "@chakra-ui/react"
import { ReactNode } from "react"

type Props = StackProps & {
  title?: string;
  children?: ReactNode;
}

const SectionTitle = ({ title , children, ...rest}: Props) => {
  return (
    <HStack spacing={3} align="center" justify="space-between" {...rest}>
      <Heading fontSize={['medium', 'medium', 'x-large']}>{title}</Heading>
      {children}
    </HStack>
  )
}

export {
  SectionTitle
}