import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { CreateAddressForm } from "../AddressesInformation/CreateAddressForm"

import { ChakraProvider, useDisclosure } from "@chakra-ui/react"
import { theme } from '../../styles/theme'
import { getCities } from "../../services/getCities"

jest.mock('../../hooks/useStatesQuery')

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

jest.mock('../../services/getCities', () => ({
  data: [
    { id: 1, nome: 'Fake city1'},
    { id: 2, nome: 'Fake city2'},
  ]
}))

jest.spyOn(require('../../services/getCities'), 'getCities')

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

  it.only('should submit form if fields are fullfiled', async () => {
    const onClose = jest.fn()   

    render(<CreateAddressForm userId="fake-userId" onClose={onClose}/>, { wrapper })
    
    const submitBtn = screen.getByRole('button', { name: /Salvar novo endereço/i})
    
    const address = screen.getByLabelText(/Endereço/i)
    const state = screen.getByLabelText(/Estado/i)    
    
    userEvent.type(address, 'new-fake-address')
    userEvent.selectOptions(state, 'Fake State')    

    expect(address).toHaveValue('new-fake-address')
    expect(state).toHaveValue('FS')

    userEvent.click(submitBtn)

    //UNDER DEVELOPMENT
    
  })
})