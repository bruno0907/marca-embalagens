import { useRef } from "react";
import { GetServerSideProps } from "next";
import NextHead from "next/head";
import { useRouter } from "next/router";

import { useReactToPrint } from "react-to-print";

import { Content } from "../../../components/Content";
import { Divider } from "../../../components/Divider";
import { Header } from "../../../components/Header";

import { EstimateHeader } from "../../../components/pages/Estimates/Estimate-to-print/EstimateHeader";

import { useEstimateQuery } from "../../../hooks/useEstimateQuery";

import {
  Box,
  Text,
  Button,
  Center,
  Spinner,
  Stack,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  HStack,
  Heading,
  forwardRef,
} from "@chakra-ui/react";

import { FiPrinter } from "react-icons/fi";

import { handleFormatDate } from "../../../utils/handleFormatDate";
import { Table } from "../../../components/Table";
import { WithAuth } from "../../../components/WithAuth";
import { handleFormatPrice } from "../../../utils/handleFormatPrice";
import { handleFormatPadStart } from "../../../utils/handleFormatPadStart";

type Props = {
  params: {
    id: string;
  };
};

export default function EstimateToPrint({ params }: Props) {
  const router = useRouter();

  const { id } = params;

  const estimateRef = useRef<HTMLDivElement>(null);

  const estimate = useEstimateQuery(id);

  const handlePrintOrder = useReactToPrint({
    content: () => estimateRef.current,
    onAfterPrint: () => router.push("/estimates"),
  });

  return (
    <>
      <NextHead>
        <title>
          { !estimate.data?.numero_orcamento ? `MARCA` : 
            `Orçamento: ${handleFormatPadStart(estimate.data?.numero_orcamento)} | MARCA`
          }
          </title>
      </NextHead>
      
      <WithAuth>
        { estimate.isLoading ? (
            <Center  minH="70vh" flexDir="column">
              <Spinner color="blue.500" />
            </Center>
          ) : !estimate.data || estimate.isError ? (
            <Center  minH="70vh" flexDir="column">            
              <Text 
                fontSize="xl" 
                mb="8" 
                fontWeight="bold"
              >
                Não foi possível carregar o orçamento.
              </Text>
              <Button 
                colorScheme="blue" 
                mb="2" 
                onClick={() => router.reload()}
              >
                Tentar novamente
              </Button>
              <Button 
                colorScheme="blue" 
                variant="ghost" 
                onClick={() => router.back()}
              >
                Voltar
              </Button>
            </Center>
          ) : (
            <>
              <Header
                withGoBack
                to={`/estimates/${id}`}
                title={
                  estimate.data?.numero_orcamento &&
                  `Orçamento: ${handleFormatPadStart(estimate.data.numero_orcamento)}`
                }
              >
                <Button
                  colorScheme="blue"
                  rightIcon={<FiPrinter />}
                  onClick={handlePrintOrder}
                >
                  Imprimir
                </Button>
              </Header>

              <Divider/>

              <Content>
                <Stack spacing={6} ref={estimateRef} p="8">                  
                  <EstimateHeader
                    estimateNumber={estimate.data.numero_orcamento}
                    estimateDeliveryDate={estimate.data.data_entrega}
                  />                  
                  
                  <HStack spacing={3} justify="space-between">

                    <Stack spacing={3}>
                      <Text>
                        <strong>Cliente:</strong> {estimate.data.cliente}
                      </Text>
                      <Text>
                        <strong>Data:</strong>{" "}
                        {handleFormatDate(estimate.data.created_at)}
                      </Text>
                    </Stack>

                    {estimate.data.status === 'Aprovado' && (
                      <Stack spacing={3} px="16">
                        <Heading color="green.400">
                          {estimate.data.status}
                        </Heading>
                        <Text fontWeight="bold">
                          Data: {handleFormatDate(estimate.data.created_at)}                      
                        </Text>
                      </Stack>
                    )}
                    {estimate.data.status === 'Não aprovado' && (
                      <Stack spacing={3} px="16">
                        <Heading color="red">
                          {estimate.data.status}
                        </Heading>
                        <Text fontWeight="bold">
                          Data: {handleFormatDate(estimate.data.created_at)}                      
                        </Text>
                      </Stack>
                    )}

                  </HStack>

                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Produto</Th>
                        <Th>Quantidade</Th>
                        <Th>Preço unitário</Th>
                        <Th>Preço total</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {estimate.data?.produtos.map((product, index) => (
                        <Tr key={index}>
                          <Td py="2">{product.produto}</Td>
                          <Td py="2">{product.quantidade}</Td>
                          <Td py="2">{handleFormatPrice(product.valor_unitario)}</Td>
                          <Td py="2">{handleFormatPrice(product.valor_total)}</Td>
                        </Tr>
                      ))}
                      <Tr>
                        <Td fontSize="larger" py="2"><strong>Total: </strong></Td>
                        <Td py="2" colSpan={2}/>
                        <Td fontSize="larger"><strong>{handleFormatPrice(estimate.data.total)}</strong></Td>
                      </Tr>
                    </Tbody>
                  </Table> 

                  {estimate.data.observacoes && (
                    <Stack spacing={3}>
                      <Text fontWeight="bold">Observações:</Text>
                      <Box
                        p="3"
                        bgColor="gray.100"
                        borderWidth="1px"
                        borderColor="gray.300"
                        borderRadius="md"
                        minH="100px"
                        w="100%"
                      >
                        {estimate.data.observacoes.split('\n').map((line, index) => {
                          return (
                            <Text key={index}>{line}</Text>
                          )
                        })}                    
                      </Box>
                    </Stack>
                  )}
                </Stack>
              </Content>
            </>          
        )}
      </WithAuth>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      params,
    },
  };
};
