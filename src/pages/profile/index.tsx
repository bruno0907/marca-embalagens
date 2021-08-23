import { GetServerSideProps } from "next";
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
      <Layout withGoBack>
        <Content>
          <Heading>Perfil</Heading>
          <Text>{user.id}</Text>
        </Content>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if(!user) {
    return {
      props: {},
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  }

  return {
    props: {
      user
    }
  }
}