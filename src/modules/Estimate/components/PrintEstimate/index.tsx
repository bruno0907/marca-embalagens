import { forwardRef, ForwardRefRenderFunction } from "react";

import {
  Stack, 
  HStack, 
  Heading, 
  Table, 
  Thead, 
  Tr, 
  Th, 
  Tbody, 
  Td, 
  Box, 
  Text,
  StackProps,
  Flex,
  Center,
  Spinner,   
} from "@chakra-ui/react";

import { Logo } from "../../../../components";

import { useProfileQuery } from "../../../../hooks";

import { 
  handleFormatPadStart,
  handleFormatDate,
  handleFormatPrice 
} from "../../../../utils";

import { Estimate } from "../../../../models";

type Props = StackProps & {
  estimate: Estimate;  
}

const PrintModule: ForwardRefRenderFunction<HTMLDivElement, Props> = ({ estimate, ...rest }, ref) => {
  const { data, isLoading, isError } = useProfileQuery()

  if(isLoading) {
    return (
      <Center>
        <Spinner color="blue.500"/>
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
    <Box h="0" overflow="hidden">
      <Stack spacing={6} p={4} ref={ref} {...rest}>
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
                {handleFormatPadStart(estimate.numero_orcamento)}
              </Text>
            </Flex>        
            {estimate.data_entrega && (
              <Flex align="center">
                <Text mr="2">Data de entrega:</Text>
                <Text fontSize="large" fontWeight="bold">
                  {handleFormatDate(estimate.data_entrega)}
                </Text>
              </Flex>
            )}
          </Flex> 
                
        </Flex>
  
        <HStack spacing={3} justify="space-between">
          <Stack>
            <Text>
              <strong>Cliente:</strong> {estimate.cliente}
            </Text>
            <Text>
              <strong>Data:</strong>{" "}
              {handleFormatDate(estimate.created_at)}
            </Text>
          </Stack>
          {estimate.status !== 'Pendente' && (
            <Stack>
              <Heading 
                size="lg" 
                color={estimate.status === 'Não aprovado' 
                  ? 'red.400' 
                  : 'green.400'
                }>
                {estimate.status}
              </Heading>
              <Text fontWeight="bold">
                Data: {handleFormatDate(estimate.created_at)}                      
              </Text>
            </Stack>
          )}
        </HStack>
  
        <Heading size="sm" textAlign="center">Descrição</Heading>
  
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Produto</Th>
              <Th>Quantidade</Th>
              <Th>Preço unitário</Th>
              <Th>Preço total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {estimate.produtos.map((product, index) => (
              <Tr key={index}>
                <Td py="2">{product.produto}</Td>
                <Td py="2">{product.quantidade}</Td>
                <Td py="2">{handleFormatPrice(product.valor_unitario)}</Td>
                <Td py="2">{handleFormatPrice(product.valor_total)}</Td>
              </Tr>
            ))}
            <Tr>
              <Td fontSize="larger" py="2"><strong>Total: </strong></Td>
              <Td py="2" colSpan={2}/>
              <Td fontSize="larger"><strong>{handleFormatPrice(estimate.total)}</strong></Td>
            </Tr>
          </Tbody>
        </Table> 
  
        {estimate.observacoes && (
          <Stack spacing={3}>
            <Text fontWeight="bold">Observações:</Text>
            <Box
              p="3"
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="md"
              minH="80px"
              w="100%"
            >
              {estimate.observacoes.split('\n').map((line, index) => {
                return (
                  <Text key={index}>{line}</Text>
                )
              })}                    
            </Box>
          </Stack>
        )}
  
      </Stack>
    </Box>
  )
}

export const PrintEstimateModule = forwardRef(PrintModule)