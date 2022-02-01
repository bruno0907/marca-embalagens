import { Heading } from "@chakra-ui/react"

type Props = {
  title: string;
}

const SectionTitle = ({ title }: Props) => <Heading size="md">{title}</Heading>

export {
  SectionTitle
}