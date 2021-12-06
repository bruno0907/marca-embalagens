import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateUserMutation } from "../../../../hooks/useCreateUserMutation";
import { useStatesQuery } from "../../../../hooks/useStatesQuery";
import { getCities } from "../../../../services/getCities";
import { useAuth } from '../../../../hooks/useAuth'

import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";

import { InputMask } from "../../../../utils/inputMasksHandler";
import { newUserSchemaModel } from "../../../../Models/NewUserSchemaModel";

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

import {   
  NewUserProps,    
  NewAddressProps,
  CityProps  
} from "../../../../types";

type HandleNewUserProps = NewUserProps & NewAddressProps

const CreateUserForm = () => {  
  const { session } = useAuth()
  const router = useRouter()
  const masked = new InputMask()
  const toast = useToast()

  const [cities, setCities] = useState<CityProps[]>([]);  
  const [isCNPJ, setIsCNPJ] = useState(true);

  const states = useStatesQuery()

  const handleSelectUserType = () => {
    setIsCNPJ(!isCNPJ)
    reset()
  }  

  const { handleSubmit, formState, register, reset, clearErrors, setError, setFocus } =
    useForm<HandleNewUserProps>({
      resolver: yupResolver(newUserSchemaModel),
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
            bgColor="gray.50"
            error={errors?.nome}
            {...register("nome")}
          />
          { isCNPJ &&
            <Input
              name="razao_social"
              label="Razão Social:"
              bgColor="gray.50"
              error={errors?.razao_social}
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
            bgColor="gray.50"
            error={errors?.telefone}
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
            bgColor="gray.50"
            error={errors?.celular}
            {...register("celular")}
            onChange={({ target}) => target.value = masked.celphone(target.value)}
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
        <HStack spacing={3}  align="flex-start">
          <Input
            name="cpf_cnpj"
            label={isCNPJ ? 'CNPJ:' : 'CPF:' }
            bgColor="gray.50"
            error={errors?.cpf_cnpj}
            {...register("cpf_cnpj")}
            onChange={({ target}) => target.value = isCNPJ ? masked.cnpj(target.value) : masked.cpf(target.value)}
          />
          <Input
            name="rg_ie"
            label={ isCNPJ ? 'Inscrição Estadual:' : 'RG:' }
            bgColor="gray.50"
            error={errors?.rg_ie}
            {...register("rg_ie")}
            onChange={({ target }) => target.value = isCNPJ ? target.value : masked.rg(target.value)}
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
            onChange={({ target }) => fetchCities(target.value)}
          >
            <option value="default" hidden aria-readonly>
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
            bgColor="gray.50"
            error={errors?.cidade}
            isDisabled={!cities.length}
            defaultValue="default"
            {...register("cidade")}
            onChange={() => clearErrors('cidade')}
          >
            <option value="default" hidden aria-readonly>
              Selecione uma cidade...
            </option>
            {cities.map(({ id, nome }) => {
              return <option key={id}>{nome}</option>;
            })}
          </Select>
          
          <Input
            name="cep"
            label="CEP:"
            bgColor="gray.50"
            error={errors?.cep}
            {...register("cep")}
            onChange={({ target }) => target.value = masked.cep(target.value)}
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
