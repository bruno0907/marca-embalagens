import { ChangeEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";

import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from '../../../contexts/useAuth'
import { NewUser, useCreateUserMutation } from "../../../hooks/useCreateUserMutation";
import { useStatesQuery } from "../../../hooks/useStatesQuery";
import { useCitiesQuery } from "../../../hooks/useCitiesQuery";

import { Input } from "../../Input";
import { Select } from "../../Select";

import { InputMask } from "../../../utils/inputMasksHandler";

const newUserSchema= yup.object().shape({
  nome: yup.string()
    .required("O nome do cliente é obrigatório")
    .min(5, 'O nome deve ter no mínimo 5 caracteres')
    .max(120, 'O nome não deve ultrapassar 120 caracteres')
    .trim(),
  razao_social: yup.string()
    .min(10, 'A razão social deve ter no mínimo 10 caracteres')
    .max(120, 'A razão social não deve ultrapassar 120 caracteres')    
    .trim(),
  telefone: yup.string().trim(),
  celular: yup.string().trim(),
  email: yup.string()
    .email('Formato de e-mail inválido')
    .trim(),
  cpf_cnpj: yup.string().trim(),
  rg_ie: yup.string().trim(),
  contato: yup.string()
    .min(5, 'O contato deve ter no mínimo 5 caracteres')
    .max(120, 'O contato não deve ultrapassar 120 caracteres')
    .trim(),
  outras_informacoes: yup.string().trim(),
  endereco: yup.string()
    .required("O endereço é obrigatório")
    .min(5, 'O endereço deve ter no mínimo 5 caracteres')
    .max(120, 'O endereço não deve ultrapassar 120 caracteres')
    .trim(),
  bairro: yup.string()
    .required("O bairro é obrigatório")
    .min(5, 'O bairro deve ter no mínimo 5 caracteres')
    .max(120, 'O bairro não deve ultrapassar 120 caracteres')
    .trim(),
  estado: yup
    .string()
    .required('O estado é obrigatório')
    .test({
      message: "O estado é obrigatório",
      test: value => value !== "defaultValue",
    })
    .trim(),
  cidade: yup
    .string()
    .required('Selecione um estado')
    .test({
      message: "A cidade é obrigatória",
      test: value => value !== "defaultValue",
    })
    .trim(),
  cep: yup.string().trim(),
  complemento: yup.string().trim(),   
})

import {
  Box,
  Button,
  Flex,  
  Stack,
  HStack,
  Text,
  useToast,
  Radio,
  RadioGroup,  
} from "@chakra-ui/react"

import { NewAddress } from "../../../hooks/useCreateAddressMutation";

type HandleNewUser = NewUser & NewAddress

const CreateUserForm = () => {  
  const { session } = useAuth()
  const router = useRouter()
  const masked = new InputMask()
  const toast = useToast()

  const [selectedState, setSelectedState] = useState('')
  const [isCNPJ, setIsCNPJ] = useState(true);

  const states = useStatesQuery()
  const cities = useCitiesQuery(selectedState)

  const handleSelectUserType = () => {
    setIsCNPJ(!isCNPJ)
    reset()
  }  

  const handleSelectState = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setSelectedState(value)
    clearErrors(['estado', 'cidade'])
    return value
  }

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    clearErrors('cidade')
    return value
  }

  const { handleSubmit, formState, register, reset, clearErrors, setError, setFocus } =
    useForm<HandleNewUser>({
      resolver: yupResolver(newUserSchema),
    });

  const { errors, isDirty, isSubmitting } = formState;

  const createUserMutation = useCreateUserMutation()

  const handleNewUser: SubmitHandler<HandleNewUser> = async values => {
    const {
      nome,
      razao_social,
      telefone,
      celular,
      email,
      cpf_cnpj,
      rg_ie,
      contato,
      endereco,
      bairro,
      cidade,
      estado,
      cep,
      complemento,
      outras_informacoes,
    } = values

    const userData: NewUser = {
      user_id: session.user.id,      
      natureza_cliente: isCNPJ ? 'Jurídica' : 'Física',
      nome,
      razao_social,
      telefone,
      celular,
      email,
      cpf_cnpj,
      rg_ie,
      contato,
      outras_informacoes,
    }

    const addressData: Omit<NewAddress, 'user_id'> = {
      endereco,
      bairro,
      cidade,
      estado,
      cep,
      complemento,
      principal: true      
    }
    
    try {      
      await createUserMutation.mutateAsync({ userData, addressData })

      toast({
        title: 'Cliente cadastrado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
      })

      router.push('/users')

    } catch (error) {
      toast({        
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })

    }
  };

  const handleCancel = () => {
    reset()
    router.push('/users')
    return
  };

  useEffect(() => {
    setFocus('nome')
    
  }, [setFocus])

  return (
    <Flex
      as="form"
      flexDir="column"
      onSubmit={handleSubmit(handleNewUser)}
    >
      <Stack spacing={3}>        
        <RadioGroup value={isCNPJ ? 'Jurídica' : 'Física'} onChange={handleSelectUserType} mb="4">                
          <HStack spacing={3}>
            <Text color="gray.600" fontWeight="medium" mr="4">Tipo de pessoa: </Text>
            <Radio name="Jurídica" value="Jurídica">Jurídica</Radio>
            <Radio name="Física" value="Física">Física</Radio>
          </HStack>
        </RadioGroup>
        <HStack spacing={3} align="flex-start">
          <Input
            name="nome"
            label="Nome:"            
            error={errors.nome}
            {...register("nome")}
          />
          { isCNPJ &&
            <Input
              name="razao_social"
              label="Razão Social:"              
              error={errors.razao_social}
              {...register("razao_social")}
            />

          }
        </HStack>
        <HStack spacing={3}  align="flex-start">
          <Input
            name="telefone"
            label="Telefone:"
            placeholder='## ####-####'
            type="tel"
            inputMode="numeric"
            autoComplete="phone-number"            
            error={errors.telefone}
            {...register("telefone")}
            onChange={({ target}) => target.value = masked.phone(target.value)}
          />
          <Input
            name="celular"
            label="Celular:"
            placeholder='## ####-####'
            type="tel"
            inputMode="numeric"
            autoComplete="cel-number"            
            error={errors.celular}
            {...register("celular")}
            onChange={({ target}) => target.value = masked.celphone(target.value)}
          />
          <Input
            name="email"
            type="email"
            label="E-mail:"            
            error={errors.email}
            {...register("email")}
          />
        </HStack>
        <HStack spacing={3}  align="flex-start">
          <Input
            name="cpf_cnpj"
            label={isCNPJ ? 'CNPJ:' : 'CPF:' }            
            error={errors.cpf_cnpj}
            {...register("cpf_cnpj")}
            onChange={({ target}) => target.value = isCNPJ ? masked.cnpj(target.value) : masked.cpf(target.value)}
          />
          <Input
            name="rg_ie"
            label={ isCNPJ ? 'Inscrição Estadual:' : 'RG:' }            
            error={errors.rg_ie}
            {...register("rg_ie")}
            onChange={({ target }) => target.value = isCNPJ ? target.value : masked.rg(target.value)}
          />          
          <Input
            name="contato"
            label="Contato:"            
            error={errors.contato}
            {...register("contato")}
          />          
        </HStack>
        <HStack
          spacing={3}
          display="flex"
          alignItems="flex-start"
          w="100%"
          pt="4"
        >
          <Input
            name="endereco"
            label="Endereço:"            
            error={errors.endereco}
            {...register("endereco")}
          />
          <Box w="40%">
            <Input
              name="bairro"
              label="Bairro:"              
              error={errors.bairro}
              {...register("bairro")}
            />
          </Box>
        </HStack>
        <HStack
          spacing={3}
          display="flex"
          alignItems="flex-start"
          w="100%"
        >
          <Select
            name="estado"
            label="Estado:"  
            isLoading={states.isFetching}          
            error={errors.estado}
            defaultValue="defaultValue"
            {...register("estado")}
            onChange={handleSelectState}
          >
            <option value="defaultValue" hidden aria-readonly>
              Selecione um estado...
            </option>
            { states.isFetching && <option>Carregando...</option> }
            { states.data?.map(({ id, sigla, nome }) => {
              return (
                <option key={id} value={sigla}>
                  {nome}
                </option>
              );
            }) }
          </Select>
          <Select
            name="cidade"
            label="Cidade:"   
            isLoading={cities.isFetching}    
            isDisabled={!selectedState}     
            error={errors.cidade}
            defaultValue="defaultValue"
            {...register("cidade")}
            onChange={handleSelectCity}
          >
            <option value="defaultValue" hidden aria-readonly>
              Selecione uma cidade...
            </option>
            {cities.data?.map(({ id, nome }) => {
              return <option key={id}>{nome}</option>;
            })}
          </Select>
          
          <Input
            name="cep"
            label="CEP:"            
            error={errors.cep}
            {...register("cep")}
            onChange={({ target }) => target.value = masked.cep(target.value)}
          />
        </HStack>
        <Input
          name="complemento"
          label="Complemento:"          
          error={errors.complemento}
          {...register("complemento")}
        />
        <Input
          as="textarea"
          h="120px"
          p="3"
          name="outras_informacoes"
          label="Outras Informações:"          
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
          Cadastrar
        </Button>
      </HStack>
    </Flex>
  );
}

export { CreateUserForm }
