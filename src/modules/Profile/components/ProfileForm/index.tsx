import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from 'next/router'

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {  
  Stack,   
  useToast,
  ButtonGroup,  
} from "@chakra-ui/react"

import { 
  Content,
  Section,  
  SectionTitle,
  Input,
  Select,
  ButtonSecondary,
  ButtonPrimary,
  Form,   
} from "../../../../components";

import { 
  useUpdateProfileMutation,
  useCitiesQuery,
  useStatesQuery,
} from "../../../../hooks"

import { InputMask } from "../../../../utils";

import { 
  Profile, 
  CreateProfile, 
  CreateAddress, 
  Address, 
} from "../../../../models";

const profileFormSchema = yup.object().shape({
  nome: yup.string()
    .required("O nome é obrigatório")
    .min(5, 'O nome deve ter no mínimo 5 caracteres')
    .max(120, 'O nome não deve ultrapassar 120 caracteres')
    .trim(),
  razao_social: yup.string().trim().nullable(),
  telefone: yup.string().trim().nullable(),
  celular: yup.string()
    .required('O celular é obrigatório')
    .trim(),
  email: yup.string()
    .required('O e-mail é obrigatório')
    .email('Formato de e-mail inválido')
    .trim(),
  cpf_cnpj: yup.string().trim().nullable(),
  rg_ie: yup.string().trim().nullable(),
  endereco: yup.string()
    .required("O endereço é obrigatório")
    .min(5, 'O endereço deve ter no mínimo 5 caracteres')
    .max(120, 'O endereço não deve ultrapassar 120 caracteres')
    .trim(),
  bairro: yup.string()
    .required("O bairro/distrito é obrigatório")
    .min(5, 'O bairro deve ter no mínimo 5 caracteres')
    .max(120, 'O bairro não deve ultrapassar 120 caracteres')
    .trim(),
  estado: yup.string()
    .required('O estado é obrigatório')
    .test({
      message: "O estado é obrigatório",
      test: value => value !== "defaultValue",
    })
    .trim(),
  cidade: yup.string()
    .required('Selecione um estado')
    .test({
      message: "A cidade é obrigatória",
      test: value => value !== "defaultValue",
    })
    .trim(),
  cep: yup.string().trim().nullable(),
  complemento: yup.string().trim().nullable(),  
});

type HandleUpdateProfile = CreateProfile & CreateAddress

type Props = {  
  profile: Profile;
  address: Address;
}

