import { render, screen } from "@testing-library/react"
import { Address } from "../../../hooks/useAddressQuery"
import { AddressesToPrint } from "."

const addressesMock: Address[] = [
  {
    id: 'fake-id',
    user_id: 'fake-userId',
    endereco: 'fake-address',
    bairro: 'fake-prescint',
    cep: 'fake-cep',
    cidade: 'fake-city',
    estado: 'fake-state',
    complemento: 'fake-complement',
    principal: true
  },
  {
    id: 'fake-id2',
    user_id: 'fake-userId',
    endereco: 'fake-address2',
    bairro: 'fake-prescint2',
    cep: 'fake-cep2',
    cidade: 'fake-city2',
    estado: 'fake-state2',
    complemento: 'fake-complement2',
    principal: false
  }
]

describe('<AddressesToPrint/>', () => {
  it('should display addresses properly', () => {
    render(<AddressesToPrint addresses={addressesMock}/>)  

    expect(screen.getByText('fake-address'))
    expect(screen.getByText('fake-address2'))    
  })

  it('should display Endereço principal if address.principal is true', () => {
    render(<AddressesToPrint addresses={addressesMock}/>)

    expect(screen.getByText('Endereço principal')).toBeInTheDocument()    
  })

  it('should display Outro endereço if address.principal is false', () => {
    render(<AddressesToPrint addresses={addressesMock}/>)

    expect(screen.getByText('Outro endereço')).toBeInTheDocument()    
  })
})