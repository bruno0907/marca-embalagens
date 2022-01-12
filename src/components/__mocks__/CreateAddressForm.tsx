import { Box, Button } from "@chakra-ui/react"
import { Input } from "../Input"
import { Select } from "../Select"

const CreateAddressForm = ({ id, onClose }) => {
  return (
    <Box as="form">
      <Input name="endereco" />
      <Select name="estatos">
        <option value="FS1">Fake state 1</option>
        <option value="FS2">Fake state 2</option>
        <option value="FS3">Fake state 3</option>
      </Select>
      <Select name="cidades">
        <option value="FC1">Fake city 1</option>
        <option value="FC2">Fake city 2</option>
        <option value="FC3">Fake city 3</option>
      </Select>
      <Button>Salvar endereço</Button>
    </Box>
  )
}

export { CreateAddressForm }