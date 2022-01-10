import Head from 'next/head'
import { useRouter } from 'next/router'

import { AuthWrapper } from '../../components/AuthWrapper'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { Content } from '../../components/Content'
import { EstimatesList } from '../../components/pages/Estimates/EstimateList'

import { useSearch, SearchInput } from '../../hooks/useSearch'

import { Button, HStack, Icon, Stack,} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'


export default function Estimates() {  
  const router = useRouter()    

  const { 
    toSearch,
    searchValue,
    handleSearch, 
    clearSearch,
    searchInputRef 
  } = useSearch()

  const handleNewEstimate = () => router.push('/estimates/new-estimate')

  return (
    <>
      <Head>
        <title>Orçamentos | MARCA</title>        
      </Head>
      <AuthWrapper>
        <Header title="Orçamentos"/>
        <Divider />
        <Stack spacing={3}>
          <Content>
            <HStack spacing={3} mb={8}>
              <SearchInput
                type="number"
                ref={searchInputRef}
                placeholder="Pesquise pelo número do orçamento..."
                onClearSearch={clearSearch}  
                hasSearch={!!searchValue}                     
                value={searchValue}
                onChange={handleSearch}
              />              
              <Button 
                colorScheme="blue"
                leftIcon={<Icon as={FiPlus} />}
                onClick={handleNewEstimate}
                flexShrink={0}
              >
                Novo orçamento
              </Button>
            </HStack>          
            <EstimatesList query={Number(toSearch)}/>
          </Content>
        </Stack>
      </AuthWrapper>
    </>
  )
}
