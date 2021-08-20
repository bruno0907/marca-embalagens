import { 
  Stack,
  Text,
  Button,
  Box,
  HStack
} from "@chakra-ui/react"

interface AddressesProps {
  id: string;
  address: string;
  district: string;
  city: string;
  state: string;
  zip_code: string;
  complement: string;  
}

type UserAddressesProps = {
  addresses: AddressesProps[]
}

const UserAddresses = ({ addresses }: UserAddressesProps) => {  

  function handleCancel() {

  }
  return (
    <>
      { addresses.map(address => {
        return (
          <Box key={address.id} mt="8" mb="12">
            <Stack mb="8">
              <Text><strong>Logradouro: </strong>{address.address}</Text>
              <Text><strong>Bairro: </strong>{address.district}</Text>
              <Text><strong>CEP: </strong>{address.zip_code}</Text>
              <Text><strong>Cidade: </strong>{address.city}</Text>
              <Text><strong>Estado: </strong>{address.state}</Text>
            </Stack>
            <Button colorScheme="blue" type="submit">Editar este endereço</Button>
          </Box>
        )
      })}
    </>
  )    
}


export { UserAddresses }
