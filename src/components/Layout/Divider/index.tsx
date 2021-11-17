import { 
  Divider as ChakraDivider, 
  DividerProps as ChakraDividerProps 
} from "@chakra-ui/react";

interface DividerProps extends ChakraDividerProps {}

const Divider = ({ ...rest }: DividerProps) => {
  return (
    <ChakraDivider my="8" borderColor="gray.600" {...rest} />
  )
}

export { Divider }
