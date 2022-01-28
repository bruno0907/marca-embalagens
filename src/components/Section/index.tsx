import { ReactNode } from "react"
import { Content } from "../Content"
import { Heading, Stack, StackProps } from "@chakra-ui/react"

type Props = StackProps & {
  title?: string;
  children: ReactNode;
}

const Section = ({ title, children, ...rest}: Props) => {
  return (
    <Stack spacing={6} {...rest}>
      <Heading size="md">{title}</Heading>
      <Content>
        {children}
      </Content>
    </Stack>
  )
}

export { Section }
