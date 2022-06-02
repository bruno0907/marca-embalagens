import { forwardRef, ForwardRefRenderFunction } from "react";

import {
  Stack,
  Heading, 
  Box, 
  Text,
  StackProps,
  
} from "@chakra-ui/react";

import { Draft } from "../../models";
import { 
  PrintDraftHeader, 
  PrintDraftUser, 
  PrintDraftProducts
} from "./components";

type PrintModuleProps = StackProps & {
  draft: Draft;  
}

const PrintModule: ForwardRefRenderFunction<HTMLDivElement, PrintModuleProps> = ({ draft, ...rest }, ref) => {
  return (
    <Box h="0" overflow="hidden">
      <Stack spacing={6} p="4" ref={ref} {...rest}>
        <PrintDraftHeader draftNumber={draft?.numero_orcamento} />
  
        <PrintDraftUser draft={draft}/>
  
        <Heading size="sm" textAlign="center">Descrição</Heading>
  
        <PrintDraftProducts 
          draftProducts={draft?.produtos} 
          draftTotal={draft?.total}
        /> 
  
        {draft.observacoes && (
          <Stack spacing={3}>
            <Text fontWeight="bold">Observações:</Text>
            <Box
              p="2"
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="md"              
              w="100%"
            >
              {draft.observacoes.split('\n').map((line, index) => {
                return (
                  <>
                    <Text key={index}>{line}</Text>                    
                  </>
                )
              })}                    
            </Box>
          </Stack>
        )}
  
      </Stack>
    </Box>
  )
}

export const PrintDraftModule = forwardRef(PrintModule)
