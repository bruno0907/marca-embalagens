import { useRouter } from "next/router";
import Head from "next/head";

import { AuthWrapper } from "../../components/AuthWrapper";
import { Divider } from "../../components/Divider";
import { Header } from "../../components/Header";
import { Content } from "../../components/Content";
import { ProfileForm } from "../../components/pages/Profile/ProfileForm";

import { useProfileQuery } from "../../hooks/useProfileQuery";

import {   
  Button,
  Center,
  Flex,
  Text,  
} from "@chakra-ui/react";
import { FormSkeleton } from "../../components/pages/Profile/ProfileSkeleton";

export default function Profile() {
  const router = useRouter()
  const { data: profile, isLoading, isError } = useProfileQuery()

  return (
    <>
      <Head>
        <title>MARCA | Perfil</title>
      </Head>
      <AuthWrapper>
        <Flex>
          <Header title="Perfil" />
        </Flex>
        <Divider />
        <Content>
          {isLoading ? (
            <FormSkeleton />
          ) : isError || !profile ? (
            <Center  minH="65vh" flexDir="column">            
              <Text 
                fontSize="xl" 
                mb="8" 
                fontWeight="bold"
                >
                Não foi possível carregar o perfil.
              </Text>
              <Button               
                colorScheme="blue" 
                mb="2" 
                onClick={() => router.reload()}
                >
                Tentar novamente
              </Button>
            </Center>
          ) : (
            <ProfileForm profile={profile}/>
          )}          
        </Content>
      </AuthWrapper>
    </>
  )
}
