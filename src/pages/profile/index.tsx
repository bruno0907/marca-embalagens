import Head from "next/head";

import { Content } from "../../components/Content";
import { Layout } from "../../components/Layout";
import { supabase } from "../../services/supabase";

import { 
  Text,
  Heading
} from "@chakra-ui/react";

type ProfileProps = {
  user: UserProps;
}

type UserProps = {
  id: string;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <>
      <Head>
        <title>Marca | Perfil</title>
        <meta name="description" content="Página do perfil do usuário" />
      </Head>
      <Layout>
        <Content>
          <Heading>Perfil</Heading>
          <Text>{user.id}</Text>
        </Content>
      </Layout>
    </>
  )
}
