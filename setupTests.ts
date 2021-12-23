import '@testing-library/jest-dom/extend-expect'

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

jest.mock('@chakra-ui/react', () => {
  const modules = jest.requireActual('@chakra-ui/react')

  return {
    __esModule: true,
    ...modules,
    customKey: 'customValue',
  }
})

jest.mock('@supabase/supabase-js')