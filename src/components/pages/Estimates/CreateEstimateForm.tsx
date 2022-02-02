import { useRouter } from 'next/router'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'

import { Content } from '../../Content'
import { Input } from '../../Input'
import { Cart } from '../../Cart'
import { ProductsSelect } from '../../ProductsSelect'
import { Section } from '../../Section'
import { SectionHeader } from '../../SectionHeader'
import { SectionTitle } from '../../SectionTitle'

import { useAuth } from '../../../contexts/useAuth'
import { useUsersQuery } from '../../../hooks/useUsersQuery'
import { CreateEstimate, useCreateEstimateMutation } from '../../../hooks/useCreateEstimateMutation'
import { useEstimatesQuery } from '../../../hooks/useEstimatesQuery'

import { useCartContext } from '../../../contexts/useCart'

const newEstimateSchema = yup.object().shape({
  cliente: yup.string()
    .required('Digite o nome do cliente')
    .min(5, 'O nome do cliente deve ter no mínimo 5 caracteres')
    .max(120, 'O nome do cliente não deve ultrapassar 120 caracteres')
    .trim(),
  condicao_pagamento: yup.string().trim(),     
  data_entrega: yup.string().trim(),
  observacoes: yup.string().trim(),
})

import {   
  Stack,
  HStack,
  Center,
  Spinner,
  useToast,
  Button,
} from '@chakra-ui/react'

export const CreateEstimateForm = () => {
  const { session } = useAuth()
  const router = useRouter()  
  const toast = useToast()
  
  const {
    cartProducts,
    cartTotal
  } = useCartContext()  
  
  const users = useUsersQuery()  
  const estimates = useEstimatesQuery()
  
  const { handleSubmit, register, formState } = useForm<CreateEstimate>({
    resolver: yupResolver(newEstimateSchema)
  })

  const { isSubmitting, errors } = formState      

  const createEstimateMutation = useCreateEstimateMutation()
  
  const canSubmit = !cartProducts.length

  const estimateAmount = estimates.data?.length

  const handleCreateEstimate: SubmitHandler<CreateEstimate> = async values => {
    const { cliente, observacoes } = values

    const estimate: CreateEstimate = {
      user_id: session.user.id,
      numero_orcamento: estimateAmount + 1,
      cliente,
      produtos: [...cartProducts],
      total: cartTotal,
      observacoes,
      status: 'Pendente',
      descricao_status: '',
      status_data_aprovado: null
    }

    try {
      const response = await createEstimateMutation.mutateAsync(estimate)
      
      toast({
        description: 'Orçamento criado com sucesso!',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'bottom',
      })

      router.push(`/estimates/${response[0].id}/estimate-to-print`)

    } catch (error) {
      toast({        
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
    }
  }

  const handleSubmitError:SubmitErrorHandler<CreateEstimate> = errors => console.log(errors)

  if(estimates.isLoading) {
    return (
      <Center>
        <Spinner size="md" color="blue.500" />
      </Center>
    )
  }

  return (
    <Stack as="form" onSubmit={handleSubmit(handleCreateEstimate, handleSubmitError)} spacing={12}>
      
      <Section>
        <SectionHeader>
          <SectionTitle title="Cliente"/>
        </SectionHeader>
        <Content>
          <Input
            list="users"
            label="Nome:"
            name="cliente"
            error={errors?.cliente}
            {...register('cliente')}
          />
          <datalist id="users">
            {users.data?.map(user => (
              <option key={user.id} value={user.nome}>{user.nome}</option>
            ))}
          </datalist>
        </Content>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle title="Descrição"/>
        </SectionHeader>
        <Content>
          <Stack spacing={6}>
            <ProductsSelect />
            <Cart />
          </Stack>
        </Content>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle title="Outras informações"/>
        </SectionHeader>
        <Content>
            <Input
              as="textarea"
              name="observacoes"
              label="Observações:"
              h="100px"
              p="3"
              {...register('observacoes')}
            />
        </Content>
      </Section>

      <HStack spacing={6} justify="flex-end">
        <Button
          type="reset" 
          colorScheme="blue"
          variant="ghost" 
          onClick={() => router.push('/estimates')} 
          isDisabled={!cartProducts?.length}
        >Cancelar</Button>
        <Button 
          type="submit"
          colorScheme="blue" 
          isDisabled={canSubmit}
          isLoading={isSubmitting}
        >Salvar orçamento</Button>
      </HStack>

    </Stack>
  )
}
