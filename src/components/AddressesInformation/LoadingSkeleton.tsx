import { Content } from "../Content"
import { Flex, Heading, Skeleton, Spinner, Stack, Text } from "@chakra-ui/react"

const LoadingSkeleton = () => {
  return (
    <Content id="loading-skeleton" w="100%">
        <Flex align="center" mb="8">
          <Heading fontSize="2xl">Endereços</Heading>   
          <Spinner size="sm" color="gray.600" ml="4"/>
        </Flex>
        <Stack spacing={3}>
          <Skeleton h="14" borderRadius="md"/>
          <Text display="none">Carregando...</Text>
        </Stack>
      </Content>
  )
}

export {
  LoadingSkeleton
}