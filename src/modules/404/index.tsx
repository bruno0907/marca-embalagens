import { useRouter } from 'next/router';

import { 
  Icon, 
  Center, 
  Heading, 
  Stack, 
  HStack, 
  Text
} from '@chakra-ui/react';

import { FiAlertTriangle, FiArrowLeft } from 'react-icons/fi';

import { ButtonPrimary } from '../../components';

export const NotFoundModule = () => {
  const router = useRouter()

  return(
    <Center h="100vh" flexDir="column" p={12}>     
      <Stack spacing={12} align="center" justify="center">
        <HStack align="center">
          <Icon as={FiAlertTriangle} fontSize={[32, 32, 48]}/>
          <Heading fontSize={['large', 'larg', 'initial']}>Oops! 404</Heading>
        </HStack>
        <Text fontWeight="medium">A página procurada não pôde ser encontrada</Text>        
          <ButtonPrimary            
            leftIcon={<FiArrowLeft />}
            onClick={() => router.back()}
          >Voltar</ButtonPrimary>
      </Stack>
    </Center>
  )
}