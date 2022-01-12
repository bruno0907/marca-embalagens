import { memo, ReactNode } from "react";

import { 
  Box, 
  Table as ChakraTable,
  TableProps as ChakraTableProps,
} from "@chakra-ui/react";

interface Props extends ChakraTableProps {
  children: ReactNode;
}

const TableComponent = ({ children, ...rest }: Props) => {
  return (
    <Box borderRadius="md" overflow="hidden">
      <ChakraTable colorScheme="gray" variant="striped" {...rest}>
        {children}
      </ChakraTable>
    </Box>
  )
}

const Table = memo(TableComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.children, nextProps.children)
})

export {
  Table
}