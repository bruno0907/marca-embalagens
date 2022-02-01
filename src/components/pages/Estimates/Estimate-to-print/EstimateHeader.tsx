import { Logo } from "../../../Logo";

import { useProfileQuery } from "../../../../hooks/useProfileQuery";

import { handleFormatDate } from "../../../../utils/handleFormatDate";
import { handleFormatPadStart } from "../../../../utils/handleFormatPadStart";

import { 
  Flex,
  Text,
  Box,
  Center,
  Spinner
} from "@chakra-ui/react";

type Props = {
  estimateNumber: number;
  estimateDeliveryDate: Date;
}

export const EstimateHeader = ({ estimateNumber, estimateDeliveryDate }: Props) => {
  const { data, isLoading, isError } = useProfileQuery()

  if(isLoading) {
    return (
      <Center>
        <Spinner size="lg" color="blue.500"/>
      </Center>
    )
  }

  if(isError) {
    return (
      <Text>Ocorreu um erro ao carregar as informações do cliente...</Text>
    )
  }

  return (
    <Flex justify="space-between" w="100%">
      
      <Center h="20" w="40">
        <Logo />
      </Center>

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

      <Flex flexDir="column" alignItems="flex-start" justify="center">        
        <Flex align="center">
          <Text mr="2">Orçamento:</Text>
          <Text fontSize="large" fontWeight="bold">
            {handleFormatPadStart(estimateNumber)}
          </Text>
        </Flex>        
        {estimateDeliveryDate && (
          <Flex align="center">
            <Text mr="2">Data de entrega:</Text>
            <Text fontSize="large" fontWeight="bold">
              {handleFormatDate(estimateDeliveryDate)}
            </Text>
          </Flex>
        )}
      </Flex> 
             
    </Flex>
  );
};
