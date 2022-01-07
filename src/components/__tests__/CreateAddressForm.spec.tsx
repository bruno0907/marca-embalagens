import { ChakraProvider, useDisclosure } from "@chakra-ui/react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { CreateAddressForm } from "../AddressesInformation/components/CreateAddressForm"
import { theme } from '../../styles/theme'
import React from "react"

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

    // jest.spyOn(React, 'useEffect').mockImplementationOnce(() => {      
    //     return f => f()()
    // })

    // jest.spyOn(require('../../services/getCities'), 'getCities')

    // const setStateMock = jest.fn()    
    // const useStateMock: any = (useState: any) => [useState, setStateMock]
    // jest.spyOn(React, 'useState').mockImplementationOnce(useStateMock)

    // let test = jest.fn()

    // const { onClose } = useDisclosure()    

    // const { debug } = render(<CreateAddressForm userId="fake-userId" onClose={onClose}/>, { wrapper })

    // // const submitBtn = screen.getByRole('button', { name: /Salvar novo endereço/i})

    // const address = screen.getByLabelText(/Endereço/i)
    // const state = screen.getByLabelText(/Estado/i)
    // const city = screen.getByLabelText(/Cidade/i)

    // userEvent.type(address, 'new-fake-address')
    // await waitFor(() => userEvent.selectOptions(state, 'Fake State'))
    // // await waitFor(() => userEvent.selectOptions(city, 'Fake city2'))

    // expect(address).toHaveValue('new-fake-address')
    // await waitFor(() => expect(state).toHaveValue('FS'))

    // expect(test).toBeCalled()
    // // expect(city).toHaveValue('Fake city2')

    // // userEvent.click(submitBtn)

    // debug()
  })
})