import { useRouter } from "next/router";
import Head from "next/head";

import { AuthWrapper } from "../../components/AuthWrapper";
import { Divider } from "../../components/Divider";
import { Header } from "../../components/Header";
import { Content } from "../../components/Content";
import { ProfileForm } from "../../modules/ProfileModule/ProfileForm";
import { ProfileAvatar } from "../../modules/ProfileModule/ProfileAvatar";

import { useProfileQuery } from "../../hooks/useProfileQuery";

import {   
  Button,
  Center,
  Flex,
  HStack,
  SimpleGrid,
  Skeleton,
  Text,  
} from "@chakra-ui/react";

export default function Profile() {
  const router = useRouter()
  const { data, isError, isLoading } = useProfileQuery()  

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
        {isLoading ? (
          <Content>
            <SimpleGrid gap={3} columns={2}>      
              <Skeleton h="10" w="100%" borderRadius="md"/>
              <Skeleton h="10" w="100%" borderRadius="md"/>
              <Skeleton h="10" w="100%" borderRadius="md"/>
              <Skeleton h="10" w="100%" borderRadius="md"/>
              <Skeleton h="10" w="100%" borderRadius="md"/>
              <Skeleton h="10" w="100%" borderRadius="md"/>
              <Skeleton h="10" w="100%" borderRadius="md"/>
              <Skeleton h="10" w="100%" borderRadius="md"/>
              <Skeleton h="10" w="100%" borderRadius="md"/>
              <Skeleton h="10" w="100%" borderRadius="md"/>
              <Skeleton h="10" w="100%" borderRadius="md"/>
              <Skeleton h="10" w="100%" borderRadius="md"/>      
            </SimpleGrid>
          </Content>
        ) : isError ? (
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
            <ProfileAvatar profile={data.profile}/>            
            <ProfileForm 
              profile={data.profile}
              address={data.addresses[0]}
            />
          </HStack>
        )}        
      </AuthWrapper>
    </>
  )
}
