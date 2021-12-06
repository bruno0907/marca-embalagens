import React, { forwardRef, ForwardRefRenderFunction } from "react"

import { FieldError } from "react-hook-form"

import { 
  FormControl, 
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  Spinner
} from "@chakra-ui/react"

interface InputProps extends ChakraInputProps {
  name: string;  
  label?: string;
  error?: FieldError;
  isLoading?: boolean;  
  placeholder?: string;    
}

const InputRef: ForwardRefRenderFunction<HTMLInputElement, InputProps> = 
  ({ label, name, error, isLoading, placeholder, ...rest }, ref) => {  
    return (
      <FormControl id={name} isInvalid={!!error} display="flex" flexDir="column">
        { label && 
          <FormLabel htmlFor={name} display="flex" alignItems="center">
            {label}
            { isLoading && <Spinner ml="2" size="sm" color="blue.500"/>}
          </FormLabel> 
        }
        <ChakraInput
          id={name}
          name={name}            
          ref={ref}          
          error={error}
          borderColor="gray.300"
          flexShrink={0}
          {...rest}
        />
        { !!error && <FormErrorMessage>{error.message}</FormErrorMessage> }
      </FormControl>
    )  
}

const Input = forwardRef(InputRef)

export { Input }