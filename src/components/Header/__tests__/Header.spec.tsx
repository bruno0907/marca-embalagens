import { render, screen } from '@testing-library/react'
import { Header } from '..'

describe('Header', () => {
  test('It should render correctly', () => {
    const { container: HeaderComponent } = render(
      <Header />
    )
  
    expect(HeaderComponent).toBeInTheDocument()
  })

  test('It should render with "withGoBack" button correctly', () => {
    render(<Header withGoBack/>) 

    const goBackButton = screen.getByRole('button')

    expect(goBackButton).toContainElement(goBackButton)
  })

  test('It should render "Mocked Title" if it has title props', () => {
    render(<Header title='Mocked Title'/>)    

    const title = screen.getByRole('heading', { level: 2 })

    expect(title.innerHTML).toEqual('Mocked Title')
  })
   
})
