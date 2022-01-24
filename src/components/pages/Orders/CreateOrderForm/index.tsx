import { useRouter } from 'next/router'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm, SubmitHandler } from 'react-hook-form'

import { Input } from '../../../Input'
import { UserDetails } from './UserDetails'
import { AddressDetails } from './AddressDetails'
import { Content } from '../../../Content'
import { ProductsSelect } from '../../../ProductsSelect'
import { Cart } from '../../../Cart'

import { useCartContext } from '../../../../contexts/useCart'
import { useCreateOrder } from '../../../../contexts/useCreateOrder'
import { useAuth } from '../../../../contexts/useAuth'
import { NewOrder, useCreateOrderMutation } from '../../../../hooks/useCreateOrderMutation'

const newOrderSchema = yup.object().shape({
  condicao_pagamento: yup.string().trim(),     
  data_entrega: yup.string()
    .required('A data da entrega é obrigatória')
    .trim(),
})

import {   
  Stack,
  HStack,
  Box,
  useToast,
  Button,
} from '@chakra-ui/react'

const CreateOrderForm = () => {
  const { session } = useAuth()

  const {
    orders,
    selectedUser,
    selectedAddress
  } = useCreateOrder()

  const {
    cartProducts,
    cartTotal,    
  } = useCartContext()

  const router = useRouter()  
  const toast = useToast()
  
  const { handleSubmit, register, formState } = useForm<NewOrder>({
    resolver: yupResolver(newOrderSchema)
  })

  const { errors, isSubmitting } = formState      

  const createOrderMutation = useCreateOrderMutation()

  const ordersAmount = orders.data?.length

  const handleCreateNewOrderMutation: SubmitHandler<NewOrder> = async values => {
    const {       
      data_entrega, 
      condicao_pagamento,      
    } = values

    const newOrder: NewOrder = {
      user_id: session.user.id,
      numero_pedido: ordersAmount + 1,
      cliente: selectedUser.id,
      endereco_entrega: selectedAddress.id,
      pedido: [...cartProducts],
      total: cartTotal,
      condicao_pagamento,
      data_entrega,
    }

    try {
      const response = await createOrderMutation.mutateAsync(newOrder)

      toast({
        description: 'Pedido criado com sucesso!',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'bottom',
      })

      router.push(`/orders/${response[0].id}`)

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
    <Box as="form" onSubmit={handleSubmit(handleCreateNewOrderMutation)}>      
      <Stack spacing={6}>
        <HStack spacing={6} align="flex-start">
          <Content>
            <UserDetails />
          </Content>
          {selectedUser && (
            <Content>
              <AddressDetails />
            </Content>            
          )}
        </HStack>

        <Content>
          <Stack spacing={6}>
            <ProductsSelect />
            <Cart />
          </Stack> 
        </Content>

        {cartProducts.length && (
          <Content>
            <HStack spacing={3}>                    
              <Box w="380px">
                <Input 
                  type="date"
                  name="data_entrega"
                  label="Data de entrega:"
                  error={errors.data_entrega}
                  {...register('data_entrega')}
                />
              </Box>
              <Input 
              name="condicao_pagamento"
              label="Condição de pagamento:"
              {...register('condicao_pagamento')}
            />
            </HStack>
          </Content>
        )}

      </Stack>

      <HStack spacing={3} justify="flex-end" pt="8" pr="8">
        <Button
          type="reset" 
          colorScheme="blue"
          variant="ghost" 
          onClick={() => router.push('/orders')} 
          isDisabled={!cartProducts?.length}
        >Cancelar</Button>
        <Button 
          type="submit"
          colorScheme="blue" 
          isDisabled={!cartProducts?.length}
          isLoading={isSubmitting}
        >Salvar pedido</Button>
      </HStack>
    </Box>   
  )
}

export { 
  CreateOrderForm
}
