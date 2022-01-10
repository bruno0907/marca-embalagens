import { useRouter } from "next/router"

import { Button } from "@chakra-ui/react"

import { FiArrowLeft } from "react-icons/fi"

type Props = {
  to?: string;
}

const GoBackButton = ({ to }: Props) => {
  const router = useRouter()

  console.log(to)

  const handleGoBack = () => {
    if(!to) {
      return router.back()
    }

    return router.push(to)
  }

  return (
    <Button      
      display="flex"
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