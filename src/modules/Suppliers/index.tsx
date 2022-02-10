import { useRouter } from "next/router"

import { Icon, Stack } from "@chakra-ui/react"
import { FiPlus } from "react-icons/fi"

import { 
  ButtonPrimary,
  Content,
  Divider,
  Header,
} from "../../components"

import { useSearch, SearchInput } from "../../hooks"

import { SuppliersList } from "./components"

export const SuppliersModule = () => {
  const router = useRouter()
  
  const {
    toSearch,
    handleSearch,
    searchValue,
    clearSearch,
    searchInputRef
  } = useSearch()

  return (
    <>
      <Header title="Fornecedores"/>
      <Divider />
      <Content>
        <Stack spacing={6}>
          <Stack direction={['column', 'column', 'row']} spacing={6}>
            <SearchInput
              ref={searchInputRef}
              placeholder="Pesquise pelo nome do fornecedor..."
              hasSearch={!!searchValue}
              value={searchValue}
              onChange={handleSearch}
              onClearSearch={clearSearch}
            />
            <ButtonPrimary               
              leftIcon={<Icon as={FiPlus}/>}                
              onClick={() => router.push('/suppliers/new-supplier')}
            >
              Novo fornecedor
            </ButtonPrimary>
          </Stack>
          <SuppliersList filterValue={toSearch}/>
        </Stack>
      </Content>
    </>
  )
}