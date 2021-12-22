import { render, screen } from '@testing-library/react'
import { memo } from 'react'

import { Header } from '.'

describe('Header', () => {
  it('should render correctly', () => {
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

  it('should render children element if it has children value', () => {
    render(
      <Header>
        <button data-testid="childrenMock">Mocked Button</button>
      </Header>
    )

    const children = screen.getByTestId('childrenMock')   

    expect(children).toBeInTheDocument()
  })  

  it('should render fully with "withGoBack", "title" and "children" props', () => {
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
  
  it('should re-render HeaderComponent if a change to title has occuried', () => {
    const { rerender } = render(<Header title="Mocked title"/>)    

    rerender(<Header title="Another mocked title"/>)

    const reRenderedComponent = screen.getByRole('heading', { level: 2 })

    expect(reRenderedComponent).toHaveTextContent('Another mocked title')
  })
})
