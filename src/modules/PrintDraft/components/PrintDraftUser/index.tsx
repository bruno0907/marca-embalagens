import { HStack, Stack, Heading, Text } from "@chakra-ui/react"
import { Draft } from "../../../../models"
import { handleFormatDate } from "../../../../utils"

type PrintDraftUserProps = {
  draft: Draft;
}

export const PrintDraftUser = ({ draft }: PrintDraftUserProps) => {
  return (
    <HStack spacing={3} justify="space-between">
      <Stack>
        <Text>
          <strong>Cliente:</strong> {draft.cliente}
        </Text>
        <Text>
          <strong>Data:</strong>{" "}
          {handleFormatDate(draft.created_at)}
        </Text>
      </Stack>
      {draft.status !== 'Pendente' && (
        <Stack>
          <Heading 
            size="lg" 
            color={draft.status === 'Não aprovado' 
              ? 'red.400' 
              : 'green.400'
            }>
            {draft.status}
          </Heading>
          <Text fontWeight="bold">
            Data: {handleFormatDate(draft.created_at)}                      
          </Text>
        </Stack>
      )}
    </HStack>
  )
}