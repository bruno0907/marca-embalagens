import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react"
import { OrderProduct } from "../../../../models"
import { handleFormatPrice } from "../../../../utils"

type PrintDraftProductsProps = {
  draftProducts: OrderProduct[];
  draftTotal: number;
}

export const PrintDraftProducts = ({ draftProducts, draftTotal }: PrintDraftProductsProps) => {
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Produto</Th>
          <Th>Quantidade</Th>
          <Th>Preço unitário</Th>
          <Th>Preço total</Th>
        </Tr>
      </Thead>
      <Tbody>
        {draftProducts?.map((product, index) => (
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
          <Td fontSize="larger"><strong>{handleFormatPrice(draftTotal)}</strong></Td>
        </Tr>
      </Tbody>
    </Table>
  )
}