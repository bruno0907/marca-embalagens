import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateUserMutation } from "../../hooks/useCreateUserMutation";
import { useStatesQuery } from "../../hooks/useStatesQuery";
import { getCities } from "../../services/getCities";
import { useAuth } from '../../hooks/useAuth'

import { Input } from "../Input";
import { Select } from "../Select";

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

const newUserSchema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório").trim(),
  razao_social: yup.string().trim(),
  telefone: yup.string().trim(),
  celular: yup.string().trim(),
  email: yup.string().email().trim(),
  cpf_cnpj: yup.string().trim(),
  rg_ie: yup.string().trim(),
  contato: yup.string().trim(),
  outras_informacoes: yup.string().trim(),
  endereco: yup.string().required("O endereço é obrigatório").trim(),
  bairro: yup.string().required("O bairo/distrito é obrigatório"),
  estado: yup
    .string()
    .required("Você deve selecionar um estado")
    .test({
      message: "Selecione um estado",
      test: value => value !== "default",
    })
    .trim(),
  cidade: yup
    .string()
    .required("Você deve selecionar um estado")
    .test({
      message: "Você deve selecionar uma cidade",
      test: value => value !== "default",
    })
    .trim(),
  cep: yup.string().trim(),
  complemento: yup.string().trim(),  
});

import {   
  NewUserProps,    
  NewAddressProps,  
} from "../../types";

type CityProps = {
  id: number;
  nome: string;
};

type HandleNewUserProps = NewUserProps & NewAddressProps

const CreateUserForm = () => {  
  const { session } = useAuth()

  const router = useRouter()

  const [cities, setCities] = useState<CityProps[]>([]);  
  const [isCNPJ, setIsCNPJ] = useState('Jurídica');

  const toast = useToast()
  const states = useStatesQuery()

  const { handleSubmit, formState, register, reset, clearErrors, setError, setFocus } =
    useForm<HandleNewUserProps>({
      resolver: yupResolver(newUserSchema),
    });

  const { errors, isDirty, isSubmitting } = formState;

  const createUserMutation = useCreateUserMutation()

  const handleNewUser: SubmitHandler<HandleNewUserProps> = async values => {
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

    const userData: NewUserProps = {
      user_id: session.user.id,      
      natureza_cliente: isCNPJ,
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

    const addressData: Omit<NewAddressProps, 'user_id'> = {
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
        position: 'top-right'
      })

      router.push('/users')

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

  const handleCancel = () => {
    reset();
     
    router.push('/users')
  };

  const fetchCities = async (uf: string) => {
    const { data } = await getCities(uf)    

    setCities(data)
    
    clearErrors("estado")
    setError("cidade", {
      message: "Você deve selecionar uma cidade",
    })
  }

  useEffect(() => {
    setFocus('nome')

    return () => {
      setCities([])
    }
    
  }, [setFocus])

  return (
    <Flex
      as="form"
      flexDir="column"
      onSubmit={handleSubmit(handleNewUser)}
    >
      <Stack spacing={3}>        
        <RadioGroup value={isCNPJ} onChange={setIsCNPJ} mb="4">                
          <HStack spacing={3}>
            <Text color="gray.600" fontWeight="medium" mr="4">Tipo de pessoa: </Text>
            <Radio value="Jurídica">Jurídica</Radio>
            <Radio value="Física">Física</Radio>
          </HStack>
        </RadioGroup>
        <HStack spacing={3}>
          <Input
            name="nome"
            label="Nome:"
            bgColor="gray.50"
            error={errors?.nome}
            {...register("nome")}
          />
          { isCNPJ === 'Jurídica' &&
            <Input
              name="razao_social"
              label="Razão Social:"
              bgColor="gray.50"
              error={errors?.razao_social}
              {...register("razao_social")}
            />

          }
        </HStack>
        <HStack spacing={3}>
          <Input
            name="telefone"
            label="Telefone:"
            bgColor="gray.50"
            error={errors?.telefone}
            {...register("telefone")}
          />
          <Input
            name="celular"
            label="Celular:"
            bgColor="gray.50"
            error={errors?.celular}
            {...register("celular")}
          />
          <Input
            name="email"
            type="email"
            label="E-mail:"
            bgColor="gray.50"
            error={errors?.email}
            {...register("email")}
          />
        </HStack>
        <HStack spacing={3}>
          <Input
            name="cpf_cnpj"
            label={isCNPJ === 'Jurídica' ? 'CNPJ:' : 'CPF:' }
            bgColor="gray.50"
            error={errors?.cpf_cnpj}
            {...register("cpf_cnpj")}
          />
          <Input
            name="rg_ie"
            label={ isCNPJ === 'Jurídica' ? 'Inscrição Estadual:' : 'RG:' }
            bgColor="gray.50"
            error={errors?.rg_ie}
            {...register("rg_ie")}
          />          
          <Input
            name="contato"
            label="Contato:"
            bgColor="gray.50"
            error={errors?.contato}
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
            bgColor="gray.50"
            error={errors?.endereco}
            {...register("endereco")}
          />
          <Box w="40%">
            <Input
              name="bairro"
              label="Bairro:"
              bgColor="gray.50"
              error={errors?.bairro}
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
            bgColor="gray.50"
            error={errors?.estado}
            defaultValue="default"
            {...register("estado")}
            onChange={(event) => fetchCities(event.target.value)}
          >
            <option value="default" hidden aria-readonly>
              Selecione um estado...
            </option>
            { states.isFetching && <option>Carregando...</option> }
            { states.data?.map((state) => {
              return (
                <option key={state.id} value={state.sigla}>
                  {state.nome}
                </option>
              );
            }) }
          </Select>
          <Select
            name="cidade"
            label="Cidade:"
            bgColor="gray.50"
            error={errors?.cidade}
            isDisabled={!Boolean(cities.length)}
            defaultValue="default"
            {...register("cidade")}
            onChange={() => clearErrors('cidade')}
          >
            <option value="default" hidden aria-readonly>
              Selecione uma cidade...
            </option>
            {cities.map((city) => {
              return <option key={city.id}>{city.nome}</option>;
            })}
          </Select>
          
          <Input
            name="cep"
            label="CEP:"
            bgColor="gray.50"
            error={errors?.cep}
            {...register("cep")}
          />
        </HStack>
        <Input
          name="complemento"
          label="Complemento:"
          bgColor="gray.50"
          error={errors?.complemento}
          {...register("complemento")}
        />
        <Input
          as="textarea"
          h="120px"
          p="3"
          name="outras_informacoes"
          label="Outras Informações:"
          bgColor="gray.50"
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
          Cadastrar
        </Button>
      </HStack>
    </Flex>
  );
}

export { CreateUserForm }
