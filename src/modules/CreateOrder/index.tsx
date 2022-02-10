import { useRouter } from 'next/router'

import * as yup from 'yup'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {  
  Box, 
  HStack,  
  useToast,
  Stack,  
} from '@chakra-ui/react'

import { 
  Section,
  SectionHeader,
  SectionTitle,
  Content,
  Input,
  Header,
  Divider,
  Form,
  ButtonPrimary,
  ButtonSecondary,
  Cart
} from '../../components'

import { UserDetails, UserAddress } from './components'

import { CreateOrder } from '../../models'

import { useCreateOrderMutation } from '../../hooks'

import { useAuth } from '../../contexts/useAuth'
import { useCreateOrder } from '../../contexts/useCreateOrder'
import { useCartContext } from '../../contexts/useCart'

const newOrderSchema = yup.object().shape({
  condicao_pagamento: yup.string().trim(),     
  data_entrega: yup.string()
    .required('A data da entrega é obrigatória')
    .trim(),
})

export const CreateOrderModule = () => {
  const router = useRouter()    
  const { session } = useAuth()
  const toast = useToast()

  const { 
    cartProducts,
    cartTotal,
    canSubmit, 
  } = useCartContext()
  
  const { 
    orders,
    selectedUser,
    selectedAddress,
  } = useCreateOrder()

  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(newOrderSchema)
  })

  const { isSubmitting, errors } = formState

  const createOrderMutation = useCreateOrderMutation()

  const ordersAmount = orders.data?.length

  const handleSubmitNewOrder: SubmitHandler<CreateOrder> = async values => {
    const {       
      data_entrega, 
      condicao_pagamento,      
    } = values

    const newOrder: CreateOrder = {
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
    <>
      <Header title="Novo pedido" withGoBack/>
      <Divider />
      <Form onSubmit={handleSubmit(handleSubmitNewOrder)}>
        <Section>
          <SectionHeader>
            <SectionTitle title="Dados do cliente"/>
          </SectionHeader>
          <Content>            
            <UserDetails isSubmitting={isSubmitting} />
          </Content>
        </Section>        
        {selectedUser && (
          <Section>
            <SectionHeader>
              <SectionTitle title="Endereço de entrega"/>
            </SectionHeader>
            <Content>
              <UserAddress isSubmitting={isSubmitting}/>
            </Content>
          </Section>
        )}        
        <Section>
          <SectionHeader>
            <SectionTitle title="Descrição do pedido"/>
          </SectionHeader>
          <Content>
            <Cart isSubmiting={isSubmitting} />
          </Content>
        </Section>        
        <Section>
          <SectionHeader>
            <SectionTitle title="Entrega e pagamento"/>
          </SectionHeader>
          <Content>
            <Stack direction={['column', 'column', 'row']} spacing={6}>                    
              <Box w={['initial', 'initial', "380px"]}>
                <Input 
                  type="date"
                  name="data_entrega"
                  label="Data de entrega:"
                  isDisabled={isSubmitting}
                  error={errors.data_entrega}
                  {...register('data_entrega')}
                />
              </Box>
              <Input 
              name="condicao_pagamento"
              label="Condição de pagamento:"
              isDisabled={isSubmitting}
              {...register('condicao_pagamento')}
            />
            </Stack>          
          </Content>
        </Section>
        <HStack spacing={[3, 3, 6]} justify="flex-end">
          <ButtonSecondary
            type="reset"             
            onClick={() => router.push('/orders')} 
            isDisabled={isSubmitting}
          >Cancelar</ButtonSecondary>
          <ButtonPrimary 
            type="submit"            
            isDisabled={canSubmit}
            isLoading={isSubmitting}
          >Salvar pedido</ButtonPrimary>
        </HStack>        
      </Form>
    </>
  )
}
