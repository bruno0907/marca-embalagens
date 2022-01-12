import { SimpleGrid, Skeleton } from "@chakra-ui/react"

const FormSkeleton = () => {
  return (
    <SimpleGrid gap={3} columns={2}>      
      <Skeleton h="10" w="100%" borderRadius="md"/>
      <Skeleton h="10" w="100%" borderRadius="md"/>
      <Skeleton h="10" w="100%" borderRadius="md"/>
      <Skeleton h="10" w="100%" borderRadius="md"/>
      <Skeleton h="10" w="100%" borderRadius="md"/>
      <Skeleton h="10" w="100%" borderRadius="md"/>
      <Skeleton h="10" w="100%" borderRadius="md"/>
      <Skeleton h="10" w="100%" borderRadius="md"/>
      <Skeleton h="10" w="100%" borderRadius="md"/>
      <Skeleton h="10" w="100%" borderRadius="md"/>
      <Skeleton h="10" w="100%" borderRadius="md"/>
      <Skeleton h="10" w="100%" borderRadius="md"/>      
    </SimpleGrid>
  )
}

export { FormSkeleton }