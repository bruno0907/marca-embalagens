import { forwardRef, ForwardRefRenderFunction } from "react";

import {
  Stack,
  Heading, 
  Box, 
  Text,
  StackProps,
  
} from "@chakra-ui/react";

import { Estimate } from "../../models";
import { 
  PrintEstimateHeader, 
  PrintEstimateProducts, 
  PrintEstimateUser 
} from "./components";

type Props = StackProps & {
  estimate: Estimate;  
}

const PrintModule: ForwardRefRenderFunction<HTMLDivElement, Props> = ({ estimate, ...rest }, ref) => {
  return (
    <Box h="0" overflow="hidden">
      <Stack spacing={6} p="4" ref={ref} {...rest}>
        <PrintEstimateHeader estimateNumber={estimate?.numero_orcamento} />
  
        <PrintEstimateUser estimate={estimate}/>
  
        <Heading size="sm" textAlign="center">Descrição</Heading>
  
        <PrintEstimateProducts 
          estimateProducts={estimate?.produtos} 
          estimateTotal={estimate?.total}
        /> 
  
        {estimate.observacoes && (
          <Stack spacing={3}>
            <Text fontWeight="bold">Observações:</Text>
            <Box
              p="2"
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="md"              
              w="100%"
            >
              {estimate.observacoes.split('\n').map((line, index) => {
                return (
                  <>
                    <Text key={index}>{line}</Text>
                    <Text key={index}>{line}</Text>
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

export const PrintEstimateModule = forwardRef(PrintModule)
