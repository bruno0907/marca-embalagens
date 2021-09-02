import { useRouter } from 'next/router'

import {
  Icon,
  IconProps
} from '@chakra-ui/react'

import { FiArrowLeft } from 'react-icons/fi'

interface GoBackProps extends IconProps {}

const GoBack = ({ ...rest }: GoBackProps) => {
  const router = useRouter()

  function handleGoBack() {
    router.back()
  }
  
  return (
    <Icon as={FiArrowLeft} onClick={handleGoBack} cursor="pointer" {...rest} _hover={{ color: "blue.500" }}/>
  )
}

export { GoBack }
