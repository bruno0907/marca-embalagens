import { useState, useEffect } from "react"

import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../../../components/Input"

import { 
  Button,
  Stack,
  Text,
  Box,
  HStack,
  useToast,
  Spinner,
  Flex,
} from "@chakra-ui/react"

import { supabase } from "../../../../services/supabase"
import { useCallback } from "react"

type UserInfoProps = {
  user: UserProps;
}

interface UserProps {
  id: string;
  name: string;
  phone_number: string;
  mobile_number: string;
  email: string;  
}

const updateUserFormSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório').trim(),
  phone_number: yup.string().trim(),
  mobile_number: yup.string().trim(),
  email: yup.string().email().trim(),  
})

const UserInfo = ({ user }: UserInfoProps) => {
  const toast = useToast()
  const [willEdit, setWillEdit] = useState(false)  

  const { 
    handleSubmit,
    formState,
    register,
    reset,
  } = useForm<UserProps>({
    resolver: yupResolver(updateUserFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      mobile_number: user.mobile_number
    }
  })

  const {
    errors,
    isSubmitting
  } = formState

  function handleEditUser() {
    setWillEdit(true)
  }

  const handleUpdateUser: SubmitHandler<UserProps> = useCallback(async values => {    
    const updatedUser: UserProps = {
      ...user,
      name: values.name,
      email: values.email,
      phone_number: values.phone_number,
      mobile_number: values.mobile_number
    }
    const { error, data } = await supabase
      .from('users')
      .upsert(updatedUser)
      .eq('id', user.id)      

    if(error){
      toast({
        description: 'Não foi possível atualizar os dados do cliente',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }   
    
    toast({
      description: `Os dados do cliente ${data[0].name} foram atualizados`,
      status: "success",
      duration: 5000,
      isClosable: true
    })
    setWillEdit(false)

  }, [user, toast])
    
  

  function handleCancel() {
    reset()
    setWillEdit(false)
  }  

  if(!user) {
    return (
      <Flex>
        <Spinner size="lg" color="blue.500" />
      </Flex>
    )
  }

  return !willEdit ? (
    <Box pt="8">       
      <>
        <Stack mb="12" spacing={3}>
          <Text><strong>Nome completo: </strong>{user.name}</Text>              
          <Text><strong>Telefone: </strong>{user.phone_number}</Text>
          <Text><strong>Celular: </strong>{user.mobile_number}</Text>
          <Text><strong>E-mail: </strong>{user.email}</Text>
        </Stack>
        <Button colorScheme="blue" onClick={handleEditUser}>Editar cliente</Button>
      </>
    </Box>
  ) : (
    <Box as="form" onSubmit={handleSubmit(handleUpdateUser)}>
      <Stack spacing={3} mt="8" mb="12">
        <Input 
          name="name"
          label="Nome"
          bgColor="gray.50"
          error={errors?.name}
          isDisabled={isSubmitting}
          {...register('name')}          
        />
        <Input 
          name="phone_number"
          label="Telefone"
          bgColor="gray.50"
          error={errors?.phone_number}
          isDisabled={isSubmitting}
          {...register('phone_number')}
        />
        <Input 
          name="mobile_number"
          label="Celular"
          bgColor="gray.50"
          error={errors?.mobile_number}
          isDisabled={isSubmitting}
          {...register('mobile_number')}
        />
        <Input 
          name="email"
          label="E-mail"
          bgColor="gray.50"
          error={errors?.email}
          isDisabled={isSubmitting}
          {...register('email')}
        />
      </Stack>
      <HStack spacing={3}>
        <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>Salvar alterações</Button>
        <Button
          colorScheme="blue"
          variant="ghost"
          _hover={{ backgroundColor: "blue.500", color: "gray.100" }}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </HStack>
    </Box>
  )
  
}

export { UserInfo }
