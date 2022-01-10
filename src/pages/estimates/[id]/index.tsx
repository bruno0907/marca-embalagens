import { useEffect } from 'react'

import NextHead from 'next/head'
import { useRouter } from "next/router"
import { GetServerSideProps } from 'next'

import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Header } from '../../../components/Header'
import { WithAuth } from '../../../components/WithAuth'
import { Content } from '../../../components/Content'
import { Divider } from '../../../components/Divider'
import { Select } from '../../../components/Select'
import { Input } from '../../../components/Input'
import { ProductsSelect } from '../../../components/ProductsSelect'
import { Cart } from '../../../components/Cart'

import { Estimate } from '../../../hooks/useEstimatesQuery'
import { useEstimateQuery } from "../../../hooks/useEstimateQuery"
import { useUsersQuery } from '../../../hooks/useUsersQuery'
import { useUpdateEstimateMutation } from '../../../hooks/useUpdateEstimateMutation'

import { handleFormatPadStart } from '../../../utils/handleFormatPadStart'

import { useCartContext } from '../../../contexts/useCart'

import {       
  Text,  
  Button,
  Center,
  Spinner,
  Stack,
  HStack,
  useToast,
} from "@chakra-ui/react"
import { FiPrinter } from 'react-icons/fi'

const updateEstimateSchema = yup.object().shape({
  cliente: yup.string().required('Digite/Escolha o cliente').trim(),
  status: yup.string().required('O status é necessário').trim(),
  descricao_status: yup.string().trim().nullable(),  
  observacoes: yup.string().trim().nullable(),
})

type Props = {
  params: {
    id: string;
  }
}

export default function EstimatePage({ params }: Props) {
  const router = useRouter()  
  const { id } = params  

  const toast = useToast()

  const { cartProducts, setCartProducts, cartTotal, canSubmit } = useCartContext()
  
  const estimate = useEstimateQuery(id) 
  const users = useUsersQuery()

  const { register, formState, reset, handleSubmit } = useForm<Estimate>({
    resolver: yupResolver(updateEstimateSchema)
  })

  const { errors, isSubmitting, isSubmitted } = formState

  const updateEstimateMutation = useUpdateEstimateMutation()

  const handleUpdateEstimate: SubmitHandler<Estimate> = async values => {
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

    const updateEstimate: Estimate = {
      ...estimate.data,
      cliente,
      status,
      descricao_status,
      observacoes,
      produtos: cartProducts,
      status_data_aprovado: handleStatusAprovalOrRefusal(),
      total: cartTotal 
    }

    try {
      await updateEstimateMutation.mutateAsync(updateEstimate)

      toast({
        status: 'success',
        description: 'Orçamento atualizado com sucesso',
        duration: 3000,
        isClosable: true,
      })

      router.push(`/estimates/${id}/estimate-to-print`)
      
    } catch (error) {
      console.log(error)

      toast({
        status: 'error',
        title: 'Erro ao atualizar o orçamento',
        description: error.message,
        duration: 5000,
        isClosable: true,
      })
    }

    
  }

  const handleUpdateErrors: SubmitErrorHandler<Estimate> = errors => console.log(errors)

  useEffect(() => {
    if(!estimate.data) return 

    const {
      cliente,
      status,
      descricao_status,
      observacoes
    } = estimate.data

    reset({
      cliente,
      status,
      descricao_status,
      observacoes
    })

  }, [estimate.data, reset])

  useEffect(() => {
    setCartProducts(estimate.data?.produtos)

    return () => setCartProducts([])

  }, [setCartProducts, estimate.data?.produtos])
  
  if(estimate.isError) {
    return (
      <Center  minH="70vh" flexDir="column">            
        <Text 
          fontSize="xl" 
          mb="8" 
          fontWeight="bold"
          >
          Não foi possível carregar o orçamento.
        </Text>
        <Button 
          colorScheme="blue" 
          mb="2" 
          onClick={() => router.reload()}
          >
          Tentar novamente
        </Button>
        <Button
          variant="ghost" 
          onClick={() => router.back()}
          >
          Voltar
        </Button>        
      </Center>
    )
  }
  
  if(estimate.isLoading) {
    return (
      <Center minH="70vh">
        <Spinner color="blue.500" />
      </Center>
    )
  }

  if(!estimate.data) return null  
  
  return (
    <WithAuth>
      <NextHead>
        <title>Orçamento: {handleFormatPadStart(estimate.data.numero_orcamento)} | MARCA</title>
      </NextHead>

      <Header 
        withGoBack 
        title={`Orçamento: ${handleFormatPadStart(estimate.data.numero_orcamento)}`}
      >          
        <Button
          colorScheme="blue"
          leftIcon={<FiPrinter />}
          flexShrink={0}
          onClick={() => router.push(`/estimates/${estimate.data?.id}/estimate-to-print`)}
          >Imprimir</Button>  
      </Header>    

      <Divider />

      <Stack spacing={6} as="form" onSubmit={handleSubmit(handleUpdateEstimate, handleUpdateErrors)}>
        <Content>            
          <Input
            name="cliente"
            label="Cliente:"
            list="users"
            error={errors.cliente}
            {...register('cliente')}                
          />
          <datalist id="users">
            {users.data?.map(user => (
              <option key={user.id} value={user.nome}>{user.nome}</option>
            ))}
          </datalist>
        </Content>              

        <Content>
          <Stack spacing={6}>
            <ProductsSelect />            
            <Cart />            
          </Stack>
        </Content>

        <HStack spacing={3}>
          <Content>            
            <Stack spacing={3}>
              <Select
                label="Status do orçamento:"
                name="status" 
                defaultValue={estimate.data?.status}  
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
                {...register('descricao_status')}
              />
            </Stack>
          </Content>
          <Content>
            <Input
              as="textarea"
              name="observacoes"
              label="Observações:"
              h="160px"
              p="3"
              {...register('observacoes')}
            />
          </Content>
        </HStack>

        <HStack spacing={3} justify="flex-end" pt="4">
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
            isLoading={isSubmitting || isSubmitted}
          >Atualizar orçamento</Button>
        </HStack>
      </Stack>              
      
    </WithAuth>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {  
  return {
    props: {
      params
    }
  }
}
