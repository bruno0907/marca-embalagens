import { ChangeEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../../Input";
import { Select } from "../../Select";
import { Section } from "../../Section";

import { NewAddress } from "../../../hooks/useCreateAddressMutation";
import { useCitiesQuery } from "../../../hooks/useCitiesQuery";
import { NewSupplier, useCreateSupplierMutation } from "../../../hooks/useCreateSupplierMutation";

import { useAuth } from "../../../contexts/useAuth";
import { useStatesQuery } from "../../../hooks/useStatesQuery";

import { InputMask } from "../../../utils/inputMasksHandler";

import {
  Box,
  Button,
  Stack,
  HStack,
  Text,
  useToast,
  Radio,
  RadioGroup,
  FormLabel,  
} from "@chakra-ui/react"
import { SectionHeader } from "../../SectionHeader";
import { SectionTitle } from "../../SectionTitle";
import { Content } from "../../Content";

const newSupplierSchema = yup.object().shape({
  nome: yup.string()
    .required("O nome do fornecedor é obrigatório")
    .min(5, 'O nome deve ter no mínimo 5 caracteres')
    .max(120, 'O nome não deve ultrapassar 120 caracteres')
    .trim(),
  razao_social: yup.string().trim(),
  produto: yup.string().trim(),
  telefone: yup.string().trim(),
  celular: yup.string()
    .required('O celular é obrigatório')
    .trim(),
  email: yup.string()
    .email('E-mail inválido')
    .trim(),
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
});

type HandleNewSupplier = NewSupplier & NewAddress

const CreateSupplierForm = () => {
  const { session } = useAuth()  
  const router = useRouter()
  const toast = useToast()
  const masked = new InputMask()

  const [selectedState, setSelectedState] = useState('')
  const [isCNPJ, setIsCNPJ] = useState(true);

  const states = useStatesQuery()
  const cities = useCitiesQuery(selectedState)  

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

  const handleIsCNPJ = () => {
    setIsCNPJ(!isCNPJ)
    reset()
  }

  const handleCancel = () => {
    reset()     
    router.push('/suppliers')
    return
  };

  const { handleSubmit, formState, register, reset, clearErrors, setError, setFocus } =
    useForm<HandleNewSupplier>({
      resolver: yupResolver(newSupplierSchema),
    });

  const { errors, isDirty, isSubmitting } = formState;


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

    const supplierData: NewSupplier = {
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
    <Stack as="form" onSubmit={handleSubmit(handleNewUser)} spacing={12}>
      <Section>
        <SectionHeader>
          <SectionTitle title="Dados cadastrais"/>
        </SectionHeader>
        <Content>
          <Stack spacing={3}>
            <RadioGroup value={isCNPJ ? 'Jurídica' : 'Física'} onChange={handleIsCNPJ} mb="4">                
              <HStack spacing={3}>
                <FormLabel m="0">Tipo de pessoa: </FormLabel>
                <Radio value="Jurídica">Jurídica</Radio>
                <Radio value="Física">Física</Radio>
              </HStack>
            </RadioGroup>
            <HStack spacing={3} align="flex-start">
              <Input
                name="nome"
                label="Nome:*"
                error={errors?.nome}
                {...register("nome")}
              />
              { isCNPJ &&
                <Input
                  name="razao_social"
                  label="Razão Social:"
                  error={errors?.razao_social}
                  {...register("razao_social")}
                />
              }
            </HStack>
            <Input
              name="Produto"
              label="Produto:"
              error={errors?.produto}
              {...register("produto")}
            />
            <HStack spacing={3} align="flex-start">
              <Input
                name="telefone"
                label="Telefone:"
                error={errors?.telefone}
                {...register("telefone")}
                onChange={({ target }) => target.value = masked.phone(target.value)}
              />
              <Input
                name="celular"
                label="Celular:*"
                error={errors?.celular}
                {...register("celular")}
                onChange={({ target }) => target.value = masked.celphone(target.value)}
              />
              <Input
                name="email"
                type="email"
                label="E-mail:"
                error={errors?.email}
                {...register("email")}
              />
            </HStack>
            <HStack spacing={3} align="flex-start">
              <Input
                name="cpf_cnpj"
                label={isCNPJ ? 'CNPJ:' : 'CPF:' }
                error={errors?.cpf_cnpj}
                {...register("cpf_cnpj")}
                onChange={({ target }) => target.value =  isCNPJ ? masked.cnpj(target.value) : masked.cpf(target.value)}
              />
              <Input
                name="rg_ie"
                label={ isCNPJ ? 'Inscrição Estadual:' : 'RG:' }
                error={errors?.rg_ie}
                {...register("rg_ie")}
              />          
              <Input
                name="contato"
                label="Contato:"
                error={errors?.contato}
                {...register("contato")}
              />          
            </HStack>
            <Input
              as="textarea"
              h="80px"
              p="3"
              name="outras_informacoes"
              label="Outras Informações:"
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
            <HStack spacing={3} alignItems="flex-start">
              <Input
                name="endereco"
                label="Endereço:*"
                error={errors?.endereco}
                {...register("endereco")}
              />
              <Box w="40%">
                <Input
                  name="bairro"
                  label="Bairro:"
                  error={errors?.bairro}
                  {...register("bairro")}
                />
              </Box>
            </HStack>
            <HStack spacing={3} alignItems="flex-start">
              <Select
                name="estado"
                label="Estado:*"
                isLoading={states.isFetching}
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
                isDisabled={!selectedState}
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
                error={errors?.cep}
                {...register("cep")}
                onChange={({ target }) => target.value = masked.cep(target.value)}
              />
            </HStack>
            <Input
              name="complemento"
              label="Complemento:"
              error={errors?.complemento}
              {...register("complemento")}
            />
          </Stack>
        </Content>
      </Section>

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

    </Stack>  
  );
}

export { CreateSupplierForm }
