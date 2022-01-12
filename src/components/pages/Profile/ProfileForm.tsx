import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from 'next/router'

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUpdateProfileMutation } from "../../../hooks/useUpdateProfileMutation";
import { useStatesQuery } from "../../../hooks/useStatesQuery";
import { InputMask } from "../../../utils/inputMasksHandler";

import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";

import {
  Box,
  Button,
  Flex,  
  Stack,
  HStack,  
  useToast,
} from "@chakra-ui/react"

const profileFormSchema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório").trim(),
  razao_social: yup.string().trim().nullable(),
  telefone: yup.string().trim().nullable(),
  celular: yup.string().required('O celular é obrigatório').trim(),
  email: yup.string().required('O e-mail é obrigatório').email().trim(),
  cpf_cnpj: yup.string().trim().nullable(),
  rg_ie: yup.string().trim().nullable(),
  endereco: yup.string().required("O endereço é obrigatório").trim(),
  bairro: yup.string().required("O bairro/distrito é obrigatório").trim(),
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
  cep: yup.string().trim().nullable(),
  complemento: yup.string().trim().nullable(),  
});

import { NewProfile } from "../../../hooks/useSignUpMutation";
import { Profile } from "../../../hooks/useProfileQuery";
import { NewAddress } from "../../../hooks/useCreateAddressMutation";
import { Address } from "../../../hooks/useAddressQuery";
import { useCitiesQuery } from "../../../hooks/useCitiesQuery";

type HandleUpdateProfile = NewProfile & NewAddress

type Props = {
  profile: {
    data: Profile;
    address: Address
  };  
}

const ProfileForm = ({ profile }: Props) => {
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

  const { errors, isDirty, isSubmitting } = formState;

  const handleSelectState = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget
    setSelectedState(value)
    clearErrors(['estado', 'cidade'])
    setValue('cidade', 'defaultValue')
    return value
  }

  const updateProfileMutation = useUpdateProfileMutation()
  
  const handleUpdateProfile: SubmitHandler<HandleUpdateProfile> = async (values) => {
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

    const profileData = {
      ...profile.data,      
      nome,
      razao_social,
      telefone,
      celular,
      email,
      cpf_cnpj,
      rg_ie,
    }

    const profileAddress = {
      ...profile.address,
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
        title: 'Perfil atualizado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })

      router.push('/dashboard')

    } catch (error) {
      toast({        
        title: 'Um erro ocorreu ao atualizar os dados do seu perfil. Tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  };

  useEffect(() => {
    const { cidade, estado } = profile.address
    estado && setSelectedState(estado)
    cidade && reset({ cidade })

    return () => setSelectedState('')

  }, [profile.address, reset])

  return (
    <Flex
      as="form"
      flexDir="column"
      onSubmit={handleSubmit(handleUpdateProfile)}
    >
      <Stack spacing={3}>
        <HStack spacing={3} align="flex-start">
          <Input
            name="nome"
            label="Nome:"
            defaultValue={profile.data.nome}
            error={errors.nome}
            {...register("nome")}
          />          
          <Input
            name="razao_social"
            label="Razão Social:"
            defaultValue={profile.data.razao_social}
            error={errors.razao_social}
            {...register("razao_social")}
          />
        </HStack>
        <HStack spacing={3} align="flex-start">
          <Input
            name="telefone"
            label="Telefone:"
            defaultValue={profile.data.telefone}
            error={errors.telefone}
            {...register("telefone")}
            onChange={({ currentTarget }) => currentTarget.value = masked.phone(currentTarget.value)}
          />
          <Input
            name="celular"
            label="Celular:"
            defaultValue={profile.data.celular}
            error={errors.celular}
            {...register("celular")}
            onChange={({ currentTarget }) => currentTarget.value = masked.celphone(currentTarget.value)}
          />
          <Input
            name="email"
            type="email"
            label="E-mail:"
            defaultValue={profile.data.email}
            error={errors.email}
            {...register("email")}
          />
        </HStack>
        <HStack spacing={3} align="flex-start">
          <Input
            name="cpf_cnpj"
            label="CNPJ:"
            defaultValue={profile.data.cpf_cnpj}
            error={errors.cpf_cnpj}
            {...register("cpf_cnpj")}
            onChange={({ currentTarget }) => currentTarget.value = masked.cnpj(currentTarget.value)}
          />
          <Input
            name="rg_ie"
            label="Inscrição Estadual:"
            defaultValue={profile.data.rg_ie}
            error={errors.rg_ie}
            {...register("rg_ie")}
          /> 
        </HStack>
        <HStack spacing={3} align="flex-start">
          <Input
            name="endereco"
            label="Endereço:"
            defaultValue={profile.address.endereco}
            error={errors.endereco}
            {...register("endereco")}
          />
          <Box w="40%">
            <Input
              name="bairro"
              label="Bairro:"
              defaultValue={profile.address.bairro}
              error={errors.bairro}
              {...register("bairro")}
            />
          </Box>
        </HStack>
        <HStack spacing={3} align="flex-start">
          <Select
            name="estado"
            label="Estado:"
            isLoading={states.isFetching}
            defaultValue={profile.address.estado ? profile.address.estado : 'defaultValue'}
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
            isDisabled={!selectedState}
            defaultValue="defaultValue"
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
            defaultValue={profile.address.cep}
            error={errors.cep}
            {...register("cep")}
            onChange={({ currentTarget }) => currentTarget.value = masked.cep(currentTarget.value)}
          />
        </HStack>
        <Input
          name="complemento"
          label="Complemento:"
          defaultValue={profile.address.complemento}
          error={errors.complemento}
          {...register("complemento")}
        />
      </Stack>
      <HStack spacing={3} justifyContent="flex-end" my={4}>        
        <Button        
          type="reset"
          colorScheme="blue"
          variant="ghost"
          onClick={() => router.push('/dashboard')}          
        >Cancelar</Button>
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          isDisabled={!isDirty}
        >Salvar alterações</Button>
      </HStack>      
    </Flex>
  );
}

export { ProfileForm }
