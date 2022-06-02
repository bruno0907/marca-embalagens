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

import { DraftsList } from './components'

import { useSearch, SearchInput } from '../../hooks'

export const DraftsModule = () => {
  const router = useRouter()    

  const { 
    toSearch,
    searchValue,
    handleSearch, 
    clearSearch,
    searchInputRef 
  } = useSearch()

  const handleNewDraft = () => router.push('/drafts/new-draft')

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
              onClick={handleNewDraft}
            >
              Novo orçamento
            </ButtonPrimary>
          </Stack>          
          <DraftsList query={Number(toSearch)}/>
        </Section>
      </Content>      
    </>
  )
}