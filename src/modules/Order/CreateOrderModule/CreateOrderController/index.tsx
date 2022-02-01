import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'

import { useAuth } from '../../../../contexts/useAuth'
import { useCreateOrder } from '../../../../contexts/useCreateOrder'
import { useCartContext } from '../../../../contexts/useCart'

import { CreateOrderUseCase } from '../CreateOrderUseCase'

import { NewOrder, useCreateOrderMutation } from "../../../../hooks/useCreateOrderMutation"

import { useToast } from '@chakra-ui/react'

const CreateOrderController = () => {
  const router = useRouter()
  const { session } = useAuth()
  const toast = useToast()

  const {
    orders,
    selectedUser,
    selectedAddress
  } = useCreateOrder()

  const {
    cartProducts,
    cartTotal
  } = useCartContext()

  const createOrderMutation = useCreateOrderMutation()

  const ordersAmount = orders.data?.length

  const handleSubmit: SubmitHandler<NewOrder> = async values => {
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
    
    await createOrderMutation.mutateAsync(newOrder)
    .then(response => {
      toast({
        description: 'Pedido criado com sucesso!',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'bottom',
      })

      router.push(`/orders/${response[0].id}`)
      return response
    })
    .catch(error => toast({        
      title: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    }))

  }
  return (
    <CreateOrderUseCase onSubmit={handleSubmit}/>
  )
}

export {
  CreateOrderController
}