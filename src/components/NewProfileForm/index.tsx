import { useCallback, useEffect, useState } from "react";

import axios from "axios";

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUpdateProfileMutation } from "../../hooks/useUpdateProfileMutation";

import { Input } from "../../components/Input";
import { Select } from "../../components/Select";

import {
  Box,
  Button,
  Flex,  
  Stack,
  HStack,
  Text,
  useToast,
  Skeleton
} from "@chakra-ui/react"

const newUserSchema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório").trim(),
  razao_social: yup.string().trim(),
  telefone: yup.string().trim(),
  celular: yup.string().required('O celular é obrigatório').trim(),
  email: yup.string().email().trim(),
  cpf_cnpj: yup.string().required('O CNPJ é obrigatório').trim(),
  rg_ie: yup.string().trim(),
  endereco: yup.string().required("O endereço é obrigatório").trim(),
  bairro: yup.string().required("O bairo/distrito é obrigatório"),
  estado: yup.string().required("Você deve selecionar um estado")
    .test({
      message: "Selecione um estado",
      test: value => value !== "default",
    }).trim(),
  cidade: yup.string().required("Você deve selecionar um estado")
    .test({
      message: "Você deve selecionar uma cidade",
      test: value => value !== "default",
    }).trim(),
  cep: yup.string().trim(),
  complemento: yup.string().trim(),  
});

import {       
  AddressProps,
  NewAddressProps,
  NewProfileProps,
  ProfileProps,  
} from "../../types";

type StateProps = {
  id: number;
  sigla: string;
  nome: string;
};

type CityProps = {
  id: number;
  nome: string;
};

type HandleNewProfileProps = NewProfileProps & NewAddressProps

type NewProfileFormProps = {
  profile: {
    data: ProfileProps;
    address: AddressProps};
  isFetching: boolean
}

