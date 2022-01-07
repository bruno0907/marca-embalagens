import React, { forwardRef, ForwardRefRenderFunction } from "react"

import { FieldError } from "react-hook-form"

import { 
  FormControl, 
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  Spinner,
  FormErrorIcon
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
          <FormLabel htmlFor={label} display="flex" alignItems="center">
            {label}
            { isLoading && <Spinner ml="2" size="sm" color="blue.500"/>}
          </FormLabel> 
        }
        <ChakraInput
          id={label}
          name={name}            
          ref={ref}          
          error={error}
          borderColor={!error ? "gray.300" : "red"}
          bgColor={!error ? "gray.50" : "red.50"}
          flexShrink={0}
          {...rest}
        />
        { !!error && <FormErrorMessage><FormErrorIcon />{error.message}</FormErrorMessage> }
      </FormControl>
    )  
}

const Input = forwardRef(InputRef)

export { Input }