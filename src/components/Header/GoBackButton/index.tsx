import { useRouter } from "next/router"

import { IconButton } from "@chakra-ui/react"

import { FiArrowLeft } from "react-icons/fi"

type Props = {
  to?: string;
}

const GoBackButton = ({ to }: Props) => {
  const router = useRouter()

  const handleGoBack = () => {
    if(!to) {
      return router.back()
    }

    return router.push(to)
  }

  return (
    <IconButton
      aria-label="go-back"  
      icon={<FiArrowLeft />}    
      fontSize={[24, 24, 32]}
      display="flex"
      align="center"
      justify="center"
      type="button"
      variant="unstyled"
      onClick={handleGoBack}
      _hover={{ svg: { color: 'blue.500' }}}
    />
  )
}

export {
  GoBackButton
}