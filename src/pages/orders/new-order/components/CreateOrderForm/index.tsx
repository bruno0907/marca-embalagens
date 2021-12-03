import { useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm, SubmitHandler } from 'react-hook-form'

import { Divider } from '../../../../../components/Divider'
import { Input } from '../../../../../components/Input'
import { UserInfo } from './components/UserInfo'
import { UserAddressProps } from '../UserAddress'
import { OrderProducts } from './components/OrderProducts'
import { ProductsProps } from './components/Products'

import { useAuth } from '../../../../../hooks/useAuth'

import { useOrdersQuery } from '../../../../../hooks/useOrdersQuery'

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
  OrderItemProps, 
  NewOrderProps, 
  AddressProps, 
  ProductProps, 
  UserProps 
} from '../../../../../types'

const newOrderSchema = yup.object().shape({
  condicao_pagamento: yup.string().trim(),     
  data_entrega: yup.string().required('A data da entrega é obrigatória').trim(),
})

const UserAddress = dynamic<UserAddressProps>(
  async () => {
    const { UserAddress } = await import('../UserAddress')

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

const ProductsList = dynamic<ProductsProps>(
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

  const router = useRouter()  
  const toast = useToast()    
  
  const [selectedUser, setSelectedUser] = useState<UserProps>(null)  
  const [selectedAddress, setSelectedAddress] = useState<AddressProps>(null)  
  
  const [selectedProduct, setSelectedProduct] = useState<ProductProps>(null)  
  const [productAmount, setProductAmount] = useState(0)

  const [orderProducts, setOrderProducts] = useState<OrderItemProps[]>([])

  const [orderTotal, setOrderTotal] = useState(0)

  const { handleSubmit, register, formState } = useForm<NewOrderProps>({
    resolver: yupResolver(newOrderSchema)
  })

  const { errors, isSubmitting } = formState    

  const orders = useOrdersQuery()

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
        <UserInfo 
          selectedUser={selectedUser}              
          setSelectedAddress={setSelectedAddress} 
          setSelectedUser={setSelectedUser}
        />
        { selectedUser &&
          <UserAddress
            userId={selectedUser.id}              
            selectedAddress={selectedAddress}              
            setSelectedAddress={setSelectedAddress}
          />
        }
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
          <ProductsList     
            orderProducts={orderProducts}       
            setOrderProducts={setOrderProducts}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            productAmount={productAmount}
            setProductAmount={setProductAmount}
            setOrderTotal={setOrderTotal}
          />
          <OrderProducts
            orderProducts={orderProducts}
            setOrderProducts={setOrderProducts}
            orderTotal={orderTotal}
            setOrderTotal={setOrderTotal}            
          />

          <HStack spacing={3} justify="flex-end">
            <Button
              type="reset" 
              colorScheme="blue"
              variant="ghost" 
              onClick={handleCancelOrder} 
              isDisabled={!orderProducts.length}
            >Cancelar</Button>
            <Button 
              type="submit"
              colorScheme="blue" 
              isDisabled={canSubmitOrder}
              isLoading={isSubmitting}
            >Gerar pedido</Button>
          </HStack>
        </Stack> 
      }
    </Box>
  )
}

export { 
  CreateOrderForm
}