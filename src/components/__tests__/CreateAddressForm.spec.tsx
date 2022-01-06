import React from 'react'

import { ChakraProvider, useDisclosure } from "@chakra-ui/react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { CreateAddressForm } from "../AddressesInformation/components/CreateAddressForm"
import { theme } from '../../styles/theme'



jest.mock('../../hooks/useStatesQuery')
jest.mock('../../services/getCities')

jest.mock('react-hook-form')

jest.spyOn(React, 'useRef')

jest.spyOn(require('react-hook-form'), 'useForm').mockImplementation(() => {  
  const originals = jest.requireActual('react-hook-form')
  return {
    __esModule: true,
    ...originals,
    handleSubmit: jest.fn(), 
    register: jest.fn().mockReturnValue({
      name: { fieldValue: 'mock-value' },
      options: {}
    }),
    formState: {
      errors: []
    }
  }
})

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

  it('should render properly', () => {
    const { onClose } = useDisclosure()   

    render(<CreateAddressForm userId="fake-userId" onClose={onClose}/>, { wrapper })

    const saveAddressBtn = screen.getByRole('button', { name: /Salvar novo endereço/})

    expect(saveAddressBtn).toBeInTheDocument()
  })

  it('should call onClose on Cancelar button press', () => {
    const { onClose } = useDisclosure()   

    render(<CreateAddressForm userId="fake-userId" onClose={onClose}/>, { wrapper })

    const cancelBtn = screen.getByRole('button', { name: /Cancelar/})

    userEvent.click(cancelBtn)

    expect(onClose).toBeCalled()
  })

  it('should not submit form if fields are empty', () => {
    const { onClose } = useDisclosure() 
    
    const mockHandleSubmit = jest.fn()

    render(<CreateAddressForm userId="fake-userId" onClose={onClose}/>, { wrapper })

    const submitBtn = screen.getByRole('button', { name: /Salvar novo endereço/})

    userEvent.click(submitBtn)

    expect(mockHandleSubmit).not.toHaveBeenCalled()
  })
})