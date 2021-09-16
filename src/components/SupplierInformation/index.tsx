import { useState } from 'react'
import { Content } from "../Content"
import { InformationField } from './components/informationField'

import { Modal } from '../Modal'
import { UpdateUserForm } from '../UpdateUserForm'

import { 
  Button,
  Stack,  
  Spinner,  
  Flex,
  Heading,
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

import { SupplierProps } from '../../types'
import { UpdateSupplierForm } from '../UpdateSupplierForm'

type SupplierInformationProps = {
  supplier: SupplierProps;
  isFetching: boolean;
}

const SupplierInformation = ({ supplier, isFetching }: SupplierInformationProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [supplierToEdit, setSupplierToEdit] = useState<SupplierProps>(null)  

  function handleEditSupplier(supplier: SupplierProps) {
    setSupplierToEdit(supplier)
    onOpen()
  }

  if(isFetching){
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

  return (
    <Content w="100%">
      <Flex align="center" mb="8">
        <Heading fontSize="2xl">Dados Principais</Heading>        
        <Spacer/>
        <Button colorScheme="blue" leftIcon={<FiEdit />} onClick={() => handleEditSupplier(supplier)}>Editar</Button>
      </Flex>
      <Stack spacing={3}>
        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiUser}
            label={`Nome ${supplier.natureza_cliente === 'Jurídica' ? 'Fantasia' : ''}`}
            value={supplier.nome}
          />
          { supplier.natureza_cliente === 'Jurídica' && 
            <InformationField 
              icon={FiUser}
              label="Razão Social"
              value={supplier.razao_social}
            /> }
        </HStack>

        <InformationField 
          icon={FiPackage}
          label="Produto/Serviço"
          value={supplier.produto}
        />

        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiCreditCard}
            label={supplier.natureza_cliente === 'Jurídica' ? 'CNPJ' : 'CPF'}
            value={supplier.cpf_cnpj}
          />
          <InformationField 
            icon={FiCreditCard}
            label={supplier.natureza_cliente === 'Jurídica' ? 'IE' : 'RG'}
            value={supplier.rg_ie}
          />
          <InformationField 
            icon={FiUser}
            label="Contato"
            value={supplier.contato}
          />
        </HStack>
          
        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiPhone}
            label="Telefone"
            value={supplier.telefone}
          />
          <InformationField 
            icon={FiSmartphone}
            label="Celular"
            value={supplier.celular}
          />
          <InformationField 
            icon={FiMail}
            label="E-mail"
            value={supplier.email}
          />
        </HStack>

        <InformationField 
          icon={FiList}
          label="Outras informacoes"
          value={supplier.outras_informacoes}
        />

      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
        <UpdateSupplierForm supplier={supplierToEdit} onClose={onClose}/>
      </Modal>
    </Content>
  )  
}

export { SupplierInformation }