const ProfileForm = ({ profile, address }: Props) => {
  const toast = useToast()
  const router = useRouter()    
  const masked = new InputMask()  
  
  const [selectedState, setSelectedState] = useState('')

  const states = useStatesQuery()
  const cities = useCitiesQuery(selectedState)      

  const { 
    handleSubmit, 
    formState, 
    register,
    reset,
    clearErrors,
    setValue
  } = useForm<HandleUpdateProfile>({
      resolver: yupResolver(profileFormSchema)      
    });

  const { errors, isSubmitting } = formState;

  const handleSelectState = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setSelectedState(value)
    clearErrors(['estado', 'cidade'])
    setValue('cidade', 'defaultValue')
    return value
  }

  const updateProfileMutation = useUpdateProfileMutation()
  
  const handleUpdateProfile: SubmitHandler<HandleUpdateProfile> = async values => {
    const {      
      nome,
      razao_social,
      telefone,
      celular,
      email,
      cpf_cnpj,
      rg_ie,
      endereco,
      bairro,
      cidade,
      estado,
      cep,
      complemento
    } = values

    const profileData: Profile = {
      ...profile,      
      nome,
      razao_social,
      telefone,
      celular,
      email,
      cpf_cnpj,
      rg_ie,
    }

    const profileAddress: Address = {
      ...address,
      endereco,
      bairro,
      cidade,
      estado,
      cep,
      complemento,
      principal: true      
    }
    
    try {      
      await updateProfileMutation.mutateAsync({ profileData, profileAddress })

      toast({
        title: 'Sucesso!',
        description: 'Perfil atualizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
      })

      router.push('/dashboard')

    } catch (error) {
      toast({ 
        title: 'Ocorreu um erro!',        
        description: 'Não foi possível atualizar os dados do seu perfil.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
    }
  };

  useEffect(() => {
    if(address.estado) {
      setSelectedState(address.estado)
      reset({ 
        estado: address.estado,
        cidade: address.cidade
      })
    }

    return () => setSelectedState('')

  }, [address, reset])

  return (
    <Form onSubmit={handleSubmit(handleUpdateProfile)} w="100%">      
      <Section>        
        <SectionTitle title="Dados cadastrais"/>        
        <Content>
          <Stack spacing={3}>
            <Stack spacing={3} align="flex-start">
              <Input
                name="nome"
                label="Nome:"                
                defaultValue={profile.nome}
                isDisabled={isSubmitting}
                error={errors.nome}
                {...register("nome")}
              />          
              <Input
                name="razao_social"
                label="Razão Social:"
                defaultValue={profile.razao_social}
                isDisabled={isSubmitting}
                error={errors.razao_social}
                {...register("razao_social")}
              />
            </Stack>
            <Stack spacing={3} align="flex-start">
              <Input
                name="telefone"
                type="tel"
                label="Telefone:"                
                defaultValue={profile.telefone}     
                isDisabled={isSubmitting}           
                error={errors.telefone}
                {...register("telefone")}
                onChange={({ target }) => target.value = masked.phone(target.value)}
              />
              <Input
                name="celular"
                type="tel"
                label="Celular:"                                
                defaultValue={profile.celular}
                isDisabled={isSubmitting}
                error={errors.celular}
                {...register("celular")}
                onChange={({ target }) => target.value = masked.celphone(target.value)}
              />
              <Input
                name="email"
                type="email"
                label="E-mail:"                                                
                defaultValue={profile.email}
                isDisabled={isSubmitting}
                error={errors.email}
                {...register("email")}
              />
            </Stack>
            <Stack spacing={3} align="flex-start">
              <Input
                name="cpf_cnpj"
                label="CNPJ:"
                type="tel"                
                defaultValue={profile.cpf_cnpj}
                isDisabled={isSubmitting}
                error={errors.cpf_cnpj}
                {...register("cpf_cnpj")}
                onChange={({ target }) => target.value = masked.cnpj(target.value)}
              />
              <Input
                name="rg_ie"
                type="tel"
                label="Inscrição Estadual:"                
                defaultValue={profile.rg_ie}
                isDisabled={isSubmitting}
                error={errors.rg_ie}
                {...register("rg_ie")}
              /> 
            </Stack>
          </Stack>
        </Content>
      
        <SectionTitle title="Endereço"/>        
        <Content>
          <Stack spacing={3}>
          <Stack spacing={3} align="flex-start">
              <Input
                name="endereco"
                label="Endereço:"                
                defaultValue={address.endereco}
                isDisabled={isSubmitting}
                error={errors.endereco}
                {...register("endereco")}
              />
              <Input
                name="bairro"
                label="Bairro:"                  
                defaultValue={address.bairro}
                isDisabled={isSubmitting}
                error={errors.bairro}
                {...register("bairro")}
              />              
            </Stack>
            <Stack spacing={3} align="flex-start">
              <Select
                name="estado"
                label="Estado:"                
                isLoading={states.isFetching}
                defaultValue={address?.estado ?? 'defaultValue'}
                isDisabled={isSubmitting}
                error={errors.estado}
                {...register("estado")}
                onChange={handleSelectState}
              >
                <option value="defaultValue" hidden aria-readonly>Selecione um estado...</option>
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
                isLoading={cities.isLoading}
                isDisabled={!selectedState || isSubmitting}
                defaultValue={cities ? address?.cidade : 'defaultValue'}
                error={errors.cidade}
                {...register("cidade")}
              >
                <option value="defaultValue" hidden aria-readonly>Selecione uma cidade...</option>
                { cities.data?.map(({ id, nome }) => {
                  return <option key={id} value={nome}>{nome}</option>;
                }) }
              </Select>
              
              <Input
                name="cep"
                label="CEP:"
                type="tel"                
                defaultValue={address.cep}
                isDisabled={isSubmitting}
                error={errors.cep}
                {...register("cep")}
                onChange={({ target }) => target.value = masked.cep(target.value)}
              />
            </Stack>
            <Input
              name="complemento"
              label="Complemento:"
              defaultValue={address.complemento}
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
            onClick={() => router.push('/dashboard')}          
          >Cancelar</ButtonSecondary>
          <ButtonPrimary
            type="submit"          
            isLoading={isSubmitting}          
          >Salvar alterações</ButtonPrimary>
        </ButtonGroup>

      </Section>
     
      
    </Form>      
  );
}

export { ProfileForm }
