import { Container, Spinner } from '@chakra-ui/react'

const Loader = () => {
  return (
    <Container minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Spinner 
        size="xl"
        color="blue.500"
      />
    </Container>
  )
}

export { Loader }
