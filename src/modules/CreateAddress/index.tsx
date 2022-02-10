import { useState, ChangeEvent } from "react"

import { useForm, SubmitHandler } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { 
  Stack,
  HStack,
  Button,
  useToast,  
} from "@chakra-ui/react"

import { 
  Input,
  Select,
  Form,
  ButtonSecondary,
  ButtonPrimary 
} from "../../components"

import { InputMask } from "../../utils"

import { 
  useStatesQuery, 
  useCitiesQuery,
  useCreateAddressMutation
} from "../../hooks"

import { CreateAddress } from "../../models"

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

export type CreateAddressModuleProps = {
  userId: string;
  onClose: () => void;  
}

export const CreateAddressModule = ({ userId, onClose }: CreateAddressModuleProps) => {  
  const toast = useToast()
  const masked = new InputMask()

  const [selectedState, setSelectedState] = useState('')

  const states = useStatesQuery()
  const cities = useCitiesQuery(selectedState)

  const { handleSubmit, formState, register, clearErrors, setValue } =
    useForm<CreateAddress>({
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

  const handleCreateAddress: SubmitHandler<CreateAddress> = async values => {
    try {
      const newAddress: CreateAddress = {
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
    <Form onSubmit={handleSubmit(handleCreateAddress)}>
      <Stack spacing={3}>
        <Stack direction={['column', 'column', 'row']} spacing={3} alignItems="flex-start">          
          <Input            
            label="Endereço:"
            name="endereco"
            isDisabled={isSubmitting}    
            error={errors.endereco}        
            {...register('endereco')}
          />
          <Input 
            label="Bairro:"
            name="bairro"      
            isDisabled={isSubmitting}      
            error={errors.bairro}
            {...register('bairro')}
          />
        </Stack>
        <Stack direction={['column', 'column', 'row']} spacing={3} alignItems="flex-start">
          <Select
            name="estado"
            label="Estado:"            
            isLoading={states.isFetching}
            isDisabled={isSubmitting}
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
            isDisabled={!selectedState || isSubmitting}
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
            isDisabled={isSubmitting}        
            {...register('cep')}
            onChange={({ target }) => target.value = masked.cep(target.value)}
          />
        </Stack>
        <Input 
          label="Complemento:"
          name="complemento"
          isDisabled={isSubmitting}          
          {...register('complemento')}
        />
        <HStack spacing={[3, 3, 6]} justifyContent="flex-end">
          <ButtonSecondary 
            type="reset" 
            isDisabled={isSubmitting}
            onClick={onClose}
          >
            Cancelar
          </ButtonSecondary>
          <ButtonPrimary 
            type="submit" 
            isLoading={isSubmitting}
          >
            Salvar novo endereço
          </ButtonPrimary>
        </HStack>
      </Stack>
    </Form>
  )
}

