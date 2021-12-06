import { ElementType, memo } from "react"

import { 
  Box,
  Flex,
  Icon,
  Text
} from "@chakra-ui/react"

type InformationFieldProps = {
  label: string;
  value: string;
  icon: ElementType;
}

const InformationFieldComponent = ({ label, value, icon }: InformationFieldProps) => {
  return (
    <Box py="2" px="4" bgColor="gray.100" borderRadius="md" w="100%">
      <Flex align="center">
        <Icon as={icon} fontSize="24" color="gray.500"/>
        <Box ml="4">
          <Text fontSize="sm" color="gray.500" fontWeight="medium">{label}</Text>
          <Text fontSize="sm" color="gray.700" fontWeight="medium">{value}</Text>
        </Box>
      </Flex>
    </Box>
  )
}

const InformationField = memo(InformationFieldComponent, (prevProps, nextProps) => {
  return prevProps.value !== nextProps.value
})

export { InformationField }
