import React, { forwardRef, ForwardRefRenderFunction, useState } from "react"

import { FieldError } from "react-hook-form"

import { 
  FormControl, 
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  Spinner,
  FormErrorIcon,  
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"

import { FiEye, FiEyeOff } from "react-icons/fi"

interface Props extends ChakraInputProps {
  type?: string;
  name: string;  
  label?: string;
  error?: FieldError;
  isLoading?: boolean;  
  placeholder?: string;
  isRequired?: boolean;
}

const InputRef: ForwardRefRenderFunction<HTMLInputElement, Props> = 
  ({ type, label, name, error, isLoading, placeholder, isRequired, ...rest }, ref) => {  

    let showPasswordIcon = type === 'password'

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => setShowPassword(!showPassword)
    const handlePasswordInput = (type?: string) => {
      if(!type || type !== 'password'){
        return type || 'text'
      }
      return showPassword ? 'text' : 'password'
    }    

    return (
      <FormControl id={name} isInvalid={!!error} display="flex" flexDir="column">
        { label && 
          <FormLabel htmlFor={label} display="flex" alignItems="center" fontSize={['sm', 'sm', 'initial']}>
            {label}
            { isLoading && <Spinner ml="2" size="sm" color="blue.500"/>}
          </FormLabel> 
        }
        <InputGroup>
          <ChakraInput
            type={handlePasswordInput(type)}
            id={label}
            name={name}            
            ref={ref}
            placeholder={placeholder}
            autoComplete="off"
            autoCapitalize="off"
            error={error}
            borderColor={!error ? "gray.300" : "red"}
            bgColor={!error ? "gray.50" : "red.50"}
            flexShrink={0}   
            fontSize={['sm', 'sm', 'initial']}         
            {...rest}
          />
          { showPasswordIcon && (
            <InputRightElement fontSize={20} color="blue.500" pr="4">
              { !showPassword 
                ? <FiEye onClick={handleShowPassword} /> 
                : <FiEyeOff onClick={handleShowPassword} /> 
              }
            </InputRightElement>
          )}
        </InputGroup>
        { !!error && <FormErrorMessage><FormErrorIcon />{error.message}</FormErrorMessage> }
      </FormControl>
    )  
}

const Input = forwardRef(InputRef)

export { Input }