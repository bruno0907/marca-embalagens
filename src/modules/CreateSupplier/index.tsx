import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,  
  Stack,
  HStack,  
  useToast,
  Radio,
  RadioGroup,  
  Text,  
} from "@chakra-ui/react"

import { 
  Input,
  Form,
  Header,
  Divider,
  Select,
  Section,
  SectionHeader,
  SectionTitle,
  Content,
  ButtonSecondary,
  ButtonPrimary
} from "../../components";

import { 
  useCitiesQuery,
  useStatesQuery,  
  useCreateSupplierMutation,
} from "../../hooks";

import { useAuth } from "../../contexts/useAuth";

import { InputMask } from "../../utils";

import { CreateAddress, CreateSupplier } from "../../models";

const newSupplierSchema = yup.object().shape({
  nome: yup.string()
    .required("O nome do cliente é obrigatório")
    .min(5, 'O nome deve ter no mínimo 5 caracteres')
    .max(120, 'O nome não deve ultrapassar 120 caracteres')
    .trim(),
  razao_social: yup.string().trim(),
  produto: yup.string().trim(),
  telefone: yup.string().trim(),
  celular: yup.string().trim(),
  email: yup.string().email('Formato de e-mail inválido').trim(),
  cpf_cnpj: yup.string().trim(),
  rg_ie: yup.string().trim(),
  contato: yup.string().trim(),
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
  estado: yup.string().required('O estado é obrigatório')
    .test({
      message: "O estado é obrigatório",
      test: value => value !== "defaultValue",
    }).trim(),
  cidade: yup.string().required('Selecione um estado')
    .test({
      message: "A cidade é obrigatória",
      test: value => value !== "defaultValue",
    }).trim(),
  cep: yup.string().trim(),
  complemento: yup.string().trim(),  
});

type HandleNewSupplier = CreateSupplier & CreateAddress

