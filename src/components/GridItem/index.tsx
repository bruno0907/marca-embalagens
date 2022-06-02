import { ElementType } from "react"

import { 
  Box,
  Icon,
  Text,
  HStack,
  StackProps
} from "@chakra-ui/react"

type Props = StackProps & {
  label: string;
  value: string;
  icon?: ElementType;
}

export const GridItem = ({ label, value, icon }: Props) => {
  return (
    <HStack       
      spacing={3}    
      py="2"  
      px="4"
      align="center"
      bgColor="gray.100" 
      borderRadius="md"
    >
      {icon && (
        <Icon as={icon} fontSize="24" color="gray.500"/>
      )}
      <Box overflow="hidden">
        <Text fontSize={['small', 'small', 'sm']} color="gray.500" fontWeight="medium">{label}</Text>
        <Text fontSize={['small', 'small', 'sm']} color="gray.700" fontWeight="medium">{value}</Text>
      </Box>
    </HStack>
  )
}

