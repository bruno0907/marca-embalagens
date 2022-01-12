import React from "react"
import { render, screen, waitFor, act, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { CreateAddressForm } from "../AddressesDetails/CreateAddressForm"

import { ChakraProvider, useDisclosure } from "@chakra-ui/react"
import { theme } from '../../styles/theme'

jest.mock('../../hooks/useStatesQuery')

jest.spyOn(require('axios'), 'get').mockResolvedValueOnce({ 
  data: [
    { id: 1, nome: 'fake-city1'},
    { id: 1, nome: 'fake-city1'},
    { id: 1, nome: 'fake-city1'},
  ]
})

jest.spyOn(React, 'useRef')

jest.mock('react-hook-form')
jest.spyOn(require('react-hook-form'), 'useForm').mockImplementation(() => {  
  const originals = jest.requireActual('react-hook-form')
  return {
    __esModule: true,
    ...originals,
    handleSubmit: jest.fn(),
    clearErrors: jest.fn(), 
    register: jest.fn().mockReturnValue({
      name: { fieldValue: 'mock-value' },
      options: {}
    }),
    formState: {
      errors: []
    },
    setValue: jest.fn(),
  }
})

jest.mock('../../services/getCities')

let wrapper = null

describe('<CreateAddressForm/>', () => {
  beforeEach(() => {
    wrapper = ({ children }): JSX.Element => {
      return (
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
      )
    }
  })

  beforeEach( () => {
    document.getElementById("chakra-toast-portal")?.remove();
  });

  it('should render properly', async () => {
    const { onClose } = useDisclosure()

    await waitFor(() => {
      render(<CreateAddressForm userId="fake-userId" onClose={onClose}/>, { wrapper })      
    })
    
    // const saveAddressBtn = screen.queryByRole('button', { name: /Salvar novo endereço/})

    // expect(saveAddressBtn).toBeInTheDocument()
  })

  // it('should call onClose on Cancelar button press', () => {
  //   const { onClose } = useDisclosure()   

  //   render(<CreateAddressForm userId="fake-userId" onClose={onClose}/>, { wrapper })

  //   const cancelBtn = screen.getByRole('button', { name: /Cancelar/})

  //   userEvent.click(cancelBtn)

  //   expect(onClose).toBeCalled()
  // })

  // it('should not submit form if fields are empty', () => {
  //   const { onClose } = useDisclosure() 
    
  //   const mockHandleSubmit = jest.fn()

  //   const { debug } = render(<CreateAddressForm userId="fake-userId" onClose={onClose}/>, { wrapper })

  //   const submitBtn = screen.getByRole('button', { name: /Salvar novo endereço/})

  //   userEvent.click(submitBtn)

  //   expect(mockHandleSubmit).not.toHaveBeenCalled()

  //   debug()
  // })

  // it('should submit form if fields are fullfiled', () => {

  //   //TO DO
    
  // })
})