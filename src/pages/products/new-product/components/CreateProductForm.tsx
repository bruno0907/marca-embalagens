import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateProductMutation } from "../../../../hooks/useCreateProductMutation";
import { useAuth } from "../../../../hooks/useAuth";

import { Input } from "../../../../components/Input";

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

const newProductSchema = yup.object().shape({
  nome: yup.string().required("Informe um nome pro seu produto").trim(),
  descricao: yup.string().trim(),
  preco_unitario: yup.number().required('Informe o valor'),    
});

import { NewProductProps } from "../../../../types";

const CreateProductForm = () => {
  const { session } = useAuth()
  const user_id = session.user.id 

  const router = useRouter()

  const toast = useToast()

  const { handleSubmit, formState, register, reset } =
    useForm<NewProductProps>({
      resolver: yupResolver(newProductSchema),
    });

  const { errors, isDirty, isSubmitting } = formState;

  const createProductMutation = useCreateProductMutation()

  const handleNewUser: SubmitHandler<NewProductProps> = async values => {
    const {
      nome,
      descricao,
      preco_unitario,
    } = values

    const productData: NewProductProps = {
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
    <Flex
      as="form"
      flexDir="column"
      onSubmit={handleSubmit(handleNewUser)}
    >
      <Stack spacing={3} mb="12">
        <HStack spacing={3}>
          <Input
            name="nome"
            label="Nome do produto"
            error={errors.nome}
            {...register("nome")}
          />
          <FormControl w="sm">
            <FormLabel>Valor unitário</FormLabel>
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
          label="Descrição do produto"
          error={errors.descricao}
          {...register("descricao")}
        />          
      </Stack>
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
    </Flex>
  );
}

export { CreateProductForm }
