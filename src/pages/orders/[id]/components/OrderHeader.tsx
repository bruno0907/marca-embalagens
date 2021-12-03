import { Logo } from "../../../../components/Logo";

import { useProfileQuery } from "../../../../hooks/useProfileQuery";

import { handleFormatDate } from "../../../../utils/handleFormatDate";

import { 
  Flex,
  Text,
  Box,
  Center,
  Spinner
} from "@chakra-ui/react";

type OrderHeaderProps = {
  orderNumber: number;
  orderDeliveryDate: string;
}

const OrderHeader = ({ orderNumber, orderDeliveryDate }: OrderHeaderProps) => {
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

  if(!profile.data) {
    return null
  }
  
  return (
    <Flex justify="space-between" w="100%">
      
      <Box h="20" w="40">
        <Logo />
      </Box>

      <Box mx="4">
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
      </Box>

      <Box>
        <Flex align="center">
          <Text mr="2">Número do pedido:</Text>
          <Text fontSize="large" fontWeight="bold">
            {orderNumber}
          </Text>
        </Flex>
        <Flex align="center">
          <Text mr="2">Data de entrega:</Text>
          <Text fontSize="large" fontWeight="bold">
            {handleFormatDate(orderDeliveryDate)}
          </Text>
        </Flex>
      </Box> 
             
    </Flex>
  );
};

export { OrderHeader };
