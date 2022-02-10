import { useRouter } from "next/router"

import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"

import { SubmitHandler, useForm } from "react-hook-form"

import { HStack, useToast } from "@chakra-ui/react"

import { 
  Header,
  Divider,
  Input,
  Cart,
  Content,
  Form,
  Section,
  SectionHeader,
  SectionTitle,
  ButtonPrimary,
  ButtonSecondary
} from '../../components'

import { useCartContext } from "../../contexts/useCart"
import { useAuth } from "../../contexts/useAuth"

import { 
  useUsersQuery, 
  useCreateEstimateMutation,
  useEstimatesQuery 
} from "../../hooks"

import { CreateEstimate } from "../../models"

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

export const CreateEstimateModule = () => {
  const { session } = useAuth()
  const toast = useToast()
  const router = useRouter()
  const users = useUsersQuery()   

  const { cartProducts, canSubmit, cartTotal }  = useCartContext()  

  const { handleSubmit, register, formState } = useForm<CreateEstimate>({
    resolver: yupResolver(newEstimateSchema)
  })

  const { isSubmitting, errors } = formState

  const estimates = useEstimatesQuery()
  const createEstimateMutation = useCreateEstimateMutation()

  const estimateAmount = estimates.data?.length

  const handleSubmitNewEstimate: SubmitHandler<CreateEstimate> = async values => {
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

      router.push(`/estimates/${response[0].id}`)

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

  return (
    <>
      <Header title="Novo orçamento" withGoBack/>
      <Divider />
      <Form onSubmit={handleSubmit(handleSubmitNewEstimate)}>
        <Section>
          <SectionHeader>
            <SectionTitle title="Cliente"/>
          </SectionHeader>
          <Content>
            <Input
              list="users"
              label="Nome:"
              name="cliente"
              isLoading={users.isFetching}
              isDisabled={isSubmitting}
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
            <Cart isSubmiting={isSubmitting} />
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
              isDisabled={isSubmitting}
              {...register('observacoes')}
            />
          </Content>
        </Section>

        <HStack spacing={[3, 3, 6]} justify="flex-end">
          <ButtonSecondary
            type="reset"             
            onClick={() => router.push('/estimates')} 
            isDisabled={isSubmitting}
          >Cancelar</ButtonSecondary>
          <ButtonPrimary 
            type="submit"
            isDisabled={canSubmit}
            isLoading={isSubmitting}
          >Salvar orçamento</ButtonPrimary>
        </HStack>
      </Form>
    </>
  )
}