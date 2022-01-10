import { render, screen } from "@testing-library/react"
import { AddressProps } from '../../types'
import { AddressList } from '../AddressesInformation/AddressList'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../../styles/theme'

const mockAddresses: AddressProps[] = [
  {
    id: 'fake-id',
    user_id: 'fake-userId',
    endereco: 'fake-address',
    bairro: 'fake-prescint',
    cidade: 'fake-city',
    estado: 'fake-state',
    cep: 'fake-zipcode',
    complemento: 'fake-complement',
    principal: true,
    
  },
  {
    id: 'fake-id2',
    user_id: 'fake-userId',
    endereco: 'fake-address2',
    bairro: 'fake-prescint2',
    cidade: 'fake-city2',
    estado: 'fake-state2',
    cep: 'fake-zipcode2',
    complemento: 'fake-complement2',
    principal: false,
  },
] 

let wrapper = null

describe('<AddressList/>', () => {
  beforeEach(() => {
    wrapper = ({ children }): JSX.Element => {
      return (
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
      )
    }
  })

  it('should render properly', () => {
    render(<AddressList addresses={mockAddresses}/>, { wrapper })

    const address = screen.getByText('Endereço principal')
    expect(address).toBeInTheDocument()
  })  
})