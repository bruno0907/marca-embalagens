import dynamic from "next/dynamic"
import { AddressItemProps } from "./AddressItem"
import { Stack } from "@chakra-ui/react"

import { AddressProps } from "../../types"

const AddressItem = dynamic<AddressItemProps>(
  async () => {
    const { AddressItem } = await import('./AddressItem')

    return AddressItem
  }
)

type Props = {
  addresses: AddressProps[]  
}

const AddressList = ({ addresses }: Props) => {
  return (
    <Stack as="ul" spacing={3}>
      { addresses?.map(address => (
          <AddressItem key={address.id} address={address}/>
        ))
      }
    </Stack>    
  )
}

export {
  AddressList
}
