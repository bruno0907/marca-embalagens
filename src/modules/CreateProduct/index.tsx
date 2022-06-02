import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {    
  FormControl,
  InputGroup,
  InputLeftAddon, 
  Input as ChakraInput,  
  Stack,
  HStack,
  FormLabel,
  useToast,  
} from "@chakra-ui/react"

import { 
  Section,  
  SectionTitle,
  Content,
  Input,
  Form,
  Header,
  Divider,
  ButtonSecondary,
  ButtonPrimary 
} from "../../components";

import { useCreateProductMutation } from "../../hooks";

import { useAuth } from "../../contexts/useAuth";

import { CreateProduct } from "../../models";

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

export const CreateProductModule = () => {
  const { session } = useAuth()
  const user_id = session.user.id 

  const router = useRouter()

  const toast = useToast()

  const { handleSubmit, formState, register, reset } =
    useForm<CreateProduct>({
      resolver: yupResolver(newProductSchema),
    });

  const { errors, isDirty, isSubmitting } = formState;

  const createProductMutation = useCreateProductMutation()

  const handleNewUser: SubmitHandler<CreateProduct> = async values => {
    const {
      nome,
      descricao,
      preco_unitario,
    } = values

    const productData: CreateProduct = {
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
    <>
      <Header title="Cadastrar novo produto" withGoBack/>
      <Divider />
      <Form onSubmit={handleSubmit(handleNewUser)}>
        <Section>          
          <SectionTitle title="Dados do produto"/>          
          <Content>
            <Stack spacing={3}>
              <Stack direction={['column', 'column', 'row']} spacing={3}>
                <Input
                  name="nome"
                  label="Nome:"
                  isDisabled={isSubmitting}
                  error={errors.nome}
                  {...register("nome")}
                />
                <FormControl w={['initial', 'initial', '280px']}>
                  <FormLabel fontSize={['sm', 'sm', 'initial']}>Valor unitário:</FormLabel>
                  <InputGroup borderColor="gray.300">
                    <InputLeftAddon fontSize={['sm', 'sm', 'initial']}>R$</InputLeftAddon>
                    <ChakraInput
                      type="number"
                      name="preco_unitario"                
                      step="0.01"
                      pattern="^\d+(?:\.\d{1,2})?$"          
                      fontSize={['sm', 'sm', 'initial']}      
                      isDisabled={isSubmitting}
                      error={errors.preco_unitario}
                      {...register("preco_unitario")}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>        
              <Input
                as="textarea"
                h="80px"
                p="3"
                name="descricao"
                label="Descrição:"
                isDisabled={isSubmitting}
                error={errors.descricao}
                {...register("descricao")}
              />          
            </Stack>
          </Content>
          <HStack
            spacing={[3, 3, 6]}              
            justifyContent="flex-end"
            display="flex"
            alignItems="flex-start"
            w="100%"          
          >
            <ButtonSecondary
              type="reset"         
              isDisabled={isSubmitting}     
              onClick={handleCancel}
            >
              Cancelar
            </ButtonSecondary>
            <ButtonPrimary
              type="submit"              
              isLoading={isSubmitting}              
            >
              Cadastrar
            </ButtonPrimary>
          </HStack>
        </Section>
      </Form>
    </>
  );
}
