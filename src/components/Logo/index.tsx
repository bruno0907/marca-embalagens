import NextImage from 'next/image'

import { SkeletonCircle, Icon, Center, Avatar } from '@chakra-ui/react'
import { FiAlertTriangle } from 'react-icons/fi'
import { useProfileQuery } from '../../hooks/useProfileQuery'

const Logo = () => {
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

  if(isError || !data.profile) {
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
    <NextImage 
      src={data.profile.avatar}
      alt="Logo"
      width={150}
      height={50}
      objectFit="cover"
    />
  )
}

export { Logo }
