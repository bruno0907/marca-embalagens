import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../../../../../components/Input";

import {
  Flex,  
  Center,
  Spinner,
  Text,
  Stack,
  HStack,  
  Button,
  useToast,  
} from "@chakra-ui/react";

import { UserProps } from "../../../../../types";

import { useUpdateUserMutation } from '../../../../../hooks/useUpdateUserMutation'

export type UpdateUserFormProps = {
  user: UserProps ;
  onClose: () => void;
}

const updateUserSchema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório").trim(),
  razao_social: yup.string().trim(),
  telefone: yup.string().trim(),
  celular: yup.string().trim(),
  email: yup.string().email().trim(),
  cpf_cnpj: yup.string().trim(),
  rg_ie: yup.string().trim(),
  contato: yup.string().trim(),
  outras_informacoes: yup.string().trim(),  
});

const UpdateUserForm = ({ user, onClose }: UpdateUserFormProps) => {    
  const toast = useToast()  

  const {
    formState,
    handleSubmit,
    register,   
    reset
  } = useForm<UserProps>({
    defaultValues: {
      nome: user?.nome,
      razao_social: user?.razao_social,
      telefone: user?.telefone,
      celular: user?.celular,
      email: user?.email,
      cpf_cnpj: user?.cpf_cnpj,
      rg_ie: user?.rg_ie,
      contato: user?.contato,
      outras_informacoes: user?.outras_informacoes,
    },
    resolver: yupResolver(updateUserSchema)
  })

  const {
    errors,
    isDirty,
    isSubmitting,    
  } = formState

  const updateUserMutation = useUpdateUserMutation()


  const handleUpdateUser: SubmitHandler<UserProps> = async values => {
    const updatedUser = {
      ...user,
      ...values
    }

    try {
      await updateUserMutation.mutateAsync(updatedUser)
      
      toast({        
        title: 'Cadastro atualizado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })

      onClose()
      
    } catch (error) {
      toast({        
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })

      onClose()

    }
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  if(!user) {
    return (
      <Center h="100vh">
        <Spinner size="lg" color="blue.500" />
      </Center>
    )
  }
  
  return (
    <Flex
      as="form"
      flexDir="column"
      onSubmit={handleSubmit(handleUpdateUser)}      
    >
      <Stack spacing={3}>        
        
        <HStack spacing={3}>
          <Text color="gray.600" fontWeight="medium">Tipo de pessoa:</Text>
          <Text color="blue.500" fontWeight="bold">{user.natureza_cliente}</Text>
        </HStack>
        
        <HStack spacing={3}>
          <Input
            name="nome"
            label="Nome:"
            isDisabled={isSubmitting}
            error={errors?.nome}
            {...register("nome")}
          />
          { user.natureza_cliente === 'Jurídica' &&
            <Input
              name="razao_social"
              label="Razão Social:"
              isDisabled={isSubmitting}
              error={errors?.razao_social}
              {...register("razao_social")}
            />

          }
        </HStack>
        <HStack spacing={3}>
          <Input
            name="telefone"
            label="Telefone:"
            isDisabled={isSubmitting}
            error={errors?.telefone}
            {...register("telefone")}
          />
          <Input
            name="celular"
            label="Celular:"
            isDisabled={isSubmitting}
            error={errors?.celular}
            {...register("celular")}
          />
          <Input
            name="email"
            type="email"
            label="E-mail:"
            isDisabled={isSubmitting}
            error={errors?.email}
            {...register("email")}
          />
        </HStack>
        <HStack spacing={3}>
          <Input
            name="cpf_cnpj"
            label={ user.natureza_cliente === 'Jurídica' ? 'CNPJ:' : 'CPF:' }
            isDisabled={isSubmitting}
            error={errors?.cpf_cnpj}
            {...register("cpf_cnpj")}
          />
          <Input
            name="rg_ie"
            label={ user.natureza_cliente === 'Jurídica' ? 'Inscrição Estadual:' : 'RG:' }
            isDisabled={isSubmitting}
            error={errors?.rg_ie}
            {...register("rg_ie")}
          />          
          <Input
            name="contato"
            label="Contato:"
            isDisabled={isSubmitting}
            error={errors?.contato}
            {...register("contato")}
          />          
        </HStack>        
        <Input
          as="textarea"
          h="120px"
          p="3"
          name="outras_informacoes"
          label="Outras Informações:"
          isDisabled={isSubmitting}
          error={errors?.outras_informacoes}
          {...register("outras_informacoes")}
        />
      </Stack>
      <HStack
        spacing={3}              
        justifyContent="flex-end"
        display="flex"
        alignItems="flex-start"
        w="100%"
        mt={4}
      >
        <Button
          type="reset"
          colorScheme="blue"
          variant="ghost"          
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          isDisabled={!isDirty}
        >
          Salvar alterações
        </Button>
      </HStack>
    </Flex>          
  );
}

export { UpdateUserForm }
