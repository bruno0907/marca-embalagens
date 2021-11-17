import { forwardRef } from "react"

import { 
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react"

import { AddressProps, UserProps } from "../../../../../types"
import { Divider } from "../../../../../components/Divider"

type UserToPrintRefProps = {
  user: UserProps;
  addresses: AddressProps[];  
}

const UserToPrintRef = ({ user, addresses }: UserToPrintRefProps, ref) => {
  return (
    <Box display="none">
      <Box ref={ref} p={8}>
        <Heading fontSize="lg" mb="8">Dados Cadastrais</Heading>

        <Flex flexDir="column">
          <Flex justify="space-between">
            <Box>
              <Text fontSize="x-small" fontWeight="bold">Nome:</Text>
              <Text fontSize="sm">{user.nome}</Text>            
            </Box>
            { user.razao_social &&
                <Box>
                  <Text fontSize="x-small" fontWeight="semibold">Razão social:</Text>
                  <Text fontSize="sm">{user.razao_social}</Text>
                </Box>
            }
            { user.cpf_cnpj &&
                <Box>
                  <Text fontSize="x-small" fontWeight="semibold">
                    {user.razao_social ? 'CNPJ' : 'CPF'}
                  </Text>
                  <Text fontSize="sm">
                    {user.cpf_cnpj}
                  </Text>
                </Box>
            }
          </Flex>
          <Flex justify="space-between">
            <Box>
              <Text fontSize="x-small" fontWeight="bold">Telefone:</Text>
              <Text fontSize="sm">
                {user.telefone}
              </Text>            
            </Box>
            { user.celular && 
              <Box>
                <Text fontSize="x-small" fontWeight="bold">Celular:</Text>
                <Text fontSize="sm">
                  {user.celular}
                </Text>            
              </Box>
            }
            { user.contato && 
              <Box>
                <Text fontSize="x-small" fontWeight="bold">Contato:</Text>
                <Text fontSize="sm">
                  {user.contato}
                </Text>            
              </Box>
            }
          </Flex>
        </Flex>

        <Divider/>

        <Heading fontSize="lg" my="4">Endereços</Heading>

        {addresses.map(address => {
          return (
            <Flex key={address.id} justify="space-between">
              <Box>
                <Text fontSize="x-small" fontWeight="bold">Endereço:</Text>
                <Text fontSize="sm">
                  {address.endereco}
                </Text>
              </Box>
              <Box>
                <Text fontSize="x-small" fontWeight="bold">Bairro:</Text>
                <Text fontSize="sm">
                  {address.bairro}
                </Text>
              </Box>
              <Box>
                <Text fontSize="x-small" fontWeight="bold">CEP:</Text>
                <Text fontSize="sm">
                  {address.cep}
                </Text>
              </Box>
              <Box>
                <Text fontSize="x-small" fontWeight="bold">Cidade/UF:</Text>
                <Text fontSize="sm">
                  {address.cidade}/{address.estado}
                </Text>
              </Box>
            </Flex>
          )
        })}

        <Divider/>

        <Heading fontSize="lg" mb="4">Pedidos</Heading>

        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>Pedido</Th>
              <Th>Data</Th>
              <Th>Valor</Th>
              {/* <Th>Situação</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {/* { order.pedido.map(orderItem => {
              return (
                <Tr key={orderItem.produto}>
                  <Td>{orderItem.quantidade}</Td>
                  <Td>{orderItem.produto}</Td>
                  <Td>{handleFormatPrice(orderItem.valor_unitario)}</Td>
                  <Td>{handleFormatPrice(orderItem.valor_total)}</Td>
                </Tr>
              )
            })} */}
          </Tbody>
        </Table>        
      </Box>
    </Box>
  )
}

const UserToPrint = forwardRef(UserToPrintRef)

export {
  UserToPrint
}