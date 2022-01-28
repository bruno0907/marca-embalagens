import { ChangeEvent, useEffect, useState } from "react"

import { useForm, SubmitHandler } from "react-hook-form"

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../Input"
import { Select } from "../../Select"

import { useStatesQuery } from "../../../hooks/useStatesQuery"
import { useCitiesQuery } from "../../../hooks/useCitiesQuery"
import { useUpdateAddressMutation } from "../../../hooks/useUpdateAddressMutation"

const updateAddressSchema = yup.object().shape({  
  endereco: yup.string()
    .required('O endereço é obrigatório')
    .min(5, 'O endereço deve ter no mínimo 5 caracteres')
    .max(120, 'O endereço não deve ultrapassar 120 caracteres')
    .trim(),
  bairro: yup.string()
    .required('O bairro é obrigatório')
    .min(2, 'O bairro deve ter no mínimo 2 caracteres')
    .max(120, 'O bairro não deve ultrapassar 120 caracteres')
    .trim(),
  estado: yup.string()
    .required('Selecione um estado')  
    .test({
      message: "Selecione um estado",
      test: value => value !== "defaultValue",
    })
    .trim(),
  cidade: yup.string()    
    .required('Selecione uma cidade')
    .test({
      message: "Selecione uma cidade",
      test: value => value !== "defaultValue",
    }).trim(),
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

import { Address } from "../../../hooks/useAddressQuery"

export type UpdateAddressFormProps = {
  address: Address;
  onClose: () => void;
}

const UpdateAddressForm = ({ address, onClose }: UpdateAddressFormProps) => {  
  const toast = useToast()
    
  const [selectedState, setSelectedState] = useState('')
    
  const states = useStatesQuery()
  const cities = useCitiesQuery(selectedState)

  const { handleSubmit, formState, register, reset, clearErrors, setValue } =
  useForm<Address>({
    resolver: yupResolver(updateAddressSchema),
  });

  const { errors, isSubmitting } = formState;
  
  const updateAddressMutation = useUpdateAddressMutation()
  
  const handleUpdateAddress: SubmitHandler<Address> = async values => {
    try {
      const updateAddress = {
        ...address,
        ...values
      }
  
      await updateAddressMutation.mutateAsync(updateAddress)
  
      toast({
        status: 'success',
        description: 'Endereço do usuário atualizado com sucesso!',
        position: 'bottom',
      })

      onClose()
      
    } catch (error) {      
      toast({
        status: 'error',
        description: 'Ocorreu um erro ao atualizar o endereço...',
        position: 'bottom',
      })
    }
  }
  
  const handleStateSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setSelectedState(value)
    setValue('cidade', 'defaultValue')
    return value
  }

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    clearErrors('cidade')
    return value
  }

  useEffect(() => {
    const { estado, cidade } = address
    setSelectedState(estado)
    reset({ estado, cidade })

    return () => setSelectedState('')

  }, [address, reset])

  return (
    <Box as="form" onSubmit={handleSubmit(handleUpdateAddress)}>
       <Stack spacing={3}>
        <HStack spacing={3} alignItems="flex-start">
          <Input 
            label="Endereço:"
            name="endereco"
            error={errors.endereco}
            defaultValue={address.endereco}
            {...register('endereco')}
          />
          <Input 
            label="Bairro:"
            name="bairro"
            error={errors.bairro}
            defaultValue={address.bairro}
            {...register('bairro')}
          />
        </HStack>
        <HStack spacing={3} alignItems="flex-start">
          <Select
            name="estado"
            label="Estado:"  
            isLoading={states.isFetching}                      
            error={errors.estado}
            {...register("estado")}
            onChange={handleStateSelect}
          >
            <option value="defaultValue" hidden aria-readonly>
              Selecione um estado...
            </option>
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
            isLoading={cities.isFetching}
            error={errors.cidade}
            {...register("cidade")}
            onChange={handleSelectCity}
          >
            <option value="defaultValue" hidden aria-readonly>
              Selecione uma cidade...
            </option>
            {cities.data?.map((city) => {
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
            onClick={() => onClose()}
          >Cancelar</Button>
          <Button 
            type="submit" 
            colorScheme="blue"
            isLoading={isSubmitting}
          >Salvar alterações</Button>
        </HStack>
      </Stack>
    </Box>
  )
}

export {
  UpdateAddressForm
}
