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
})
