import { useRouter } from "next/router"

import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"

import { SubmitHandler, useForm } from "react-hook-form"

import { ButtonGroup, useToast } from "@chakra-ui/react"

import { 
  Header,
  Divider,
  Input,
  Cart,
  Content,
  Form,
  Section,  
  SectionTitle,
  ButtonPrimary,
  ButtonSecondary
} from '../../components'

import { useCartContext } from "../../contexts/useCart"
import { useAuth } from "../../contexts/useAuth"

import { 
  useUsersQuery, 
  useCreateDraftMutation,
  useDraftsQuery 
} from "../../hooks"

import { CreateDraft } from "../../models"

const newDraftSchema = yup.object().shape({
  cliente: yup.string()
    .required('Digite o nome do cliente')
    .min(5, 'O nome do cliente deve ter no mínimo 5 caracteres')
    .max(120, 'O nome do cliente não deve ultrapassar 120 caracteres')
    .trim(),
  condicao_pagamento: yup.string().trim(),     
  data_entrega: yup.string().trim(),
  observacoes: yup.string().trim(),
})

export const CreateDraftModule = () => {
  const { session } = useAuth()
  const toast = useToast()
  const router = useRouter()
  const users = useUsersQuery()   

  const { cartProducts, canSubmit, cartTotal }  = useCartContext()  

  const { handleSubmit, register, formState } = useForm<CreateDraft>({
    resolver: yupResolver(newDraftSchema)
  })

  const { isSubmitting, errors } = formState

  const drafts = useDraftsQuery()
  const createDraftMutation = useCreateDraftMutation()

  const draftAmount = drafts.data?.length

  const handleSubmitNewDraft: SubmitHandler<CreateDraft> = async values => {
    const { cliente, observacoes } = values    

    try {
      const response = await createDraftMutation.mutateAsync({
        user_id: session.user.id,
        numero_orcamento: draftAmount + 1,
        cliente,
        produtos: [...cartProducts],
        total: cartTotal,
        observacoes,
        status: 'Pendente',
        descricao_status: '',
        status_data_aprovado: null
      })
      
      toast({
        description: 'Orçamento criado com sucesso!',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'bottom',
      })

      router.push(`/drafts/${response[0].id}`)

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
      <Form onSubmit={handleSubmit(handleSubmitNewDraft)}>
        <Section>          
          <SectionTitle title="Cliente"/>          
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
        
          <SectionTitle title="Descrição"/>          
          <Content>
            <Cart isSubmiting={isSubmitting} />
          </Content>
        
          <SectionTitle title="Outras informações"/>          
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

          <ButtonGroup spacing={[3, 3, 6]} alignSelf="flex-end">
            <ButtonSecondary
              type="reset"             
              onClick={() => router.push('/drafts')} 
              isDisabled={isSubmitting}
            >Cancelar</ButtonSecondary>
            <ButtonPrimary 
              type="submit"
              isDisabled={canSubmit}
              isLoading={isSubmitting}
            >Salvar orçamento</ButtonPrimary>
          </ButtonGroup>
        </Section>
      </Form>
    </>
  )
}