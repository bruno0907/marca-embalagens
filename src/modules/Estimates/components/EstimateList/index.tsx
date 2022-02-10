import { useRouter } from "next/router"

import {
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,    
  Flex,
  Badge,
  HStack,
  Text,
  Icon,  
} from "@chakra-ui/react"

import { FiAlertCircle } from "react-icons/fi"

import { Table } from "../../../../components/Table"

import { useEstimatesQuery } from "../../../../hooks"
import { 
  handleFormatDate, 
  handleFormatPadStart 
} from "../../../../utils"

import { prefetchEstimate } from "../../../../services"

type Props = {
  query: number;
}

export const EstimateList = ({ query }: Props) => {
  const router = useRouter()

  const { data, isLoading, isError, isFetching } = useEstimatesQuery(query)

  const handlePrefetchEstimate = async (id: string) => await prefetchEstimate(id)

  if(isLoading) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">
              <HStack spacing={3} align="center">
                <Text>Orçamento</Text>
                <Spinner size="sm" color="gray.50" ml="4"/>
              </HStack>
            </Th>
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50">Emissão</Th>
            <Th color="gray.50">Fechamento</Th>
            <Th color="gray.50">Situação</Th>
          </Tr>
        </Thead>
      </Table>
    )
  }

  if(isError) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">Orçamento</Th>
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50">Emissão</Th>
            <Th color="gray.50">Fechamento</Th>
            <Th color="gray.50">Situação</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={5}>
              <HStack spacing={3} aling="center">
                <Icon as={FiAlertCircle} fontSize={16} color="red.500"/>
                <Text fontWeight="medium">Ocorreu um erro ao carregar as informações...</Text>
              </HStack>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    )
  }

  if(!data?.length) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50" w="130px">Orçamento</Th>
            <Th color="gray.50" minW="225px">Cliente</Th>
            <Th color="gray.50" w="140px">Emissão</Th>
            <Th color="gray.50" w="140px">Fechamento</Th>
            <Th color="gray.50"w="155px">Situação</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={5}>
              <Text fontWeight="medium">Nenhum orçamento encontrado...</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    )
  }

  return (
    <Table>
      <Thead>
        <Tr bgColor="blue.500">
          <Th color="gray.50" w="130px">
            <Flex align="center">
              Orçamento
              { isFetching && <Spinner size="sm" color="gray.50" ml="4"/>}
            </Flex>
          </Th>            
            <Th color="gray.50" minW="225px">Cliente</Th>
            <Th color="gray.50" w="140px">Emissão</Th>
            <Th color="gray.50" w="140px">Fechamento</Th>
            <Th color="gray.50"w="155px">Situação</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.map(estimate => {
          return (
            <Tr
              key={estimate.id}
              fontWeight="medium"
              onClick={() => router.push(`/estimates/${estimate.id}`)}
              onMouseEnter={() => handlePrefetchEstimate(estimate.id)}
              _hover={{ cursor: 'pointer', color: 'blue.500'}}
            >
              <Td>{handleFormatPadStart(estimate.numero_orcamento)}</Td>                        
              <Td>{estimate.cliente}</Td>
              <Td>{handleFormatDate(estimate.created_at)}</Td>
              <Td>{handleFormatDate(estimate.status_data_aprovado)}</Td>
              <Td>
                <Badge px="2" py="1" borderRadius="md" 
                  colorScheme={
                    estimate.status === 'Pendente' ? 'linkedin' :
                    estimate.status === 'Aprovado' ? 'whatsapp' : 
                    'pink' 
                  }
                >{estimate.status}</Badge>
              </Td>   
            </Tr>
          )
        })}
      </Tbody>
    </Table>    
  )
}
