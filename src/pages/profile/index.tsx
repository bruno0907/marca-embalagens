import Head from "next/head";

import { Layout } from "../../components/Layout";
import { Divider } from "../../components/Divider";
import { Header } from "../../components/Header";
import { Content } from "../../components/Content";

import { 
  Text,  
  Flex
} from "@chakra-ui/react";

export default function Profile() {
  return (
    <>
      <Head>
        <title>MARCA | Perfil</title>
      </Head>
      <Layout>
        <Flex>
          <Header title="Perfil" />
        </Flex>
        <Divider />
        <Content>
          <Text>Informações da Empresa</Text>
        </Content>
      </Layout>
    </>
  )
}
