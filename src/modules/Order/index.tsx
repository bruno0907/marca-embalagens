import { useEffect, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useReactToPrint } from 'react-to-print'

import { 
  Box,   
  HStack,   
  useToast, 
  Switch, 
  FormControl, 
  FormLabel,   
  useBoolean, 
  Stack, 
  Spacer,
  ButtonGroup
} from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'

import { 
  Divider,
  Form,
  Header,
  Content,
  Section,  
  SectionTitle,
  Input,
  ErrorView,
  LoadingView,
  ButtonPrimary,
  ButtonSecondary 
} from '../../components'

import { 
  OrderItems, 
  UserAddress,
  UserDetails,   
} from './components'

import { useUpdateOrderMutation, useOrderQuery } from '../../hooks'

import { handleFormatDate, handleFormatPadStart } from '../../utils'

import { useCreateOrder } from '../../contexts/useCreateOrder'
import { useCartContext } from '../../contexts/useCart'

import { PrintOrderModule } from '..'

import { Order } from '../../models'
import { format } from 'date-fns'

const orderSchema = yup.object().shape({
  condicao_pagamento: yup.string().trim(),     
  data_entrega: yup.string()
  .required('A data da entrega é obrigatória')
  .trim(),
})

type Props = { orderId: string }

export const OrderModule = ({ orderId }: Props) => {
  const { data: order, isLoading, isError } = useOrderQuery(orderId)
  
  const router = useRouter()  
  const toast = useToast()

  const [isEditing, setIsEditing] = useBoolean()  

  const printRef = useRef<HTMLDivElement>(null)

  const handlePrintOrder = useReactToPrint({
    content: () => printRef.current,
  })  

  const { 
    cartProducts,    
    cartTotal,
    canSubmit 
  } = useCartContext()
  
  const {     
    selectedUser,    
    selectedAddress,    
  } = useCreateOrder()

  const { handleSubmit, register, formState, reset } = useForm<Order>({
    resolver: yupResolver(orderSchema)
  })

  const { isSubmitting, errors } = formState

  const updateOrderMutation = useUpdateOrderMutation()  

  const handleSubmitOrderUpdate: SubmitHandler<Order> = async values => {
    const {       
      data_entrega, 
      condicao_pagamento,      
    } = values

    const newOrder: Order = {
      ...order,
      cliente: selectedUser.id,
      endereco_entrega: selectedAddress.id,
      pedido: [...cartProducts],
      total: cartTotal,
      condicao_pagamento,
      data_entrega,
    }
    
    await updateOrderMutation.mutateAsync(newOrder)
    .then(response => {
      toast({        
        title: 'Sucesso!',
        description: 'O pedido foi atualizado com sucesso!',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'bottom',
      })
      setIsEditing.off()      
      return response
    })
    .catch(error => {
      toast({        
        title: 'Um erro ocorreu!',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
    })
  }  
  
  useEffect(() => {
    if(!order) return

    reset({
      condicao_pagamento: order.condicao_pagamento,
      data_entrega: new Date(new Date(order.data_entrega)).toISOString().split('T')[0]
    })

  }, [order, reset])

  if(isLoading) { 
    return (
      <>  
        <Header withGoBack title="Pedido:"/>
        <Divider/>
        <LoadingView />
      </>
    )
  }

  if(isError) {
    return (
      <>
        <Header withGoBack title="Pedido:"/>
        <Divider/>
        <ErrorView />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Pedido: {handleFormatPadStart(order.numero_pedido)}</title>
      </Head>
      <Header withGoBack title={`Pedido: ${handleFormatPadStart(order.numero_pedido)}`}>
        <HStack spacing={3}>          
          <ButtonPrimary rightIcon={<FiPrinter/>} onClick={handlePrintOrder}>
            Imprimir
          </ButtonPrimary>
        </HStack>
      </Header>
      <Divider/>

      <Form onSubmit={handleSubmit(handleSubmitOrderUpdate)}>
        <Section>          
          <SectionTitle title="Dados do cliente">
            <FormControl display="flex" align="center" w="fit-content">
              <FormLabel htmlFor="edit-order" mb="0" fontSize={['sm', 'initial', 'initial']}>Editar pedido</FormLabel>
              <Switch id="edit-order" isChecked={isEditing} onChange={setIsEditing.toggle}/>
            </FormControl>
          </SectionTitle>
          <Content>            
            <UserDetails userId={order.cliente} isEditing={isEditing}/>
          </Content>

          {selectedUser && (
            <>
              <SectionTitle title="Endereço de entrega"/>            
              <Content>
                <UserAddress addressId={order.endereco_entrega} isEditing={isEditing}/>
              </Content>
            </>          
          )}
          <SectionTitle title="Descrição do pedido"/>          
          <Content>
            <OrderItems 
              orderItems={order.pedido} 
              isEditing={isEditing} 
              isSubmiting={isSubmitting}
            />
          </Content>
        
          <SectionTitle title="Entrega e pagamento"/>          
          <Content>
            <Stack direction={['column', 'column', 'row']} spacing={6}>                    
              <Box w={['initial', 'initial', "380px"]}>
                <Input 
                  type="date"
                  name="data_entrega"
                  label="Data de entrega:"
                  isDisabled={!isEditing || isSubmitting}
                  error={errors.data_entrega}
                  {...register('data_entrega')}
                />
              </Box>
              <Input 
              name="condicao_pagamento"
              label="Condição de pagamento:"
              isDisabled={!isEditing || isSubmitting}
              {...register('condicao_pagamento')}
            />
            </Stack>          
          </Content>
          {isEditing && (            
            <ButtonGroup alignSelf="flex-end">
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
            </ButtonGroup>
          )}
        </Section>
      </Form>      
      <PrintOrderModule ref={printRef} order={order} />
    </>
  )
}