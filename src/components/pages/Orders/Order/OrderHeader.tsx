import { Logo } from "../../../Logo";

import { useProfileQuery } from "../../../../hooks/useProfileQuery";

import { handleFormatDate } from "../../../../utils/handleFormatDate";
import { handleFormatPadStart } from "../../../../utils/handleFormatPadStart";

import { 
  Flex,
  Text,
  Box,
  Center,
  Spinner,
  HStack,
  Stack,
  Image
} from "@chakra-ui/react";

type Props = {
  orderNumber: number;
  orderDeliveryDate: Date;
}

const OrderHeader = ({ orderNumber, orderDeliveryDate }: Props) => {
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
    <HStack spacing={6} justify="space-between" w="100%" borderWidth="1px" borderColor="gray.100" borderRadius="md" px={2} py={1}>
      
      <Flex h="20" w="40" align="center">
        <Logo />
      </Flex>

      <Stack spacing={0}>
        {profile.data.data.razao_social ? (
          <Text fontSize="x-small">{profile.data.data.razao_social}</Text>
        ) : (
          <Text fontSize="x-small">{profile.data.data.nome}</Text>
        )}
        <Text fontSize="x-small">
          {profile.data.data.telefone && `${profile.data.data.telefone} / `}
          {profile.data.data.celular && `${profile.data.data.celular}`}
        </Text>        
        <Text fontSize="x-small">
          {profile.data.address.endereco} - {profile.data.address.bairro}
        </Text>
        <Text fontSize="x-small">
          {profile.data.address.cidade}/{profile.data.address.estado}
          {profile.data.address.cep && ` - ${profile.data.address.cep}`}
        </Text>        
      </Stack>

      <Stack spacing={0}>
        <Flex align="center">
          <Text mr="2">Número do pedido:</Text>
          <Text fontSize="larger" fontWeight="bold">
            {handleFormatPadStart(orderNumber)}
          </Text>
        </Flex>
        <Flex align="center">
          <Text mr="2">Data de entrega:</Text>
          <Text fontSize="larger" fontWeight="bold">
            {handleFormatDate(orderDeliveryDate)}
          </Text>
        </Flex>
      </Stack> 
             
    </HStack>
  );
};

export { OrderHeader };
