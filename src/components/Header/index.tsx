import { ReactNode, memo } from "react"

import { GoBackButton } from "./components/GoBackButton"

import { 
  Flex, 
  Heading, 
  FlexProps, 
  Spacer 
} from "@chakra-ui/react"

type HeaderProps = FlexProps & {
  withGoBack?: boolean;
  children?: ReactNode;
  title?: string;
}

const HeaderComponent = ({ withGoBack, children, title, ...rest }: HeaderProps) => {
  return (
    <Flex id="header" align="center" justify="space-between" {...rest}>
      { withGoBack && <GoBackButton /> }
      { title && <Heading fontSize="xx-large" mr="auto">{title}</Heading>}
      { children ? children : <Flex w="10" h="10"/> }
    </Flex>
  )
}

const Header = memo(HeaderComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.title, nextProps.title)
})

export { Header }
