import { useEffect, useState, useCallback } from "react"

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../Input"
import { Select } from "../../Select"

import { useUpdateAddressMutation } from "../../../hooks/useUpdateAddressMutation"
import { useStatesQuery } from "../../../hooks/useStatesQuery"

import { getCities } from "../../../services/getCities"

const updateAddressSchema = yup.object().shape({  
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
  Stack,
  HStack,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react"

import { AddressProps, CityProps } from "../../../types"

export type UpdateAddressFormProps = {
  address: AddressProps;
  onClose: () => void;
}

const UpdateAddressForm = ({ address, onClose }: UpdateAddressFormProps) => {  
  const toast = useToast()

  const [cities, setCities] = useState<CityProps[]>(null);

  const states = useStatesQuery()

  const { handleSubmit, formState, register, reset, clearErrors } =
    useForm<AddressProps>({
      resolver: yupResolver(updateAddressSchema),
    });

  const { errors, isDirty, isSubmitting } = formState;
  
  const updateAddressMutation = useUpdateAddressMutation()
  
  const handleUpdateAddress: SubmitHandler<AddressProps> = async values => {
    try {
      const updateAddress = {
        ...address,
        ...values
      }
  
      await updateAddressMutation.mutateAsync(updateAddress)
  
      toast({
        status: 'success',
        description: 'Endereço do usuário atualizado com sucesso!',
        position: 'top-right',
      })

      onClose()
      
    } catch (error) {      
      toast({
        status: 'error',
        description: 'Ocorreu um erro ao atualizar o endereço...',
        position: 'top-right',
      })
    }

  }

  const handleCancelUpdate = () => onClose() 

  const handleUpdateAddressError: SubmitErrorHandler<AddressProps> = errors => console.log(errors)

  const fetchCities = useCallback(async (uf: string) => {
    const response = await getCities(uf)
    
    setCities(response)
    return response
  }, [])

  useEffect(() => {    
    const handleGetCities = async () => {
      const { estado, cidade } = address    
      await fetchCities(estado)
      reset({ estado, cidade })
      return
    }
    handleGetCities()

    return () => setCities([])
    
  }, [address, reset, fetchCities]) 

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
            isLoading={states.isLoading || states.isFetching}
            bgColor="gray.50"
            error={errors?.estado}            
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
            {...register("cidade")}
            onChange={() => clearErrors('cidade')}
          >
            <option value="default" hidden aria-readonly>
              Selecione uma cidade...
            </option>
            {cities?.map((city) => {
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
          <Button 
            type="reset" 
            variant="ghost" 
            colorScheme="blue" 
            onClick={handleCancelUpdate}
          >Cancelar</Button>
          <Button 
            type="submit" 
            colorScheme="blue"
            isLoading={isSubmitting}
            isDisabled={!isDirty}
          >Salvar alterações</Button>
        </HStack>
      </Stack>
    </Box>
  )
}

export {
  UpdateAddressForm
}
