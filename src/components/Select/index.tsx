import React, { forwardRef, ForwardRefRenderFunction, ReactNode } from "react"

import { FieldError } from "react-hook-form"

import { 
  FormControl, 
  FormLabel,
  Select as ChakraSelect,  
  SelectProps as ChakraSelectProps,
  FormErrorMessage
} from "@chakra-ui/react"

interface SelectProps extends ChakraSelectProps {
  name: string;  
  label?: string;
  error?: FieldError;
  children: ReactNode;  
}

const SelectRef: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = 
  ({ label, name, error = null, children, ...rest }, ref) => {    
    return (
      <FormControl id={name} isInvalid={!!error} display="flex" flexDir="column">
        { label && <FormLabel htmlFor={name}>{label}</FormLabel> }
        <ChakraSelect
          id={name}
          name={name}
          size="lg"
          ref={ref}
          error={error}
          {...rest}
        >
          {children}
        </ChakraSelect>
        { !!error && <FormErrorMessage>{error.message}</FormErrorMessage> }
      </FormControl>
    )  
}

const Select = forwardRef(SelectRef)

export { Select }