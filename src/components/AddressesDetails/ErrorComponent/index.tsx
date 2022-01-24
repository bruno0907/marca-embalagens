import { Stack, Heading, Text } from "@chakra-ui/react"
import { Content } from "../../Content"

const ErrorComponent = () => {
  return (
    <Content w="100%">
        <Stack spacing={3}>
          <Heading fontSize="2xl">Endereços</Heading>
          <Text>Ocorreu um erro ao carregar os endereços. Volte e tente novamente...</Text>
        </Stack>
      </Content>
  )
}

export {
  ErrorComponent
}