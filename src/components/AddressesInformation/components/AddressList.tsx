import dynamic from "next/dynamic"
import { Content } from "../../Content"
import { AddressItemProps } from "./AddressItem"
import { Flex, Heading, Spacer, Button, Box, Stack } from "@chakra-ui/react"
import { FiEdit } from "react-icons/fi"
import { AddressProps } from "../../../types"

const AddressItem = dynamic<AddressItemProps>(
  async () => {
    const { AddressItem } = await import('./AddressItem')

    return AddressItem
  }
)

type Props = {
  addresses: AddressProps[]
  handleNewAddress: () => void
}

const AddressList = ({ addresses, handleNewAddress }: Props) => {
  return (
    <Content w="100%">
      <Flex align='center' mb="8">
        <Heading fontSize="2xl">Endereços</Heading>
        <Spacer />
        <Button colorScheme="blue" leftIcon={<FiEdit />} onClick={handleNewAddress}>
          Novo endereço
        </Button>
      </Flex>
      <Box mb="8">
        <Stack as="ul" spacing={3}>
          { addresses?.map(address => (
              <AddressItem key={address.id} address={address}/>
            ))
          }
        </Stack>
      </Box>
    </Content>
  )
}

export {
  AddressList
}