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
}

const InputRef: ForwardRefRenderFunction<HTMLInputElement, InputProps> = 
  ({ label, name, error = null, isLoading, ...rest }, ref) => {    
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
          borderColor="gray.300"
          ref={ref}
          error={error}
          {...rest}
        />
        { !!error && <FormErrorMessage>{error.message}</FormErrorMessage> }
      </FormControl>
    )  
}

const Input = forwardRef(InputRef)

export { Input }