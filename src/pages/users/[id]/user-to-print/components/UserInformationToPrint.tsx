import { 
  VStack,
  Box,
  Text,
  HStack
} from "@chakra-ui/react";

import { UserProps } from "../../../../../types";

type UserInformationToPrintProps = {
  user: UserProps;
};

const UserInformationToPrint = ({ user }: UserInformationToPrintProps) => {
  return (
    <VStack spacing={3} align="start" borderWidth="1px" borderRadius="md" p="4">
      <HStack w="100%" spacing={3} align="flex-start" justify="space-between">
        <Box>
          <Text fontSize="x-small" fontWeight="bold">
            Nome:
          </Text>
          <Text fontSize="sm">{user.nome}</Text>
        </Box>
        {user.razao_social && (
          <Box>
            <Text fontSize="x-small" fontWeight="semibold">
              Razão social:
            </Text>
            <Text fontSize="sm">{user.razao_social}</Text>
          </Box>
        )}
        {user.cpf_cnpj && (
          <Box>
            <Text fontSize="x-small" fontWeight="semibold">
              {user.razao_social ? "CNPJ" : "CPF"}
            </Text>
            <Text fontSize="sm">{user.cpf_cnpj}</Text>
          </Box>
        )}
      </HStack>
      <HStack w="100%" spacing={3} align="flex-start" justify="space-between">
        <Box>
          <Text fontSize="x-small" fontWeight="bold">
            Telefone:
          </Text>
          <Text fontSize="sm">{user.telefone}</Text>
        </Box>
        {user.celular && (
          <Box>
            <Text fontSize="x-small" fontWeight="bold">
              Celular:
            </Text>
            <Text fontSize="sm">{user.celular}</Text>
          </Box>
        )}
        <Box>
          <Text fontSize="x-small" fontWeight="bold">
            E-mail:
          </Text>
          <Text fontSize="sm">{user.email}</Text>
        </Box>
        {user.contato && (
          <Box>
            <Text fontSize="x-small" fontWeight="bold">
              Contato:
            </Text>
            <Text fontSize="sm">{user.contato}</Text>
          </Box>
        )}
      </HStack>
    </VStack>
  );
};

export {
  UserInformationToPrint
}