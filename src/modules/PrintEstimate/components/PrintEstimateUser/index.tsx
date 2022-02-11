import { HStack, Stack, Heading, Text } from "@chakra-ui/react"
import { Estimate } from "../../../../models"
import { handleFormatDate } from "../../../../utils"

type Props = {
  estimate: Estimate;
}

export const PrintEstimateUser = ({ estimate }: Props) => {
  return (
    <HStack spacing={3} justify="space-between">
      <Stack>
        <Text>
          <strong>Cliente:</strong> {estimate.cliente}
        </Text>
        <Text>
          <strong>Data:</strong>{" "}
          {handleFormatDate(estimate.created_at)}
        </Text>
      </Stack>
      {estimate.status !== 'Pendente' && (
        <Stack>
          <Heading 
            size="lg" 
            color={estimate.status === 'Não aprovado' 
              ? 'red.400' 
              : 'green.400'
            }>
            {estimate.status}
          </Heading>
          <Text fontWeight="bold">
            Data: {handleFormatDate(estimate.created_at)}                      
          </Text>
        </Stack>
      )}
    </HStack>
  )
}