import { Center, Spinner } from '@chakra-ui/react'

const Loader = () => {
  return (
    <Center w="100%" m="16">
      <Spinner 
        size="md"
        color="blue.500"
      />
    </Center>
  )
}

export { Loader }
