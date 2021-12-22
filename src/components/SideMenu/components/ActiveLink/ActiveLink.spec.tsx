import { render, screen } from "@testing-library/react"

import { useRouter } from "next/router"

import { ActiveLink } from "."
import { FiHome } from "react-icons/fi"

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
        push: jest.fn()
      }
    }
  }
})

const useRouterSpy = jest.spyOn(require('next/router'), 'useRouter')

jest.mock('@chakra-ui/react', () => {
  const modules = jest.requireActual('@chakra-ui/react')

  return {
    __esModule: true,
    ...modules,
    customKey: 'customValue',
  }
})

describe('ActiveLink', () => {
  it('should render properly', () => {
    const hrefMock = '/mock-home'
    const labelMock = 'Mock-Home'
    const iconMock = FiHome
    
    render(
      <ActiveLink 
        href={hrefMock}
        icon={iconMock}
        label={labelMock}
      />
    )

    const link = screen.getByRole('link', { name: labelMock })

    expect(link).toBeInTheDocument()
  })
  
  it('should navigate to given href', () => {       
    const hrefMock = '/mock-fake-link'
    const labelMock = 'Mock-Fake-Label'
    const iconMock = FiHome
    
    render(
      <ActiveLink 
        href={hrefMock}
        icon={iconMock}
        label={labelMock}
      />
    )

    const link = screen.getByRole('link', { name: labelMock })

    expect(link.getAttribute('href')).toBe(hrefMock)
    
  })
})