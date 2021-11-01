import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateSupplierMutation } from "../../hooks/useUpdateSupplierMutation";

import { Input } from "../Input";

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

import { SupplierProps } from "../../types";

type UpdateSupplierFormProps = {
  supplier: SupplierProps ;
  onClose: () => void;
}

const updateSupplierSchema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório").trim(),
  razao_social: yup.string().trim(),
  produto: yup.string().trim(),
  telefone: yup.string().trim(),
  celular: yup.string().trim(),
  email: yup.string().email().trim(),
  cpf_cnpj: yup.string().trim(),
  rg_ie: yup.string().trim(),
  contato: yup.string().trim(),
  outras_informacoes: yup.string().trim(),  
});

const UpdateSupplierForm = ({ supplier, onClose }: UpdateSupplierFormProps) => {    
  const toast = useToast()  

  const {
    formState,
    handleSubmit,
    register,   
    reset
  } = useForm<SupplierProps>({
    defaultValues: {
      nome: supplier?.nome,
      razao_social: supplier?.razao_social,
      produto: supplier?.produto,
      telefone: supplier?.telefone,
      celular: supplier?.celular,
      email: supplier?.email,
      cpf_cnpj: supplier?.cpf_cnpj,
      rg_ie: supplier?.rg_ie,
      contato: supplier?.contato,
      outras_informacoes: supplier?.outras_informacoes,
    },
    resolver: yupResolver(updateSupplierSchema)
  })

  const {
    errors,
    isDirty,
    isSubmitting,    
  } = formState

  const updateUserMutation = useUpdateSupplierMutation()

  const handleUpdateUser: SubmitHandler<SupplierProps> = async values => {
    const updatedSupplier = {
      ...supplier,
      ...values
    }

    try {
      await updateUserMutation.mutateAsync(updatedSupplier)
      
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

  const handleUpdateUserErrors: SubmitErrorHandler<SupplierProps> = errors => {
    console.log(errors)
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  if(!supplier) {
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
      onSubmit={handleSubmit(handleUpdateUser, handleUpdateUserErrors)}      
    >
      <Stack spacing={3}>
        <HStack spacing={3}>
          <Text color="gray.600" fontWeight="medium">Tipo de pessoa:</Text>
          <Text color="blue.500" fontWeight="bold">{supplier.natureza_cliente}</Text>
        </HStack>
        
        <HStack spacing={3}>
          <Input
            name="nome"
            label="Nome:"
            isDisabled={isSubmitting}
            error={errors?.nome}
            {...register("nome")}
          />
          { supplier.natureza_cliente === 'Jurídica' &&
            <Input
              name="razao_social"
              label="Razão Social:"
              isDisabled={isSubmitting}
              error={errors?.razao_social}
              {...register("razao_social")}
            />
          }
        </HStack>
        <Input
          name="produto"
          label="Produto:"
          isDisabled={isSubmitting}
          error={errors?.produto}
          {...register("produto")}
        />
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
            label={ supplier.natureza_cliente === 'Jurídica' ? 'CNPJ:' : 'CPF:' }
            bgColor="gray.50"
            isDisabled={isSubmitting}
            error={errors?.cpf_cnpj}
            {...register("cpf_cnpj")}
          />
          <Input
            name="rg_ie"
            label={ supplier.natureza_cliente === 'Jurídica' ? 'Inscrição Estadual:' : 'RG:' }
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
          colorScheme="blue"
          variant="ghost"
          _hover={{ backgroundColor: "blue.500", color: "gray.100" }}
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

export { UpdateSupplierForm }
