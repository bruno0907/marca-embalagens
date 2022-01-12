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

const EstimateHeader = ({ estimateNumber, estimateDeliveryDate }: Props) => {
  const profile = useProfileQuery()

  if(profile.isLoading) {
    return (
      <Center>
        <Spinner size="lg" color="blue.500"/>
      </Center>
    )
  }

  if(profile.isError) {
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
        {profile.data.data.razao_social && (
          <Text fontSize="x-small">{profile.data.data.razao_social}</Text>
        )}
        <Text fontSize="x-small">{profile.data.data.nome}</Text>
        <Text fontSize="x-small">
          {profile.data.data.telefone && `${profile.data.data.telefone} / `}
          {profile.data.data.celular}
        </Text>
        <Box>
          <Text fontSize="x-small">
            {profile.data.address.endereco} - {profile.data.address.bairro}
          </Text>
          <Text fontSize="x-small">
            {profile.data.address.cidade}/{profile.data.address.estado}
            {profile.data.address.cep && `- ${profile.data.address.cep}`}
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

export { 
  EstimateHeader 
};
