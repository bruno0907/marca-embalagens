import { render, screen, fireEvent } from "@testing-library/react"
import { SideMenu } from "."

jest.mock('../../hooks/useSignOutMutation', () => {
  return {
    useSignOutMutation() {
      return {
        mutate: jest.fn()
      }
    }
  }
})

const useSignOutMutation = jest.spyOn(require('../../hooks/useSignOutMutation'), 'useSignOutMutation')

describe('SideMenu', () => {
  it('should render correcly', () => {
    const { container } = render(<SideMenu />)

    expect(container).toBeInTheDocument()
  })

  it('should signOut if Sair button is pressed', () => {
    render(<SideMenu/>)

    const signOutButton = screen.getByRole('button', { name: 'Sair' })

    const handleSignOutMock = useSignOutMutation.mockImplementationOnce(() => {
      return {
        mutate: jest.fn()
      }
    })

    fireEvent.click(signOutButton)

    expect(handleSignOutMock).toHaveBeenCalled()
  })
})