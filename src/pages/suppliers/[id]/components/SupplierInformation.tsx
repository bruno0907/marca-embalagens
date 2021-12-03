import { useState } from 'react'
import dynamic from 'next/dynamic'

import { Content } from "../../../../components/Content"
import { ModalProps } from '../../../../components/Modal'
import { InformationField } from '../../../../components/InformationField'
import { UpdateSupplierFormProps } from './UpdateSupplierForm'

import { useSupplierQuery } from '../../../../hooks/useSupplierQuery'

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
  useDisclosure,
  Center,
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

import { SupplierProps } from '../../../../types'

const Modal = dynamic<ModalProps>(
  async () => {
    const { Modal } = await import('../../../../components/Modal')

    return Modal
  }
)

const UpdateSupplierForm = dynamic<UpdateSupplierFormProps>(
  async () => {
    const { UpdateSupplierForm } = await import('./UpdateSupplierForm')

    return UpdateSupplierForm
  }, {
    loading: () => (
      <Center mb="8">
        <Spinner color="blue.500"/>
      </Center>
    )
  }
)

type SupplierInformationProps = {
  supplierId: string | string[];  
}

const SupplierInformation = ({ supplierId }: SupplierInformationProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [supplierToEdit, setSupplierToEdit] = useState<SupplierProps>(null)
  
  const supplier = useSupplierQuery(String(supplierId))

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
          <Skeleton h="10" borderRadius="md"/>
          <Skeleton h="10" borderRadius="md"/>
          <Skeleton h="10" borderRadius="md"/>
          <Skeleton h="10" borderRadius="md"/>
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
        <Button colorScheme="blue" leftIcon={<FiEdit />} onClick={() => handleEditSupplier(supplier.data)}>Editar</Button>
      </Flex>
      <Stack spacing={3}>
        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiUser}
            label={`Nome ${supplier.data?.natureza_cliente === 'Jurídica' ? 'Fantasia' : ''}`}
            value={supplier.data?.nome}
          />
          { supplier.data?.natureza_cliente === 'Jurídica' && 
            <InformationField 
              icon={FiUser}
              label="Razão Social"
              value={supplier.data?.razao_social}
            /> }
        </HStack>

        <InformationField 
          icon={FiPackage}
          label="Produto/Serviço"
          value={supplier.data?.produto}
        />

        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiCreditCard}
            label={supplier.data?.natureza_cliente === 'Jurídica' ? 'CNPJ' : 'CPF'}
            value={supplier.data?.cpf_cnpj}
          />
          <InformationField 
            icon={FiCreditCard}
            label={supplier.data?.natureza_cliente === 'Jurídica' ? 'IE' : 'RG'}
            value={supplier.data?.rg_ie}
          />
          <InformationField 
            icon={FiUser}
            label="Contato"
            value={supplier.data?.contato}
          />
        </HStack>
          
        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiPhone}
            label="Telefone"
            value={supplier.data?.telefone}
          />
          <InformationField 
            icon={FiSmartphone}
            label="Celular"
            value={supplier.data?.celular}
          />
          <InformationField 
            icon={FiMail}
            label="E-mail"
            value={supplier.data?.email}
          />
        </HStack>

        <InformationField 
          icon={FiList}
          label="Outras informacoes"
          value={supplier.data?.outras_informacoes}
        />

      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
        <UpdateSupplierForm supplier={supplierToEdit} onClose={onClose}/>
      </Modal>
    </Content>
  )  
}

export { SupplierInformation }
