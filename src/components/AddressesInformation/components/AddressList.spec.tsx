import preloadAll from 'jest-next-dynamic'

import { render, screen, fireEvent } from "@testing-library/react"
import { AddressProps } from '../../../types'
import { AddressList } from './AddressList'
import { unmountComponentAtNode } from 'react-dom'


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

let container = null

describe('AddressList', () => {
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
    render(<AddressList addresses={mockAddresses}/>, container)

    const address = screen.getByText('Endereço principal')
    expect(address).toBeInTheDocument()
  })  
})