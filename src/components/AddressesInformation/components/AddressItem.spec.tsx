
import { PortalManager, useDisclosure } from "@chakra-ui/react"
import { render, screen } from "@testing-library/react"

import { AddressProps } from "../../../types"
import { Modal } from "../../Modal"

import { AddressItem } from "./AddressItem"
import { UpdateAddressForm } from "./UpdateAddressForm"

const mockAddress: AddressProps = {
  id: 'fake-id',
  user_id: 'fake-userId',
  endereco: 'fake-address',
  bairro: 'fake-prescint',
  cidade: 'fake-city',
  estado: 'fake-state',
  cep: 'fake-zipcode',
  complemento: 'fake-aditional',
  principal: true,
}

// jest.mock('../../Modal')

// const Wrapper = ({ children }) => {
//   const { isOpen, onClose } = useDisclosure()
//   return (
//     <PortalManager>
//       <Modal isOpen={isOpen} onClose={onClose} title="mock-update-address-modal">
//         <UpdateAddressForm address={mockAddress} onClose={onClose}/>
//       </Modal>
//       {children}
//     </PortalManager>
//   )
// }

describe('AddressItem', () => {
  it('should render properly', () => {
    render(<AddressItem address={mockAddress} />)

    const addressItem = screen.getByText(/fake-address/)

    expect(addressItem).toBeInTheDocument
  })
})