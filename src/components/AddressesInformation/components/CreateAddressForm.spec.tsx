import React from 'react'
import preloadAll from 'jest-next-dynamic'

import { useDisclosure } from "@chakra-ui/react"
import { render, screen } from "@testing-library/react"

import { unmountComponentAtNode } from 'react-dom'

import { CreateAddressForm } from "./CreateAddressForm"

jest.mock('../../../hooks/useStatesQuery')
jest.mock('../../../services/getCities')

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

let container = null

describe('CreateAddressForm', () => {
  beforeAll(async () => await preloadAll())
  afterAll(() => jest.clearAllMocks())

  beforeEach(() => {
    container = document.createElement('null')
    document.body.appendChild(container)
  })

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  it('should render properly', () => {
    const { onClose } = useDisclosure()   

    render(<CreateAddressForm userId="fake-userId" onClose={onClose}/>, container)

    const saveAddressBtn = screen.getByRole('button', { name: /Salvar novo endereço/})

    expect(saveAddressBtn).toBeInTheDocument()
  })
})