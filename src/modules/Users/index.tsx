import { useRouter } from 'next/router'

import {        
  Icon,
  Stack,  
} from '@chakra-ui/react'

import { FiPlus } from 'react-icons/fi'

import { 
  Divider,
  Section,
  Header,
  Content,
  ButtonPrimary 
} from '../../components'

import { UsersList } from './components'

import { useSearch, SearchInput } from '../../hooks'

export const UsersModule = () => {     
  const router = useRouter()    
  
  const { 
    toSearch,
    clearSearch,
    handleSearch,
    searchValue,
    searchInputRef 
  } = useSearch()

  return (
    <>       
      <Header title="Clientes"/>
      <Divider />
      <Content>
        <Section>
          <Stack direction={['column', 'column', 'row']} spacing={3}>
            <SearchInput
              ref={searchInputRef}
              placeholder="Pesquise pelo nome do cliente..."
              onClearSearch={clearSearch}
              hasSearch={!!searchValue}
              value={searchValue}
              onChange={handleSearch}
            />      
            <ButtonPrimary
              fontSize={['sm', 'sm', 'initial']}
              leftIcon={<Icon as={FiPlus}/>}
              onClick={() => router.push('/users/new-user')}              
            >
              Novo cliente
            </ButtonPrimary>
          </Stack>            
          <UsersList filterValue={toSearch}/>
        </Section>
      </Content>              
    </>
  )
}
