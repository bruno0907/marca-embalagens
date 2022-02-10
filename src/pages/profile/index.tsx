import Head from "next/head";
import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import { 
  AuthWrapper,
  Divider,
  Header,
  Content,  
  ErrorView,  
} from "../../components";
import { useProfileQuery } from "../../hooks";
import { ProfileModule } from "../../modules";

export default function Profile() {
  
  const { data: profile, isError, isLoading } = useProfileQuery()  

  if(isLoading) {
    return (
      <>
        <AuthWrapper>
          <Header title="Perfil"/>
          <Divider />
          <Content>
            <SimpleGrid gap={3} columns={2}>
              {Array.from({ length: 12}).map((_, i) => {
                return (                  
                  <Skeleton key={i} h="10" w="100%" borderRadius="md"/>
                )
              })}   
            </SimpleGrid>
          </Content>
        </AuthWrapper>
      </>
    )
  }

  if(isError) {
    return (
      <>
        <AuthWrapper>
          <Header title="Perfil" />
          <Divider />
          <ErrorView />
        </AuthWrapper>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Perfil</title>
      </Head>
      <AuthWrapper>        
        <ProfileModule profile={profile} />         
      </AuthWrapper>
    </>
  )
}
