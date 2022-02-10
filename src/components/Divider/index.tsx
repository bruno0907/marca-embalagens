import { 
  Divider as ChakraDivider, 
  DividerProps as ChakraDividerProps 
} from "@chakra-ui/react";

interface Props extends ChakraDividerProps {}

const Divider = ({ ...rest }: Props) => {
  return (
    <ChakraDivider my={[6, 6, 12]} borderColor="gray.600" {...rest} />
  )
}

export { Divider }
