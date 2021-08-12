import { Box, Button, Heading } from "@chakra-ui/react"
import { useAuth } from "../../hooks/useAuth"

type HeaderProps = {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const { signOut } = useAuth()

  return (
    <Box display="flex" justifyContent="space-between">
      <Heading>{title}</Heading>
      <Button onClick={signOut} colorScheme="blue">Sair</Button>
    </Box>
  )
}

export { Header }