import { ChakraProvider } from "@chakra-ui/react"
import { render, screen, fireEvent } from "@testing-library/react"

import { GoBackButton } from "../Header/GoBackButton"
import { theme } from "../../styles/theme"

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

let wrapper = null

describe('GoBackButton', () => {
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
    render(<GoBackButton/>, { wrapper })
    
    const goBackButton = screen.getByRole('button')

    expect(goBackButton).toBeInTheDocument()
  })
  
  it('should navigate back on click', () => {
    render(<GoBackButton />, { wrapper })    

    const routerMock = useRouter.mockImplementationOnce(() => {
      return { back: jest.fn() }
    })

    const goBackButton = screen.getByRole('button')    

    fireEvent.click(goBackButton)

    expect(routerMock).toHaveBeenCalled()
  })
})