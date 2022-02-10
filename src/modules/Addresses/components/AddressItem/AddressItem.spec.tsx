
import { PortalManager, useDisclosure } from "@chakra-ui/react"
import { render, screen, fireEvent } from "@testing-library/react"

import { Modal } from "../../../../components/Modal"

import { AddressItem } from "."
import { UpdateAddressModule } from "../../../UpdateAddress"

import { Address } from "../../../../models"


const mockAddress: Address = {
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

jest.mock('../../../hooks/useStatesQuery')
jest.mock('../../../hooks/useCitiesQuery')

describe('<AddressItem/>', () => {  

  it('should render properly', () => {
    render(<AddressItem address={mockAddress} />)

    const addressItem = screen.getByText(/fake-address/i)

    expect(addressItem).toBeInTheDocument()
  })

  it('should display mock data', () => {
    render(<AddressItem address={mockAddress} />)

    const address = screen.getByText(/fake-address/i)

    expect(address).toBeInTheDocument()
  })

  it('should display "Endereço principal" if "principal" is true', () => {
    render(<AddressItem address={mockAddress} />)

    const mainAddress = screen.getByText(/endereço principal/i)

    expect(mainAddress).toBeInTheDocument()
  })

  it('should display "Outro endereço" if "principal" is false', () => {
    const mockOtherAddress = {
      ...mockAddress,
      principal: false,
    }

    render(<AddressItem address={mockOtherAddress} />)

    const otherAddress = screen.getByText(/outro endereço/i)

    expect(otherAddress).toBeInTheDocument()
  })

  it('should prefetch address on mouse hover', async () => { 
    const mockPrefetchAddress = jest
      .spyOn(require('../../../services/prefetchAddress'), 'prefetchAddress')
      .mockResolvedValueOnce('fake-id')
      
    render(<AddressItem address={mockAddress} />)
    
    const editAddressBtn = screen.getByRole('button')
    fireEvent.mouseEnter(editAddressBtn)

    expect(mockPrefetchAddress).toHaveBeenCalledWith('fake-id')    
  })  
  
  it('should call onOpen on Edit button click', () => {
    render(<AddressItem address={mockAddress} />)

    const { onOpen } = useDisclosure()

    const editAddressBtn = screen.getByRole('button')
    fireEvent.click(editAddressBtn)

    expect(onOpen).toBeCalled()

  })

  it('should show Modal component with UpdateAddressForm component as children', () => {    
    jest.spyOn(require('@chakra-ui/react'), 'useDisclosure').mockReturnValueOnce({
      isOpen: true
    })

    const { isOpen, onClose } = useDisclosure()

    render(
      <PortalManager>
        <AddressItem address={mockAddress}/>
        <Modal isOpen={isOpen} onClose={onClose} title="mock-update-address-modal">
          <UpdateAddressModule address={mockAddress} onClose={onClose}/>
        </Modal>
      </PortalManager>
    )

    const mockModal = screen.getByText(/mock-update-address-modal/)
    
    expect(mockModal).toBeInTheDocument()
  })

  it('should render data from mock on UpdateAddressForm component', () => {
    jest.spyOn(require('@chakra-ui/react'), 'useDisclosure').mockReturnValueOnce({
      isOpen: true
    })

    const { isOpen, onClose } = useDisclosure()
    
    render(
      <PortalManager>
        <AddressItem address={mockAddress}/>
        <Modal isOpen={isOpen} onClose={onClose} title="mock-update-address-modal">
          <UpdateAddressModule address={mockAddress} onClose={onClose}/>
        </Modal>
      </PortalManager>
    )

    const fakeAddressData = screen.getByText(/fake-address/)

    expect(fakeAddressData).toBeInTheDocument()
  })
})