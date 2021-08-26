import { useEffect, useState } from "react";

import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { supabase } from "../../services/supabase";

import axios from "axios";

import { Layout } from "../../components/Layout";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";

type NewUserProps = {
  user: UserProps;
};

type UserProps = {
  id: string;
};

type NewUserDataProps = {
  name: string;
  phone_number: string;
  mobile_number: string;
  email: string;
  address: string;
  district: string;
  city: string;
  state: string;
  zip_code: string;
  complement: string;
};

type StateProps = {
  id: number;
  sigla: string;
  nome: string;
};

type CityProps = {
  id: number;
  nome: string;
};

const newUserFormSchema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório").trim(),
  phone_number: yup.string().trim(),
  mobile_number: yup.string().trim(),
  email: yup.string().email().trim(),
  address: yup.string().required("O endereço é obrigatório").trim(),
  district: yup.string().required("O bairo/distrito é obrigatório"),
  state: yup
    .string()
    .required("Você deve selecionar um estado")
    .test({
      message: "Selecione um estado",
      test: (state) => state !== "default",
    })
    .trim(),
  city: yup
    .string()
    .required("Você deve selecionar um estado")
    .test({
      message: "Você deve selecionar uma cidade",
      test: (city) => city !== "default",
    })
    .trim(),
  zip_code: yup.string().trim(),
  complement: yup.string().trim(),
});

export default function NewUser({ user }: NewUserProps) {
  const router = useRouter();
  const toast = useToast();

  const [states, setStates] = useState<StateProps[]>([]);
  const [cities, setCities] = useState<CityProps[]>([]);
  const [hasCities, setHasCities] = useState(true);

  const { handleSubmit, formState, register, reset, clearErrors, setError } =
    useForm<NewUserDataProps>({
      resolver: yupResolver(newUserFormSchema),
    });

  const { errors, isDirty, isSubmitting } = formState;

  const handleNewUser: SubmitHandler<NewUserDataProps> = async (values) => {
    try {
      const user_id = user.id;
      const {
        name,
        phone_number,
        mobile_number,
        email,
        address,
        city,
        state,
        district,
        zip_code,
        complement,
      } = values;

      const newUserData = {
        user_id,
        user_type: "Cliente",
        name,
        phone_number,
        mobile_number,
        email,
      };

      const { error: newUserError, data: newUser } = await supabase
        .from("users")
        .insert(newUserData);

      if (newUserError) {
        throw new Error("Houve um erro ao cadastrar o cliente.");
      }

      const newAddressData = {
        user_id: newUser[0].id,
        address,
        city,
        state,
        district,
        zip_code,
        complement,
      };

      const { error: newAddressError } = await supabase
        .from("addresses")
        .insert(newAddressData);

      if (newAddressError) {
        await supabase.from("users").delete().eq("user_id", newUser[0].id);

        throw new Error("Houve um erro ao cadastrar o endereço do cliente.");
      }

      toast({
        title: "Usuário cadastrado com sucesso",
        description: "Aguarde, redirecionando...",
        status: "success",
        duration: 3000,
      });

      router.push("/users");
    } catch (error) {
      toast({
        title: "Ocorreu um erro",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    }
  };

  const handleCancel = () => {
    reset();
    router.push("/users");
  };

  useEffect(() => {
    async function fetchStates() {
      const { data } = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      );
      setStates(data);
    }
    fetchStates();
  }, []);

  async function fetchCity(uf: string) {
    const { data } = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`
    );
    setCities(data);
    setHasCities(false);

    clearErrors("state");
    setError("city", {
      message: "Você deve selecionar uma cidade",
    });
  }

  return (
    <>
      <Head>
        <title>MARCA | Novo Cliente</title>
        <meta name="description" content="Página de cadastro de novo cliente" />
      </Head>
      <Layout withGoBack>
        <Box bgColor="gray.100" p="8" borderRadius="8">
          <Flex
            as="form"
            flexDir="column"
            onSubmit={handleSubmit(handleNewUser)}
          >
            <Heading mb="8">Novo cliente</Heading>
            <Stack spacing={3}>
              <Input
                name="name"
                label="Nome*"
                bgColor="gray.50"
                error={errors?.name}
                {...register("name")}
              />
              <HStack spacing={3} pt="4">
                <Input
                  name="phone_number"
                  label="Telefone"
                  bgColor="gray.50"
                  error={errors?.phone_number}
                  {...register("phone_number")}
                />
                <Input
                  name="mobile_number"
                  label="Celular"
                  bgColor="gray.50"
                  error={errors?.mobile_number}
                  {...register("mobile_number")}
                />
                <Input
                  name="email"
                  type="email"
                  label="E-mail"
                  bgColor="gray.50"
                  error={errors?.email}
                  {...register("email")}
                />
              </HStack>
              <HStack
                spacing={3}
                display="flex"
                alignItems="flex-start"
                w="100%"
                pt="4"
              >
                <Input
                  name="address"
                  label="Endereço*"
                  bgColor="gray.50"
                  error={errors?.address}
                  {...register("address")}
                />
                <Box w="40%">
                  <Input
                    name="district"
                    label="Bairro*"
                    bgColor="gray.50"
                    error={errors?.district}
                    {...register("district")}
                  />
                </Box>
              </HStack>
              <HStack
                spacing={3}
                display="flex"
                alignItems="flex-start"
                w="100%"
                pt="4"
                pb="4"
              >
                <Select
                  name="state"
                  label="Estado*"
                  bgColor="gray.50"
                  error={errors?.state}
                  defaultValue="default"
                  {...register("state")}
                  onChange={(event) => fetchCity(event.target.value)}
                >
                  <option value="default" hidden aria-readonly>
                    Selecione um estado...
                  </option>
                  {states.map((state) => {
                    return (
                      <option key={state.id} value={state.sigla}>
                        {state.nome}
                      </option>
                    );
                  })}
                </Select>
                <Select
                  name="city"
                  label="Cidade*"
                  bgColor="gray.50"
                  error={errors?.city}
                  isDisabled={hasCities}
                  defaultValue="default"
                  {...register("city")}
                  onChange={() => clearErrors('city')}
                >
                  <option value="default" hidden aria-readonly>
                    Selecione uma cidade...
                  </option>
                  {cities.map((city) => {
                    return <option key={city.id}>{city.nome}</option>;
                  })}
                </Select>
                
                <Input
                  name="zip_code"
                  label="CEP"
                  bgColor="gray.50"
                  error={errors?.zip_code}
                  {...register("zip_code")}
                />
              </HStack>
              <Input
                name="complement"
                label="Complemento"
                bgColor="gray.50"
                error={errors?.complement}
                {...register("complement")}
              />
            </Stack>
            <HStack
              spacing={3}
              mt="8"
              justifyContent="flex-end"
              display="flex"
              alignItems="flex-start"
              w="100%"
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
            <Text fontSize="sm" fontWeight="bold">
              *Campos obrigatórios
            </Text>
          </Flex>
        </Box>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      props: {},
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};