const NewProfileForm = ({ profile, isFetching }: NewProfileFormProps) => {
  const toast = useToast()

  const [states, setStates] = useState<StateProps[]>([]);
  const [cities, setCities] = useState<CityProps[]>([]);  

  const { 
    handleSubmit, 
    formState, 
    register, 
    clearErrors,     
  } = useForm<HandleNewProfileProps>({
      resolver: yupResolver(newUserSchema),
      defaultValues: {
        nome: profile?.data.nome,
        razao_social: profile?.data.razao_social,
        telefone: profile?.data.telefone,
        celular: profile?.data.celular,
        email: profile?.data.email,
        cpf_cnpj: profile?.data.cpf_cnpj,
        rg_ie: profile?.data.rg_ie,
        endereco: profile?.address.endereco,
        bairro: profile?.address.bairro,
        estado: profile?.address.estado,        
        cidade: profile?.address.cidade,
        cep: profile?.address.cep,
        complemento: profile?.address.complemento,
      }
    });

  const { errors, isDirty, isSubmitting } = formState;

  const newProfileMutation = useUpdateProfileMutation()

  const handleNewProfileErrors: SubmitErrorHandler<HandleNewProfileProps> = errors => console.log(errors)

  const handleNewProfile: SubmitHandler<HandleNewProfileProps> = async (values) => {
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
      await newProfileMutation.mutateAsync({ profileData, profileAddress })

      toast({
        title: 'Cliente cadastrado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })

    } catch (error) {
      toast({        
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  };    

  const fetchCity = useCallback( async (uf: string) => {
    const { data } = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`
    )
    setCities(data)
    
  }, [])

  useEffect(() => {
    const fetchStates = async () => {
      const { data } = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      )
      setStates(data)
    }
    fetchStates()

    if(profile.address.estado) {
      fetchCity(profile.address.estado)
    }


  }, [fetchCity, profile?.address.estado])  

  if(isFetching || !profile) {
    return (      
      <Stack spacing={3}>
        <HStack spacing={3}>
          <Skeleton h="10" w="100%" borderRadius="8"/>
          <Skeleton h="10" w="100%" borderRadius="8"/>
        </HStack>
        <HStack spacing={3}>
          <Skeleton h="10" w="100%" borderRadius="8"/>
          <Skeleton h="10" w="100%" borderRadius="8"/>
          <Skeleton h="10" w="100%" borderRadius="8"/>
        </HStack>
        <HStack spacing={3}>
          <Skeleton h="10" w="100%" borderRadius="8"/>
          <Skeleton h="10" w="100%" borderRadius="8"/>
        </HStack>
        <HStack spacing={3}>
          <Skeleton h="10" w="100%" borderRadius="8"/>
          <Box w="40%">
            <Skeleton h="10" w="100%" borderRadius="8"/>
          </Box>
        </HStack>
        <HStack spacing={3}>
          <Skeleton h="10" w="100%" borderRadius="8"/>
          <Skeleton h="10" w="100%" borderRadius="8"/>
          <Skeleton h="10" w="100%" borderRadius="8"/>
        </HStack>
      </Stack>
    )
  }  
  
  return (
    <Flex
      as="form"
      flexDir="column"
      onSubmit={handleSubmit(handleNewProfile, handleNewProfileErrors)}
    >
      <Stack spacing={3}>
        <HStack spacing={3}>
          <Input
            name="nome"
            label="Nome*"
            bgColor="gray.50"
            error={errors?.nome}
            {...register("nome")}
          />          
          <Input
            name="razao_social"
            label="Razão Social"
            bgColor="gray.50"
            error={errors?.razao_social}
            {...register("razao_social")}
          />
        </HStack>
        <HStack spacing={3}>
          <Input
            name="telefone"
            label="Telefone"
            bgColor="gray.50"
            error={errors?.telefone}
            {...register("telefone")}
          />
          <Input
            name="celular"
            label="Celular*"
            bgColor="gray.50"
            error={errors?.celular}
            {...register("celular")}
          />
          <Input
            name="email"
            type="email"
            label="E-mail"
            bgColor="gray.50"
            error={errors?.email}
            {...register("email")}
          />
        </HStack>
        <HStack spacing={3}>
          <Input
            name="cpf_cnpj"
            label="CNPJ*"
            bgColor="gray.50"
            error={errors?.cpf_cnpj}
            {...register("cpf_cnpj")}
          />
          <Input
            name="rg_ie"
            label="Inscrição Estadual"
            bgColor="gray.50"
            error={errors?.rg_ie}
            {...register("rg_ie")}
          /> 
        </HStack>
        <HStack spacing={3}>
          <Input
            name="endereco"
            label="Endereço*"
            bgColor="gray.50"
            error={errors?.endereco}
            {...register("endereco")}
          />
          <Box w="40%">
            <Input
              name="bairro"
              label="Bairro*"
              bgColor="gray.50"
              error={errors?.bairro}
              {...register("bairro")}
            />
          </Box>
        </HStack>
        <HStack spacing={3}>
          <Select
            name="estado"
            label="Estado*"
            bgColor="gray.50"
            error={errors?.estado}
            defaultValue={profile?.address.estado}
            {...register("estado")}
            onChange={(event) => fetchCity(event.target.value)}
          > 
            {states.map((state) => {
              return (
                <option key={state.id} value={state.sigla}>
                  {state.nome}
                </option>
              );
            })}
          </Select>
          <Select
            name="cidade"
            label="Cidade*"
            bgColor="gray.50"
            error={errors?.cidade}            
            defaultValue={profile?.address.cidade}
            {...register("cidade")}
            onChange={() => clearErrors('cidade')}
          > 
            {cities.map((city) => {
              return <option key={city.id} value={city.nome}>{city.nome}</option>;
            })}
          </Select>
          
          <Input
            name="cep"
            label="CEP"
            bgColor="gray.50"
            error={errors?.cep}
            {...register("cep")}
          />
        </HStack>
        <Input
          name="complemento"
          label="Complemento"
          bgColor="gray.50"
          error={errors?.complemento}
          {...register("complemento")}
        />
      </Stack>
      <HStack spacing={3} justifyContent="flex-end" my={4}>        
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          isDisabled={!isDirty}
        >
          Salvar alterações
        </Button>
      </HStack>
      <Text fontSize="sm" fontWeight="bold" alignSelf="end">
        *Campos obrigatórios
      </Text>
    </Flex>
  );
}

export { NewProfileForm }
