import { useEffect } from "react"

import { Stack, StackProps } from "@chakra-ui/react"

import { Cart } from "../../../../components"

import { useCartContext } from "../../../../contexts/useCart"

import { OrderProduct } from "../../../../models"

type Props = StackProps & {
  orderItems: OrderProduct[]
  isEditing: boolean;
  isSubmiting: boolean;
}

export const OrderItems = ({ orderItems, isEditing, isSubmiting, ...rest }: Props) => {
  const { setCartProducts } = useCartContext()

  useEffect(() => {
    if(!orderItems) return

    setCartProducts(orderItems)

    return () => setCartProducts([])
  }, [orderItems, setCartProducts])
  
  return (
    <Stack spacing={6} opacity={!isEditing && .5} {...rest}>
      <Cart isEditing={isEditing} isSubmiting={isSubmiting} />      
    </Stack>
  )
}