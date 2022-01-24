import NextImage from 'next/image'

import { SkeletonCircle, Icon } from '@chakra-ui/react'
import { FiAlertTriangle } from 'react-icons/fi'
import { useProfileQuery } from '../../hooks/useProfileQuery'

const Logo = () => {
  const profile = useProfileQuery()

  if(profile.isLoading) {
    return (
      <SkeletonCircle 
        w="4rem" 
        h="4rem" 
        mb="2"
      />
    )
  }

  if(profile.isError || !profile.data) {
    return (
      <Icon 
        as={FiAlertTriangle} 
        fontSize="3rem" 
        color="red.400" 
        mb="2"
      />
    )
  }

  /******** TO BE IMPLEMENTED ********
   * 
   * 
  // if(!profile.data.data.avatar) {
  //   return (
  //     <Center>
  //       <Avatar
  //         name={profile.data.data.nome}
  //         bgColor="blue.500"
  //         size="lg" 
  //       />
  //     </Center>
  //   )
  // }
  //
  *
  *
  ***********************************/

  return (
    <NextImage 
      src="/logo.png"
      alt="Logo"
      width={150}
      height={50}
      objectFit="cover"      
    />    
  )
}

export { Logo }
