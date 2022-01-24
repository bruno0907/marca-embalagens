import { useState, ChangeEvent } from "react"

import { useForm, SubmitHandler } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../Input"
import { Select } from "../../Select"

import { useStatesQuery } from "../../../hooks/useStatesQuery"
import { useCitiesQuery } from "../../../hooks/useCitiesQuery"
import { NewAddress, useCreateAddressMutation } from "../../../hooks/useCreateAddressMutation"

import { 
  Stack,
  HStack,
  Button,
  useToast,  
} from "@chakra-ui/react"
import { InputMask } from "../../../utils/inputMasksHandler"

const newAddressSchema = yup.object().shape({  
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

export type CreateAddressFormProps = {
  userId: string;
  onClose: () => void;  
}

const CreateAddressForm = ({ userId, onClose }: CreateAddressFormProps) => {  
  const toast = useToast()
  const masked = new InputMask()

  const [selectedState, setSelectedState] = useState('')

  const states = useStatesQuery()
  const cities = useCitiesQuery(selectedState)

  const { handleSubmit, formState, register, clearErrors, setValue } =
    useForm<NewAddress>({
      resolver: yupResolver(newAddressSchema),
    });

  const { errors, isSubmitting } = formState;

  function handleStateSelect(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.currentTarget
    setSelectedState(value)
    clearErrors(['estado', 'cidade'])
    setValue('cidade', 'defaultValue')
    return value
  }

  function handleCitySelect(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.currentTarget
    clearErrors('cidade')
    return value
  }    

  const newAddressMutation = useCreateAddressMutation()

  const handleNewAddress: SubmitHandler<NewAddress> = async values => {
    try {
      const newAddress: NewAddress = {
        user_id: userId,
        principal: false,
        ...values
      }

      await newAddressMutation.mutateAsync(newAddress)
  
      toast({
        status: 'success',
        title: 'Sucesso!',
        description: 'O endereço foi cadastrado com sucesso.',
        position: 'bottom',
      })

      onClose()

      return
    } catch (error) {      
      toast({
        status: 'error',
        title: 'Ocorreu um erro',
        description: 'Não foi possível cadastrar o endereço.',
        position: 'bottom',
      })
      return
    }
  }

  return (
    <form title="createAddressForm" onSubmit={handleSubmit(handleNewAddress)}>
      <Stack spacing={3}>
        <HStack spacing={3} alignItems="flex-start">          
          <Input            
            label="Endereço:"
            name="endereco"    
            error={errors.endereco}        
            {...register('endereco')}
          />
          <Input 
            label="Bairro:"
            name="bairro"            
            error={errors.bairro}
            {...register('bairro')}
          />
        </HStack>
        <HStack spacing={3} alignItems="flex-start">
          <Select
            name="estado"
            label="Estado:"            
            isLoading={states.isFetching}
            error={errors.estado}
            defaultValue="defaultValue"
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
            isDisabled={!selectedState}
            isLoading={cities.isFetching}
            error={errors.cidade}
            defaultValue="defaultValue"            
            {...register("cidade")}            
            onChange={handleCitySelect}
          >
            <option value="defaultValue" hidden aria-readonly>
              Selecione uma cidade...
            </option>            
            { cities.data?.map((city) => {
              return (
                <option key={city.id} value={city.nome}>
                  {city.nome}
                </option>
              );
            })}
          </Select>
          <Input 
            label="CEP:"
            name="cep"            
            {...register('cep')}
            onChange={({ target }) => target.value = masked.cep(target.value)}
          />
        </HStack>
        <Input 
          label="Complemento:"
          name="complemento"          
          {...register('complemento')}
        />
        <HStack spacing={3} justifyContent="flex-end">
          <Button
            type="reset"
            variant="ghost"
            colorScheme="blue"
            onClick={onClose}
          >Cancelar</Button>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
          >Salvar novo endereço</Button>
        </HStack>
      </Stack>
    </form>
  )
}

export {
  CreateAddressForm
}
