import { 
  VStack,
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";

import { Address } from "../../models";

type Props = {
  addresses: Address[];
}

export const PrintAddressModule = ({ addresses }: Props) => {
  return (
    <VStack spacing={3} align="start">
      { addresses.map((address) => {
          return (
            <Box key={address.id} w="100%" borderWidth="1px" borderRadius="md" p="4" >
              <Text fontSize="sm" color="gray.500" fontWeight="medium" mb="2">
                {address.principal ? 'Endereço principal' : 'Outro endereço'}
              </Text>               
              <HStack w="100%" spacing={3} align="flex-start" justify="space-between">
                <Box>
                  <Text fontSize="x-small" fontWeight="bold">Endereço:</Text>
                  <Text fontSize="sm">{address.endereco}</Text>
                </Box>
                <Box>
                  <Text fontSize="x-small" fontWeight="bold">Bairro:</Text>
                  <Text fontSize="sm">{address.bairro}</Text>
                </Box>
                <Box>
                  <Text fontSize="x-small" fontWeight="bold">CEP:</Text>
                  <Text fontSize="sm">{address.cep}</Text>
                </Box>
                <Box>
                  <Text fontSize="x-small" fontWeight="bold">Cidade/UF:</Text>
                  <Text fontSize="sm">
                    {address.cidade}/{address.estado}
                  </Text>
                </Box>
              </HStack>
            </Box>            
          );
        })
      }
    </VStack>
  );
};
