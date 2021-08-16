import { Box, Button, Heading } from "@chakra-ui/react"
import { useAuth } from "../../hooks/useAuth"

const Header = () => {
  const { signOut } = useAuth()

  return (
    <Box display="flex" justifyContent="space-between">
      <Heading>MARCA</Heading>
      <Button onClick={signOut} colorScheme="blue">Sair</Button>
    </Box>
  )
}

export { Header }