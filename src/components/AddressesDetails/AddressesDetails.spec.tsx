import { render, screen, fireEvent } from "@testing-library/react"

import { 
  ChakraProvider,
  PortalManager,    
  useDisclosure 
} from '@chakra-ui/react'

import { AddressesDetails } from "."
import { Modal } from '../Modal'
import { CreateAddressForm } from "./CreateAddressForm"
import { theme } from '../../styles/theme'

jest.mock('../../hooks/useAddressesQuery')
jest.mock('../../hooks/useStatesQuery')
jest.mock('../../hooks/useCitiesQuery')

const useAddressesQuerySpy = jest.spyOn(require('../../hooks/useAddressesQuery'), 'useAddressesQuery')

describe('<AddressesDetails/>', () => {  
  it('should render properly and display 2 addresses if it has data', () => {
    render(<AddressesDetails userId="userId"/>)
    
    const addresses = screen.getAllByText(/fake-address/i)

    expect(addresses).toHaveLength(2)
  })
  
  it('should display addresses correctly', () => {

    render(<AddressesDetails userId="userId"/>)

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

    render(<AddressesDetails userId="userId"/>)

    const loadingSkeleton = screen.getByText(/carregando.../i)

    expect(loadingSkeleton).toBeInTheDocument()

  })

  it('should display ErrorComponent if isError is true is null', () => {    
    useAddressesQuerySpy.mockReturnValueOnce({
      isError: true,
      data: null
    })

    render(<AddressesDetails userId="userId"/>)
    
    const errorComponent = screen.getByText(/ocorreu um erro/i)

    expect(errorComponent).toBeInTheDocument()
  })  

  it('should call onOpen on Novo endereço click', () => {    
    render(<AddressesDetails userId="userId"/>)    
    
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
        <AddressesDetails userId="userId"/>
        <Modal isOpen={isOpen} onClose={onClose} title="mock-title">
          <CreateAddressForm userId="fake-userId" onClose={onClose}/>
        </Modal>
      </PortalManager>
    )

    const submitButton = screen.getByRole('button', { name: /salvar novo endereço/i })

    expect(submitButton).toBeInTheDocument()
  })
  
})
