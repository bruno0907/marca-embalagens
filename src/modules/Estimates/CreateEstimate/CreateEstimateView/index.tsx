import { useRouter } from "next/router"

import { UseFormReturn } from "react-hook-form"

import { Input } from "../../../../components/Input"
import { Cart } from "../../../../components/Cart"
import { Content } from "../../../../components/Content"
import { Form } from "../../../../components/Form"
import { ProductsSelect } from "../../../../components/ProductsSelect"
import { Section } from "../../../../components/Section"
import { SectionHeader } from "../../../../components/SectionHeader"
import { SectionTitle } from "../../../../components/SectionTitle"

import { useCartContext } from "../../../../contexts/useCart"
import { CreateEstimate } from "../../../../hooks/useCreateEstimateMutation"
import { useUsersQuery } from "../../../../hooks/useUsersQuery"

import { Stack, HStack, Button } from "@chakra-ui/react"

type Props = {
  form: UseFormReturn;
  onSubmit: (values: CreateEstimate) => any
}

export const CreateEstimateView = ({ form, onSubmit }: Props) => {
  const router = useRouter()

  const { handleSubmit, register, formState } = form
  const { isSubmitting, errors } = formState

  const { cartProducts, canSubmit } = useCartContext()  
  
  const users = useUsersQuery()    

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Section>
        <SectionHeader>
          <SectionTitle title="Cliente"/>
        </SectionHeader>
        <Content>
          <Input
            list="users"
            label="Nome:"
            name="cliente"
            error={errors?.cliente}
            {...register('cliente')}
          />
          <datalist id="users">
            {users.data?.map(user => (
              <option key={user.id} value={user.nome}>{user.nome}</option>
            ))}
          </datalist>
        </Content>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle title="Descrição"/>
        </SectionHeader>
        <Content>
          <Stack spacing={6}>
            <ProductsSelect />
            <Cart />
          </Stack>
        </Content>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle title="Outras informações"/>
        </SectionHeader>
        <Content>
          <Input
            as="textarea"
            name="observacoes"
            label="Observações:"
            h="100px"
            p="3"
            {...register('observacoes')}
          />
        </Content>
      </Section>

      <HStack spacing={6} justify="flex-end">
        <Button
          type="reset" 
          colorScheme="blue"
          variant="ghost" 
          onClick={() => router.push('/estimates')} 
          isDisabled={!cartProducts?.length}
        >Cancelar</Button>
        <Button 
          type="submit"
          colorScheme="blue" 
          isDisabled={canSubmit}
          isLoading={isSubmitting}
        >Salvar orçamento</Button>
      </HStack>
    </Form>
  )
}