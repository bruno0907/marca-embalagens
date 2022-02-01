import { useRouter } from 'next/router'
import { UseFormReturn } from 'react-hook-form'

import { Cart } from '../../../../components/Cart'
import { Section } from '../../../../components/Section'
import { Content } from '../../../../components/Content'
import { Input } from '../../../../components/Input'
import { ProductsSelect } from '../../../../components/ProductsSelect'

import { UserAddress } from './UserAddress'
import { UserDetails } from './UserDetails'

import { NewOrder } from '../../../../hooks/useCreateOrderMutation'
import { useCartContext } from '../../../../contexts/useCart'
import { useCreateOrder } from '../../../../contexts/useCreateOrder'

import {  
  Box, 
  HStack, 
  Stack,
  Button,
  Heading,
} from '@chakra-ui/react'

type Props = {
  form: UseFormReturn<NewOrder>
  onSubmit: (values: NewOrder) => any;
}

export const CreateOrderView = ({ onSubmit, form }: Props) => {
  const router = useRouter()

  const {
    cartProducts
  } = useCartContext()

  const {
    selectedUser
  } = useCreateOrder()

  const { handleSubmit, register, formState } = form
  const { errors, isSubmitting } = formState

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={12}>
      <HStack spacing={6} align="flex-start">
        <UserDetails />
        {selectedUser && <UserAddress />}
      </HStack>      
      
      <Section>
        <HStack spacing={3}>
          <Heading size="md">Descrição do pedido</Heading>
        </HStack>
        <Content>
          <Stack spacing={6}>
            <ProductsSelect />
            <Cart />
          </Stack>
        </Content>
      </Section>


      {cartProducts.length && (
        <Section>
          <HStack spacing={3}>
            <Heading size="md">Entrega e pagamento</Heading>
          </HStack>
          <Content>
            <HStack spacing={6}>                    
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
        </Section>
      )}

      <HStack spacing={6} justify="flex-end">
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
    </Stack>
  )
}
