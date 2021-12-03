import Head from "next/head";

import { WithAuth } from "../../components/WithAuth";
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
      <WithAuth>
        <Flex>
          <Header title="Perfil" />
        </Flex>
        <Divider />
        <Content>
          <ProfileForm profile={profile} isFetching={isFetching}/>
        </Content>
      </WithAuth>
    </>
  )
}
