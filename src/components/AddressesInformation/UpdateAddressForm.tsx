import { useEffect, useState } from "react"

import { useForm, SubmitHandler } from "react-hook-form"

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../Input"
import { Select } from "../Select"

import { useUpdateAddressMutation } from "../../hooks/useUpdateAddressMutation"
import { useStatesQuery } from "../../hooks/useStatesQuery"

import { getCities } from "../../services/getCities"

const updateAddressSchema = yup.object().shape({  
  endereco: yup.string().required("O endereço é obrigatório").trim(),
  bairro: yup.string().required("O bairo/distrito é obrigatório"),
  estado: yup.string().required("Selecione um estado")
    .test({
      message: "Selecione um estado",
      test: value => value !== "defaultValue",
    })
    .trim(),
  cidade: yup.string().required("Selecione uma cidade")
    .test({
      message: "Selecione uma cidade",
      test: value => value !== "defaultValue",
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

import { AddressProps, CityProps } from "../../types"

export type UpdateAddressFormProps = {
  address: AddressProps;
  onClose: () => void;
}

const UpdateAddressForm = ({ address, onClose }: UpdateAddressFormProps) => {  
  const toast = useToast()

  const [cities, setCities] = useState<CityProps[]>(null);
  const [selectedState, setSelectedState] = useState('')

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

  useEffect(() => {
    getCities(selectedState)
    .then(({ data }) => {
      setCities(data)
      return data
    })
    .catch(error => error)

    // return () => setCities([])

  }, [selectedState])

  useEffect(() => {    
    const { estado, cidade } = address

    getCities(estado)
    .then(({ data }) => {
      setCities(data)
      reset({ estado, cidade })
      return data
    })

    // return () => setCities([])
    
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
            error={errors.estado}            
            {...register("estado")}
            onChange={({ currentTarget }) => setSelectedState(currentTarget.value)}
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
            error={errors.cidade}
            {...register("cidade")}
            onChange={() => clearErrors('cidade')}
          >
            <option value="defaultValue" hidden aria-readonly>
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
            onClick={() => onClose()}
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