export const CreateSupplierModule = () => {
  const { session } = useAuth()  
  const router = useRouter()
  const toast = useToast()
  const masked = new InputMask()

  const [selectedState, setSelectedState] = useState('')
  const [isCNPJ, setIsCNPJ] = useState(true);

  const states = useStatesQuery()
  const cities = useCitiesQuery(selectedState)  

  const { handleSubmit, formState, register, reset, clearErrors, setFocus } =
  useForm<HandleNewSupplier>({
    resolver: yupResolver(newSupplierSchema),
  });

  const { errors, isSubmitting } = formState;

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

  const handleCancel = () => {
    reset()     
    router.push('/suppliers')
    return
  };

  const handleIsCNPJ = () => {
    setIsCNPJ(!isCNPJ)
    reset()
  }

  const newSupplierMutation = useCreateSupplierMutation()

  const handleNewUser: SubmitHandler<HandleNewSupplier> = async values => {
    const {
      nome,
      razao_social,
      produto,
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

    const supplierData: CreateSupplier = {
      user_id: session.user.id,      
      natureza_cliente: isCNPJ ? 'Jurídica' : 'Física',
      produto,
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
      await newSupplierMutation.mutateAsync({ supplierData, addressData })

      toast({
        title: 'Fornecedor cadastrado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
      })

      router.push('/suppliers')

    } catch (error) {
      toast({        
        title: 'Ocorreu um erro ao cadastrar o novo fornecedor',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })

    }
  };

  useEffect(() => {
    setFocus('nome')
    
  }, [setFocus])

  return (
    <>    
      <Header withGoBack title="Novo fornecedor" />
      <Divider />
      <Form onSubmit={handleSubmit(handleNewUser)}>
        <Section>
          <SectionHeader>
            <SectionTitle title="Dados cadastrais"/>
          </SectionHeader>
          <Content>
            <Stack spacing={3}>
              <RadioGroup value={isCNPJ ? 'Jurídica' : 'Física'} onChange={handleIsCNPJ} mb="4">                
                <HStack spacing={3}>
                  <Text fontWeight="medium" fontSize={['sm', 'sm', 'medium']}>Tipo de pessoa:</Text>
                  <Radio value="Jurídica">
                    <Text  fontSize={['sm', 'sm', 'initial']}>
                      Jurídica
                    </Text>
                  </Radio>
                  <Radio value="Física">
                    <Text  fontSize={['sm', 'sm', 'initial']}>
                      Física
                    </Text>
                  </Radio>
                </HStack>
              </RadioGroup>
              <Stack direction={['column','column', 'row']} spacing={3} align="flex-start">
                <Input
                  name="nome"
                  label="Nome:*"
                  isDisabled={isSubmitting}
                  error={errors?.nome}
                  {...register("nome")}
                />
                { isCNPJ &&
                  <Input
                    name="razao_social"
                    label="Razão Social:"
                    isDisabled={isSubmitting}
                    error={errors?.razao_social}
                    {...register("razao_social")}
                  />
                }
              </Stack>
              <Input
                name="Produto"
                label="Produto:"
                isDisabled={isSubmitting}
                error={errors?.produto}
                {...register("produto")}
              />
              <Stack direction={['column', 'column', 'row']} spacing={3} align="flex-start">
                <Input
                  name="telefone"
                  label="Telefone:"
                  isDisabled={isSubmitting}
                  error={errors?.telefone}
                  {...register("telefone")}
                  onChange={({ target }) => target.value = masked.phone(target.value)}
                />
                <Input
                  name="celular"
                  label="Celular:"
                  isDisabled={isSubmitting}
                  error={errors?.celular}
                  {...register("celular")}
                  onChange={({ target }) => target.value = masked.celphone(target.value)}
                />
                <Input
                  name="email"
                  type="email"
                  label="E-mail:"
                  isDisabled={isSubmitting}
                  error={errors?.email}
                  {...register("email")}
                />
              </Stack>
              <Stack direction={['column', 'column', 'row']} spacing={3} align="flex-start">
                <Input
                  name="cpf_cnpj"
                  label={isCNPJ ? 'CNPJ:' : 'CPF:' }
                  isDisabled={isSubmitting}
                  error={errors?.cpf_cnpj}
                  {...register("cpf_cnpj")}
                  onChange={({ target }) => target.value =  isCNPJ ? masked.cnpj(target.value) : masked.cpf(target.value)}
                />
                <Input
                  name="rg_ie"
                  label={ isCNPJ ? 'Inscrição Estadual:' : 'RG:' }
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
              </Stack>
              <Input
                as="textarea"
                h="80px"
                p="3"
                name="outras_informacoes"
                label="Outras Informações:"
                isDisabled={isSubmitting}
                error={errors?.outras_informacoes}
                {...register("outras_informacoes")}
              />
            </Stack>
          </Content>
        </Section>
        <Section>
          <SectionHeader>
            <SectionTitle title="Endereço"/>
          </SectionHeader>
          <Content>
            <Stack spacing={3}>
              <Stack direction={['column', 'column', 'row']} spacing={3} alignItems="flex-start">
                <Input
                  name="endereco"                  
                  label="Endereço:*"
                  isDisabled={isSubmitting}
                  error={errors?.endereco}
                  {...register("endereco")}
                />
                <Box w={['100%', '100%', '40%']}>
                  <Input
                    name="bairro"
                    label="Bairro:*"
                    isDisabled={isSubmitting}
                    error={errors?.bairro}
                    {...register("bairro")}
                  />
                </Box>
              </Stack>
              <Stack direction={['column', 'column','row']} spacing={3} alignItems="flex-start">
                <Select
                  name="estado"
                  label="Estado:*"
                  isLoading={states.isFetching}
                  isDisabled={isSubmitting}
                  error={errors?.estado}
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
                  })}
                </Select>
                <Select
                  name="cidade"
                  label="Cidade:*"
                  isLoading={cities.isFetching}                  
                  error={errors?.cidade}
                  isDisabled={!selectedState || isSubmitting}
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
                  error={errors?.cep}
                  {...register("cep")}
                  onChange={({ target }) => target.value = masked.cep(target.value)}
                />
              </Stack>
              <Input
                name="complemento"
                label="Complemento:"
                isDisabled={isSubmitting}
                error={errors?.complemento}
                {...register("complemento")}
              />
            </Stack>
          </Content>
        </Section>
        <HStack
          spacing={[3, 3, 6]}              
          justifyContent="flex-end"                    
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
            Cadastrar
          </ButtonPrimary>
        </HStack>
      </Form>  
    </>
  );
}
