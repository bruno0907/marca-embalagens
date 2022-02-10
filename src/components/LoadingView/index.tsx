import { Center, CenterProps, Heading, Spinner, Stack } from "@chakra-ui/react"

type LoadingView = CenterProps & {
  isFullScreen?: boolean;  
}

export const LoadingView = ({ isFullScreen = false, ...rest }) => {
  return (
    <Center h={isFullScreen ? "100vh" : "40vh"} {...rest}>
      <Stack spacing={6} align="center">
        <Spinner color="blue.500" />
        <Heading fontSize={['medium', 'large', 'large']}>Carregando...</Heading>
      </Stack>
    </Center>    
  )
}