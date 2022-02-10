import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { CreateAddressModule } from "."

jest.mock('../../../hooks/useStatesQuery')
jest.mock('../../../hooks/useCitiesQuery')

jest.spyOn(React, 'useRef')

describe('<CreateAddressModule/>', () => {
  beforeEach( () => document.getElementById("chakra-toast-portal")?.remove());

  it('should render properly', async () => {
    const onClose = jest.fn()    
    render(<CreateAddressModule userId="fake-userId" onClose={onClose}/>)

    expect(screen.getByLabelText(/endereço/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/bairro/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/estado/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cidade/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cep/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/complemento/i)).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /salvar novo endereço/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
  })

  it('should call onClose on Cancelar button press', () => {
    const onClose = jest.fn()
    render(<CreateAddressModule userId="fake-userId" onClose={onClose}/>)

    userEvent.click(screen.getByRole('button', { name: /cancelar/i}))

    expect(onClose).toBeCalled()
  })
})