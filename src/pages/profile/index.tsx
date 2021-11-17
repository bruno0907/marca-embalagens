import Head from "next/head";

import { Layout } from "../../components/Layout";
import { Divider } from "../../components/Divider";
import { Header } from "../../components/Header";
import { Content } from "../../components/Content";
import { ProfileForm } from "./components/ProfileForm";

import { useProfileQuery } from "../../hooks/useProfileQuery";

import {   
  Flex,  
} from "@chakra-ui/react";

export default function Profile() {
  const { data: profile, isFetching } = useProfileQuery()

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
          <ProfileForm profile={profile} isFetching={isFetching}/>
        </Content>
      </Layout>
    </>
  )
}
