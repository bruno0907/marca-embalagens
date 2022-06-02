import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,  
  Stack,
  HStack,
  Text,
  useToast,
  Radio,
  RadioGroup,
  ButtonGroup,  
} from "@chakra-ui/react"

import { 
  Input,
  Select,
  Section,  
  SectionTitle,
  Content,
  Form,
  Header,
  Divider,
  ButtonSecondary,
  ButtonPrimary 
} from "../../components";

import { InputMask } from "../../utils";

import { useAuth } from '../../contexts/useAuth'

import { 
  useCreateUserMutation,
  useStatesQuery,
  useCitiesQuery 
} from "../../hooks";

import { CreateAddress, CreateUser } from "../../models";

const newUserSchema= yup.object().shape({
  nome: yup.string()
    .required("O nome do cliente é obrigatório")
    .min(5, 'O nome deve ter no mínimo 5 caracteres')
    .max(120, 'O nome não deve ultrapassar 120 caracteres')
    .trim(),
  razao_social: yup.string().trim(),
  telefone: yup.string().trim(),
  celular: yup.string().trim(),
  email: yup.string()
    .email('E-mail inválido')
    .trim(),
  cpf_cnpj: yup.string().trim(),
  rg_ie: yup.string().trim(),
  contato: yup.string().trim(),  
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
  outras_informacoes: yup.string().trim(),
})

type HandleNewUser = CreateUser & CreateAddress

export const CreateUserModule = () => {  
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

  const { errors, isSubmitting } = formState;

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

    const userData: CreateUser = {
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

    const addressData: Omit<CreateAddress, 'user_id'> = {
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
    <>
      <Header withGoBack title="Novo cliente" />
      <Divider />
      <Form onSubmit={handleSubmit(handleNewUser)} spacing={12}>
        <Section>          
          <SectionTitle title="Dados cadastrais"/>          
          <Content>
            <Stack spacing={3}>
              <RadioGroup value={isCNPJ ? 'Jurídica' : 'Física'} onChange={handleSelectUserType} mb={4}>                
                <HStack spacing={3}>
                  <Text color="gray.600" fontSize={['sm', 'sm', 'initial']} fontWeight="medium">Tipo de pessoa: </Text>
                  <Radio name="Jurídica" value="Jurídica">
                    <Text fontSize={['sm', 'sm', 'initial']}>Jurídica</Text>
                  </Radio>
                  <Radio name="Física" value="Física">
                    <Text fontSize={['sm', 'sm', 'initial']}>Física</Text>
                  </Radio>
                </HStack>
              </RadioGroup>
              <Stack direction={['column', 'column', 'row']} spacing={3} align="flex-start">
                <Input
                  name="nome"
                  label="Nome:*"
                  isDisabled={isSubmitting}            
                  error={errors.nome}
                  {...register("nome")}
                />
                { isCNPJ &&
                  <Input
                    name="razao_social"
                    label="Razão Social:"
                    isDisabled={isSubmitting}              
                    error={errors.razao_social}
                    {...register("razao_social")}
                  />

                }
              </Stack>
              <Stack direction={['column', 'column', 'row']} spacing={3} align="flex-start">
                <Input
                  name="telefone"
                  label="Telefone:"                  
                  type="tel"
                  inputMode="numeric"
                  autoComplete="phone-number"
                  isDisabled={isSubmitting}            
                  error={errors.telefone}
                  {...register("telefone")}
                  onChange={({ target}) => target.value = masked.phone(target.value)}
                />
                <Input
                  name="celular"
                  label="Celular:"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="cel-number"
                  isDisabled={isSubmitting}            
                  error={errors.celular}
                  {...register("celular")}
                  onChange={({ target}) => target.value = masked.celphone(target.value)}
                />
                <Input
                  name="email"
                  type="email"
                  label="E-mail:" 
                  isDisabled={isSubmitting}           
                  error={errors.email}
                  {...register("email")}
                />
              </Stack>
              <Stack direction={['column', 'column', 'row']} spacing={3} align="flex-start">
                <Input
                  name="cpf_cnpj"
                  label={isCNPJ ? 'CNPJ:' : 'CPF:' }
                  type="tel"                  
                  inputMode="numeric"
                  isDisabled={isSubmitting}
                  error={errors.cpf_cnpj}
                  {...register("cpf_cnpj")}
                  onChange={({ target}) => target.value = isCNPJ ? masked.cnpj(target.value) : masked.cpf(target.value)}
                />
                <Input
                  name="rg_ie"
                  label={ isCNPJ ? 'Inscrição Estadual:' : 'RG:' }
                  isDisabled={isSubmitting}            
                  error={errors.rg_ie}
                  {...register("rg_ie")}
                  onChange={({ target }) => target.value = isCNPJ ? target.value : masked.rg(target.value)}
                />          
                <Input
                  name="contato"
                  label="Contato:"
                  isDisabled={isSubmitting}            
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
                error={errors.outras_informacoes}
                {...register("outras_informacoes")}
              />
            </Stack>
          </Content>
          
          <SectionTitle title="Endereço"/>          
          <Content>
            <Stack spacing={3}>        
              <Stack direction={['column', 'column', 'row']} spacing={3} align="flex-start">
                <Input
                  name="endereco"
                  label="Endereço:*"
                  isDisabled={isSubmitting}            
                  error={errors.endereco}
                  {...register("endereco")}
                />
                <Box w={['100%', '100%', "50%"]}>
                  <Input
                    name="bairro"
                    label="Bairro:*"
                    isDisabled={isSubmitting}              
                    error={errors.bairro}
                    {...register("bairro")}
                  />
                </Box>
              </Stack>
              <Stack direction={['column', 'column', 'row']} spacing={3} align="flex-start">
                <Select
                  name="estado"
                  label="Estado:*"
                  isDisabled={isSubmitting}  
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
                  label="Cidade:*"                     
                  isLoading={cities.isFetching}    
                  isDisabled={!selectedState || isSubmitting}     
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
                  isDisabled={isSubmitting}            
                  error={errors.cep}
                  {...register("cep")}
                  onChange={({ target }) => target.value = masked.cep(target.value)}
                />
              </Stack>
              <Input
                name="complemento"
                label="Complemento:"
                isDisabled={isSubmitting}          
                error={errors.complemento}
                {...register("complemento")}
              />
            </Stack>
          </Content>

          <ButtonGroup alignSelf="flex-end">
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
              Cadastrar
            </ButtonPrimary>
          </ButtonGroup>
        </Section>        
      </Form>
    </>
  );
}
