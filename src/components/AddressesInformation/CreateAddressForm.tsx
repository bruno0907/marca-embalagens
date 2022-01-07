import React from "react"

import { useForm, SubmitHandler } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../Input"
import { Select } from "../Select"

import { useCreateAddressMutation } from "../../hooks/useCreateAddressMutation"
import { useStatesQuery } from "../../hooks/useStatesQuery"

import { getCities } from "../../services/getCities"

import { 
  Stack,
  HStack,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react"

const newAddressSchema = yup.object().shape({  
  endereco: yup.string().required("Digite um endereço").trim(),
  bairro: yup.string().required("Digite o bairro ou distrito"),
  estado: yup
    .string()
    .required('Selecione um estado')
    .test({
      message: "Selecione um estado",
      test: value => value !== "defaultValue",
    })
    .trim(),
  cidade: yup
    .string()
    .required('Selecione uma cidade')
    .test({
      message: "Selecione uma cidade",
      test: value => value !== "defaultValue",
    })
    .trim(),
  cep: yup.string().trim(),
  complemento: yup.string().trim(),  
});

import { NewAddressProps, CityProps } from "../../types"

export type CreateAddressFormProps = {
  userId: string;
  onClose: () => void;
}

const CreateAddressForm = ({ userId, onClose }: CreateAddressFormProps) => {  
  const toast = useToast()

  const [cities, setCities] = React.useState<CityProps[]>([]);
  const [selectedState, setSelectedState] = React.useState('')

  const states = useStatesQuery()

  const { handleSubmit, formState, register, clearErrors, setValue } =
    useForm<NewAddressProps>({
      resolver: yupResolver(newAddressSchema),
    });

  const { errors, isSubmitting, isDirty } = formState;
  
  React.useEffect(() => {
    getCities(selectedState)
    .then((response) => {
      setCities(response.data)      
      return response.data
    })
    .catch((error) => error)

    clearErrors(['estado', 'cidade'])
    setValue('cidade', '')

    // return () => setCities([])

  }, [selectedState, clearErrors, setValue])

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
      toast({
        status: 'error',
        description: 'Ocorreu um erro ao cadastrar novo endereço...',
        position: 'top-right',
      })
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit(handleNewAddress)}>
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
            error={errors.estado}
            defaultValue="defaultValue"
            {...register("estado")}
            onChange={({ currentTarget }) => setSelectedState(currentTarget?.value)}
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
            {...register('cep')}
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
            isDisabled={!isDirty}
          >Salvar novo endereço</Button>
        </HStack>

      </Stack>
    </Box>
  )
}

export {
  CreateAddressForm
}