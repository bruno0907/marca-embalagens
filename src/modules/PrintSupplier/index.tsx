import { ForwardRefRenderFunction } from 'react'

import {
  Stack,
  HStack,
  Box,
  Text,
  forwardRef,  
} from '@chakra-ui/react'

import { Supplier } from '../../models'

type Props = {
  supplier: Supplier;
}

const PrintSupplier: ForwardRefRenderFunction<HTMLDivElement, Props> = ({ supplier }, ref) => {
  return (
    <Box h="0" overflow="hidden">
      <Stack ref={ref} spacing={3} align="start" borderWidth="1px" borderRadius="md" p="4" m="4">
        <HStack w="100%" spacing={3} align="flex-start" justify="space-between">
          <Box>
            <Text fontSize="x-small" fontWeight="bold">Nome:</Text>
            <Text fontSize="sm">{supplier.nome}</Text>            
          </Box>
          { supplier.razao_social && (
            <Box>
              <Text fontSize="x-small" fontWeight="semibold">Razão social:</Text>
              <Text fontSize="sm">{supplier.razao_social}</Text>
            </Box>
          )}
          { supplier.cpf_cnpj && (
            <Box>
              <Text fontSize="x-small" fontWeight="semibold">
                {supplier.razao_social ? 'CNPJ' : 'CPF'}
              </Text>
              <Text fontSize="sm">
                {supplier.cpf_cnpj}
              </Text>
            </Box>
          )}
        </HStack>
        <Box>
          <Text fontSize="x-small" fontWeight="bold">Produto/Serviço:</Text>
          <Text fontSize="sm">{supplier.produto}</Text>            
        </Box>
        <HStack w="100%" spacing={3} align="flex-start" justify="space-between">
          <Box>
            <Text fontSize="x-small" fontWeight="bold">Telefone:</Text>
            <Text fontSize="sm">
              {supplier.telefone}
            </Text>            
          </Box>
          { supplier.celular && (
              <Box>
                <Text fontSize="x-small" fontWeight="bold">Celular:</Text>
                <Text fontSize="sm">
                  {supplier.celular}
                </Text>            
              </Box>
          )}
          <Box>
            <Text fontSize="x-small" fontWeight="bold">E-mail:</Text>
            <Text fontSize="sm">
              {supplier.email}
            </Text>            
          </Box>
          { supplier.contato && (
              <Box>
                <Text fontSize="x-small" fontWeight="bold">Contato:</Text>
                <Text fontSize="sm">
                  {supplier.contato}
                </Text>            
              </Box>
          )}
        </HStack>
      </Stack>
    </Box>
  )
}

export const PrintSupplierModule = forwardRef(PrintSupplier)
