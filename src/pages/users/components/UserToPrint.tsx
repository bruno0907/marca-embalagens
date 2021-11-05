import { forwardRef } from "react"

import { 
  Box,
  Text 
} from "@chakra-ui/react"

import { AddressProps, UserProps } from "../../../types"

type UserToPrintRefProps = {
  user: UserProps;
  addresses: AddressProps[];  
}

const UserToPrintRef = ({ user, addresses }: UserToPrintRefProps, ref) => {
  return (
    <Box display="none">
      <Box ref={ref}>
        <Text>{user.nome}</Text>
        {addresses.map(address => {
          return (
            <Text key={address.id}>{address.endereco}</Text>
          )
        })}
      </Box>
    </Box>
  )
}

const UserToPrint = forwardRef(UserToPrintRef)

export {
  UserToPrint
}