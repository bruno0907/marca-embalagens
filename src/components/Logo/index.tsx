import NextImage from 'next/image'

import { SkeletonCircle, Icon, Center, Avatar, Box } from '@chakra-ui/react'
import { FiAlertTriangle } from 'react-icons/fi'
import { useProfileQuery } from '../../hooks/useProfileQuery'

export const Logo = () => {
  const { data, isLoading, isError } = useProfileQuery()

  if(isLoading) {
    return (
      <SkeletonCircle 
        w="4rem" 
        h="4rem" 
        mb="2"
      />
    )
  }

  if(isError) {
    return (
      <Icon 
        as={FiAlertTriangle} 
        fontSize="3rem" 
        color="red.400" 
        mb="2"
      />
    )
  }

  if(!data.profile.avatar) {
    return (
      <Center>
        <Avatar
          name={data.profile.nome}
          bgColor="blue.500"
          size="lg" 
        />
      </Center>
    )
  }

  return (
    <Box 
      position="relative" 
      w={['125px', '125px', '150px']} 
      h={['40px', '40px', '50px']}
      m="2"
    >
      <NextImage
        src={data.profile.avatar}
        alt="Logo"
        loading="eager"
        objectFit="contain"
        layout="fill"
      />
    </Box>
  )
}
