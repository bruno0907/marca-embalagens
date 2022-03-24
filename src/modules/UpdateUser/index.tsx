import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {  
  Text,
  Stack,
  HStack,
  useToast,  
} from "@chakra-ui/react";

import { 
  Input,
  Form,
  Section,
  ButtonSecondary,
  ButtonPrimary 
} from "../../components";

import { useUpdateUserMutation } from '../../hooks'

import { InputMask } from "../../utils";

import { User } from "../../models";

export type UpdateUserModuleProps = {
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
  celular: yup.string().trim(),
  email: yup.string()
    .email('Formato de e-mail inválido')
    .trim(),
  cpf_cnpj: yup.string().trim(),
  rg_ie: yup.string().trim(),
  contato: yup.string().trim(),
  outras_informacoes: yup.string().trim(), 
});

export const UpdateUserModule = ({ user, onClose }: UpdateUserModuleProps) => {    
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
  
  return (
    <Form onSubmit={handleSubmit(handleUpdateUser)}>
      <Section>        
        <HStack spacing={3}>
          <Text color="gray.600" fontWeight="medium">Tipo de pessoa:</Text>
          <Text color="blue.500" fontWeight="bold">{user.natureza_cliente}</Text>
        </HStack>
        
        <Stack direction={['column', 'column', 'row']} align="flex-start">
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
        </Stack>

        <Stack direction={['column', 'column', 'row']} align="flex-start">
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
        </Stack>

        <Stack direction={['column', 'column', 'row']} align="flex-start">
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
        </Stack>
        <Input
          as="textarea"
          h="80px"
          p="3"
          name="outras_informacoes"
          label="Outras Informações:"
          isDisabled={isSubmitting}
          defaultValue={user.outras_informacoes ?? ''}
          error={errors.outras_informacoes}
          {...register("outras_informacoes")}
        />
      </Section>
      <HStack
        spacing={[3, 3, 6]}              
        justifyContent="flex-end"
        display="flex"
        alignItems="flex-start"
        w="100%"
      >
        <ButtonSecondary
          type="reset"
          isDisabled={isSubmitting}          
          onClick={handleCancel}
        >
          Cancelar
        </ButtonSecondary>
        <ButtonPrimary
          type="submit"          
          isLoading={isSubmitting}
        >
          Salvar alterações
        </ButtonPrimary>
      </HStack>
    </Form>          
  );
}
