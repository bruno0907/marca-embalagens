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

    const addressesInformation = screen.getByTestId('hasAddresses')

    expect(addressesInformation).toBeInTheDocument()
  })

  it('should display isLoadingComponent if isLoading', async () => {
    await preloadAll()

    jest.spyOn(require('../../hooks/useAddressesQuery'), 'useAddressesQuery').mockReturnValueOnce({
      isLoading: true
    })

    render(<AddressesInformation userId="fake-user-id"/>)

    const isLoadingComponent = screen.getByTestId('isLoading')

    expect(isLoadingComponent).toBeInTheDocument()
  })

  it('should display isErrorComponent if isError', async () => {
    await preloadAll()

    jest.spyOn(require('../../hooks/useAddressesQuery'), 'useAddressesQuery').mockReturnValueOnce({
      isError: true
    })

    render(<AddressesInformation userId="fake-user-id"/>)

    const isErrorComponent = screen.getByTestId('isError')

    expect(isErrorComponent).toBeInTheDocument()    
  })
})