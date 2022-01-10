import { ElementType, memo } from "react"

import { 
  Box,
  Flex,
  FlexProps,
  Icon,
  Text
} from "@chakra-ui/react"

type InformationFieldProps = FlexProps & {
  label: string;
  value: string;
  icon: ElementType;
}

const InformationFieldComponent = ({ label, value, icon }: InformationFieldProps) => {
  return (
    <Flex align="center">
      <Icon as={icon} fontSize="24" color="gray.500"/>
      <Box ml="4" overflow="hidden">
        <Text fontSize="sm" color="gray.500" fontWeight="medium">{label}</Text>
        <Text fontSize="sm" color="gray.700" fontWeight="medium">{value}</Text>
      </Box>
    </Flex>
  )
}

const InformationField = memo(InformationFieldComponent, (prevProps, nextProps) => {
  return prevProps.value !== nextProps.value
})

export { InformationField }
