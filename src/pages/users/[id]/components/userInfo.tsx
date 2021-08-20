import { useState } from "react"

import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../../../components/Input"

import { 
  Button,
  Stack,
  Text,
  Box,
  HStack
} from "@chakra-ui/react"

type UserInfoProps = {
  user: UserProps[]
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
  const [willEdit, setWillEdit] = useState(false)

  const { 
    handleSubmit,
    formState,
    register,
    reset
  } = useForm<UserProps>({
    resolver: yupResolver(updateUserFormSchema),
    defaultValues: {
      name: user[0].name,
      phone_number: user[0].phone_number,
      mobile_number: user[0].mobile_number,
      email: user[0].email
    }
  })

  const {
    errors,
    isSubmitting
  } = formState

  function handleEditUser() {
    setWillEdit(true)
  }

  const handleUpdateUser: SubmitHandler<UserProps> = async values => {
    console.log(values)
    setWillEdit(false)
  }

  function handleCancel() {
    reset()
    setWillEdit(false)
  }
  
  function setUserToUpdate() {
    setWillEdit(false)
  }

  return !willEdit ? (
    <Box>
      <Stack mt="8" mb="12" spacing={3}>
        <Text><strong>Nome completo: </strong>{user[0].name}</Text>              
        <Text><strong>Telefone: </strong>{user[0].phone_number}</Text>
        <Text><strong>Celular: </strong>{user[0].mobile_number}</Text>
        <Text><strong>E-mail: </strong>{user[0].email}</Text>
      </Stack>
      <Button colorScheme="blue" onClick={handleEditUser}>Editar cliente</Button>
    </Box>
  ) : (
    <Box as="form" onSubmit={handleSubmit(handleUpdateUser)}>
      <Stack spacing={3} mt="8" mb="12">
        <Input 
          name="name"
          label="Nome"
          bgColor="gray.50"
          error={errors?.name}
          {...register('name')}
        />
        <Input 
          name="phone_number"
          label="Telefone"
          bgColor="gray.50"
          error={errors?.phone_number}
          {...register('phone_number')}
        />
        <Input 
          name="mobile_number"
          label="Celular"
          bgColor="gray.50"
          error={errors?.mobile_number}
          {...register('mobile_number')}
        />
        <Input 
          name="email"
          label="E-mail"
          bgColor="gray.50"
          error={errors?.email}
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
