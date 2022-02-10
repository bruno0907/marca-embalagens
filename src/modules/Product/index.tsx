import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { SubmitHandler, useForm, SubmitErrorHandler } from 'react-hook-form'

import {       
  HStack,
  Input as ChakraInput,
  Box,  
  FormLabel,
  InputGroup,
  InputLeftAddon,  
  useToast,
  FormControl,  
  Switch,
  Stack,
  Spacer,  
} from '@chakra-ui/react'

import { 
  Input,
  Header,
  Divider,
  Content,
  LoadingView,
  ErrorView,
  Form,
  Section,
  SectionHeader,
  SectionTitle,
  ButtonSecondary,
  ButtonPrimary 
} from "../../components"

import { 
  useUpdateProductMutation,
  useProductQuery 
} from '../../hooks'

import { Product } from '../../models'

const updateProductSchema = yup.object().shape({
  nome: yup.string()
    .required("O nome do produto é obrigatório")
    .min(5, 'O nome do produto deve ter no mínimo 5 caracteres')
    .max(120, 'O nome do produto não deve ultrapassar 120 caracteres')
    .trim(),
  descricao: yup.string().trim(),
  preco_unitario: yup.number()
    .required('O valor do produto é obrigatório'),  
})

type Props = { productId: string }

export const ProductModule = ({ productId }: Props) => {
  const { data: product, isLoading, isError, isFetching } = useProductQuery(productId)  
  const toast = useToast()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(true)

  const handleEditProduct = () => setIsEditing(!isEditing)

  const { formState, register, handleSubmit } = useForm<Product>({
    resolver: yupResolver(updateProductSchema)    
  })

  const { isSubmitting, errors } = formState  

  const updateProductMutation = useUpdateProductMutation()

  const handleUpdateProduct: SubmitHandler<Product> = async values => {
    try {
      const updatedProduct = {
        ...product,
        ...values
      }

      await updateProductMutation.mutateAsync(updatedProduct)

      toast({
        title: 'Produto atualizado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
      })

      router.push('/products')
      
    } catch (error) {
      toast({
        title: 'Ocorreu um erro ao atualizar o produto',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
    }
  }

  const handleSubmitErrors: SubmitErrorHandler<Product> = errors => console.log(errors)

  if(isLoading) {
    return (
      <>
        <Header title="Produto" withGoBack/>
        <Divider/>
        <LoadingView />
      </>
    )
  }

  if(isError) {
    return (
      <>
        <Header title="Produto"/>
        <Divider/>
        <ErrorView />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{!product?.nome ? 'Produto' : product.nome}</title>
      </Head>
      <Header withGoBack title={product.nome} />
      <Divider />
      <Form onSubmit={handleSubmit(handleUpdateProduct, handleSubmitErrors)}>        
        <Section>
          <SectionHeader>
            <SectionTitle title="Informações do produto"/>
            <Spacer />
            <FormControl htmlFor="edit-product" w="fit-content" display="flex" align="center">
              <FormLabel mb="0" fontSize={['sm', 'sm', 'initial']}>Editar produto:</FormLabel>
              <Switch id="edit-product" onChange={handleEditProduct}/>
            </FormControl>      
          </SectionHeader>
          <Content>
            <Stack spacing={3} align="flex-start">
              <Stack direction={['column', 'column', 'row']} spacing={[3, 3, 6]} w="100%">
                <Input
                  name="nome"
                  label="Nome:"
                  isLoading={isFetching}
                  defaultValue={product.nome}
                  isDisabled={isEditing || isSubmitting}
                  error={errors.nome}
                  {...register('nome')}
                />
                <Box w={['initial', 'initial', "280px"]}>
                  <FormLabel fontSize={['sm', 'sm', 'initial']}>Valor unitário:</FormLabel>
                  <InputGroup borderColor="gray.300">
                    <InputLeftAddon fontSize={['sm', 'sm', 'initial']}>R$</InputLeftAddon>
                    <ChakraInput
                      name="preco_unitario"
                      type="number"
                      step="0.01"
                      fontSize={['sm', 'sm', 'initial']}
                      defaultValue={product.preco_unitario.toFixed(2)}
                      pattern="^\d+(?:\.\d{1,2})?$"
                      isDisabled={isEditing || isSubmitting}                                
                      error={errors.preco_unitario}
                      {...register('preco_unitario')}
                    />
                  </InputGroup>
                </Box>
              </Stack>
              <Input     
                as="textarea"
                h="80px"
                p="3"
                name="descricao"
                label="Descrição:"
                defaultValue={product.descricao}
                isDisabled={isEditing || isSubmitting}
                error={errors.descricao}
                {...register('descricao')}
              />
            </Stack>
          </Content>
          {!isEditing &&
            <HStack spacing={[3, 3, 6]} justify="flex-end" mt="8">
              <ButtonSecondary
                type="reset"
                isDisabled={isSubmitting}
                onClick={() => router.back()}
              >Cancelar</ButtonSecondary>
              <ButtonPrimary 
                type="submit" 
                isDisabled={isSubmitting}
              >Salvar Alterações</ButtonPrimary>
            </HStack>
          }
        </Section>
      </Form>
    </>
  )
}
