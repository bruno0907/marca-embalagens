import { ChakraProvider } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react'

import { Header } from '../Header'
import { theme } from '../../styles/theme'

let wrapper = null

describe('<Header />', () => {
  beforeEach(() => {
    wrapper = ({ children }): JSX.Element => {
      return (
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
      )
    }
  })
  
  it('should render correctly', () => {
    render(<Header/>, { wrapper })

    const header = document.getElementById('header')

    expect(header).toBeInTheDocument()    
  })
  
  it('It should render with "withGoBack" button correctly', () => {
    render(<Header withGoBack/>, { wrapper })

    const withGoBackButton = screen.getByRole('button')

    expect(withGoBackButton).toBeInTheDocument()
  })
  
  it('It should render title and "Title Mock" if it has title props', () => {
    render(<Header title="Title Mock"/>, { wrapper })

    const title = screen.getByRole('heading', { level: 2 }) 

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Title Mock')
  })

  it('should render children element if it has children', () => {
    render(
      <Header>
        <div data-testid="childrenMock"/>
      </Header>
    )

    const children = screen.getByTestId('childrenMock')   

    expect(children).toBeInTheDocument()
  })  

  it('should render fully with "withGoBack", "title" and "children" props', () => {
    render(
      <Header withGoBack title="Title Mock">
        <div data-testid="childrenMock"/>
      </Header>, { wrapper }
    )

    const withGoBackButton = screen.getByRole('button')
    expect(withGoBackButton).toBeInTheDocument()

    const title = screen.getByRole('heading', { level: 2 }) 
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent("Title Mock")
    
    const childrenBtn = screen.getByTestId('childrenMock')
    expect(childrenBtn).toBeInTheDocument()
  })
  
  it('should re-render HeaderComponent if a change to title has occuried', () => {
    const { rerender } = render(<Header title="Mocked title"/>, { wrapper })    

    rerender(<Header title="Another mocked title"/>)

    const reRenderedComponent = screen.getByRole('heading', { level: 2 })

    expect(reRenderedComponent).toHaveTextContent('Another mocked title')
  })
})
