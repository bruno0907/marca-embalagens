import { useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm, SubmitHandler } from 'react-hook-form'

import { Divider } from '../../../../../components/Divider'
import { Input } from '../../../../../components/Input'
import { UserInfo } from './components/UserInfo'
import { OrderProducts } from './components/OrderProducts'

import { useAuth } from '../../../../../hooks/useAuth'
import { useOrdersQuery } from '../../../../../hooks/useOrdersQuery'

import { useCreateOrder } from '../../hooks/useCreateOrder'

import { useCreateOrderMutation } from '../../../../../hooks/useCreateOrderMutation'

import { 
  Text,  
  Button,
  Stack,
  HStack,
  Box,
  Center,
  Spinner,
  useToast,
} from '@chakra-ui/react'
 
import {   
  NewOrderProps,   
} from '../../../../../types'


const newOrderSchema = yup.object().shape({
  condicao_pagamento: yup.string().trim(),     
  data_entrega: yup.string().required('A data da entrega é obrigatória').trim(),
})

const UserAddress = dynamic(
  async () => {
    const { UserAddress } = await import('./components/UserAddress')

    return UserAddress
  }, {
    loading: () => (
      <HStack spacing={2} align="center">
        <Text fontWeight="medium">Endereço:</Text> 
        <Spinner ml="2" size="sm" color="blue.500"/>
      </HStack>     
    )
  }
)

const Products = dynamic(
  async () => {
    const { Products } = await import('./components/Products')

    return Products
  }, {
    loading: () => (
      <HStack spacing={2} align="center">
        <Text fontWeight="medium">Produto:</Text> 
        <Spinner ml="2" size="sm" color="blue.500"/>
      </HStack>    
    )
  }
)

const CreateOrderForm = () => {
  const { session } = useAuth()

  const {    
    selectedUser,
    orderProducts,
    selectedAddress,
    orderTotal,
  } = useCreateOrder()  

  const router = useRouter()  
  const toast = useToast()    

  const orders = useOrdersQuery()
  
  const { handleSubmit, register, formState } = useForm<NewOrderProps>({
    resolver: yupResolver(newOrderSchema)
  })

  const { errors, isSubmitting } = formState      

  const createOrderMutation = useCreateOrderMutation()
  
  const canSubmitOrder = selectedUser && Boolean(orderProducts.length <= 0)  

  const ordersAmount = orders.data?.length

  const handleCreateNewOrderMutation: SubmitHandler<NewOrderProps> = async values => {
    const { data_entrega, condicao_pagamento } = values

    const newOrder: NewOrderProps = {
      user_id: session.user.id,
      numero_pedido: ordersAmount + 1,
      cliente: selectedUser.id,
      endereco_entrega: selectedAddress.id,
      pedido: [...orderProducts],
      total: orderTotal,
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
      })

      router.push(`/orders/${response[0].id}`)

    } catch (error) {
      toast({        
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })

    }
  }

  const handleCancelOrder = () => router.push('/orders')

  if(orders.isLoading) {
    return (
      <Center>
        <Spinner size="md" color="blue.500" />
      </Center>
    )
  }

  return (
    
      <Box as="form" onSubmit={handleSubmit(handleCreateNewOrderMutation)}>      
        
        <Stack spacing={3}>      
          
          <UserInfo />
          
          { selectedUser && <UserAddress /> }
                    
          { selectedAddress &&          
            <Stack spacing={3}>
              <HStack spacing={3}>
                <Input 
                  name="condicao_pagamento"
                  label="Condição de pagamento:"
                  {...register('condicao_pagamento')}
                />
                <Box w="380px">
                  <Input 
                    type="date"
                    name="data_entrega"
                    label="Data de entrega:"
                    error={errors.data_entrega}
                    {...register('data_entrega')}
                  />
                </Box>
              </HStack>
            </Stack>
          }
        </Stack>

        <Divider />

        { selectedAddress && 
          <Stack spacing={6}>  

            <Products/>

            <OrderProducts
              canSubmitOrder={canSubmitOrder}
              isSubmitting={isSubmitting}
              handleCancelOrder={handleCancelOrder}
            />
            
          </Stack> 
        }
      </Box>
    
  )
}

export { 
  CreateOrderForm
}