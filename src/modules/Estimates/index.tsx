import { useRouter } from 'next/router'

import { Stack, Icon } from '@chakra-ui/react'

import { FiPlus } from 'react-icons/fi'

import { 
  Section,
  Content,
  Header,
  Divider,
  ButtonPrimary 
} from '../../components'

import { EstimateList } from './components'

import { useSearch, SearchInput } from '../../hooks'

export const EstimatesModule = () => {
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
      <Header title="Orçamentos"/>
      <Divider />
      <Content>
        <Section>
          <Stack direction={['column', 'column', 'row']} spacing={3}>
            <SearchInput
              type="number"
              ref={searchInputRef}
              placeholder="Pesquise pelo número do orçamento..."
              onClearSearch={clearSearch}  
              hasSearch={!!searchValue}                     
              value={searchValue}
              onChange={handleSearch}
            />              
            <ButtonPrimary               
              leftIcon={<Icon as={FiPlus} />}
              onClick={handleNewEstimate}
            >
              Novo orçamento
            </ButtonPrimary>
          </Stack>          
          <EstimateList query={Number(toSearch)}/>
        </Section>
      </Content>      
    </>
  )
}