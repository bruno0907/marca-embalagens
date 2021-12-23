import { useDisclosure } from "@chakra-ui/react"
import { render, screen, fireEvent } from "@testing-library/react"
import preloadAll from 'jest-next-dynamic'

import { AddressesInformation } from "."
import { useAddressesQuery } from "../../hooks/useAddressesQuery"

jest.mock('../../hooks/useAddressesQuery')

const useAddressesQuerySpy = jest.spyOn(require('../../hooks/useAddressesQuery'), 'useAddressesQuery')

describe('AddressesInformation', () => {
  it('should render properly if hasData', async () => {
    await preloadAll()

    useAddressesQuerySpy.mockReturnValueOnce({
      data: []
    })

    render(<AddressesInformation userId="fake-user-id"/>)
    
    const addressesInformation = screen.getByTestId('hasData')
  
    expect(addressesInformation).toBeInTheDocument()
  }) 

  it('should list 2 addresses if hasData and data >= 2', async () => {
    await preloadAll()

    useAddressesQuerySpy.mockReturnValueOnce({
      isLoading: false,
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
          
        },
        {
          id: 'fake-id2',
          user_id: 'fake-user_id2',
          endereco: 'fake-address2',
          bairro: 'fake-prescint2',
          cidade: 'fake-city2',
          estado: 'fake-state2',
          cep: 'fake-zipcode2',
          complemento: 'fake-complement2',
          principal: false,
        },
      ]   
    })
    
    render(<AddressesInformation userId="fake-user-id"/>)    
    
    expect(useAddressesQuery).toBeCalledWith('fake-user-id')

    const addressesMock = screen.getAllByTestId('dataTestAddress')

    expect(addressesMock).toHaveLength(2)
  })  

  it('should display isLoadingComponent if isLoading', async () => {
    await preloadAll()

    useAddressesQuerySpy.mockReturnValueOnce({
      isLoading: true,
      data: null
    })

    render(<AddressesInformation userId="fake-user-id"/>)

    const isLoadingComponent = screen.getByTestId('isLoading')

    expect(isLoadingComponent).toBeInTheDocument()

  })

  it('should display isErrorComponent if isError', async () => {
    await preloadAll()
    
    useAddressesQuerySpy.mockReturnValueOnce({
      isError: true,
      data: null
    })

    render(<AddressesInformation userId="fake-user-id"/>)
    
    const isErrorComponent = screen.getByTestId('isError')

    expect(isErrorComponent).toBeInTheDocument()
  })  
  
})