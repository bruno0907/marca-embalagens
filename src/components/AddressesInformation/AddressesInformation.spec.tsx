import preloadAll from 'jest-next-dynamic'
import { render, screen, fireEvent } from "@testing-library/react"
import { 
  PortalManager, 
  useDisclosure 
} from '@chakra-ui/react'
import { AddressesInformation } from "."
import { Modal } from '../Modal'
import { CreateAddressForm } from "./components/CreateAddressForm"

jest.mock('../../hooks/useAddressesQuery')
jest.mock('../../hooks/useStatesQuery')
jest.mock('@chakra-ui/react')

const useAddressesQuerySpy = jest.spyOn(require('../../hooks/useAddressesQuery'), 'useAddressesQuery')

describe('AddressesInformation', () => {
  beforeAll(async () => await preloadAll())
  afterAll(() => jest.clearAllMocks())    
  
  it('should render properly and display 2 addresses if it has data', () => {
    render(<AddressesInformation userId="fake-user-id"/>)
    
    const addresses = screen.getAllByText(/fake-address/)
  
    expect(addresses).toHaveLength(2)
  })
  
  it('should display addresses correctly', () => {

    render(<AddressesInformation userId="fake-user-id"/>)

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

    render(<AddressesInformation userId="fake-user-id"/>)

    const loadingSkeleton = screen.getByText(/Carregando.../)

    expect(loadingSkeleton).toBeInTheDocument()

  })

  it('should display ErrorComponent if isError is true is null', () => {    
    useAddressesQuerySpy.mockReturnValueOnce({
      isError: true,
      data: null
    })

    render(<AddressesInformation userId="fake-user-id"/>)
    
    const errorComponent = screen.getByText(/Ocorreu um erro/)

    expect(errorComponent).toBeInTheDocument()
  })  

  it('should call onOpen on Novo endereço click', () => {    
    render(<AddressesInformation userId="fake-user-id"/>)    
    
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
        <AddressesInformation userId="fake-user-id"/>
        <Modal isOpen={isOpen} onClose={onClose} title="mock-title">
          <CreateAddressForm userId="fake-userId" onClose={onClose}/>
        </Modal>
      </PortalManager>
    )

    const submitButton = screen.getByRole('button', { name: 'Salvar novo endereço' })

    expect(submitButton).toBeInTheDocument()
  })
  
})
