import { ReactNode } from "react";

import { 
  Box, 
  Table as ChakraTable,
  TableProps as ChakraTableProps,
} from "@chakra-ui/react";

interface TableProps extends ChakraTableProps {
  children: ReactNode;
}

const Table = ({ children, ...rest }: TableProps) => {
  return (
    <Box borderRadius="md" overflow="hidden">
      <ChakraTable colorScheme="gray" variant="striped" {...rest}>
        {children}
      </ChakraTable>
    </Box>
  )
}

export {
  Table
}