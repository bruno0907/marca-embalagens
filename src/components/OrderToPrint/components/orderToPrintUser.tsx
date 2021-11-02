import {
  Flex,
  Box,
  Text
} from '@chakra-ui/react'

import { UserProps } from "../../../types"

type OrderToPrintUserProps = {
  user: UserProps;
}

const OrderToPrintUser = ({ user }: OrderToPrintUserProps) => {
  return (
    <Flex flexDir="column">
      <Flex justify="space-between">
        <Box>
          <Text fontSize="sm" fontWeight="bold">Nome:</Text>
          <Text>{user.nome}</Text>            
        </Box>
        { user.razao_social &&
            <Box>
              <Text fontSize="sm" fontWeight="semibold">Razão social:</Text>
              <Text>{user.razao_social}</Text>
            </Box>
        }
        { user.cpf_cnpj &&
            <Box>
              <Text fontSize="sm" fontWeight="semibold">{user.razao_social ? 'CNPJ' : 'CPF'}</Text>
              <Text>{user.cpf_cnpj}</Text>
            </Box>
        }
      </Flex>
      <Flex justify="space-between">
        <Box>
          <Text fontSize="sm" fontWeight="bold">Telefone:</Text>
          <Text>{user.telefone}</Text>            
        </Box>
        { user.celular && 
          <Box>
            <Text fontSize="sm" fontWeight="bold">Celular:</Text>
            <Text>{user.celular}</Text>            
          </Box>
        }
        { user.contato && 
          <Box>
            <Text fontSize="sm" fontWeight="bold">Contato:</Text>
            <Text>{user.contato}</Text>            
          </Box>
        }
      </Flex>
    </Flex>
  )
}

export {
  OrderToPrintUser
}