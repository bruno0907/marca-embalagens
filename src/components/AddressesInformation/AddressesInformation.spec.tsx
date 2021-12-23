import { render, screen } from "@testing-library/react"
import preloadAll from 'jest-next-dynamic'

import { AddressesInformation } from "."
import { useAddressesQuery } from "../../hooks/useAddressesQuery"

jest.mock('./components/CreateAddressForm')

jest.mock('../../hooks/useAddressesQuery', () => {
  return {
    useAddressesQuery() {
      return {
        addresses: {
          isLoading: false,
          isFetching: false,
          isError: false,
          data: [
            {
              id: 'fake-id',
              user_id: 'fake-user_id',
              endereco: 'fake-address',
              bairro: 'fake-prescint',
              cidade: 'fake-city',
              estado: 'fake-state',
              cep: 'fake-zipcode',
              complemento: 'fake-complement',
              principal: true,
              
            }
          ]
        }
      }
    }
  }
})

describe('AddressesInformation', () => {
  it('should render properly', async () => {
    await preloadAll()

    render(<AddressesInformation userId="fake-user-id"/>)

    const addressesInformation = screen.getByText('Endereços')

    expect(addressesInformation).toBeInTheDocument()
  })

  it('should display loading skeleton if isLoading', async () => {
    await preloadAll()

    jest.spyOn(require('../../hooks/useAddressesQuery'), 'useAddressesQuery').mockReturnValueOnce({
      isLoading: true
    })

    render(<AddressesInformation userId="fake-user-id"/>)

    const isLoadingSekeleton = screen.getByTestId('isLoading')

    expect(isLoadingSekeleton).toBeInTheDocument()
  })
})