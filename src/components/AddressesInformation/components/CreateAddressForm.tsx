import { useState, useCallback } from "react"

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../Input"
import { Select } from "../../Select"

import { useCreateAddressMutation } from "../../../hooks/useCreateAddressMutation"
import { useStatesQuery } from "../../../hooks/useStatesQuery"

import { getCities } from "../../../services/getCities"

import { 
  Stack,
  HStack,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react"

const newAddressSchema = yup.object().shape({  
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

import { AddressProps, NewAddressProps, CityProps } from "../../../types"


export type CreateAddressFormProps = {
  userId: string;
  onClose: () => void;
}

const CreateAddressForm = ({ userId, onClose }: CreateAddressFormProps) => {  
  const toast = useToast()

  const [cities, setCities] = useState<CityProps[]>([]);

  const states = useStatesQuery()

  const { handleSubmit, formState, register, clearErrors } =
    useForm<NewAddressProps>({
      resolver: yupResolver(newAddressSchema),
    });

  const { errors, isSubmitting, isDirty } = formState;

  const fetchCities = useCallback( async (uf: string) => {
    const data = await getCities(uf)

    setCities(data)
  }, [])  

  const NewAddressMutation = useCreateAddressMutation()

  const handleNewAddress: SubmitHandler<NewAddressProps> = async values => {
    try {
      const newAddress: NewAddressProps = {
        user_id: userId,
        principal: false,
        ...values
      }
  
      await NewAddressMutation.mutateAsync(newAddress)
  
      toast({
        status: 'success',
        description: 'Novo endereço cadastrado com sucesso!',
        position: 'top-right',
      })

      onClose()
      
    } catch (error) {
      console.log(error)
      toast({
        status: 'error',
        description: 'Ocorreu um erro ao cadastrar novo endereço...',
        position: 'top-right',
      })
    }

  }  

  const handleNewAddressError: SubmitErrorHandler<AddressProps> = errors => console.log(errors)

  return (
    <Box as="form" onSubmit={handleSubmit(handleNewAddress, handleNewAddressError)}>
      <Stack spacing={3}>

        <HStack spacing={3}>
          <Input
            data-testid="address"
            label="Endereço:"
            name="endereco"            
            {...register('endereco')}
          />
          <Input 
            label="Bairro:"
            name="bairro"            
            {...register('bairro')}
          />
        </HStack>

        <HStack spacing={3}>

          <Select
            name="estado"
            label="Estado:"
            bgColor="gray.50"
            error={errors?.estado}
            defaultValue="defaultValue"
            {...register("estado")}
            onChange={(event) => fetchCities(event.target.value)}
          >
            <option value="defaultValue" hidden aria-readonly>
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
            defaultValue="defaultValue"
            {...register("cidade")}
            onChange={() => clearErrors('cidade')}
          >
            <option value="defaultValue" hidden aria-readonly>
              Selecione uma cidade...
            </option>
            {cities.map((city) => {
              return <option key={city.id}>{city.nome}</option>;
            })}
          </Select>

          <Input 
            label="CEP:"
            name="cep"            
            {...register('cep')}
          />
        </HStack>

        <Input 
          label="Complemento:"
          name="complemento"          
          {...register('complemento')}
        />

        <HStack spacing={3} justifyContent="flex-end">
          <Button type="reset" variant="ghost" colorScheme="blue" onClick={onClose}>Cancelar</Button>
          <Button type="submit" colorScheme="blue" isLoading={isSubmitting} isDisabled={!isDirty}>Salvar novo endereço</Button>
        </HStack>

      </Stack>
    </Box>
  )
}

export {
  CreateAddressForm
}