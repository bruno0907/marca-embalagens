import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../../Input";
import { Select } from "../../Select";

import { useAuth } from "../../../contexts/useAuth";
import { useCreateSupplierMutation } from "../../../hooks/useCreateSupplierMutation";
import { useStatesQuery } from "../../../hooks/useStatesQuery";
import { getCities } from "../../../services/getCities";

import { InputMask } from "../../../utils/inputMasksHandler";

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

const newSupplierSchema = yup.object().shape({
  nome: yup.string().required("Informe um nome").trim(),
  razao_social: yup.string().trim(),
  produto: yup.string().trim(),
  telefone: yup.string().trim(),
  celular: yup.string().trim(),
  email: yup.string().email().trim(),
  cpf_cnpj: yup.string().trim(),
  rg_ie: yup.string().trim(),
  contato: yup.string().trim(),
  outras_informacoes: yup.string().trim(),
  endereco: yup.string().required("É preciso informar um endereço").trim(),
  bairro: yup.string().required("Informe o endereço ou distritro"),
  estado: yup
    .string()
    .required("Selecione um estado")
    .test({
      message: "Selecione um estado",
      test: value => value !== "default",
    })
    .trim(),
  cidade: yup
    .string()
    .required("Selecione um estado")
    .test({
      message: "Selecione uma cidade",
      test: value => value !== "default",
    })
    .trim(),
  cep: yup.string().trim(),
  complemento: yup.string().trim(),  
});

import {   
  NewSupplierProps,    
  NewAddressProps, 
  CityProps 
} from "../../../types";

type HandleNewSupplierProps = NewSupplierProps & NewAddressProps

const CreateSupplierForm = () => {
  const { session } = useAuth()  
  const router = useRouter()
  const toast = useToast()
  const masked = new InputMask()

  const [cities, setCities] = useState<CityProps[]>([]);  
  const [isCNPJ, setIsCNPJ] = useState(true);

  const states = useStatesQuery()  

  const { handleSubmit, formState, register, reset, clearErrors, setError, setFocus } =
    useForm<HandleNewSupplierProps>({
      resolver: yupResolver(newSupplierSchema),
    });

  const { errors, isDirty, isSubmitting } = formState;

  const handleIsCNPJ = () => {
    setIsCNPJ(!isCNPJ)

    reset()
  }

  const newSupplierMutation = useCreateSupplierMutation()

  const handleNewUser: SubmitHandler<HandleNewSupplierProps> = async values => {
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

    const supplierData: NewSupplierProps = {
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
      await newSupplierMutation.mutateAsync({ supplierData, addressData })

      toast({
        title: 'Fornecedor cadastrado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })

      router.push('/suppliers')

    } catch (error) {
      toast({        
        title: 'Ocorreu um erro ao cadastrar o novo fornecedor',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })

    }
  };

  const handleCancel = () => {
    reset();   
    router.push('/suppliers') 
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

    return () => setCities([])
  }, [setFocus])

  return (
    <Flex
      as="form"
      flexDir="column"
      onSubmit={handleSubmit(handleNewUser)}
    >
      <Stack spacing={3}>        
        <RadioGroup value={isCNPJ ? 'Jurídica' : 'Física'} onChange={handleIsCNPJ} mb="4">                
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
        <HStack spacing={3}>
          <Input
            name="telefone"
            label="Telefone:"
            error={errors?.telefone}
            {...register("telefone")}
            onChange={({ target }) => target.value = masked.phone(target.value)}
          />
          <Input
            name="celular"
            label="Celular:"
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
        <HStack spacing={3}>
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
        <HStack
          spacing={3}
          display="flex"
          alignItems="flex-start"
          w="100%"
        >
          <Select
            name="estado"
            label="Estado:"
            error={errors?.estado}
            defaultValue="default"
            {...register("estado")}
            onChange={(event) => fetchCities(event.target.value)}
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
            })}
          </Select>
          <Select
            name="cidade"
            label="Cidade:"
            error={errors?.cidade}
            isDisabled={!Boolean(cities.length)}
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
        <Input
          as="textarea"
          h="120px"
          p="3"
          name="outras_informacoes"
          label="Outras Informações:"
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

export { CreateSupplierForm }
