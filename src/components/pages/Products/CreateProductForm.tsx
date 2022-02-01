import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { NewProduct, useCreateProductMutation } from "../../../hooks/useCreateProductMutation";
import { useAuth } from "../../../contexts/useAuth";

import { Input } from "../../Input";

import {  
  Button,
  Flex,
  FormControl,
  InputGroup,
  InputLeftAddon, 
  Input as ChakraInput,  
  Stack,
  HStack,
  FormLabel,
  useToast,  
} from "@chakra-ui/react"
import { Section } from "../../Section";
import { SectionHeader } from "../../SectionHeader";
import { SectionTitle } from "../../SectionTitle";
import { Content } from "../../Content";

const newProductSchema = yup.object().shape({
  nome: yup.string()
    .required("O nome do produto é obrigatório")
    .min(5, 'O nome do produto deve ter no mínimo 5 caracteres')
    .max(120, 'O nome do produto não deve ultrapassar 120 caracteres')
    .trim(),
  descricao: yup.string().trim(),
  preco_unitario: yup.number()
    .required('O valor do produto é obrigatório'),    
});

const CreateProductForm = () => {
  const { session } = useAuth()
  const user_id = session.user.id 

  const router = useRouter()

  const toast = useToast()

  const { handleSubmit, formState, register, reset } =
    useForm<NewProduct>({
      resolver: yupResolver(newProductSchema),
    });

  const { errors, isDirty, isSubmitting } = formState;

  const createProductMutation = useCreateProductMutation()

  const handleNewUser: SubmitHandler<NewProduct> = async values => {
    const {
      nome,
      descricao,
      preco_unitario,
    } = values

    const productData: NewProduct = {
      user_id,      
      nome,
      descricao,
      preco_unitario
    }
    
    try {      
      await createProductMutation.mutateAsync(productData)  

      toast({
        title: 'Produto cadastrado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })

      router.push('/products')

    } catch (error) {
      toast({        
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  };

  const handleCancel = () => {
    router.push('/products')
    reset();    
  };
  
  if(!user_id) return null

  return (
    <Section as="form" onSubmit={handleSubmit(handleNewUser)}>
      <SectionHeader>
        <SectionTitle title="Dados do produto"/>
      </SectionHeader>
      <Content>
        <Stack spacing={3} mb="12">
          <HStack spacing={3}>
            <Input
              name="nome"
              label="Nome:"
              error={errors.nome}
              {...register("nome")}
            />
            <FormControl w="sm">
              <FormLabel>Valor unitário:</FormLabel>
              <InputGroup borderColor="gray.300">
                <InputLeftAddon>R$</InputLeftAddon>
                <ChakraInput
                  type="number"
                  name="preco_unitario"                
                  step="0.01"
                  pattern="^\d+(?:\.\d{1,2})?$"                
                  error={errors.preco_unitario}
                  {...register("preco_unitario")}
                />
              </InputGroup>
            </FormControl>
          </HStack>        
          <Input
            as="textarea"
            h="80px"
            p="3"
            name="descricao"
            label="Descrição:"
            error={errors.descricao}
            {...register("descricao")}
          />          
        </Stack>
      </Content>
      <HStack
        spacing={3}              
        justifyContent="flex-end"
        display="flex"
        alignItems="flex-start"
        w="100%"          
      >
        <Button
          type="reset"
          colorScheme="blue"
          variant="ghost"          
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          isDisabled={!isDirty}
        >
          Cadastrar
        </Button>
      </HStack>
    </Section>
  );
}

export { CreateProductForm }
