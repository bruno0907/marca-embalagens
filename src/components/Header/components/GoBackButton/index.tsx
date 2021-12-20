import { useRouter } from "next/router"

import { Button } from "@chakra-ui/react"

import { FiArrowLeft } from "react-icons/fi"

const GoBackButton = () => {
  const router = useRouter()
  const handleGoBack = () => router.back()

  return (
    <Button 
      type="button"
      variant="unstyled"
      mr="auto"
      onClick={handleGoBack}
      _hover={{ svg: { color: 'blue.500' }}}
    >
      <FiArrowLeft fontSize="32" />
    </Button>
  )
}

export {
  GoBackButton
}