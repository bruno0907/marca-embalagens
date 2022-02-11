import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react"
import { Logo } from "../../../../components"
import { useProfileQuery } from "../../../../hooks"
import { handleFormatPadStart } from "../../../../utils"

type Props = {
  estimateNumber: number;
}

export const PrintEstimateHeader = ({ estimateNumber }: Props) => {
  const { data, isLoading, isError } = useProfileQuery()

  if(isLoading) {
    return (
      <Center>
        <Spinner size="sm" color="blue.500"/>
      </Center>
    )
  }

  if(isError) {
    return (
      <Center>
        <Text>Erro ao carregar as informações do perfil...</Text>
      </Center>
    )
  }

  return (
    <Flex align="center" justify="space-between" w="100%">
      <Logo />    
      <Flex mx="4" flexDir="column" alignItems="flex-start" justify="center">
        {data.profile.razao_social && (
          <Text fontSize="x-small">{data.profile.razao_social}</Text>
        )}
        <Text fontSize="x-small">{data.profile.nome}</Text>
        <Text fontSize="x-small">
          {data.profile.telefone && `${data.profile.telefone} / `}
          {data.profile.celular}
        </Text>
        <Box>
          <Text fontSize="x-small">
            {data.addresses[0].endereco} 
            {data.addresses[0].bairro && `- ${data.addresses[0].bairro}`}
          </Text>
          <Text fontSize="x-small">
            {data.addresses[0].cidade}
            {data.addresses[0].estado && `/${data.addresses[0].estado}`}
            {data.addresses[0].cep && `- ${data.addresses[0].cep}`}
          </Text>
        </Box>
      </Flex>
      <Flex align="center">
        <Text mr="2">Orçamento:</Text>
        <Text fontSize="large" fontWeight="bold">
          {handleFormatPadStart(estimateNumber)}
        </Text>
      </Flex>          
    </Flex>
  )
}
