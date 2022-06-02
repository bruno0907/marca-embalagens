import { useEffect, useRef } from 'react'

import NextHead from 'next/head'
import router from "next/router"

import * as yup from 'yup'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useReactToPrint } from 'react-to-print'

import { Stack, HStack, useToast, Flex, ButtonGroup } from "@chakra-ui/react"

import { FiPrinter, FiShare2 } from "react-icons/fi"

import { 
  Header,
  Content,
  Divider,
  Cart,
  Section,  
  SectionTitle,
  Form,
  Input,
  Select,
  LoadingView,
  ErrorView,
  ButtonPrimary,
  ButtonSecondary 
} from "../../components"

import { PrintDraftModule } from '..'

import { useCartContext } from '../../contexts/useCart'

import { 
  useUsersQuery,
  useUpdateDraftMutation,
  useDraftQuery,
} from '../../hooks'

import { handleFormatPadStart, handleDraftToShare } from "../../utils"

import { Draft } from '../../models'

const updateDraftSchema = yup.object().shape({
  cliente: yup.string().required('Digite/Escolha o cliente').trim(),
  status: yup.string().required('O status é necessário').trim(),
  descricao_status: yup.string().trim().nullable(),  
  observacoes: yup.string().trim().nullable(),
})

type DraftModuleProps = {  
  draftId: string;  
}

export const DraftModule = ({ draftId }: DraftModuleProps) => {  
  const { data, isLoading, isError } = useDraftQuery(draftId)

  const users = useUsersQuery()

  const toast = useToast()

  const printRef = useRef<HTMLDivElement>(null);

  const { 
    cartProducts, 
    setCartProducts,
    cartTotal,
    canSubmit, 
  } = useCartContext()

  const { formState, handleSubmit, register, reset } = useForm<Draft>({
    resolver: yupResolver(updateDraftSchema)
  })

  const { isSubmitting, errors } = formState
  
  const updateDraftMutation = useUpdateDraftMutation()  

  const handleSubmitDraftUpdate: SubmitHandler<Draft> = async values => {
    const {
       cliente,
       status,
       descricao_status,
       observacoes
    } = values

    const handleStatusAprovalOrRefusal = () => {
      if(status === 'Pendente') {        
        return null
      }
      return new Date()
    }


    try {
      const response = await updateDraftMutation.mutateAsync({
        ...data,
      cliente,
      status,
      descricao_status,
      observacoes,
      produtos: cartProducts,
      status_data_aprovado: handleStatusAprovalOrRefusal(),
      total: cartTotal
      })

      toast({
        status: 'success',
        description: 'Orçamento atualizado com sucesso',
        duration: 3000,
        isClosable: true,
      })

      router.push(`/drafts/${response[0].id}`)
      
    } catch (error) {
      toast({
        status: 'error',
        title: 'Erro ao atualizar o orçamento',
        description: error.message,
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handlePrintOrder = useReactToPrint({
    content: () => printRef.current,    
    onAfterPrint: () => router.push("/drafts"),
  });

  useEffect(() => {
    if(!data) return 

    const {
      cliente,
      status,
      descricao_status,
      observacoes
    } = data

    reset({
      cliente,
      status,
      descricao_status,
      observacoes
    })

  }, [data, reset])

  useEffect(() => {
    setCartProducts(data?.produtos)

    return () => setCartProducts([])

  }, [setCartProducts, data?.produtos])

  if(isLoading || users.isLoading) {
    return (
      <>
        <Header withGoBack title="Orçamento:"/>
        <Divider/>
        <LoadingView/>
      </>
    )
  }

  if(isError || users.isError) {
    return (
      <>
        <Header withGoBack title="Orçamento:"/>
        <Divider/>
        <ErrorView/>
      </>
    )
  }  

  return (
    <>
      <NextHead>
        <title>{`Orçamento: ${handleFormatPadStart(data.numero_orcamento)}`}</title>
      </NextHead>

      <Header withGoBack title={`Orçamento: ${handleFormatPadStart(data.numero_orcamento)}`}>
      <Stack direction="row" spacing={3}>
        <ButtonPrimary rightIcon={<FiShare2/>} onClick={() => handleDraftToShare(data)}> 
          Compartilhar
        </ButtonPrimary>
        <ButtonPrimary rightIcon={<FiPrinter/>} onClick={handlePrintOrder}>
          Imprimir
        </ButtonPrimary>
      </Stack>
      </Header>

      <Divider />

      <Form onSubmit={handleSubmit(handleSubmitDraftUpdate)}>
        <Section>
          
          <SectionTitle title="Cliente"/>          
          <Content>
            <Input
              name="cliente"
              label="Clientes:"
              list="users"
              isDisabled={isSubmitting}
              isLoading={users.isFetching}
              error={errors.cliente}
              {...register('cliente')}
            />
            <datalist id="users">
              {users.data.map(user => (
                <option key={user.id} value={user.nome}>{user.nome}</option>
              ))}
            </datalist>
          </Content>
        
          <SectionTitle title="Descrição do orçamento"/>          
          <Content>                          
            <Cart isSubmiting={isSubmitting} />            
          </Content>
        
          <SectionTitle title="Outras informações"/>
          <Content>
            <Stack direction={['column', 'column', 'row']} spacing={[3, 3, 6]}>
              <Stack spacing={3} flex="1">
                <Select
                  label="Status do orçamento:"
                  name="status"
                  isDisabled={isSubmitting} 
                  defaultValue={data?.status}
                  {...register('status')}
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Aprovado">Aprovado</option>
                  <option value="Não aprovado">Não aprovado</option>
                </Select>
                <Input
                  as="textarea"
                  name="descricao_status"
                  label="Descrição do status"
                  h="80px"
                  p="3"
                  isDisabled={isSubmitting}
                  {...register('descricao_status')}
                />
              </Stack>     
              <Flex flex="1">
                <Input
                  as="textarea"
                  name="observacoes"
                  label="Observações:"
                  h="160px"
                  p="3"
                  isDisabled={isSubmitting}
                  {...register('observacoes')}
                />
              </Flex>                           
            </Stack>
          </Content>
        
          <ButtonGroup alignSelf="flex-end">
            <ButtonSecondary
              type="reset"             
              isDisabled={isSubmitting}
              onClick={() => router.back()} 
            >Cancelar</ButtonSecondary>
            <ButtonPrimary 
              type="submit"            
              isDisabled={canSubmit}
              isLoading={isSubmitting}
            >Atualizar orçamento</ButtonPrimary>
          </ButtonGroup>          
        </Section>
      </Form>      
      <PrintDraftModule draft={data} ref={printRef}/>
    </>
  )
}
