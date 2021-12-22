import { render, screen, fireEvent } from "@testing-library/react"

import { GoBackButton } from "."

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('GoBackButton', () => {
  it('should render properly', () => {  
    render(<GoBackButton/>)
    
    const goBackButton = screen.getByRole('button')

    expect(goBackButton).toBeInTheDocument()
  })
  
  it('should navigate back on click', () => {
    render(<GoBackButton />)    

    const routerMock = useRouter.mockImplementationOnce(() => {
      return { back: jest.fn() }
    })

    const goBackButton = screen.getByRole('button')    

    fireEvent.click(goBackButton)

    expect(routerMock).toHaveBeenCalled()
  })
})