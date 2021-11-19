import { useState } from 'react'
import { Content } from "../../../../../components/Layout/Content"
import { InformationField } from '../../../../../components/Layout/InformationField'

import { Modal } from '../../../../../components/Modal'

import { 
  Text,
  Button,  
  Spinner,  
  Flex,  
  Heading,
  Stack,
  HStack,
  Spacer,
  Skeleton,
  useDisclosure
} from "@chakra-ui/react"

import { 
  FiEdit, 
  FiList, 
  FiMail, 
  FiPhone, 
  FiSmartphone, 
  FiUser,
  FiCreditCard,
  FiPackage,   
} from 'react-icons/fi'

import { SupplierProps } from '../../../../../types'
import { UpdateSupplierForm } from '../UpdateSupplierForm'
import { useSupplierQuery } from '../../../../../hooks/useSupplierQuery'

type SupplierInformationProps = {
  supplierId: string | string[];  
}

const SupplierInformation = ({ supplierId }: SupplierInformationProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [supplierToEdit, setSupplierToEdit] = useState<SupplierProps>(null)
  
  const supplier = useSupplierQuery(supplierId)

  function handleEditSupplier(supplier: SupplierProps) {
    setSupplierToEdit(supplier)
    onOpen()
  }  

  if(supplier.isLoading || supplier.isFetching){
    return (
      <Content w="100%">
        <Flex align="center" mb="8">
          <Heading fontSize="2xl">Dados Principais</Heading>
          <Spinner size="sm" color="gray.600" ml="4"/>
        </Flex>
        <Stack spacing={3}>
          <Skeleton h="10" borderRadius="8"/>
          <Skeleton h="10" borderRadius="8"/>
          <Skeleton h="10" borderRadius="8"/>
          <Skeleton h="10" borderRadius="8"/>
        </Stack>
      </Content>    
    )
  }

  if(supplier.isError) {
    return (
      <Content w="100%">
        <Stack spacing={3}>
          <Heading fontSize="2xl">Dados Principais</Heading>
          <Text>Ocorreu um erro ao carregar os dados do fornecedor. Volte e tente novamente...</Text>
        </Stack>
      </Content>    
    )
  }  

  return (
    <Content w="100%">
      <Flex align="center" mb="8">
        <Heading fontSize="2xl">Dados Principais</Heading>        
        <Spacer/>
        <Button colorScheme="blue" leftIcon={<FiEdit />} onClick={() => handleEditSupplier(supplier.data?.data)}>Editar</Button>
      </Flex>
      <Stack spacing={3}>
        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiUser}
            label={`Nome ${supplier.data?.data.natureza_cliente === 'Jurídica' ? 'Fantasia' : ''}`}
            value={supplier.data?.data.nome}
          />
          { supplier.data?.data.natureza_cliente === 'Jurídica' && 
            <InformationField 
              icon={FiUser}
              label="Razão Social"
              value={supplier.data?.data.razao_social}
            /> }
        </HStack>

        <InformationField 
          icon={FiPackage}
          label="Produto/Serviço"
          value={supplier.data?.data.produto}
        />

        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiCreditCard}
            label={supplier.data?.data.natureza_cliente === 'Jurídica' ? 'CNPJ' : 'CPF'}
            value={supplier.data?.data.cpf_cnpj}
          />
          <InformationField 
            icon={FiCreditCard}
            label={supplier.data?.data.natureza_cliente === 'Jurídica' ? 'IE' : 'RG'}
            value={supplier.data?.data.rg_ie}
          />
          <InformationField 
            icon={FiUser}
            label="Contato"
            value={supplier.data?.data.contato}
          />
        </HStack>
          
        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiPhone}
            label="Telefone"
            value={supplier.data?.data.telefone}
          />
          <InformationField 
            icon={FiSmartphone}
            label="Celular"
            value={supplier.data?.data.celular}
          />
          <InformationField 
            icon={FiMail}
            label="E-mail"
            value={supplier.data?.data.email}
          />
        </HStack>

        <InformationField 
          icon={FiList}
          label="Outras informacoes"
          value={supplier.data?.data.outras_informacoes}
        />

      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
        <UpdateSupplierForm supplier={supplierToEdit} onClose={onClose}/>
      </Modal>
    </Content>
  )  
}

export { SupplierInformation }
