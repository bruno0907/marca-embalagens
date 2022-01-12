import '@testing-library/jest-dom/extend-expect'
import preloadAll from 'jest-next-dynamic'
import { cleanup } from '@testing-library/react'
import { UseToastOptions } from '@chakra-ui/react'

beforeAll(async () => await preloadAll())
afterAll(jest.clearAllMocks)

afterEach(cleanup)

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
      message: 'fake-message'
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

