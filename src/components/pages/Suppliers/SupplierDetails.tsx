import { useState } from 'react'
import dynamic from 'next/dynamic'

import { ModalProps } from '../../Modal'
import { InformationField } from '../../InformationField'
import { UpdateSupplierFormProps } from './UpdateSupplierForm'
import { Section } from '../../Section'

import { Supplier, useSupplierQuery } from '../../../hooks/useSupplierQuery'

import { 
  Text,
  Spinner,
  Stack,
  Skeleton,
  useDisclosure,
  Center,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react"

import {    
  FiList, 
  FiMail, 
  FiPhone, 
  FiSmartphone, 
  FiUser,
  FiCreditCard,
  FiPackage,   
} from 'react-icons/fi'
import { SectionHeader } from '../../SectionHeader'
import { SectionTitle } from '../../SectionTitle'
import { Content } from '../../Content'

const Modal = dynamic<ModalProps>(
  () => import('../../Modal').then(({ Modal }) => Modal)
)

const UpdateSupplierForm = dynamic<UpdateSupplierFormProps>(
  () => import('./UpdateSupplierForm').then(({ UpdateSupplierForm }) => UpdateSupplierForm)
)

type Props = { supplierId: string }

const SupplierDetails = ({ supplierId }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [supplierToEdit, setSupplierToEdit] = useState<Supplier>(null)
  
  const supplier = useSupplierQuery(supplierId)

  function handleEditSupplier(supplier: Supplier ) {
    setSupplierToEdit(supplier)
    onOpen()
  }  

  if(supplier.isLoading || supplier.isFetching){
    return (
      <Section flex="1">
        <SectionHeader>
          <SectionTitle title="Dados do fornecedor"/>
        </SectionHeader>
        <Content>
          <Stack spacing={3}>
            <Skeleton h="10" borderRadius="md"/>
            <Skeleton h="10" borderRadius="md"/>
            <Skeleton h="10" borderRadius="md"/>
            <Skeleton h="10" borderRadius="md"/>
          </Stack>
        </Content>
      </Section>
    )
  }

  if(supplier.isError) {
    return (
      <Section flex="1">
        <SectionHeader>
          <SectionTitle title="Dados do fornecedor"/>
        </SectionHeader>
        <Content>
          <Text>Ocorreu um erro ao carregar os dados do fornecedor.</Text>
        </Content>
      </Section>    
    )
  }  

  return (
    <>
      <Section flex="1">
        <SectionHeader>
          <SectionTitle title="Dados do fornecedor"/>
        </SectionHeader>
        <Content>
          <SimpleGrid gap={3} columns={2}>

            {supplier.data?.nome && (
              <GridItem py="2" px="4" bgColor="gray.100" borderRadius="md">
                <InformationField 
                  icon={FiUser}
                  label={`Nome ${supplier.data?.natureza_cliente === 'Jurídica' ? 'Fantasia' : ''}`}
                  value={supplier.data?.nome}
                />
              </GridItem>
            )}

            { supplier.data?.natureza_cliente === 'Jurídica' &&
              <GridItem py="2" px="4" bgColor="gray.100" borderRadius="md">
                <InformationField 
                  icon={FiUser}
                  label="Razão Social"
                  value={supplier.data?.razao_social}
                /> 
              </GridItem> 
            }

            {supplier.data?.produto && (
              <GridItem py="2" px="4" bgColor="gray.100" borderRadius="md">
                <InformationField 
                  icon={FiPackage}
                  label="Produto/Serviço"
                  value={supplier.data?.produto}
                />
              </GridItem>
            )}

            <GridItem py="2" px="4" bgColor="gray.100" borderRadius="md">
              <InformationField 
                icon={FiCreditCard}
                label={supplier.data?.natureza_cliente === 'Jurídica' ? 'CNPJ' : 'CPF'}
                value={supplier.data?.cpf_cnpj}
              />
            </GridItem>

            {supplier.data?.rg_ie && (
              <GridItem py="2" px="4" bgColor="gray.100" borderRadius="md">
                <InformationField 
                  icon={FiCreditCard}
                  label={supplier.data?.natureza_cliente === 'Jurídica' ? 'IE' : 'RG'}
                  value={supplier.data?.rg_ie}
                />
              </GridItem>
            )}

            {supplier.data?.contato && (
              <GridItem py="2" px="4" bgColor="gray.100" borderRadius="md">
                <InformationField 
                  icon={FiUser}
                  label="Contato"
                  value={supplier.data?.contato}
                />
              </GridItem>
            )}        

            {supplier.data?.telefone && (
              <GridItem py="2" px="4" bgColor="gray.100" borderRadius="md">
                <InformationField 
                  icon={FiPhone}
                  label="Telefone"
                  value={supplier.data?.telefone}
                />
              </GridItem>
            )}

            {supplier.data?.celular && (
              <GridItem py="2" px="4" bgColor="gray.100" borderRadius="md">
                <InformationField 
                  icon={FiSmartphone}
                  label="Celular"
                  value={supplier.data?.celular}
                />
              </GridItem>
            )}

            {supplier.data?.email && (
              <GridItem py="2" px="4" bgColor="gray.100" borderRadius="md">
                <InformationField 
                  icon={FiMail}
                  label="E-mail"
                  value={supplier.data?.email}
                />
              </GridItem>
            )}
            {supplier.data?.outras_informacoes && (
              <GridItem py="2" px="4" bgColor="gray.100" borderRadius="md">
                <InformationField 
                  icon={FiList}
                  label="Outras informacoes"
                  value={supplier.data?.outras_informacoes}
                />
              </GridItem>
            )}
          </SimpleGrid>
        </Content>
      </Section>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
        <UpdateSupplierForm supplier={supplierToEdit} onClose={onClose}/>
      </Modal>
    </>
  )  
}

export { SupplierDetails }
