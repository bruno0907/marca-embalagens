import { render, screen } from "@testing-library/react"
import { GoBackButton } from ".."

describe('GoBackButton', () => {
  it('should render properly', () => {  
    const { getByRole } = render(<GoBackButton/>)

    expect(getByRole('button')).toBeInTheDocument()
  })  
})