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

import { useDraftsQuery } from "../../../../hooks"
import { 
  handleFormatDate, 
  handleFormatPadStart 
} from "../../../../utils"

import { prefetchDraft } from "../../../../services"

type DraftsListProps = {
  query: number;
}

export const DraftsList = ({ query }: DraftsListProps) => {
  const router = useRouter()

  const { data, isLoading, isError, isFetching } = useDraftsQuery(query)

  const handlePrefetchDraft = async (id: string) => await prefetchDraft(id)

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
        {data?.map(draft => {
          return (
            <Tr
              key={draft.id}
              fontWeight="medium"
              onClick={() => router.push(`/drafts/${draft.id}`)}
              onMouseEnter={() => handlePrefetchDraft(draft.id)}
              _hover={{ cursor: 'pointer', color: 'blue.500'}}
            >
              <Td>{handleFormatPadStart(draft.numero_orcamento)}</Td>                        
              <Td>{draft.cliente}</Td>
              <Td>{handleFormatDate(draft.created_at)}</Td>
              <Td>{handleFormatDate(draft.status_data_aprovado)}</Td>
              <Td>
                <Badge px="2" py="1" borderRadius="md" 
                  colorScheme={
                    draft.status === 'Pendente' ? 'linkedin' :
                    draft.status === 'Aprovado' ? 'whatsapp' : 
                    'pink' 
                  }
                >{draft.status}</Badge>
              </Td>   
            </Tr>
          )
        })}
      </Tbody>
    </Table>    
  )
}
