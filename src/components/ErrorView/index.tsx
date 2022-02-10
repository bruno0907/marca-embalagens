import router from "next/router"

import { 
  Center, 
  Heading, 
  Icon, 
  Stack, 
  HStack, 
  Text, 
  CenterProps 
} from "@chakra-ui/react"

import { FiAlertTriangle, FiArrowLeft, FiRefreshCw } from "react-icons/fi"

import { ButtonPrimary } from "../ButtonPrimary"
import { ButtonSecondary } from "../ButtonSecondary"

type Props = CenterProps & {
  isFullScreen?: boolean;
}

export const ErrorView = ({ isFullScreen = false, ...rest }: Props) => {
  return (
    <Center h={[isFullScreen ? "100vh" : "40vh"]} {...rest}>
      <Stack spacing={6}>
        <HStack spacing={3}>
          <Icon as={FiAlertTriangle} color="red.500" fontSize={[24, 24, 32]}/>
          <Heading fontSize={['medium', 'medium', 'large']}>Ops! Isso é um erro</Heading>
        </HStack>
        <Text fontWeight="medium" fontSize={['sm', 'initial', 'initial']}>
          A sua solicitação não pôde ser atendida. <br/>
          Por favor tente novamente.
        </Text>
        <ButtonPrimary rightIcon={<FiRefreshCw/>} onClick={() => router.reload()}>
          Tentar novamente
        </ButtonPrimary>
        <ButtonSecondary leftIcon={<FiArrowLeft/>} onClick={() => router.back()}>
          Voltar
        </ButtonSecondary>
      </Stack>
    </Center>
  )
}