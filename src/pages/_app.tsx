import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { AuthProvider } from '../hooks/useAuth'
import { QueryProvider } from '../contexts/queryContext'
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <QueryProvider>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </QueryProvider>
      </ChakraProvider>      
    </AuthProvider>
  )
}
export default MyApp
