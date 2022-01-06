import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { Content } from "../Content";
import { theme } from "../../styles/theme";

let wrapper = null

describe('<Content/>', () => {
  beforeEach(() => {
    wrapper = ({ children }): JSX.Element => {
      return (
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
      )
    }
  })

  it('should render properly with its children property', () => {
    render(
      <Content data-testid="content">
        <h1 data-testid="children" />
      </Content>, { wrapper }
    )

    const content = screen.getByTestId('content')
    const children = screen.getByTestId('children')

    expect(content).toBeInTheDocument()
    expect(children).toBeInTheDocument()
  })
})