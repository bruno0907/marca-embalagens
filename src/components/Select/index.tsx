import React, { forwardRef, ForwardRefRenderFunction, ReactNode } from "react"

import { FieldError } from "react-hook-form"

import { 
  FormControl, 
  FormLabel,
  Select as ChakraSelect,  
  SelectProps as ChakraSelectProps,
  FormErrorMessage,
  Spinner,
  FormErrorIcon
} from "@chakra-ui/react"

import { MdArrowDropDown } from 'react-icons/md'

interface Props extends ChakraSelectProps {
  name: string;  
  label?: string;
  error?: FieldError;
  isLoading?: boolean;  
  children: ReactNode;  
  isRequired?: boolean;
  isDisabled?: boolean;
}

const SelectRef: ForwardRefRenderFunction<HTMLSelectElement, Props> = 
  ({ label, name, error = null, isLoading, children, isDisabled, isRequired, ...rest }, ref) => {    
    return (
      <FormControl id={name} isRequired={isRequired} isInvalid={!!error} display="flex" flexDir="column">
        { label && 
          <FormLabel htmlFor={name} display="flex" alignItems="center">
            {label}
            { isLoading && <Spinner ml="2" size="sm" color="blue.500"/>}
          </FormLabel> 
        }
        <ChakraSelect
          icon={<MdArrowDropDown/>}
          id={name}
          name={name}
          isDisabled={isDisabled}
          borderColor={!error ? "gray.300" : "red"}
          bgColor={!error ? "gray50" : "red.50"}
          ref={ref}
          error={error}
          {...rest}
        >
          {children}
        </ChakraSelect>
        { !!error && <FormErrorMessage><FormErrorIcon/>{error.message}</FormErrorMessage> }
      </FormControl>
    )  
}

const Select = forwardRef(SelectRef)

export { Select }