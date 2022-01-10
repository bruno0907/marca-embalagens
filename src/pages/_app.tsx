import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { AuthProvider } from '../contexts/useAuth'
import { QueryProvider } from '../contexts/queryContext'
import { ReactQueryDevtools } from 'react-query/devtools'
import { CartProvider } from '../contexts/useCart'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <ChakraProvider theme={theme}>
          <QueryProvider>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </QueryProvider>
        </ChakraProvider>
      </CartProvider>
    </AuthProvider>
  )
}
export default MyApp
