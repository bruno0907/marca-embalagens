import React, { forwardRef, ForwardRefRenderFunction } from "react"

import { FieldError } from "react-hook-form"

import { 
  FormControl, 
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage
} from "@chakra-ui/react"

interface InputProps extends ChakraInputProps {
  name: string;  
  label?: string;
  error?: FieldError;    
}

const InputRef: ForwardRefRenderFunction<HTMLInputElement, InputProps> = 
  ({ label, name, error = null, ...rest }, ref) => {    
    return (
      <FormControl id={name} isInvalid={!!error} display="flex" flexDir="column">
        { label && <FormLabel htmlFor={name}>{label}</FormLabel> }
        <ChakraInput
          id={name}
          name={name}
          variant="flushed"
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