import Head from "next/head";

import { Layout } from "../../components/Layout";
import { Content } from "../../components/Content";

import {
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import { Divider } from "../../components/Divider";
import { GoBack } from "../../components/GoBack";
import { NewUserForm } from "../../components/NewUserForm";

export default function NewUser() {
  const { onClose } = useDisclosure()
  
  return (
    <>
      <Head>
        <title>MARCA | Novo Cliente</title>
        <meta name="description" content="Página de cadastro de novo cliente" />
      </Head>
      <Layout>        
        <Flex align="center">
          <GoBack fontSize="32" mr="4"/>
          <Heading>Novo Cliente</Heading>
        </Flex>
        <Divider />
        <Content>
          <NewUserForm userType="Cliente" onClose={onClose}/>
        </Content>
      </Layout>
    </>
  );
}
