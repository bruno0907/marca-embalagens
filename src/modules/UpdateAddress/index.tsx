import { ChangeEvent, useEffect, useState } from "react"

import { useForm, SubmitHandler } from "react-hook-form"

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { 
  Input,
  Select,
  Form,
  Section,
  ButtonSecondary,
  ButtonPrimary 
} from "../../components/"

import { 
  useStatesQuery,
  useCitiesQuery,
  useUpdateAddressMutation 
} from "../../hooks"

import { Address } from "../../models"

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
  useToast,
} from "@chakra-ui/react"

export type UpdateAddressModuleProps = {
  address: Address;
  onClose: () => void;
}

export const UpdateAddressModule = ({ address, onClose }: UpdateAddressModuleProps) => {  
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
    if(!address) return
    
    const { estado, cidade } = address
    setSelectedState(estado)
    reset({ estado, cidade })

    return () => setSelectedState('')

  }, [address, reset])

  return (
    <Form as="form" onSubmit={handleSubmit(handleUpdateAddress)}>
       <Section>
        <Stack direction={['column', 'column', 'row']} spacing={3} alignItems="flex-start">
          <Input 
            label="Endereço:"
            name="endereco"
            isDisabled={isSubmitting}
            error={errors.endereco}
            defaultValue={address.endereco}
            {...register('endereco')}
          />
          <Input 
            label="Bairro:"
            name="bairro"
            isDisabled={isSubmitting}
            error={errors.bairro}
            defaultValue={address.bairro}
            {...register('bairro')}
          />
        </Stack>

        <Stack direction={['column', 'column', 'row']} spacing={3} alignItems="flex-start">
          <Select
            name="estado"
            label="Estado:" 
            isDisabled={isSubmitting} 
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
            isDisabled={isSubmitting}
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
            isDisabled={isSubmitting}
            defaultValue={address.cep}
            {...register('cep')}
          />
        </Stack>

        <Input 
          label="Complemento:"
          name="complemento"
          isDisabled={isSubmitting}
          defaultValue={address.complemento}
          {...register('complemento')}
        />
      </Section>

      <HStack spacing={[3, 3, 6]} justifyContent="flex-end">
        <ButtonSecondary 
          type="reset"
          isDisabled={isSubmitting}           
          onClick={() => onClose()}
        >Cancelar</ButtonSecondary>
        <ButtonPrimary 
          type="submit"           
          isLoading={isSubmitting}
        >Salvar alterações</ButtonPrimary>
      </HStack>      
    </Form>
  )
}
