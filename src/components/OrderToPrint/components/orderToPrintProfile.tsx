import { useAddressesQuery } from '../../../hooks/useAddressesQuery'

import { 
  Box, 
  Text,  
  Flex,
} from '@chakra-ui/react'

import { ProfileProps } from '../../../types'

type OrderToPrintProfileProps = {
  profile: ProfileProps,
}

const OrderToPrintProfile = ({ profile }: OrderToPrintProfileProps) => {
  const addresses = useAddressesQuery(profile.id)

  if(!addresses.data?.data || addresses.isLoading) return null

  return (
    <Flex flexDir="column" flex="1" mx="4">
      {profile.razao_social &&
        <Text fontSize="sm">{profile.razao_social}</Text>
      }
      <Text fontSize="sm">{profile.nome}</Text>
      <Text fontSize="sm">
        {`${profile.telefone} ${profile.celular && ` / ${profile.celular}`}`}
      </Text>
      { addresses.data.data.map(address => {
        if(address.principal) {
          return (
            <Box key={address.id}>
              <Text fontSize="sm">{address.endereco} - {address.bairro}</Text>
              <Text fontSize="sm">{address.cidade}/{address.estado} - {address.cep}</Text>
            </Box>
          )
        }
      })}
    </Flex>
  )
}

export {
  OrderToPrintProfile
}