import { useEffect, useState, useCallback } from "react"

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Content } from "../../../Layout/Content"
import { Input } from "../../../Input"
import { Select } from "../../../Select"

import { useStatesQuery } from "../../../../hooks/useStatesQuery"

import { getCities } from "../../../../services/getCities"

import { 
  Stack,
  HStack,
  Box,
  Button,
  Flex,
  Text,  
} from "@chakra-ui/react"

const updateUserSchema = yup.object().shape({  
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

import { AddressProps } from "../../../../types"

type UpdateAddressFormProps = {
  address: AddressProps;
  onClose: () => void;
}

type CityProps = {
  id: number;
  nome: string;
};

const UpdateAddressForm = ({ address, onClose }: UpdateAddressFormProps) => {
  const [cities, setCities] = useState<CityProps[]>([]);

  const states = useStatesQuery()

  const { handleSubmit, formState, register, reset, clearErrors, setError, setFocus } =
    useForm<AddressProps>({
      resolver: yupResolver(updateUserSchema),
    });

  const { errors, isDirty, isSubmitting } = formState;

  const fetchCities = useCallback( async (uf: string) => {
    const { data } = await getCities(uf)

    setCities(data)
  }, [])  

  const handleUpdateAddress: SubmitHandler<AddressProps> = values => {
    const updateAddress = {
      ...address,
      ...values
    }
    console.log(updateAddress)
  }

  const handleCancelUpdate = () => onClose() 

  const handleUpdateAddressError: SubmitErrorHandler<AddressProps> = errors => console.log(errors)

  useEffect(() => {
   fetchCities(address.estado)
   .then(() => {
     reset({
       cidade: address.cidade
     })
   })
    
  }, [address.estado, fetchCities, address.cidade, reset])

  return (
    <Box as="form" onSubmit={handleSubmit(handleUpdateAddress, handleUpdateAddressError)}>
      <Stack spacing={3}>

        <HStack spacing={3}>
          <Input 
            label="Endereço:"
            name="endereco"
            defaultValue={address.endereco}
            {...register('endereco')}
          />
          <Input 
            label="Bairro:"
            name="bairro"
            defaultValue={address.bairro}
            {...register('bairro')}
          />
        </HStack>

        <HStack spacing={3}>

          <Select
            name="estado"
            label="Estado:"
            bgColor="gray.50"
            error={errors?.estado}
            defaultValue={address.estado}
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
            defaultValue={address.cidade}
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
            label="CEP:"
            name="cep"
            defaultValue={address.cep}
            {...register('cep')}
          />
        </HStack>

        <Input 
          label="Complemento:"
          name="complemento"
          defaultValue={address.complemento}
          {...register('complemento')}
        />

        <HStack spacing={3} justifyContent="flex-end">
          <Button type="reset" variant="ghost" colorScheme="blue" onClick={handleCancelUpdate}>Cancelar</Button>
          <Button type="submit" colorScheme="blue">Salvar alterações</Button>
        </HStack>

      </Stack>
    </Box>
  )
}

export {
  UpdateAddressForm
}