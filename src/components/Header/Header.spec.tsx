import { render, screen } from '@testing-library/react'

import { Header } from '.'

describe('Header', () => {
  test('It should render correctly', () => {
    const { container } = render(<Header />)

    expect(container.querySelector('#header')).toBeInTheDocument()
  })
  
  test('It should render with "withGoBack" button correctly', () => {
    render(<Header withGoBack/>)

    const withGoBackButton = screen.getByRole('button')

    expect(withGoBackButton).toBeInTheDocument()
  })
  
  test('It should render title and "Title Mock" if it has title props', () => {
    const titleMock = 'Title Mock'

    render(<Header title={titleMock}/>)

    const title = screen.getByRole('heading', { level: 2 }) 

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(titleMock)
  })

  test('It should render children element if it has children value', () => {
    render(
      <Header>
        <button data-testid="childrenMock">Mocked Button</button>
      </Header>
    )

    const children = screen.getByTestId('childrenMock')   

    expect(children).toBeInTheDocument()
  })  

  test('It should render fully with "withGoBack", "title" and "children" props', () => {
    const titleMock = 'Title Mock'

    render(
      <Header withGoBack title={titleMock}>
        <div data-testid="childrenMock">Mocked Button</div>
      </Header>
    )

    const withGoBackButton = screen.getByRole('button')
    expect(withGoBackButton).toBeInTheDocument()

    const title = screen.getByRole('heading', { level: 2 }) 
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(titleMock)
    
    const children = screen.getByTestId('childrenMock')
    expect(children).toBeInTheDocument()
  })   
})
