import { useState } from 'react'
import { useRouter } from 'next/router'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { SubmitHandler, useForm, SubmitErrorHandler } from 'react-hook-form'

import { queryClient } from '../../contexts/queryContext'
import { useUpdateProductMutation } from '../../hooks/useUpdateProductMutation'


import { Input } from "../Input"

import {    
  Skeleton,
  VStack,
  HStack,
  Input as ChakraInput,
  Box,
  Text,
  InputGroup,
  InputLeftAddon,
  Button,
  useToast
} from '@chakra-ui/react'

import { ProductProps } from "../../types"

type UpdateProductFormProps = {
  product: ProductProps;
  isFetching: boolean;
}

const updateProductSchema = yup.object().shape({
  nome: yup.string().required('O nome do produto é obrigatório').trim(),
  preco_unitario: yup.number().required('O valor unitário do produto é obrigatório'),
  descricao: yup.string().required('A descrição do produto é obrigatória').trim(),  
})

const UpdateProductForm = ({ product, isFetching }: UpdateProductFormProps) => {  
  const toast = useToast()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(true)

  const { formState, register, handleSubmit } = useForm<ProductProps>({
    defaultValues: {
      nome: product.nome,
      descricao: product.descricao,
      preco_unitario: product.preco_unitario,
    },
    resolver: yupResolver(updateProductSchema)    
  })

  const { isSubmitting, errors } = formState

  const handleEdit = () => setIsEditing(!isEditing)

  const handleCancelEdit = () => setIsEditing(!isEditing)

  const updateProductMutation = useUpdateProductMutation()

  const handleUpdateProduct: SubmitHandler<ProductProps> = async values => {
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
        position: 'top-right'
      })

      router.push('/products')
      
    } catch (error) {
      toast({
        title: 'Ocorreu um erro ao atualizar o produto',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const handleSubmitErrors: SubmitErrorHandler<ProductProps> = errors => console.log(errors)

  if(isFetching) {
    return (
      <VStack spacing={3}>
        <Skeleton h="10" w="100%" borderRadius="8"/>
        <Skeleton h="10" w="100%" borderRadius="8"/>
      </VStack>
    )
  }

  return (
    <Box as="form" onSubmit={handleSubmit(handleUpdateProduct, handleSubmitErrors)}>
      <VStack spacing={3} align="flex-start">
        <HStack spacing={3} w="100%">
          <Input
            name="nome"
            label="Nome:"
            bgColor="gray.50"
            isDisabled={isSubmitting || isEditing}
            error={errors.nome}
            {...register('nome')}
          />
          <Box w="200px">
            <Text fontWeight="medium" mb="2" display="block" >Valor unitário:</Text>
            <InputGroup size="lg">
              <InputLeftAddon>R$</InputLeftAddon>
              <ChakraInput
                name="preco_unitario"
                type="number"
                step="0.01"
                pattern="^\d+(?:\.\d{1,2})?$"
                bgColor="gray.50"
                isDisabled={isSubmitting || isEditing}
                error={errors.preco_unitario}
                {...register('preco_unitario')}
              />
            </InputGroup>
          </Box>
        </HStack>
        <Input                 
          name="descricao"
          label="Descrição:"
          bgColor="gray.50"
          isDisabled={isEditing || isEditing}
          error={errors.descricao}
          {...register('descricao')}
        />
      </VStack>
      <HStack spacing={3} justify="flex-end" mt="8">
        { isEditing 
          ? <Button colorScheme="blue" onClick={handleEdit}>Editar produto</Button>  
          : <>
              <Button colorScheme="blue" variant="ghost" onClick={handleCancelEdit}>Cancelar</Button>
              <Button colorScheme="blue" type="submit" isDisabled={isSubmitting}>Salvar Alterações</Button>
            </>
        }
      </HStack>
    </Box>
  )
}

export {
  UpdateProductForm
}
