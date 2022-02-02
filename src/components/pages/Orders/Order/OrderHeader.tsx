import { Logo } from "../../../Logo";

import { useProfileQuery } from "../../../../hooks/useProfileQuery";

import { handleFormatDate } from "../../../../utils/handleFormatDate";
import { handleFormatPadStart } from "../../../../utils/handleFormatPadStart";

import { 
  Flex,
  Text,
  Center,
  Spinner,
  HStack,
  Stack,
} from "@chakra-ui/react";

type Props = {
  orderNumber: number;
  orderDeliveryDate: Date;
}

export const OrderHeader = ({ orderNumber, orderDeliveryDate }: Props) => {
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
    <HStack spacing={6} justify="space-between" w="100%" borderWidth="1px" borderColor="gray.200" borderRadius="md" px={2} py={1}>      
      <Flex h="20" w="40" align="center">
        <Logo />
      </Flex>
      <Stack spacing={0}>
        {data.profile.razao_social ? (
          <>
            <Text fontSize="x-small">{data.profile.razao_social}</Text>
            <Text fontSize="x-small">{data.profile.nome}</Text>
          </>
        ) : (
          <Text fontSize="x-small">{data.profile.nome}</Text>
        )}
        <Text fontSize="x-small">
          {data.profile.telefone && `${data.profile.telefone} / `}
          {data.profile.celular}
        </Text>       
          <Text fontSize="x-small">
            {data.addresses[0].endereco}
            {data.addresses[0].bairro && ` - ${data.addresses[0].bairro}`}
          </Text>
          <Text fontSize="x-small">
            {data.addresses[0].cidade}
            {data.addresses[0].estado && `/${data.addresses[0].estado}`}
            {data.addresses[0].cep && ` - ${data.addresses[0].cep}`}
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
