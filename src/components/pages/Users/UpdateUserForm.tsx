import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../../Input";

import { useUpdateUserMutation } from '../../../hooks/useUpdateUserMutation'
import { User } from "../../../hooks/useUserQuery";
import { InputMask } from "../../../utils/inputMasksHandler";

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

export type UpdateUserFormProps = {
  user: User ;
  onClose: () => void;
}

const updateUserSchema = yup.object().shape({
  nome: yup.string()
    .required("O nome do cliente é obrigatório")
    .min(5, 'O nome deve ter no mínimo 5 caracteres')
    .max(120, 'O nome não deve ultrapassar 120 caracteres')
    .trim(),
  razao_social: yup.string().trim(),
  telefone: yup.string().trim(),
  celular: yup.string().required().trim(),
  email: yup.string()
    .email('Formato de e-mail inválido')
    .trim(),
  cpf_cnpj: yup.string().trim(),
  rg_ie: yup.string().trim(),
  contato: yup.string().trim(),
  outras_informacoes: yup.string().trim(), 
});

const UpdateUserForm = ({ user, onClose }: UpdateUserFormProps) => {    
  const toast = useToast()  
  const masked = new InputMask()

  const {
    formState,
    handleSubmit,
    register,   
    reset
  } = useForm<User>({
    resolver: yupResolver(updateUserSchema)
  })

  const {
    errors,
    isDirty,
    isSubmitting,    
  } = formState

  const updateUserMutation = useUpdateUserMutation()

  const handleUpdateUser: SubmitHandler<User> = async values => {
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
        
        <HStack spacing={3} align="flex-start">
          <Input
            name="nome"
            label="Nome:"
            isDisabled={isSubmitting}
            defaultValue={user.nome ?? ''}
            error={errors.nome}
            {...register("nome")}
          />
          { user.natureza_cliente === 'Jurídica' &&
            <Input
              name="razao_social"
              label="Razão Social:"
              isDisabled={isSubmitting}
              defaultValue={user.razao_social ?? ''}
              error={errors.razao_social}
              {...register("razao_social")}              
            />

          }
        </HStack>
        <HStack spacing={3} align="flex-start">
          <Input
            type="tel"
            name="telefone"
            label="Telefone:"
            isDisabled={isSubmitting}
            defaultValue={user.telefone ?? ''}
            error={errors.telefone}
            {...register("telefone")}
            onChange={({ target }) => target.value = masked.phone(target.value)}
          />
          <Input
            type="tel"
            name="celular"
            label="Celular:"
            isDisabled={isSubmitting}
            defaultValue={user.celular ?? ''}
            error={errors.celular}
            {...register("celular")}
            onChange={({ target }) => target.value = masked.celphone(target.value)}
          />
          <Input
            type="email"
            name="email"
            label="E-mail:"
            isDisabled={isSubmitting}
            defaultValue={user.email ?? ''}
            error={errors.email}
            {...register("email")}
          />
        </HStack>
        <HStack spacing={3} align="flex-start">
          <Input
            type="tel"
            name="cpf_cnpj"
            label={ user.natureza_cliente === 'Jurídica' ? 'CNPJ:' : 'CPF:' }
            isDisabled={isSubmitting}
            defaultValue={user.cpf_cnpj ?? ''}
            error={errors.cpf_cnpj}
            {...register("cpf_cnpj")}
            onChange={
              ({ target }) => user.natureza_cliente === 'Jurídica' 
              ? target.value = masked.cnpj(target.value) 
              : masked.cpf(target.value)
            }
          />
          <Input
            type="tel"
            name="rg_ie"
            label={ user.natureza_cliente === 'Jurídica' ? 'Inscrição Estadual:' : 'RG:' }
            isDisabled={isSubmitting}
            defaultValue={user.rg_ie ?? ''}
            error={errors.rg_ie}
            {...register("rg_ie")}
          />          
          <Input
            name="contato"
            label="Contato:"
            isDisabled={isSubmitting}
            defaultValue={user.contato ?? ''}
            error={errors.contato}
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
          defaultValue={user.outras_informacoes ?? ''}
          error={errors.outras_informacoes}
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
