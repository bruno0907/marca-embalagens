import { ChangeEvent, forwardRef, ForwardRefRenderFunction } from 'react'

import {
  InputGroup,
  Input,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputRightElement,
  Icon,
} from '@chakra-ui/react'

import { FiSearch, FiX } from 'react-icons/fi'

interface Props extends ChakraInputProps {
  type?: string;  
  hasSearch: boolean;  
  onClearSearch: () => void
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchInputComponent: ForwardRefRenderFunction<
  HTMLInputElement, Props
> = ({ 
  type,
  onClearSearch, 
  hasSearch,
  ...rest }, ref) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon as={FiSearch} color="gray.500" />
      </InputLeftElement>
      <Input        
        type={type ? type : 'text'}
        borderColor="gray.300"
        ref={ref}        
        {...rest}
      />
      { hasSearch &&
        <InputRightElement 
          cursor="pointer" 
          onClick={onClearSearch}
          _hover={{
          svg: {
            color: 'gray.700'
          }
        }}>
          <Icon as={FiX} color="gray.500" fontSize="18px" />
        </InputRightElement>         
      }   
    </InputGroup>
  )
}

const SearchInput = forwardRef(SearchInputComponent)

export {
  SearchInput
}
