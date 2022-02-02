import { useRouter } from 'next/router'
import { UseFormReturn } from 'react-hook-form'

import { Cart } from '../../../../components/Cart'
import { Section } from '../../../../components/Section'
import { Content } from '../../../../components/Content'
import { Input } from '../../../../components/Input'
import { ProductsSelect } from '../../../../components/ProductsSelect'
import { Form } from '../../../../components/Form'
import { SectionHeader } from '../../../../components/SectionHeader'
import { SectionTitle } from '../../../../components/SectionTitle'

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
import { FiTrash2 } from 'react-icons/fi'

type Props = {
  form: UseFormReturn<NewOrder>
  onSubmit: (values: NewOrder) => any;
}

export const CreateOrderView = ({ onSubmit, form }: Props) => {
  const router = useRouter()  

  const { cartProducts, setCartProducts } = useCartContext()
  const { selectedUser } = useCreateOrder()

  const { handleSubmit, register, formState } = form
  const { errors, isSubmitting } = formState

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Section>
        <SectionHeader>
          <SectionTitle title="Dados do cliente"/>
        </SectionHeader>
        <Content>            
          <UserDetails />
        </Content>
      </Section>
      {selectedUser && (
        <Section>
          <SectionHeader>
            <SectionTitle title="Endereço"/>
          </SectionHeader>
          <Content>
            <UserAddress/>
          </Content>
        </Section>
      )}
      
      <Section>
        <HStack spacing={3}>
          <Heading size="md">Descrição do pedido</Heading>
        </HStack>
        <Content>
          <Stack spacing={6}>
            <ProductsSelect />
            <Cart />
            <HStack spacing={6} alignSelf="flex-end">
              <Button 
                variant="link" 
                colorScheme="blue" 
                rightIcon={<FiTrash2/>} 
                onClick={() => setCartProducts([])}
              >Esvaziar lista</Button>
            </HStack>
          </Stack>
        </Content>
      </Section>
      
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
    </Form>
  )
}
