import { Text, Center, Image, ImageProps, SkeletonCircle, Icon } from '@chakra-ui/react'
import { FiAlertTriangle, FiUserX, FiX } from 'react-icons/fi'
import { useProfileQuery } from '../hooks/useProfileQuery'

type Props = ImageProps & {
  logoPath: string;
}

const Logo = ({ logoPath, ...rest }: Props) => {
  const profile = useProfileQuery()

  if(profile.isLoading) return <SkeletonCircle w="3rem" h="3rem" mb="2"/>

  if(profile.isError || !profile.data) return <Icon as={FiAlertTriangle} fontSize="3rem" color="red.400" mb="2"/>

  /******** TO BE IMPLEMENTED ********
   * 
   * 
  // if(!profile.data.data.logo) {
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
  ()
  ***********************************/

  return (
    <Image 
      src="/logo.png" 
      alt={profile.data.data.nome} 
      h="3rem"
      mb="2"
    />
  )
}

export { Logo }
