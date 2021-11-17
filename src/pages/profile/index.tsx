import Head from "next/head";

import { Authenticated } from "../../components/Layout/Authenticated";
import { Divider } from "../../components/Layout/Divider";
import { Header } from "../../components/Header";
import { Content } from "../../components/Layout/Content";
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
      <Authenticated>
        <Flex>
          <Header title="Perfil" />
        </Flex>
        <Divider />
        <Content>
          <ProfileForm profile={profile} isFetching={isFetching}/>
        </Content>
      </Authenticated>
    </>
  )
}
