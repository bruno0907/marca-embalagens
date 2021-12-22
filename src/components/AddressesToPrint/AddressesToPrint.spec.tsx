import { render, screen } from "@testing-library/react"
import { AddressesToPrint } from "."
import { AddressProps } from "../../types"

jest.mock('@chakra-ui/react', () => {
  const modules = jest.requireActual('@chakra-ui/react')

  return {
    __esModule: true,
    ...modules
  }
})

const addressesMock: AddressProps[] = [
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
  }
]

describe('AddressesToPrint', () => {
  it('should render properly', () => {
    render(<AddressesToPrint addresses={addressesMock}/>)

    const addressesToPrintMock = screen.getByText('Endereço:')

    expect(addressesToPrintMock.nextSibling).toHaveTextContent('fake-address')
  })  
})