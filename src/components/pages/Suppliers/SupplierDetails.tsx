import { useState } from 'react'
import dynamic from 'next/dynamic'

import { Content } from "../../Content"
import { ModalProps } from '../../Modal'
import { InformationField } from '../../InformationField'
import { UpdateSupplierFormProps } from './UpdateSupplierForm'

import { Supplier, useSupplierQuery } from '../../../hooks/useSupplierQuery'

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
  Box,
  SimpleGrid,
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

const Modal = dynamic<ModalProps>(
  async () => {
    const { Modal } = await import('../../Modal')

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

type Props = { supplierId: string }

const SupplierDetails = ({ supplierId }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [supplierToEdit, setSupplierToEdit] = useState<Supplier>(null)
  
  const supplier = useSupplierQuery(supplierId)

  function handleEditSupplier(supplier: Supplier) {
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

      
      <SimpleGrid gap={3} columns={2}>

        {supplier.data?.nome && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiUser}
              label={`Nome ${supplier.data?.natureza_cliente === 'Jurídica' ? 'Fantasia' : ''}`}
              value={supplier.data?.nome}
            />
          </Box>
        )}

        { supplier.data?.natureza_cliente === 'Jurídica' &&
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiUser}
              label="Razão Social"
              value={supplier.data?.razao_social}
            /> 
          </Box> 
        }

        {supplier.data?.produto && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiPackage}
              label="Produto/Serviço"
              value={supplier.data?.produto}
            />
          </Box>
        )}

        <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
          <InformationField 
            icon={FiCreditCard}
            label={supplier.data?.natureza_cliente === 'Jurídica' ? 'CNPJ' : 'CPF'}
            value={supplier.data?.cpf_cnpj}
          />
        </Box>

        {supplier.data?.rg_ie && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiCreditCard}
              label={supplier.data?.natureza_cliente === 'Jurídica' ? 'IE' : 'RG'}
              value={supplier.data?.rg_ie}
            />
          </Box>
        )}

        {supplier.data?.contato && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiUser}
              label="Contato"
              value={supplier.data?.contato}
            />
          </Box>
        )}        

        {supplier.data?.telefone && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiPhone}
              label="Telefone"
              value={supplier.data?.telefone}
            />
          </Box>
        )}

        {supplier.data?.celular && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiSmartphone}
              label="Celular"
              value={supplier.data?.celular}
            />
          </Box>
        )}

        {supplier.data?.email && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiMail}
              label="E-mail"
              value={supplier.data?.email}
            />
          </Box>
        )}
        {supplier.data?.outras_informacoes && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiList}
              label="Outras informacoes"
              value={supplier.data?.outras_informacoes}
            />
          </Box>
        )}
      </SimpleGrid>        
      
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
        <UpdateSupplierForm supplier={supplierToEdit} onClose={onClose}/>
      </Modal>
    </Content>
  )  
}

export { SupplierDetails }
