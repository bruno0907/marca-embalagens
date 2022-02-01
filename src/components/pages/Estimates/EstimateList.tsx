import { useRouter } from "next/router"

import { Table } from "../../Table"

import { useEstimatesQuery } from "../../../hooks/useEstimatesQuery"
import { prefetchEstimate } from "../../../services/prefetchEstimate"

import { handleFormatDate } from "../../../utils/handleFormatDate"
import { handleFormatPadStart } from "../../../utils/handleFormatPadStart"

import {
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,    
  Flex,
  Badge,
} from "@chakra-ui/react"

type Props = {
  query: number;
}

export const EstimatesList = ({ query }: Props) => {
  const router = useRouter()

  const { data, isLoading, isError, isFetching } = useEstimatesQuery(query)

  const handlePrefetchEstimate = async (id: string) => await prefetchEstimate(id)

  if(isLoading) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50" w="28">Número</Th>
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50" w="44">Data de emissão</Th>
            <Th color="gray.50" w="44">Data de entrega</Th>
            <Th color="gray.50" w="44" textAlign="center">Status</Th>
          </Tr>
        </Thead>        
        <Tbody>
          <Tr>
            <Td colSpan={5} textAlign="center">
              <Spinner size="md" color="blue.500"/>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    )
  }

  if(isError) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50" w="28">Número</Th>
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50" w="44">Data de emissão</Th>
            <Th color="gray.50" w="44">Data de entrega</Th>
            <Th color="gray.50" w="44" textAlign="center">Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={5}>Ocorreu um erro ao carregar as informações...</Td>
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
            <Th color="gray.50" w="28">Número</Th>
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50" w="44">Data de emissão</Th>
            <Th color="gray.50" w="44">Data de entrega</Th>
            <Th color="gray.50" w="44" textAlign="center">Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={5}>Nenhum pedido encontrado...</Td>
          </Tr>
        </Tbody>
      </Table>
    )
  }

  return (
    <Table>
      <Thead>
        <Tr bgColor="blue.500">
        <Th color="gray.50" w="28">
            <Flex align="center" justify="center">
              Número
              { isFetching && 
                <Spinner size="sm" color="gray.50" ml="4"/>
              }
            </Flex>
          </Th>            
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50" w="44">Data de emissão</Th>
            <Th color="gray.50" w="44">Data de entrega</Th>
            <Th color="gray.50" w="44" textAlign="center">Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        { data?.map(estimate => {
            return (
              <Tr
                key={estimate.id}
                fontWeight="medium"
                onClick={() => router.push(`/estimates/${estimate.id}`)}
                onMouseEnter={() => handlePrefetchEstimate(estimate.id)}
                _hover={{ cursor: 'pointer', color: 'blue.500'}}
              >
                <Td textAlign="center">{handleFormatPadStart(estimate.numero_orcamento)}</Td>                        
                <Td>{estimate.cliente}</Td>
                <Td>{handleFormatDate(estimate.created_at)}</Td>
                <Td>{handleFormatDate(estimate.data_entrega)}</Td>
                <Td textAlign="center">
                  <Badge 
                  px="4" 
                  py="2" 
                  borderRadius="md" 
                  colorScheme={
                      estimate.status === 'Pendente' ? 'linkedin' :
                      estimate.status === 'Aprovado' ? 'whatsapp' : 
                      'pink' 
                    }
                  >
                    {estimate.status}
                  </Badge>
                </Td>   
              </Tr>
            )
          }
        )}
      </Tbody>
    </Table>
    
  )
}
