import { useState } from 'react'
import dynamic from 'next/dynamic'

import { 
  Text,  
  Stack,
  Skeleton,
  useDisclosure,  
  SimpleGrid,
  Spinner,
  HStack,
  Icon,
} from "@chakra-ui/react"

import {    
  FiList, 
  FiMail, 
  FiPhone, 
  FiSmartphone, 
  FiUser,
  FiCreditCard,
  FiPackage,
  FiEdit,
  FiAlertCircle,   
} from 'react-icons/fi'

import { 
  GridItem,
  Section,
  SectionHeader,
  SectionTitle,
  Content,
  ButtonLink 
} from '../../../../components'

import { useSupplierQuery } from '../../../../hooks'

import { Supplier } from '../../../../models'

import { ModalProps } from '../../../../components/Modal'
const Modal = dynamic<ModalProps>(
  () => import('../../../../components/Modal').then(({ Modal }) => Modal)
)

import { UpdateSupplierModuleProps } from '../../../UpdateSupplier'
const UpdateSupplierModule = dynamic<UpdateSupplierModuleProps>(
  () => import('../../../UpdateSupplier')
  .then(({ UpdateSupplierModule }) => UpdateSupplierModule)
)

type Props = { supplierId: string }

export const SupplierDetails = ({ supplierId }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { data: supplier, isLoading, isError, isFetching } = useSupplierQuery(supplierId)

  const [supplierToEdit, setSupplierToEdit] = useState<Supplier>(null)

  function handleEditSupplier(supplier: Supplier ) {
    setSupplierToEdit(supplier)
    onOpen()
  }

  if(isLoading) {
    return (
      <Section w="100%">
        <SectionHeader>
          <SectionTitle title="Dados cadastrais"/>
        </SectionHeader>
        <Content>
          <SimpleGrid columns={[1, 1, 3]} gap={3}>
            {Array.from({length: 9}).map((_, i) => (            
                <Skeleton key={i} h={10} borderRadius="md"/>
              )
            )}        
          </SimpleGrid>
        </Content>
      </Section>
    )
  }

  if(isError) {
    return (
      <Section w="100%">
        <SectionHeader>
          <SectionTitle title="Dados cadastrais" />
        </SectionHeader>
        <Content>
          <HStack spacing={3} aling="center">
            <Icon as={FiAlertCircle} fontSize={16} color="red.500"/>
            <Text fontWeight="medium">Erro ao carregar os dados do cliente...</Text>
          </HStack>
        </Content>
      </Section>
    )
  }
  
  return (
    <>
      <Section w="100%">
        <SectionHeader>
          <SectionTitle title="Dados do fornecedor"/>
          {isFetching && ( <Spinner size="sm" color="blue.500"/> )}
        </SectionHeader>
        <Content>
          <Stack spacing={3}>
            <SimpleGrid gap={3} columns={[1, 1, 2]}>
              {supplier?.nome && (              
                <GridItem
                  icon={FiUser}
                  label={`Nome ${supplier?.natureza_cliente === 'Jurídica' ? 'Fantasia:' : ''}`}
                  value={supplier?.nome}
                />              
              )}
              { supplier?.natureza_cliente === 'Jurídica' &&              
                <GridItem
                  icon={FiUser}
                  label="Razão Social:"
                  value={supplier?.razao_social}
                />                
              }
              {supplier?.produto && (              
                <GridItem
                  icon={FiPackage}
                  label="Produto/Serviço:"
                  value={supplier?.produto}
                />              
              )}
              {supplier?.cpf_cnpj && (
                <GridItem
                  icon={FiCreditCard}
                  label={supplier?.natureza_cliente === 'Jurídica' ? 'CNPJ:' : 'CPF:'}
                  value={supplier?.cpf_cnpj}
                />
              )}            
              {supplier?.rg_ie && (              
                <GridItem
                  icon={FiCreditCard}
                  label={supplier?.natureza_cliente === 'Jurídica' ? 'IE:' : 'RG:'}
                  value={supplier?.rg_ie}
                />              
              )}
              {supplier?.contato && (              
                <GridItem
                  icon={FiUser}
                  label="Contato:"
                  value={supplier?.contato}
                />              
              )}       

              {supplier?.telefone && (              
                <GridItem
                  icon={FiPhone}
                  label="Telefone:"
                  value={supplier?.telefone}
                />              
              )}
              {supplier?.celular && (              
                <GridItem
                  icon={FiSmartphone}
                  label="Celular:"
                  value={supplier?.celular}
                />              
              )}
              {supplier?.email && (              
                <GridItem
                  icon={FiMail}
                  label="E-mail:"
                  value={supplier?.email}
                />              
              )}
              {supplier?.outras_informacoes && (              
                <GridItem
                  icon={FiList}
                  label="Outras informacoes:"
                  value={supplier?.outras_informacoes}
                />              
              )}
            </SimpleGrid>

            <ButtonLink 
                leftIcon={<FiEdit/>}
                alignSelf="flex-end"
                ml="auto"
                p="2"
                onClick={() => handleEditSupplier(supplier)}
              >
                Editar fornecedor
              </ButtonLink>
          </Stack>
        </Content>
      </Section>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
        <UpdateSupplierModule supplier={supplierToEdit} onClose={onClose}/>
      </Modal>
    </>
  )  
}
