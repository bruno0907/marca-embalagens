import { useRouter } from "next/router";
import Head from "next/head";

import { AuthWrapper } from "../../components/AuthWrapper";
import { Divider } from "../../components/Divider";
import { Header } from "../../components/Header";
import { Content } from "../../components/Content";
import { ProfileForm } from "../../components/pages/Profile/ProfileForm";
import { FormSkeleton } from "../../components/pages/Profile/ProfileSkeleton";
import { ProfileAvatar } from "../../components/pages/Profile/ProfileAvatar";

import { useProfileQuery } from "../../hooks/useProfileQuery";

import {   
  Button,
  Center,
  Flex,
  HStack,
  Text,  
} from "@chakra-ui/react";

export default function Profile() {
  const router = useRouter()
  const profile = useProfileQuery()

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
        {profile.isLoading ? (
          <Content>
            <FormSkeleton />
          </Content>
        ) : profile.isError ? (
          <Content>
            <Center flexDir="column">            
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
          </Content>
        ) : (
          <HStack spacing={12} align="flex-start">
            <ProfileAvatar profile={profile.data.data}/>            
            <ProfileForm 
              profile={profile.data.data}
              address={profile.data.address}
            />
          </HStack>
        )}        
      </AuthWrapper>
    </>
  )
}
