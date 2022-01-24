import { ReactElement } from 'react'
import { render as DefaultRender, render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from './src/styles/theme'

import '@testing-library/jest-dom/extend-expect'
import preloadAll from 'jest-next-dynamic'

beforeAll(async () => await preloadAll())
afterAll(jest.clearAllMocks)

jest.mock('axios')
jest.mock('@supabase/supabase-js')
jest.mock('react-query')

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
        push: jest.fn(),
        back: jest.fn()
      }
    }
  }
})

jest.spyOn(require('next/router'), 'useRouter')

jest.mock("@chakra-ui/react", () => {
  const originalModules = jest.requireActual("@chakra-ui/react")  

  return {
    __esModule: true,
    ...originalModules,
    useDisclosure: jest.fn().mockReturnValue({
      isOpen: false,
      onOpen: jest.spyOn(require("react"), 'useCallback').mockReturnValue(jest.fn()),
      onClose: jest.spyOn(require("react"), 'useCallback').mockReturnValue(jest.fn()),
      onToggle: jest.spyOn(require("react"), 'useCallback').mockReturnValue(jest.fn()),
    }),
    useToast: jest.fn().mockReturnValue({
      status: 'Fake status',
      title: 'Fake Title',
      description: 'fake-message',
    }),
  }
})

jest.mock('next/dynamic', () => {() => {
  const originalModules = jest.requireActual('next/dynamic')
  const options = { loading: jest.fn() }
  return {
    __esModule: true,
    ...originalModules,
    loadablefn: jest.fn(() => options),    
  }
}})

jest.mock('react-hook-form', () => {
  const originals = jest.requireActual('react-hook-form')  
  return {
    __esModule: true,
    ...originals,
    useForm: jest.fn().mockReturnValue({
      handleSubmit: jest.fn(),
      register: jest.fn(),
      formState: {
        errors: []
      },
      setValue: jest.fn(),
      clearErrors: jest.fn(),
      reset: jest.fn()
    })
  }
})

jest.spyOn(require('react-hook-form'), 'useForm')

jest.mock('yup', () => {
  const originals = jest.requireActual('yup')
  return {
    __esModule: true,
    ...originals,
    shape: jest.fn().mockReturnValue({
      test: {
        message: '',
        test: jest.fn(v => v)
      }
    })
  }
})

jest.spyOn(require('yup'), 'shape')

const wrapper = ({ children }): JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper, ...options })

export * from "@testing-library/react"
export { customRender as render }