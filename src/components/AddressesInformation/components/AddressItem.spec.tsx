
import React from 'react'
import preloadAll from 'jest-next-dynamic'

import { PortalManager, useDisclosure } from "@chakra-ui/react"
import { render, screen, fireEvent } from "@testing-library/react"

import { AddressProps } from "../../../types"
import { Modal } from "../../Modal"

import { AddressItem } from "./AddressItem"
import { UpdateAddressForm } from "./UpdateAddressForm"
import { unmountComponentAtNode } from 'react-dom'

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

jest.mock('../../../hooks/useStatesQuery')
jest.mock('../../../services/getCities')

let container = null

describe('AddressItem', () => {
  afterAll(() => jest.clearAllMocks())
  beforeAll(async () => await preloadAll())

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  it('should render properly', () => {
    render(<AddressItem address={mockAddress} />, container)

    const addressItem = screen.getByText(/fake-address/)

    expect(addressItem).toBeInTheDocument()
  })

  it('should display mock data', () => {
    render(<AddressItem address={mockAddress} />, container)

    const address = screen.getByText(/fake-address/)

    expect(address).toBeInTheDocument()
  })

  it('should display "Endereço principal" if "principal" is true', () => {
    render(<AddressItem address={mockAddress} />, container)

    const mainAddress = screen.getByText(/Endereço principal/)

    expect(mainAddress).toBeInTheDocument()
  })

  it('should display "Outro endereço" if "principal" is false', () => {
    const mockOtherAddress = {
      ...mockAddress,
      principal: false,
    }

    render(<AddressItem address={mockOtherAddress} />, container)

    const otherAddress = screen.getByText(/Outro endereço/)

    expect(otherAddress).toBeInTheDocument()
  })

  it('should prefetch address on mouse hover', async () => { 
    const mockPrefetchAddress = jest
      .spyOn(require('../../../services/prefetchAddress'), 'prefetchAddress')
      .mockResolvedValueOnce('fake-id')
      
    render(<AddressItem address={mockAddress} />, container)
    
    const editAddressBtn = screen.getByRole('button')
    fireEvent.mouseEnter(editAddressBtn)

    expect(mockPrefetchAddress).toHaveBeenCalledWith('fake-id')    
  })  
  
  it('should call onOpen on Edit button click', () => {
    render(<AddressItem address={mockAddress} />, container)

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
          <UpdateAddressForm address={mockAddress} onClose={onClose}/>
        </Modal>
      </PortalManager>,
      container
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
          <UpdateAddressForm address={mockAddress} onClose={onClose}/>
        </Modal>
      </PortalManager>,
      container
    )

    const fakeAddressData = screen.getByText(/fake-address/)

    expect(fakeAddressData).toBeInTheDocument()
  })
})