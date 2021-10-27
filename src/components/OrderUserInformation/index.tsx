import { useAddressesQuery } from "../../hooks/useAddressesQuery"
import { useUserQuery } from "../../hooks/useUserQuery"
import { Input } from "../Input"

import { 
  Stack,
  HStack,
  Text,
  Center,
  Spinner
} from "@chakra-ui/react"

type OrderUserInformationProps = {
  selectedUser: string;
}

const OrderUserInformation = ({ selectedUser }: OrderUserInformationProps) => {
  const user = useUserQuery(selectedUser)
  const addresses = useAddressesQuery(selectedUser)

  if(user.isLoading || addresses.isLoading) {
    return (
      <Center>
        <Spinner size="md" color="blue.500" />
      </Center>
    )
  }

  if(user.error || addresses.error) {
    return (
      <Center>
        <Text>Ocorreu um erro ao carregar as informações do usuário...</Text>
      </Center>
    )
  }

  if(!user.data.data) {
    return null
  }

  return (
    <Stack spacing={3}>      
      { user.data.data.natureza_cliente === 'Jurídica' &&
        <Input 
          label="Razão Social:"
          name="razao_social"
          defaultValue={user.data.data.razao_social}
        />
      }

      <HStack spacing={3}>
        <Input 
          name="cpf_cnpj"
          label={user.data.data.natureza_cliente === 'Física' ? 'CPF' : 'CNPJ:'}
          defaultValue={user.data.data.cpf_cnpj}
        />
        <Input 
          name="rg_ie"
          label={user.data.data.natureza_cliente === 'Física' ? 'RG' : 'IE:'}
          defaultValue={user.data.data.cpf_cnpj}
        />
        <Input
          name="contato"
          label="Contato:" 
          defaultValue={user.data.data.contato}
        />
      </HStack>

      <HStack spacing={3}>
        <Input 
          name="telefone"
          label="Telefone:"
          defaultValue={user.data.data.telefone}
        />
        <Input
          name="celular"
          label="Celular:"
          defaultValue={user.data.data.celular}
        />
        <Input
          name="email"
          label="E-mail:"
          defaultValue={user.data.data.email}
        />
      </HStack>

    </Stack>
  )  
}

export {
  OrderUserInformation
}