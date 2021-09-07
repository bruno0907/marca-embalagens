import Head from "next/head";

import { Content } from "../../components/Content";
import { Layout } from "../../components/Layout";
import { GoBack } from "../../components/GoBack";
import { Divider } from "../../components/Divider";

import { 
  Text,
  Heading,
  Flex
} from "@chakra-ui/react";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Marca | Perfil</title>
        <meta name="description" content="Página do perfil do usuário" />
      </Head>
      <Layout>
        <Flex>
          <GoBack />
          <Heading>Perfil</Heading>
        </Flex>
        <Divider />
        <Content>
          <Text>Informações da Empresa</Text>
        </Content>
      </Layout>
    </>
  )
}
