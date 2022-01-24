import { render, screen } from "@testing-library/react"
import { AddressList } from '.'

import { Address } from "../../../hooks/useAddressQuery"

const mockAddresses: Address[] = [
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

describe('<AddressList/>', () => {
  it('should render properly', () => {
    render(<AddressList addresses={mockAddresses}/>)   
    
    expect(screen.getByText(/endereço principal/i)).toBeInTheDocument()
  })  
})