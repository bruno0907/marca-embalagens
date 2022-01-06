import { render, screen } from "@testing-library/react"
import { AddressesToPrint } from "../AddressesToPrint"
import { AddressProps } from "../../types"

const addressMock: AddressProps = {
  id: 'fake-id',
  user_id: 'fake-userId',
  endereco: 'fake-address',
  bairro: 'fake-prescint',
  cep: 'fake-cep',
  cidade: 'fake-city',
  estado: 'fake-state',
  complemento: 'fake-complement',
  principal: true
}

describe('<AddressesToPrint/>', () => {
  it('should render properly', () => {
    const addressesMock: AddressProps[] = [      
      {
        ...addressMock
      }
    ]

    render(<AddressesToPrint addresses={addressesMock}/>)

    const addressToPrintMock = screen.getByText('Endereço:')

    expect(addressToPrintMock.nextSibling).toHaveTextContent('fake-address')
  })

  it('should display Endereço principal if address.principal === true', () => {
    const addressesMock: AddressProps[] = [      
      {
        ...addressMock,
      }
    ]
    
    render(<AddressesToPrint addresses={addressesMock}/>)

    const addressToPrintMock = screen.getByText('Endereço principal')

    expect(addressToPrintMock).toBeInTheDocument()
    
  })

  it('should display Outro endereço if address.principal === false', () => {
    const addressesMock: AddressProps[] = [      
      {
        ...addressMock,
        principal: false
      }
    ]
    
    render(<AddressesToPrint addresses={addressesMock}/>)

    const addressToPrintMock = screen.getByText('Outro endereço')

    expect(addressToPrintMock).toBeInTheDocument()
    
  })
})