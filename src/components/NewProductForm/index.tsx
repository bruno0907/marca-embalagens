import { useMutation } from "react-query";

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { supabase } from "../../services/supabase";
import { queryClient } from "../../contexts/queryContext";

import { createProduct } from "../../controllers/createProduct";

import { Input } from "../../components/Input";

import {  
  Button,
  Flex,  
  Stack,
  HStack,
  Text,
  useToast,  
} from "@chakra-ui/react"

const newProductSchema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório").trim(),
  descricao: yup.string().trim(),
  preco_unitario: yup.number().required('O valor do produto é obrigatório'),    
});

import { NewProductProps } from "../../types";

type NewProductFormProps = {  
  onClose: () => void;
}

const NewProductForm = ({ onClose }: NewProductFormProps) => {
  const user = supabase.auth.user()  
  const toast = useToast()

  const { handleSubmit, formState, register, reset } =
    useForm<NewProductProps>({
      resolver: yupResolver(newProductSchema),
    });

  const { errors, isDirty, isSubmitting } = formState;

  const newProductMutation = useMutation( async (newProduct: NewProductProps) => {
    const newProductData = await createProduct(newProduct)

    if(newProductData.error) throw Error('Não foi possível criar novo cadastro. Tente novamente.')    

    const mutationResult = {
      ...newProductData.data[0],
    }

    return mutationResult

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['products[]']),
    onError: error => console.log('New Product Mutation Error: ', error)
  })

  const handleNewUser: SubmitHandler<NewProductProps> = async values => {
    const user_id = user.id

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
      await newProductMutation.mutateAsync(productData)  

      toast({
        title: 'Produto cadastrado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })

      onClose();

    } catch (error) {
      toast({        
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })

      onClose()  

    }
  };

  const handleCancel = () => {
    onClose()
    reset();    
  };

  return (
    <Flex
      as="form"
      flexDir="column"
      onSubmit={handleSubmit(handleNewUser)}
    >
      <Stack spacing={3}>
        <HStack spacing={3}>
          <Input
            name="nome"
            label="Nome do produto*"
            bgColor="gray.50"
            error={errors.nome}
            {...register("nome")}
          />
          <Input
            type="number"
            name="valor"
            label="Valor unitário*"
            bgColor="gray.50"
            step="0.01"
            pattern="^\d+(?:\.\d{1,2})?$"
            placeholder="Apenas números"
            error={errors.preco_unitario}
            {...register("preco_unitario")}
          />          
        </HStack>        
        <Input
          as="textarea"
          h="80px"
          p="3"
          name="descricao"
          label="Descrição do produto"
          bgColor="gray.50"
          error={errors.descricao}
          {...register("descricao")}
        />          
        <HStack
          spacing={3}              
          justifyContent="flex-end"
          display="flex"
          alignItems="flex-start"
          w="100%"
          mt={4}
        >
          <Button
            colorScheme="blue"
            variant="ghost"
            _hover={{ backgroundColor: "blue.500", color: "gray.100" }}
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
      </Stack>
      <Text fontSize="sm" fontWeight="bold">
        *Campos obrigatórios
      </Text>
    </Flex>
  );
}

export { NewProductForm }
