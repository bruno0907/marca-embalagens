import { useState } from 'react'
import { useRouter } from 'next/router'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { SubmitHandler, useForm, SubmitErrorHandler } from 'react-hook-form'

import { useUpdateProductMutation } from '../../../../hooks/useUpdateProductMutation'

import { Input } from "../../../../components/Input"


import {    
  Skeleton,
  VStack,
  HStack,
  Input as ChakraInput,
  Box,
  Flex,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Button,
  useToast,
  FormControl,  
  Switch
} from '@chakra-ui/react'

import { ProductProps } from "../../../../types"

type UpdateProductFormProps = {
  product: ProductProps;  
}

const updateProductSchema = yup.object().shape({
  nome: yup.string().required('O nome do produto é obrigatório').trim(),
  preco_unitario: yup.number().required('O valor unitário do produto é obrigatório'),
  descricao: yup.string().required('A descrição do produto é obrigatória').trim(),  
})

const UpdateProductForm = ({ product }: UpdateProductFormProps) => {  
  const toast = useToast()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(true)

  const handleEditProduct = () => setIsEditing(!isEditing)

  const { formState, register, handleSubmit } = useForm<ProductProps>({
    resolver: yupResolver(updateProductSchema)    
  })

  const { isSubmitting, errors } = formState  

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

  return (
    <Box as="form" onSubmit={handleSubmit(handleUpdateProduct, handleSubmitErrors)}>
      <FormControl htmlFor="edit-product" display="flex" aling="center" justifyContent="flex-end" mb="8">
        <FormLabel>Editar produto:</FormLabel>
        <Switch id="edit-product" onChange={handleEditProduct}/>
      </FormControl>      
      
      <VStack spacing={3} align="flex-start">
        <HStack spacing={3} w="100%">
          <Input
            name="nome"
            label="Nome:"
            defaultValue={product.nome}
            isDisabled={isEditing || isSubmitting}
            error={errors.nome}
            {...register('nome')}
          />
          <Box w="200px">
            <FormLabel>Valor unitário:</FormLabel>
            <InputGroup borderColor="gray.300">
              <InputLeftAddon>R$</InputLeftAddon>
              <ChakraInput
                name="preco_unitario"
                type="number"
                step="0.01"
                defaultValue={product.preco_unitario.toFixed(2)}
                pattern="^\d+(?:\.\d{1,2})?$"
                isDisabled={isEditing || isSubmitting}                                
                error={errors.preco_unitario}
                {...register('preco_unitario')}
              />
            </InputGroup>
          </Box>
        </HStack>
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
      </VStack>
      { !isEditing &&
        <HStack spacing={3} justify="flex-end" mt="8">
          <Button colorScheme="blue" variant="ghost" onClick={() => router.back()}>Cancelar</Button>
          <Button colorScheme="blue" type="submit" isDisabled={isSubmitting}>Salvar Alterações</Button>
        </HStack>
      }
    </Box>
  )
}

export {
  UpdateProductForm
}
