import { prefetchAddress } from "../../../services/prefetchAddress"

import { 
  Box,  
  Flex,
  Icon,
  Text,
  Button,   
} from "@chakra-ui/react"

import { FiEdit, FiHome } from "react-icons/fi"

import { AddressProps } from "../../../types"

type AddressFieldProps = {
  address: AddressProps
}

const AddressField = ({ address }: AddressFieldProps) => {
  const handlePrefetchAddress = async (id: string) => await prefetchAddress(id)

  return (
    <Box py="2" px="4" bgColor="gray.100" borderRadius="8" border="1" borderColor="gray.600">
      <Flex align="center">
        <Icon as={FiHome} fontSize="24" color="gray.500"/>        
        <Box ml="4">
          <Text fontSize="sm" color="gray.500" fontWeight="medium">
            { address.principal ? 'Endereço principal:' : null}
          </Text>        
          <Text fontSize="sm" color="gray.700" fontWeight="medium">
            {address.endereco} - {address.bairro}
          </Text>
          <Text fontSize="sm" color="gray.700" fontWeight="medium">
            {address.cidade}/{address.estado} - {address.cep}
          </Text>
          <Text fontSize="sm" color="gray.700" fontWeight="medium">
            {address.complemento}
          </Text>
        </Box>
        <Button 
          ml="auto" 
          variant="link"
          onMouseEnter={() => handlePrefetchAddress(address.id)} 
          _hover={{ svg: { color: "blue.600" } }}
        >
          <Icon as={FiEdit} fontSize="24" color="blue.500"/>
        </Button>
      </Flex>         
    </Box>
  )
}

export { AddressField }