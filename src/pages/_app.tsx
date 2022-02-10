import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { AuthProvider } from '../contexts/useAuth'
import { QueryProvider } from '../contexts/queryContext'
import { ReactQueryDevtools } from 'react-query/devtools'
import { CartProvider } from '../contexts/useCart'
import { SidebarDrawerProvider } from '../contexts/SidebarContext'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <QueryProvider>            
      <AuthProvider>
        <CartProvider>
          <ChakraProvider theme={theme}>
            <SidebarDrawerProvider>
              <Component {...pageProps} />
            </SidebarDrawerProvider>
          </ChakraProvider>
        </CartProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryProvider>
  )
}
export default MyApp
