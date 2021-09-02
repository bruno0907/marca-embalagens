import { 
  Divider as ChakraDivider, 
  DividerProps as ChakraDividerProps 
} from "@chakra-ui/react";

interface DividerProps extends ChakraDividerProps {}

const Divider = ({ ...rest }: DividerProps) => <ChakraDivider  my="12" borderColor="gray.600" {...rest} />

export { Divider }
