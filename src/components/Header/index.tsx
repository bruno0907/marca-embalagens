import { ReactNode } from "react"
import { useRouter } from "next/router"

import { Flex, Heading, FlexProps, Icon } from "@chakra-ui/react"
import { FiArrowLeft } from "react-icons/fi"

type HeaderProps = FlexProps & {
  withGoBack?: boolean;
  children?: ReactNode
  title: string;
}

const Header = ({ withGoBack, children, title, ...rest }: HeaderProps) => {
  const router = useRouter()

  const handleGoBack = () => router.back()

  return (
    <Flex align="center" justify="space-between" {...rest}>
      <Flex align="center">
        { withGoBack && 
          <Icon 
            mr="4"
            fontSize="32"
            as={FiArrowLeft} 
            onClick={handleGoBack} 
            cursor="pointer" 
            _hover={{ color: "blue.500" }}
          />
        }
        <Heading>{title}</Heading>
      </Flex>
      { children }
    </Flex>
  )
}

export { Header }