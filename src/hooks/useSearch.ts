import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { SearchInput } from '../components'

const useSearch = (delay?: number) => {
  const [toSearch, setToSearch] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchValue(value)
  }

  const clearSearch = () => {
    setSearchValue('')
    searchInputRef.current?.focus()
  }
  
  useEffect(() => {    
    const debounced = setTimeout(() => setToSearch(searchValue), delay || 500)

    return () => clearTimeout(debounced)

  }, [delay, searchValue])  
  
  return {
    toSearch,
    handleSearch,
    clearSearch,
    searchValue,
    searchInputRef,    
  }
}

export {
  useSearch,
  SearchInput
}