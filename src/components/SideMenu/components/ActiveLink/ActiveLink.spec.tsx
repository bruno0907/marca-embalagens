import { render } from "@testing-library/react"
import { FiHome } from "react-icons/fi"
import { ActiveLink } from "."

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink', () => {
  it('should render properly', () => {
    const { container } = render(
      <ActiveLink 
        href="/"
        icon={FiHome}
        label="Home"
      />
    )

    expect(container).toBeInTheDocument()
  })  
})