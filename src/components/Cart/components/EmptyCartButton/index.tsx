import { ButtonProps } from "@chakra-ui/react"
import { FiTrash2 } from "react-icons/fi"

import { ButtonLink } from "../../../ButtonLink"

type Props = ButtonProps & {
  handleEmptyCart: () => void;
}

export const EmptyCartButton = ({ handleEmptyCart, ...rest }: Props) => {
  return (
    <ButtonLink
      alignSelf="flex-end"
      rightIcon={<FiTrash2/>}
      onClick={handleEmptyCart} 
      {...rest}
    >Limpar lista</ButtonLink> 
  )
}