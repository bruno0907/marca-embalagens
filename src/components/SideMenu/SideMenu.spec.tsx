import { render, screen, fireEvent } from "@testing-library/react"
import { SideMenu } from "."

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('../../hooks/useSignOutMutation', () => {
  return {
    useSignOutMutation() {
      return {
        mutate: jest.fn()
      }
    }
  }
})

describe('SideMenu', () => {
  it('should render correcly', () => {
    const { container } = render(<SideMenu />)

    expect(container).toBeInTheDocument()
  })
  
})