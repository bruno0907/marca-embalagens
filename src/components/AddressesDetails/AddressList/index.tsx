import dynamic from "next/dynamic"
import { AddressItemProps } from "../AddressItem"
import { Stack, StackProps } from "@chakra-ui/react"

const AddressItem = dynamic<AddressItemProps>(
  async () => {
    const { AddressItem } = await import('../AddressItem')
    
    return AddressItem
  }
)
  
import { Address } from "../../../hooks/useAddressQuery"

type Props = StackProps & {
  addresses: Address[]  
}

const AddressList = ({ addresses, ...rest }: Props) => {
  return (
    <Stack as="ul" spacing={3} {...rest}>
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
