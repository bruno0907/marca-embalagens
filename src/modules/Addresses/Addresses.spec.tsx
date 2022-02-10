import { render, screen, fireEvent } from "@testing-library/react"

import { Modal } from '../../components/Modal'
import { CreateAddressModule } from "../CreateAddress"

import { AddressesModule } from "."

import { PortalManager, useDisclosure } from '@chakra-ui/react'

jest.mock('../../hooks/useAddressesQuery')
jest.mock('../../hooks/useStatesQuery')
jest.mock('../../hooks/useCitiesQuery')

const useAddressesQuerySpy = jest.spyOn(require('../../hooks/useAddressesQuery'), 'useAddressesQuery')

describe('<AddressesModule/>', () => {  
  it('should render properly and display 2 addresses if it has data', () => {
    render(<AddressesModule userId="userId"/>)
    
    const addresses = screen.getAllByText(/fake-address/i)

    expect(addresses).toHaveLength(2)
  })
  
  it('should display addresses correctly', () => {

    render(<AddressesModule userId="userId"/>)

    const addressMock1 = screen.getAllByText(/fake-address/i)[0]
    expect(addressMock1).toHaveTextContent(/fake-address/i)

    const addressMock2 = screen.getAllByText(/fake-address/i)[1]
    expect(addressMock2).toHaveTextContent(/fake-address2/i)
  })  

  it('should display isLoadingComponent if isLoading is true and data is null', () => {
    useAddressesQuerySpy.mockReturnValueOnce({
      isLoading: true,
      data: null
    })

    render(<AddressesModule userId="userId"/>)

    const loadingSkeleton = screen.getByText(/carregando.../i)

    expect(loadingSkeleton).toBeInTheDocument()

  })

  it('should display ErrorComponent if isError is true is null', () => {    
    useAddressesQuerySpy.mockReturnValueOnce({
      isError: true,
      data: null
    })

    render(<AddressesModule userId="userId"/>)
    
    const errorComponent = screen.getByText(/ocorreu um erro/i)

    expect(errorComponent).toBeInTheDocument()
  })  

  it('should call onOpen on Novo endereço click', () => {    
    render(<AddressesModule userId="userId"/>)    
    
    const { onOpen } = useDisclosure()

    const newAddressButton = screen.getByRole('button', { name: 'Novo endereço'})

    expect(newAddressButton).toBeInTheDocument()

    fireEvent.click(newAddressButton)  
    
    expect(onOpen).toHaveBeenCalled()
  })

  it('should render Modal with CreateAddressForm if isOpen is true', () => {
    jest.spyOn(require('@chakra-ui/react'), 'useDisclosure')
    .mockReturnValueOnce({ isOpen: true })
    
    const { isOpen, onClose } = useDisclosure()

    jest.mock('../Modal')

    render(
      <PortalManager>
        <AddressesModule userId="userId"/>
        <Modal isOpen={isOpen} onClose={onClose} title="mock-title">
          <CreateAddressModule userId="fake-userId" onClose={onClose}/>
        </Modal>
      </PortalManager>
    )

    const submitButton = screen.getByRole('button', { name: /salvar novo endereço/i })

    expect(submitButton).toBeInTheDocument()
  })
  
})
