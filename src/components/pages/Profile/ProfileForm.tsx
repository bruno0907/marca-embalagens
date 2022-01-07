import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/router'

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUpdateProfileMutation } from "../../../hooks/useUpdateProfileMutation";
import { useStatesQuery } from "../../../hooks/useStatesQuery";
import { getCities } from "../../../services/getCities";
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
  Skeleton
} from "@chakra-ui/react"

const profileFormSchema = yup.object().shape({
  nome: yup.string().required("É necessário informar um nome").trim(),
  razao_social: yup.string().trim().nullable(),
  telefone: yup.string().trim().nullable(),
  celular: yup.string().required('Informe um número de celular').trim().nullable(),
  email: yup.string().email().trim().nullable(),
  cpf_cnpj: yup.string().trim().nullable(),
  rg_ie: yup.string().trim().nullable(),
  endereco: yup.string().required("O endereço precisa ser informado").trim().nullable(),
  bairro: yup.string().required("Informe o bairro ou distrito").trim().nullable(),
  estado: yup.string().test({
      message: "É preciso selecionar um estado",
      test: value => value !== "default",
    }).required().trim().nullable(),
  cidade: yup.string().test({
      message: "Selecione uma cidade",
      test: value => value !== "default",
    }).required("Você precisa selecionar um estado").trim().nullable(),
  cep: yup.string().trim().nullable(),
  complemento: yup.string().trim().nullable(),  
});

import {         
  AddressProps,
  NewAddressProps,
  NewProfileProps,
  ProfileProps,  
  CityProps
} from "../../../types";

type HandleUpdateProfileProps = NewProfileProps & NewAddressProps

type ProfileFormProps = {
  profile: {
    data: ProfileProps;
    address: AddressProps
  };
  isFetching: boolean;
}

const ProfileForm = ({ profile, isFetching }: ProfileFormProps) => {
  const toast = useToast()
  const router = useRouter()    
  const masked = new InputMask()
  
  const [cities, setCities] = useState<CityProps[]>([])

  const states = useStatesQuery()      

  const { 
    handleSubmit, 
    formState, 
    register, 
    
    reset
  } = useForm<HandleUpdateProfileProps>({
      resolver: yupResolver(profileFormSchema)      
    });

  const { errors, isDirty, isSubmitting } = formState;

  const updateProfileMutation = useUpdateProfileMutation()
  
  const handleUpdateProfile: SubmitHandler<HandleUpdateProfileProps> = async (values) => {
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

  const fetchCities = useCallback( async (uf: string) => {
    const { data } = await getCities(uf)

    setCities(data)
  }, [])  

  useEffect(() => {
    if(profile) {
      fetchCities(profile.address.estado || 'default')
        .then(() => reset({
          nome: profile.data.nome,
          razao_social: profile.data.razao_social,
          telefone: profile.data.telefone,
          celular: profile.data.celular,
          email: profile.data.email,
          cpf_cnpj: profile.data.cpf_cnpj,
          rg_ie: profile.data.rg_ie,
          endereco: profile.address.endereco,
          bairro: profile.address.bairro,
          estado: profile.address.estado || 'default',
          cidade: profile.address.cidade,
          cep: profile.address.cep,
          complemento: profile.address.complemento,
          })
        )
        .catch(err => console.log(err))
    }

    return () => {
      setCities([])
    }

  }, [profile, reset, fetchCities])

  if(isFetching && !profile) {
    return (      
      <Stack spacing={3}>
        <HStack spacing={3}>
          <Skeleton h="10" w="100%" borderRadius="md"/>
          <Skeleton h="10" w="100%" borderRadius="md"/>
        </HStack>
        <HStack spacing={3}>
          <Skeleton h="10" w="100%" borderRadius="md"/>
          <Skeleton h="10" w="100%" borderRadius="md"/>
          <Skeleton h="10" w="100%" borderRadius="md"/>
        </HStack>
        <HStack spacing={3}>
          <Skeleton h="10" w="100%" borderRadius="md"/>
          <Skeleton h="10" w="100%" borderRadius="md"/>
        </HStack>
        <HStack spacing={3}>
          <Skeleton h="10" w="100%" borderRadius="md"/>
          <Box w="40%">
            <Skeleton h="10" w="100%" borderRadius="md"/>
          </Box>
        </HStack>
        <HStack spacing={3}>
          <Skeleton h="10" w="100%" borderRadius="md"/>
          <Skeleton h="10" w="100%" borderRadius="md"/>
          <Skeleton h="10" w="100%" borderRadius="md"/>
        </HStack>
      </Stack>
    )
  }  
  
  return (
    <Flex
      as="form"
      flexDir="column"
      onSubmit={handleSubmit(handleUpdateProfile)}
    >
      <Stack spacing={3}>
        <HStack spacing={3}>
          <Input
            name="nome"
            label="Nome:"
            error={errors.nome}
            {...register("nome")}
          />          
          <Input
            name="razao_social"
            label="Razão Social:"
            error={errors.razao_social}
            {...register("razao_social")}
          />
        </HStack>
        <HStack spacing={3}>
          <Input
            name="telefone"
            label="Telefone:"
            error={errors.telefone}
            {...register("telefone")}
            onChange={({ currentTarget }) => currentTarget.value = masked.phone(currentTarget.value)}
          />
          <Input
            name="celular"
            label="Celular:"
            error={errors.celular}
            {...register("celular")}
            onChange={({ currentTarget }) => currentTarget.value = masked.celphone(currentTarget.value)}
          />
          <Input
            name="email"
            type="email"
            label="E-mail:"
            error={errors.email}
            {...register("email")}
          />
        </HStack>
        <HStack spacing={3}>
          <Input
            name="cpf_cnpj"
            label="CNPJ:"
            error={errors.cpf_cnpj}
            {...register("cpf_cnpj")}
            onChange={({ currentTarget }) => currentTarget.value = masked.cnpj(currentTarget.value)}
          />
          <Input
            name="rg_ie"
            label="Inscrição Estadual:"
            error={errors.rg_ie}
            {...register("rg_ie")}
          /> 
        </HStack>
        <HStack spacing={3}>
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
        <HStack spacing={3}>
          <Select
            name="estado"
            label="Estado:"
            defaultValue="default"            
            error={errors.estado}
            {...register("estado")}
            onChange={(event) => fetchCities(event.currentTarget.value)}
          >{ states.isFetching && <option>Carregando...</option> }
            <option value="default" hidden aria-readonly>Selecione um estado...</option>
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
            defaultValue="default"
            error={errors.cidade}
            {...register("cidade")}
          >{!cities && <option>Carregando...</option>}
            <option value="default" hidden aria-readonly>Selecione uma cidade...</option>
            { cities.map(({ id, nome }) => {
              return <option key={id} value={nome}>{nome}</option>;
            }) }
          </Select>
          
          <Input
            name="cep"
            label="CEP:"
            error={errors.cep}
            {...register("cep")}
            onChange={({ currentTarget }) => currentTarget.value = masked.cep(currentTarget.value)}
          />
        </HStack>
        <Input
          name="complemento"
          label="Complemento:"
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
