import { render, screen } from "@testing-library/react"

import { useRouter } from "next/router"

import { ActiveLink } from "."
import { FiHome } from "react-icons/fi"

describe('ActiveLink', () => {
  it('should render properly', () => {
    const hrefMock = '/mock-home'
    const labelMock = 'Mock Home'
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
    const hrefMock = '/mock-another-link'
    const labelMock = 'Mock Another Label'
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

  it('should return color as blue.500 if asPath starts with href', () => {       
    const hrefMock = '/'
    const labelMock = 'Mock-Fake-Label'
    const iconMock = FiHome

    const { asPath } = useRouter()

    const isActive = asPath.startsWith(hrefMock) && 'blue.500'
    
    render(
      <ActiveLink 
        href={hrefMock}
        icon={iconMock}
        label={labelMock}
      />
    )   

    expect(isActive).toBe('blue.500')    
  })
})