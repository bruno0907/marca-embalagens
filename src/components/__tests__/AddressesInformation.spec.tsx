import { render, screen, fireEvent } from "@testing-library/react"

import { 
  ChakraProvider,
  PortalManager,    
  useDisclosure 
} from '@chakra-ui/react'

import { AddressesDetails } from "../AddressesDetails"
import { Modal } from '../Modal'
import { CreateAddressForm } from "../AddressesDetails/CreateAddressForm"
import { theme } from '../../styles/theme'

jest.mock('../../hooks/useAddressesQuery')
jest.mock('../../hooks/useStatesQuery')

const useAddressesQuerySpy = jest.spyOn(require('../../hooks/useAddressesQuery'), 'useAddressesQuery')

let wrapper = null

describe('<AddressesDetails/>', () => {  
  beforeEach(() => {
    wrapper = ({ children }): JSX.Element => {
      return (
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
      )
    }
  })
  
  it('should render properly and display 2 addresses if it has data', () => {
    render(<AddressesDetails userId="fake-user-id"/>, { wrapper })
    
    const addresses = screen.getAllByText(/fake-address/)
  
    expect(addresses).toHaveLength(2)
  })
  
  it('should display addresses correctly', () => {

    render(<AddressesDetails userId="fake-user-id"/>, { wrapper })

    const addressMock1 = screen.getAllByText(/fake-address/)[0]
    expect(addressMock1).toHaveTextContent(/fake-address/)

    const addressMock2 = screen.getAllByText(/fake-address/)[1]
    expect(addressMock2).toHaveTextContent(/fake-address2/)
  })  

  it('should display isLoadingComponent if isLoading is true and data is null', () => {
    useAddressesQuerySpy.mockReturnValueOnce({
      isLoading: true,
      data: null
    })

    render(<AddressesDetails userId="fake-user-id"/>, { wrapper })

    const loadingSkeleton = screen.getByText(/Carregando.../)

    expect(loadingSkeleton).toBeInTheDocument()

  })

  it('should display ErrorComponent if isError is true is null', () => {    
    useAddressesQuerySpy.mockReturnValueOnce({
      isError: true,
      data: null
    })

    render(<AddressesDetails userId="fake-user-id"/>, { wrapper })
    
    const errorComponent = screen.getByText(/Ocorreu um erro/)

    expect(errorComponent).toBeInTheDocument()
  })  

  it('should call onOpen on Novo endereço click', () => {    
    render(<AddressesDetails userId="fake-user-id"/>, { wrapper })    
    
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
        <AddressesDetails userId="fake-user-id"/>
        <Modal isOpen={isOpen} onClose={onClose} title="mock-title">
          <CreateAddressForm userId="fake-userId" onClose={onClose}/>
        </Modal>
      </PortalManager>, { wrapper }
    )

    const submitButton = screen.getByRole('button', { name: 'Salvar novo endereço' })

    expect(submitButton).toBeInTheDocument()
  })
  
})
